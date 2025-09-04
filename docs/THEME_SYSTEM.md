# Theme System Documentation

## Overview

This application implements a p```tsx
import ThemeToggle from '../components/ui/ThemeToggle';

function HeaderSection() {
return (
<header>
{/_ Other header content _/}
<ThemeToggle />
</header>
);
}

```dark/light mode theme system with the following features:

- **Theme Persistence**: User's theme preference is saved in localStorage
- **System Preference Detection**: Automatically detects and respects user's system theme preference
- **Smooth Transitions**: All theme changes include smooth CSS transitions
- **SSR Safe**: Prevents hydration mismatches in Next.js
- **Professional Structure**: Organized in proper folders with utilities, hooks, and context

## File Structure

```

src/
├── context/
│ └── ThemeContext.tsx # React context for theme management
├── hooks/
│ └── useTheme.ts # Custom hook for theme state management
├── lib/
│ ├── constants/
│ │ └── theme.ts # Theme-related constants
│ └── utils/
│ └── theme.ts # Theme utility functions
└── components/
├── ui/
│ └── ThemeToggle.tsx # Theme toggle button component
└── sections/
└── HeaderSection.tsx # Header component with dark mode support

````

## Usage

### 1. Theme Provider Setup

The `ThemeProvider` is already configured in `app/layout.tsx`:

```tsx
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
````

### 2. Using Theme in Components

Use the `useTheme` hook to access theme state and controls:

```tsx
import { useTheme } from "../context/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme, setTheme } = useTheme();

  return (
    <div
      className={`bg-white dark:bg-slate-900 ${
        theme === "dark" ? "text-white" : "text-black"
      }`}
    >
      <button onClick={toggleTheme}>Toggle Theme (Current: {theme})</button>
    </div>
  );
}
```

### 3. Theme Toggle Component

Use the pre-built `ThemeToggle` component:

```tsx
import ThemeToggle from "../components/ui/ThemeToggle";

function Header() {
  return (
    <header>
      {/* Other header content */}
      <ThemeToggle />
    </header>
  );
}
```

## Tailwind CSS Classes

### Standard Approach

Use Tailwind's `dark:` prefix for dark mode styles:

```jsx
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  Content
</div>
```

### Custom CSS Classes

For complex gradients or custom styles, use CSS classes with dark mode variants:

```css
.hero-section {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
}

.dark .hero-section {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}
```

## Best Practices

1. **Always include transitions**: Add `transition-colors duration-300` for smooth theme changes
2. **Test both themes**: Ensure your components look good in both light and dark modes
3. **Use semantic colors**: Prefer `slate-900` over `black` for better contrast ratios
4. **Accessibility**: Maintain proper contrast ratios in both themes
5. **Consistent patterns**: Use the same dark mode color variants throughout the app

## Theme Color Palette

### Light Mode

- Background: `white`, `gray-50`, `slate-100`
- Text: `slate-800`, `slate-700`, `slate-600`
- Accents: `emerald-600`, `emerald-700`

### Dark Mode

- Background: `slate-900`, `slate-800`, `slate-700`
- Text: `white`, `slate-200`, `slate-300`
- Accents: `emerald-400`, `emerald-500`

## System Integration

The theme system automatically:

- Detects system preference on first visit
- Saves user preference to localStorage
- Applies the correct theme on page reload
- Handles server-side rendering without hydration issues
