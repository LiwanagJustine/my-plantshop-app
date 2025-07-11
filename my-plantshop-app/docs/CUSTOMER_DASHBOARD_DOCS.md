# Customer Shopping Dashboard Documentation

## Overview

A modern, shopping-focused dashboard interface for the PlantShop e-commerce application designed specifically for customers to browse, discover, and purchase plants with an intuitive filtering and shopping experience.

## Features

### 🛒 **Shopping-Centric Design**

- **E-commerce Focus**: Optimized for plant browsing and purchasing
- **Advanced Filtering**: Left sidebar with comprehensive plant filters
- **Product Discovery**: Main content area showcasing plant catalog with images
- **Seamless Shopping**: Easy-to-use cart and wishlist functionality

### 📱 **Shopping Layout Structure**

#### Desktop Layout (`CustomerShopLayout.tsx`)

- **Left Sidebar (Filters)**: Comprehensive filtering options for plant discovery
  - Category filters (Tropical, Succulent, Tree, etc.)
  - Care level filters (Easy, Medium, Hard)
  - Price range slider
  - Light requirement filters
  - Size filters
  - Quick filters (In Stock, On Sale)
- **Top Navigation Bar**: Search, cart, notifications, user menu
- **Main Content Area**: Product grid with plant cards and buying options

#### Mobile Layout

- **Collapsible Sidebar**: Mobile-friendly filter panel
- **Responsive Grid**: Adaptive product grid for different screen sizes
- **Touch-Optimized**: Mobile-friendly cart and wishlist interactions

### 🧭 **Customer Navigation**

#### Shop Sidebar (`CustomerShopSidebar.tsx`)

- **Quick Filters**:
  - In Stock Only: Show available plants
  - On Sale: Show discounted plants
- **Price Range**: Adjustable price slider ($0-$200)
- **Categories**: Tropical, Succulent, Tree, Flowering, Herbs, Ferns
- **Care Level**: Easy, Medium, Hard difficulty levels
- **Light Requirements**: Low, Medium, High light needs
- **Size**: Small, Medium, Large plant sizes
- **Clear All**: Reset all filters quickly

#### Shop Topbar (`CustomerShopTopbar.tsx`)

- **Plant Search**: Search across entire plant catalog
- **Shopping Cart**: View cart items and quantity
- **Notifications**: Order updates and care tips
- **User Menu**: Profile, orders, wishlist, logout

### 📊 **Shopping Components**

#### Product Grid (`ProductGrid.tsx`)

- **Plant Catalog**: Grid layout displaying available plants
- **Sorting Options**: Sort by popularity, name, price, rating
- **Filter Integration**: Real-time filtering based on sidebar selections
- **Product Count**: Shows number of plants matching current filters
- **Responsive Grid**: Adapts to different screen sizes

#### Product Card (`ProductCard.tsx`)

- **Plant Images**: High-quality plant photos with hover effects
- **Pricing**: Current price with original price if on sale
- **Plant Information**: Name, scientific name, care level, size
- **Rating System**: Star ratings with review count
- **Stock Status**: Availability indicators and quantity remaining
- **Features**: Key plant benefits (Air-purifying, Pet-friendly, etc.)
- **Quick Actions**: Add to cart, add to wishlist buttons
- **Sale Badges**: Visual indicators for sales and popular items

#### Customer Shop Layout (`CustomerShopLayout.tsx`)

- **Sidebar Integration**: Manages filter state and sidebar visibility
- **Responsive Design**: Collapsible sidebar for mobile
- **Filter Passing**: Passes filter state to product grid
- **Layout Management**: Handles sidebar toggle and content spacing

### 🛒 **Shopping Pages**

#### Main Dashboard (`/customer/dashboard`)

- **Browse Plants**: Main shopping interface with filters and product grid
- **Filter Sidebar**: Comprehensive filtering options
- **Product Discovery**: Featured plants, sales, and recommendations

#### My Orders (`/customer/orders`)

- **Order History**: Complete order tracking and management
- **Order Details**: Item breakdown, pricing, shipping info
- **Tracking Information**: Real-time delivery status
- **Order Actions**: Track package, buy again, cancel options
- **Status System**: Visual order status progression

#### Wishlist (`/customer/wishlist`)

- **Saved Plants**: Collection of favorited plants
- **Wishlist Management**: Add/remove items, move to cart
- **Recommendations**: Related plants based on wishlist items
- **Bulk Actions**: Add all to cart, clear wishlist

#### Plant Care Guide (`/customer/care`)

- **Care Categories**: Watering, lighting, fertilizing, repotting guides
- **Troubleshooting**: Common plant problems and solutions
- **Seasonal Care**: Seasonal plant care adjustments
- **Quick Tips**: Essential plant care reminders

### 🎨 **Shopping-Focused Design Elements**

#### E-commerce Color Scheme

