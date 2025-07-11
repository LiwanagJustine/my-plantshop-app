# 📋 PlantShop Login System - Complete Guide

## 📦 What We Installed (Packages)

### 1. **Form Handling & Validation**

```bash
npm install zod react-hook-form @hookform/resolvers
```

**What each package does:**

- **`zod`** - Creates rules for checking if email/password is correct
- **`react-hook-form`** - Makes forms easy to manage (handles typing, errors)
- **`@hookform/resolvers`** - Connects Zod rules with React Hook Form

---

## 🗂️ Files We Created

### **Form Components** (Reusable UI pieces)

```
src/components/forms/
├── Input.tsx      ← Text input boxes (email, password)
├── Button.tsx     ← Clickable buttons (submit, cancel)
├── Checkbox.tsx   ← Checkboxes (remember me)
└── index.ts       ← Exports all form components
```

### **Login Pages & Components**

```
src/components/auth/
├── AuthLayout.tsx ← The page wrapper (logo, background)
├── LoginForm.tsx  ← The actual login form
└── index.ts       ← Exports auth components

src/app/auth/login/
└── page.tsx       ← The login page you visit
```

### **Validation Rules**

```
src/lib/validations/
└── auth.ts        ← Rules for email/password validation
```

---

## 🎯 How It All Works (Simple Explanation)

### **Step 1: User Types in Form**

- User visits `/auth/login`
- Sees a beautiful form with email & password fields

### **Step 2: Form Checks Everything**

- **Email**: Must be real email format (user@example.com)
- **Password**: Must be at least 6 characters
- **Remember Me**: Optional checkbox

### **Step 3: Form Submits**

- If everything is correct → Shows loading spinner
- If errors → Shows red error messages
- Currently redirects to home page (demo mode)

---

## 🛠️ What Each File Does

### **1. Validation Rules (`auth.ts`)**

```typescript
// Simple explanation: These are the rules for login
export const loginSchema = z.object({
  email: z.string().email("Must be valid email"),
  password: z.string().min(6, "At least 6 characters"),
  rememberMe: z.boolean().optional(),
});
```

### **2. Input Component (`Input.tsx`)**

```typescript
// Simple explanation: A smart text box that shows errors
<Input
  type="email"
  label="Email Address"
  error="Please enter valid email" // Shows in red
  leftIcon={<EmailIcon />} // Email icon on left
/>
```

### **3. Login Form (`LoginForm.tsx`)**

```typescript
// Simple explanation: The main form that handles everything
- Uses react-hook-form to manage typing
- Uses zod to check if email/password is correct
- Shows loading spinner when submitting
- Shows error messages if something's wrong
```

### **4. Auth Layout (`AuthLayout.tsx`)**

```typescript
// Simple explanation: The pretty wrapper around the form
- Left side: PlantShop branding and features
- Right side: The actual login form
- Works on mobile and desktop
- Has theme toggle (dark/light mode)
```

---

## 🔧 How to Use This System

### **For Users:**

1. Click "Login" button in header
2. Fill in email and password
3. Optionally check "Remember me"
4. Click "Sign In" button

### **For Developers:**

1. **To modify validation rules** → Edit `src/lib/validations/auth.ts`
2. **To change form appearance** → Edit `src/components/auth/LoginForm.tsx`
3. **To connect to real API** → Edit the `handleLogin` function in `src/app/auth/login/page.tsx`

---

## 🔗 How to Connect to Your Backend

Replace this code in `src/app/auth/login/page.tsx`:

```typescript
// CURRENT (Demo mode)
const handleLogin = async (data: LoginFormData) => {
  console.log("Demo login:", data);
  router.push("/"); // Just redirects home
};

// REPLACE WITH (Real API)
const handleLogin = async (data: LoginFormData) => {
  try {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }),
    });

    if (response.ok) {
      const result = await response.json();
      // Store user token/session
      localStorage.setItem("token", result.token);
      router.push("/profile"); // Go to user profile
    } else {
      // Show error message
      setError("Invalid email or password");
    }
  } catch (error) {
    setError("Something went wrong. Please try again.");
  }
};
```

---

## 🎨 Styling & Themes

### **Dark/Light Mode Support**

All components automatically change colors based on theme:

```typescript
const { theme } = useTheme();
// theme is either 'light' or 'dark'
// Components automatically apply correct colors
```

### **Mobile Responsive**

- Desktop: Side-by-side layout (branding + form)
- Mobile: Stacked layout (form on top)
- All buttons and inputs work perfectly on touch

---

## 🐛 Common Issues & Solutions

### **Issue 1: TypeScript Errors**

```
Cannot find module 'zod' or 'react-hook-form'
```

**Solution:**

```bash
# Delete node_modules and reinstall
rm -rf node_modules
npm install
```

### **Issue 2: Form Not Submitting**

**Check:**

1. Form validation rules in `auth.ts`
2. `handleLogin` function in login page
3. Network requests in browser dev tools

### **Issue 3: Styling Looks Wrong**

**Check:**

1. Tailwind CSS is working
2. Theme context is properly set up
3. Component imports are correct

---

## 📱 Testing the Login

### **Manual Testing Checklist:**

- [ ] Visit `/auth/login` page
- [ ] Try invalid email → Should show error
- [ ] Try short password → Should show error
- [ ] Try valid email + password → Should work
- [ ] Check "Remember me" → Should save state
- [ ] Test on mobile device
- [ ] Test dark/light theme switching
- [ ] Test "Back to PlantShop" link

---

## 🚀 Next Steps

1. **Create Registration Page** - Similar to login but with more fields
2. **Add Forgot Password** - Password reset functionality
3. **Add API Integration** - Connect to your backend
4. **Add User Dashboard** - Protected pages after login
5. **Add Session Management** - Keep users logged in

---

## 📞 Quick Reference

### **Important Commands:**

```bash
# Start development server
npm run dev

# Install packages
npm install zod react-hook-form @hookform/resolvers

# Build for production
npm run build
```

### **Important URLs:**

- Login Page: `http://localhost:3001/auth/login`
- Home Page: `http://localhost:3001`

### **Key Files to Remember:**

- Validation: `src/lib/validations/auth.ts`
- Login Form: `src/components/auth/LoginForm.tsx`
- Login Page: `src/app/auth/login/page.tsx`
