# Dashboard Documentation

## Overview

A modern, responsive dashboard interface for the PlantShop e-commerce application with clean design, dark/light theme support, and comprehensive functionality.

## Features

### 🎨 **Modern Design**

- **Clean & Simple**: Minimalist design with focus on usability
- **Theme Support**: Full dark/light mode integration
- **Responsive Layout**: Mobile-first design that works on all devices
- **Glassmorphic Elements**: Modern UI with backdrop blur and subtle effects

### 📱 **Layout Structure**

#### Desktop Layout

- **Sidebar Navigation**: Fixed sidebar with collapsible menu items
- **Top Navigation Bar**: Search, notifications, user menu, and theme toggle
- **Main Content Area**: Scrollable content area with proper spacing

#### Mobile Layout

- **Hidden Sidebar**: Sidebar is hidden on mobile devices
- **Bottom Navigation**: Mobile-friendly navigation bar at bottom
- **Responsive Grid**: Content adapts to smaller screens

### 🧭 **Navigation Components**

#### Sidebar (`DashboardSidebar.tsx`)

- **Hierarchical Menu**: Main items with expandable sub-items
- **Active State Indicators**: Visual feedback for current page
- **Badge Support**: Notification badges for menu items
- **Icons**: SVG icons for each menu item

**Menu Structure:**

```
📊 Dashboard
📦 Products
  ├── All Products
  ├── Categories
  └── Inventory (with badge)
📋 Orders (with badge)
👥 Customers
📈 Analytics
⚙️ Settings
```

#### Topbar (`DashboardTopbar.tsx`)

- **Search Bar**: Global search with keyboard shortcut (⌘K)
- **Quick Actions**: "Add Product" button
- **Notifications**: Dropdown with notification items
- **Theme Toggle**: Switch between dark/light mode
- **User Menu**: User avatar and information

### 📊 **Dashboard Components**

#### Stats Grid (`StatsGrid.tsx`)

- **Key Metrics**: Revenue, Orders, Products, Customers
- **Trend Indicators**: Visual arrows showing increase/decrease
- **Hover Effects**: Subtle animations on card hover
- **Color-coded Changes**: Green for positive, red for negative

#### Recent Orders (`RecentOrders.tsx`)

- **Order List**: Recent customer orders with details
- **Status Badges**: Color-coded order status indicators
- **Customer Avatars**: Generated initials in circular avatars
- **Quick Actions**: View all orders link

#### Popular Products (`PopularProducts.tsx`)

- **Product Rankings**: Top products with sales numbers
- **Trend Indicators**: Up/down/stable sales trends
- **Stock Levels**: Low stock warnings
- **Visual Rankings**: Numbered badges for product positions

### 🎨 **Design System**

#### Color Scheme

- **Primary**: Green (PlantShop brand color)
- **Status Colors**:
  - Success: Green
  - Warning: Yellow
  - Error: Red
  - Info: Blue
  - Processing: Purple

#### Typography

- **Headers**: Bold, clean fonts
- **Body Text**: Readable with proper contrast
- **Code/Data**: Monospace for numbers and IDs

#### Spacing & Layout

- **Grid System**: CSS Grid and Flexbox
- **Consistent Padding**: 6-unit spacing system
- **Border Radius**: Rounded corners (8px, 12px)
- **Shadows**: Subtle shadows for depth

### 🛡️ **Security & Authentication**

#### Route Protection

- **Middleware**: Automatic redirects for unauthorized access
- **Token Validation**: HTTP-only cookie authentication
- **Login Required**: Dashboard requires valid authentication

#### User Management

- **User Context**: Global user state management
- **Auto-redirect**: Logged users redirected to dashboard
- **Session Persistence**: Remember me functionality

## File Structure

```
src/
├── app/dashboard/
│   └── page.tsx                    # Main dashboard page
├── components/dashboard/
│   ├── DashboardLayout.tsx         # Overall layout wrapper
│   ├── DashboardSidebar.tsx        # Sidebar navigation
│   ├── DashboardTopbar.tsx         # Top navigation bar
│   ├── DashboardHeader.tsx         # Page header component
│   ├── StatsGrid.tsx              # Statistics cards grid
│   ├── RecentOrders.tsx           # Recent orders list
│   ├── PopularProducts.tsx        # Popular products list
│   └── index.ts                   # Component exports
├── middleware.ts                   # Route protection
└── context/
    └── AuthContext.tsx            # Authentication state
```

## Usage

### Navigation

- **Access Dashboard**: Login and get redirected automatically
- **Direct URL**: Navigate to `/dashboard` (requires authentication)
- **Mobile Navigation**: Use bottom navigation on mobile devices

### Customization

#### Adding New Menu Items

```typescript
// In DashboardSidebar.tsx
const sidebarItems: SidebarItem[] = [
  // ...existing items
  {
    id: "new-item",
    label: "New Feature",
    href: "/dashboard/new-feature",
    icon: <YourIcon />,
    badge: "New",
  },
];
```

#### Creating New Dashboard Cards

```typescript
// Create new component
export function NewDashboardCard() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 rounded-xl border ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Your content */}
    </div>
  );
}
```

#### Theme Integration

All components automatically adapt to the current theme:

```typescript
const { theme } = useTheme();

const styles =
  theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900";
```

## Mobile Responsiveness

### Breakpoints

- **Mobile**: < 768px (sm)
- **Tablet**: 768px - 1024px (md)
- **Desktop**: > 1024px (lg)

### Mobile Adaptations

- **Hidden Sidebar**: Sidebar hidden on mobile
- **Bottom Navigation**: 4-item bottom navigation
- **Responsive Grid**: Stats grid adapts to smaller screens
- **Collapsible Elements**: Content stacks vertically

## Development

### Adding New Pages

1. Create new page in `src/app/dashboard/[page]/page.tsx`
2. Add route to sidebar navigation
3. Update middleware if needed
4. Follow established patterns

### Testing

- **Login Flow**: Test authentication and redirection
- **Responsive Design**: Check mobile and desktop layouts
- **Theme Switching**: Verify dark/light mode compatibility
- **Navigation**: Test all menu items and links

## Demo Data

The dashboard includes realistic demo data:

- **Statistics**: Revenue, orders, products, customers
- **Orders**: Recent order history with various statuses
- **Products**: Popular products with sales trends
- **Notifications**: Sample notifications for different types

## Next Steps

1. **Real Data Integration**: Replace demo data with API calls
2. **Advanced Analytics**: Add charts and graphs
3. **Real-time Updates**: Implement WebSocket for live data
4. **Bulk Actions**: Add batch operations for orders/products
5. **Export Functions**: Add data export capabilities
6. **Advanced Search**: Implement global search functionality

Visit `/dashboard` after logging in to see the full dashboard interface in action!