- **Primary Green**: Plant-themed branding (#10B981)
- **Sale Indicators**: Red badges for discounts
- **Stock Alerts**: Orange for low stock warnings
- **Success Actions**: Green for cart additions

#### Shopping UI Elements

- **Price Display**: Clear pricing with sale indicators
- **Stock Badges**: Visual stock status (In Stock, Out of Stock, Low Stock)
- **Care Level Badges**: Easy/Medium/Hard difficulty indicators
- **Rating Stars**: Visual rating system with review counts
- **Feature Tags**: Plant benefits and characteristics

#### Interactive Shopping Elements

- **Hover Effects**: Product card animations and quick action reveals
- **Filter Updates**: Real-time product grid updates
- **Cart Feedback**: Visual confirmation of cart additions
- **Wishlist Hearts**: Interactive wishlist toggle buttons

### 🛡️ **Customer Shopping Experience**

#### Personalization

- **Role-Based Routing**: Customers go to `/customer/dashboard`
- **Shopping Preferences**: Filter preferences and recommendations
- **Order History**: Past purchase tracking and reorder options

#### Accessibility

- **Clear Product Information**: Detailed plant descriptions and care levels
- **Visual Feedback**: Stock status, pricing, and availability
- **Mobile Shopping**: Optimized for mobile commerce experience

## File Structure

```
src/
├── app/customer/
│   ├── dashboard/
│   │   └── page.tsx                     # Main shopping dashboard
│   ├── orders/
│   │   └── page.tsx                     # Order tracking page
│   ├── wishlist/
│   │   └── page.tsx                     # Wishlist management
│   └── care/
│       └── page.tsx                     # Plant care guides
├── components/customer/
│   ├── CustomerShopLayout.tsx           # Shopping layout wrapper
│   ├── CustomerShopTopbar.tsx           # Shopping top navigation
│   ├── CustomerShopSidebar.tsx          # Filter sidebar
│   ├── ProductGrid.tsx                  # Product catalog grid
│   ├── ProductCard.tsx                  # Individual plant cards
│   └── index.ts                         # Component exports
├── data/
│   └── plants.ts                        # Mock plant data
├── types/
│   ├── plant.ts                         # Plant and filter types
│   ├── auth.ts                          # User and auth types
│   └── index.ts                         # Type exports
└── middleware.ts                        # Route protection
```

## Usage

### Customer Shopping Flow

1. **Login**: Customers automatically redirected to `/customer/dashboard`
2. **Browse Plants**: Use filters to discover plants
3. **Product Details**: View plant information, pricing, and care requirements
4. **Add to Cart/Wishlist**: Save plants for purchase or later
5. **Order Tracking**: Monitor purchases through `/customer/orders`
6. **Plant Care**: Access care guides through `/customer/care`

### Customization

#### Adding New Customer Features

```typescript
// Create customer-specific component
export function NewCustomerFeature() {
  const { theme } = useTheme();

  return (
    <div
      className={`p-6 rounded-xl border ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {/* Customer-focused content */}
    </div>
  );
}
```

#### Plant Care Integration

```typescript
// Add care reminder
const newReminder = {
  plantName: "New Plant",
  task: "Water",
  dueDate: "Today",
  priority: "high",
};
```

## Customer Journey

### New Customer Experience

1. **Registration**: Create account with plant preferences
2. **Onboarding**: Set up first plants and care schedule
3. **Dashboard Access**: Personalized dashboard experience
4. **Plant Care**: Receive care reminders and tips
5. **Shopping**: Discover new plants based on experience

### Returning Customer

1. **Quick Access**: See pending care tasks immediately
2. **Order Updates**: Track recent purchases
3. **Recommendations**: New plants based on collection
4. **Care History**: View completed care tasks

## Mobile Experience

### Bottom Navigation

- **Home**: Customer dashboard overview
- **Orders**: Order tracking and history
- **Plants**: Plant collection and care
- **Profile**: Account and preferences

### Mobile Features

- **Swipe Actions**: Quick task completion
- **Touch-Friendly**: Large buttons and cards
- **Offline Care**: Local storage for care reminders

## Demo Data

### Sample Customer: Emily Johnson

- **Role**: Customer (Plant Parent 🌱)
- **Orders**: 2 pending, 1 delivered
- **Plants**: Monstera, Snake Plant, Peace Lily
- **Care Tasks**: 3 pending reminders
- **Wishlist**: 7 saved plants

### Order Examples

- **Shipped**: Monstera Deliciosa with tracking
- **Processing**: Snake Plant with estimated delivery
- **Delivered**: Peace Lily with review option

### Care Reminders

- **Today**: Water Monstera (High Priority)
- **Tomorrow**: Check Snake Plant for pests
- **This Week**: Fertilize Peace Lily

## Comparison: Admin vs Customer Dashboard

| Feature        | Admin Dashboard               | Customer Dashboard          |
| -------------- | ----------------------------- | --------------------------- |
| **Focus**      | Business metrics              | Plant care journey          |
| **Navigation** | Products, Orders, Analytics   | My Plants, Care, Orders     |
| **Data**       | Sales, Inventory, Customers   | Personal orders, care tasks |
| **Actions**    | Manage products, View reports | Track care, Browse plants   |
| **Design**     | Professional, data-heavy      | Personal, plant-themed      |

## Next Steps

1. **Plant Collection**: Full plant management system
2. **Care Journaling**: Detailed plant growth tracking
3. **Community Features**: Plant parent social features
4. **Expert Advice**: Chat with plant care experts
5. **AR Features**: Plant identification and care tips
6. **Subscription Care**: Monthly plant care packages

Visit `/customer/dashboard` after logging in as a customer to experience the plant-focused interface!
