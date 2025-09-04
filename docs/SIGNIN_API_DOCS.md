# Authentication API Documentation

## Overview

Complete authentication system with login, logout, and session management for the PlantShop e-commerce application.

## API Endpoints

### POST /api/auth/login

Authenticate a user with email and password.

**Request Body:**

```json
{
  "email": "string",
  "password": "string",
  "rememberMe": "boolean" // optional, default: false
}
```

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  },
  "token": "string"
}
```

**Response (Error - 400):**

```json
{
  "error": "Invalid input",
  "details": [
    {
      "path": ["email"],
      "message": "Invalid email format"
    }
  ]
}
```

**Response (Error - 401):**

```json
{
  "error": "Invalid email or password"
}
```

**Cookies Set:**

- `auth-token`: HTTP-only cookie containing the authentication token
- Expires: 1 day (default) or 30 days (if rememberMe is true)

### POST /api/auth/logout

Logout the current user and clear authentication cookies.

**Request:** No body required

**Response (200):**

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

**Cookies Cleared:**

- `auth-token`: Set to empty with immediate expiry

### GET /api/auth/me

Get current authenticated user information.

**Headers Required:**

- Cookie: `auth-token=...` (automatically sent by browser)

**Response (Success - 200):**

```json
{
  "success": true,
  "user": {
    "id": "string",
    "email": "string",
    "name": "string",
    "role": "string"
  }
}
```

**Response (Error - 401):**

```json
{
  "error": "Not authenticated"
}
```

## Demo Accounts

For testing purposes, the following demo accounts are available:

### Customer Account

- **Email:** demo@plantshop.com
- **Password:** password123
- **Role:** customer

### Admin Account

- **Email:** admin@plantshop.com
- **Password:** admin123
- **Role:** admin

## Authentication Context

### AuthProvider Component

Provides authentication state and methods throughout the application.

**Usage:**

```tsx
import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <YourAppComponents />
    </AuthProvider>
  );
}
```

### useAuth Hook

Access authentication state and methods in components.

**Methods:**

- `user`: Current user object or null
- `loading`: Boolean indicating if auth check is in progress
- `login(email, password, rememberMe)`: Login function
- `logout()`: Logout function
- `checkAuth()`: Manually trigger auth check

**Usage:**

```tsx
import { useAuth } from "@/context/AuthContext";

function MyComponent() {
  const { user, login, logout, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {user ? (
        <div>
          Welcome, {user.name}!<button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={() => login("demo@plantshop.com", "password123")}>
          Login
        </button>
      )}
    </div>
  );
}
```

## Components

### UserNav Component

Navigation component that shows login/logout state and user menu.

**Features:**

- Shows "Sign In" and "Sign Up" buttons when not authenticated
- Shows user avatar and dropdown menu when authenticated
- Includes user info, navigation links, and logout button
- Theme-aware styling

**Usage:**

```tsx
import { UserNav } from "@/components/layout/UserNav";

function Header() {
  return (
    <header>
      <nav>
        {/* Other nav items */}
        <UserNav />
      </nav>
    </header>
  );
}
```

### DemoCredentials Component

Helper component that displays demo login credentials for testing.

**Features:**

- Shows available demo accounts
- Click-to-copy functionality for credentials
- Theme-aware styling
- Role indicators

**Usage:**

```tsx
import { DemoCredentials } from "@/components/auth/DemoCredentials";

function LoginPage() {
  return (
    <div>
      <LoginForm />
      <DemoCredentials />
    </div>
  );
}
```

## Security Features

### Current Implementation

- Password validation (minimum length)
- Email format validation
- HTTP-only cookies for token storage
- Secure cookie settings in production
- Input sanitization and validation

### Production Recommendations

1. **Password Hashing**: Use bcrypt or similar for password hashing
2. **JWT Tokens**: Implement proper JWT with signing and verification
3. **Rate Limiting**: Add rate limiting for login attempts
4. **HTTPS Only**: Ensure all authentication happens over HTTPS
5. **Session Management**: Implement proper session invalidation
6. **Input Validation**: Server-side validation for all inputs
7. **CSRF Protection**: Implement CSRF tokens for state-changing operations

## Error Handling

### Client-Side

- Form validation with real-time feedback
- Error messages for invalid credentials
- Network error handling
- Loading states during authentication

### Server-Side

- Input validation with detailed error messages
- Proper HTTP status codes
- Error logging
- Graceful error responses

## File Structure

```
src/
├── app/api/auth/
│   ├── login/route.ts          # Login API endpoint
│   ├── logout/route.ts         # Logout API endpoint
│   └── me/route.ts             # Current user API endpoint
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx       # Login form component
│   │   ├── AuthLayout.tsx      # Authentication layout
│   │   └── DemoCredentials.tsx # Demo credentials display
│   └── layout/
│       └── UserNav.tsx         # User navigation component
├── context/
│   └── AuthContext.tsx         # Authentication context provider
└── lib/validations/
    └── auth.ts                 # Zod validation schemas
```

## Next Steps

1. **Database Integration**: Replace mock data with real database
2. **Password Reset**: Implement forgot password functionality
3. **Email Verification**: Add email verification for new accounts
4. **Two-Factor Auth**: Implement 2FA for enhanced security
5. **Social Login**: Add OAuth providers (Google, GitHub, etc.)
6. **Protected Routes**: Add middleware for route protection
7. **Admin Panel**: Create admin interface for user management

## Testing

Visit the login page at `/auth/login` to test the authentication system:

1. Use the demo credentials provided on the page
2. Test form validation with invalid inputs
3. Test "Remember me" functionality
4. Test logout functionality
5. Check browser cookies and network requests

The system is fully functional and ready for production with proper security implementations.
