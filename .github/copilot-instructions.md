# GitHub Copilot Instructions for PlantShop E-commerce

## Project Overview

Next.js 15 e-commerce app with PostgreSQL, JWT auth, role-based access (admin/customer), multi-currency support (USD/PHP), product management system, and component-level route protection.

## Architecture Patterns

### Authentication Flow

- **Database-backed auth** with PostgreSQL via `src/lib/db.ts` (pg pool)
- **JWT tokens** stored as HTTP-only cookies, verified in API routes
- **Role determination**: Admin if email contains "@plantshop.com", otherwise customer
- **Layout-level protection**: Authentication happens in layout components (`CustomerDashboardLayout`, `CustomerShopLayout`), NOT middleware
- **Auth context**: `src/context/AuthContext.tsx` manages global auth state

Example auth pattern:

```tsx
// Layout components handle route protection
const { user, loading } = useAuth();
if (!loading && !user) {
  router.push("/auth/login?redirect=/customer/dashboard");
}

// Admin-only API route verification
const token = request.headers.get("authorization")?.replace("Bearer ", "");
const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
  email: string;
};
const isAdmin = decoded.email?.endsWith("@plantshop.com");
```

### Currency System

- **Multi-currency support**: USD/PHP with live exchange rate integration
- **Storage pattern**: Always store prices in USD in database for consistency
- **Exchange rate API**: Live rates with fallback protection (₱56.5 fallback)
- **Currency utilities**: `src/lib/utils/currency.ts` for conversion and formatting

Currency patterns:

```typescript
// Currency conversion with live rates
import {
  fetchExchangeRate,
  convertCurrency,
  formatCurrency,
} from "@/lib/utils/currency";

const exchangeRate = await fetchExchangeRate(); // Falls back to 56.5 if API fails
const phpPrice = convertCurrency(29.99, "USD", "PHP", exchangeRate);
const formattedPrice = formatCurrency(phpPrice, "PHP"); // "₱1,695.44"

// Always store in USD
const priceInUSD =
  currency === "PHP"
    ? convertCurrency(parseFloat(price), "PHP", "USD", exchangeRate)
    : parseFloat(price);
```

### Database Integration

- **Connection**: Single pg pool instance exported from `src/lib/db.ts`
- **Environment**: Uses `DATABASE_URL` from `.env.local`
- **Plants table**: Complete product schema with text[] features column
- **Array handling**: Use text[] for string arrays, NOT JSONB

Database schema and patterns:

```sql
-- Plants table structure
CREATE TABLE plants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,  -- Always stored in USD
  features text[] DEFAULT '{}',   -- Use text[] NOT JSONB for string arrays
  in_stock BOOLEAN DEFAULT true,
  is_popular BOOLEAN DEFAULT false,
  -- ... other fields
);
```

```typescript
// CORRECT: Array handling for text[] columns
const featuresArray = ["Low Light", "Air Purifying"];
await client.query(
  "INSERT INTO plants (features) VALUES ($1)",
  [featuresArray] // Pass array directly for text[] columns
);

// WRONG: Don't stringify for text[] columns
const features = JSON.stringify(["Low Light"]); // Don't do this
```

### API Route Structure

- **Auth APIs**: `/api/auth/{login,register,logout,me}` with bcrypt + JWT
- **Product APIs**: `/api/products` with full CRUD operations and admin verification
- **File upload**: UUID-based image uploads with validation
- **Error handling**: Consistent JSON responses with proper HTTP status codes

Product API patterns:

```typescript
// GET - List products with filtering
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");

  let query = "SELECT * FROM plants WHERE 1=1";
  const params: any[] = [];

  if (category) {
    query += " AND category = $" + (params.length + 1);
    params.push(category);
  }
}

// POST - Create product with admin verification + currency conversion
export async function POST(request: NextRequest) {
  // Verify admin access
  const token = authHeader?.replace("Bearer ", "");
  const decoded = jwt.verify(token!, process.env.JWT_SECRET!) as {
    email: string;
  };
  if (!decoded.email?.endsWith("@plantshop.com")) {
    return NextResponse.json(
      { error: "Admin access required" },
      { status: 403 }
    );
  }

  // Convert price to USD for storage
  const priceInUSD =
    currency === "PHP"
      ? convertCurrency(parseFloat(price), "PHP", "USD", exchangeRate)
      : parseFloat(price);
}
```

### File Upload System

- **UUID-based naming**: Unique filenames using `uuid` package
- **Validation**: File type and size validation
- **Storage**: Organized in `/public/images/plants/` directory

File upload pattern:

```typescript
import { v4 as uuidv4 } from "uuid";

// Generate unique filename
const fileExtension = file.name.split(".").pop();
const uniqueFilename = `${uuidv4()}.${fileExtension}`;
const filePath = path.join(
  process.cwd(),
  "public",
  "images",
  "plants",
  uniqueFilename
);

// Validate file
const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
const maxSize = 5 * 1024 * 1024; // 5MB
if (!allowedTypes.includes(file.type) || file.size > maxSize) {
  throw new Error("Invalid file");
}
```

### Component Architecture

- **Dual dashboards**: Admin (`/dashboard`) vs Customer (`/customer/dashboard`)
- **Layout components**: Shared layouts with built-in auth protection
- **Currency components**: Real-time currency conversion with toggle UI
- **Product management**: Complete admin forms with validation and file upload
- **Theme system**: Light/dark mode via `ThemeContext`

Admin component patterns:

```tsx
// Currency toggle in forms
const [currency, setCurrency] = useState<"USD" | "PHP">("USD");
const [exchangeRate, setExchangeRate] = useState<number>(56.5);

useEffect(() => {
  fetchExchangeRate().then(setExchangeRate);
}, []);

// Real-time conversion display
const convertedPrice = convertCurrency(
  parseFloat(price) || 0,
  currency,
  currency === "USD" ? "PHP" : "USD",
  exchangeRate
);
```

### Development Workflow

```bash
npm run dev          # Turbopack dev server
npm install uuid @types/uuid  # For file uploads
npm run seed         # Database seeding (tsx runner)
```

### Critical Files

- `src/context/AuthContext.tsx`: Global auth state management
- `src/lib/utils/currency.ts`: Currency conversion utilities with live rates
- `src/app/api/products/route.ts`: Complete product CRUD with admin verification
- `src/app/api/setup-plants-table/route.ts`: Database schema setup
- `src/components/customer/CustomerDashboardLayout.tsx`: Customer route protection
- `src/app/admin/products/`: Admin product management interface
- `middleware.ts`: Currently disabled - auth happens at component level

### Key Conventions

- **Client components**: Always use `'use client'` for interactive components
- **Route protection**: Implement in layout components, not middleware
- **Currency storage**: Always store prices in USD, convert for display
- **Array handling**: Use text[] for PostgreSQL string arrays, pass arrays directly
- **Admin verification**: Check @plantshop.com email domain for admin access
- **File naming**: Use UUID for unique file names
- **Error boundaries**: Component-level auth checks with loading states

### Common Issues & Solutions

1. **"Malformed Array Literal" Error**:

   - Use text[] columns, pass arrays directly (not stringified)
   - `[featuresArray]` not `[JSON.stringify(featuresArray)]`

2. **Currency Conversion Failures**:

   - Always use fetchExchangeRate() with built-in fallback
   - Handle API failures gracefully

3. **Missing Dependencies**:

   - `npm install uuid @types/uuid` for file uploads
   - Exchange rate API is free, no additional packages needed

4. **Admin Access Denied**:
   - Verify email ends with "@plantshop.com"
   - Check JWT token in Authorization header

### Debugging Steps

1. **Auth Issues**: Check browser cookies for `auth-token`, verify `/api/auth/me`
2. **Database Issues**: Check connection, verify text[] array handling
3. **Currency Issues**: Check exchange rate API response, verify fallback
4. **File Upload Issues**: Check file permissions, UUID dependency
5. **Product API Issues**: Verify admin token, check price conversion

### Data Flow Examples

**Product Creation Flow**:
User input (PHP/USD) → Currency conversion → USD storage → Database insertion → Success response

**Product Listing Flow**:
Database query (USD prices) → Currency conversion for display → Formatted output

**Authentication Flow**:
User login → JWT cookie set → AuthContext updates → Layout components check auth → Redirect or render

### External Dependencies

- **PostgreSQL**: Primary database (Neon or local)
- **Tailwind**: Styling with dark mode support
- **UUID**: Unique file naming
- **Exchange Rate API**: Live currency conversion (exchangerate-api.com)
- **React Hook Form + Zod**: Form validation
- **Lucide React**: Icon system
