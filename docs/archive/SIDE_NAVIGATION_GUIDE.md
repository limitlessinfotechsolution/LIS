# Dual-Tier Side Navigation Guide

## 🎨 Overview

A modern, professional dual-tier side navigation system inspired by contemporary design trends. Features auto-expand on hover, smooth animations, and organized sections.

---

## ✨ Features

### Core Features
- ✅ **Auto Expand/Collapse** - Expands on hover, collapses when mouse leaves
- ✅ **Dual-Tier Design** - Icons always visible, labels show on expand
- ✅ **Organized Sections** - Navigation grouped by category
- ✅ **Active Indicator** - Animated indicator shows current page
- ✅ **Smooth Animations** - Fluid transitions using Framer Motion
- ✅ **Material Icons** - Modern Google Material Symbols
- ✅ **Responsive** - Works on all screen sizes
- ✅ **Accessible** - WCAG compliant with keyboard navigation

### Visual Features
- 🎨 Gradient logo and active states
- 🎯 Hover effects and micro-interactions
- 🌙 Dark mode support
- 📱 Mobile-friendly with backdrop
- 🎭 Section titles and badges
- 👤 User profile section

---

## 📁 File Structure

```
components/
├── SideNav.tsx          # Main sidebar component
├── SideNavLayout.tsx    # Layout wrapper
└── MaterialIcon.tsx     # Icon component

app/
├── layout.tsx           # Root layout (choose nav style)
└── demo-sidenav/
    └── page.tsx         # Demo page
```

---

## 🚀 Implementation

### Option 1: Enable Side Navigation

In `app/layout.tsx`, comment out top navigation and uncomment side navigation:

```tsx
// Comment this (Top Navigation)
/*
<LocationBanner />
<Header />
<main id="main-content" className="w-full overflow-x-hidden">
  {children}
</main>
<Footer />
*/

// Uncomment this (Side Navigation)
<SideNavLayout>
  <main id="main-content" className="w-full overflow-x-hidden">
    {children}
  </main>
</SideNavLayout>
```

### Option 2: Use Both (Conditional)

```tsx
'use client'
import { useState } from 'react'

export default function RootLayout({ children }) {
  const [useSideNav, setUseSideNav] = useState(false)
  
  return (
    <html>
      <body>
        {useSideNav ? (
          <SideNavLayout>{children}</SideNavLayout>
        ) : (
          <>
            <Header />
            <main>{children}</main>
            <Footer />
          </>
        )}
      </body>
    </html>
  )
}
```

---

## 🎯 Navigation Structure

### Default Sections

```typescript
const navSections = [
  {
    title: 'Main',
    items: [
      { name: 'Home', href: '/', icon: 'home' },
      { name: 'About', href: '/about', icon: 'info' },
      { name: 'Services', href: '/services', icon: 'handyman' },
      { name: 'Portfolio', href: '/portfolio', icon: 'work' },
    ]
  },
  {
    title: 'Resources',
    items: [
      { name: 'Blog', href: '/blog', icon: 'article' },
      { name: 'Team', href: '/team', icon: 'groups' },
      { name: 'FAQ', href: '/faq', icon: 'help' },
    ]
  },
  {
    title: 'Connect',
    items: [
      { name: 'Contact', href: '/contact', icon: 'mail' },
      { name: 'Portal', href: '/portal', icon: 'lock' },
    ]
  }
]
```

### Customizing Navigation

Edit `components/SideNav.tsx`:

```typescript
// Add new section
{
  title: 'Admin',
  items: [
    { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { name: 'Settings', href: '/admin/settings', icon: 'settings' },
  ]
}

// Add badge to item
{ 
  name: 'Messages', 
  href: '/messages', 
  icon: 'mail',
  badge: 5  // Shows notification badge
}
```

---

## 🎨 Customization

### Change Width

```typescript
// In SideNav.tsx
animate={{
  width: isExpanded ? '280px' : '80px'  // Adjust these values
}}
```

### Change Colors

```typescript
// Logo gradient
className="bg-gradient-to-br from-[#YOUR_PRIMARY] to-[#YOUR_SECONDARY]"

// Active state
className="bg-gradient-to-r from-[#YOUR_PRIMARY] to-[#YOUR_SECONDARY]"
```

### Change Animation Speed

```typescript
transition={{ duration: 0.3, ease: 'easeInOut' }}  // Adjust duration
```

### Add Tooltips (Collapsed State)

```tsx
import Tooltip from './Tooltip'

<Tooltip content={item.name} position="right">
  <MaterialIcon icon={item.icon} size={24} />
</Tooltip>
```

---

## 📱 Responsive Behavior

### Desktop (> 1024px)
- Sidebar always visible
- Auto-expand on hover
- 80px collapsed, 280px expanded

### Tablet (768px - 1024px)
- Sidebar always visible
- Manual toggle or hover
- Overlay on expand

### Mobile (< 768px)
- Hidden by default
- Toggle button in top-left
- Full-screen overlay when open
- Backdrop blur effect

---

## 🎭 States & Animations

### Collapsed State (80px)
- Shows icons only
- Logo icon visible
- Compact layout

### Expanded State (280px)
- Shows icons + labels
- Section titles visible
- User profile details
- Badges visible

### Hover Effects
- Items lift on hover (`x: 4`)
- Scale on tap (`scale: 0.98`)
- Smooth color transitions

### Active State
- Gradient background
- White indicator bar
- Filled icon variant
- Smooth layout animation

---

## ♿ Accessibility

### Keyboard Navigation
```tsx
// Tab through items
<Link href={item.href}>  // Focusable
  <motion.div>...</motion.div>
</Link>

// Escape to close (mobile)
useEffect(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape') setIsExpanded(false)
  }
  window.addEventListener('keydown', handleEscape)
  return () => window.removeEventListener('keydown', handleEscape)
}, [])
```

### Screen Readers
- Semantic HTML structure
- Proper ARIA labels
- Focus indicators
- Skip navigation link

### Color Contrast
- WCAG AA compliant
- Dark mode support
- High contrast focus states

---

## 🎯 Advanced Features

### Add Search

```tsx
// In SideNav.tsx, after logo section
{isExpanded && (
  <div className="px-3 py-4">
    <div className="relative">
      <MaterialIcon 
        icon="search" 
        className="absolute left-3 top-1/2 -translate-y-1/2"
        size={20}
      />
      <input
        type="text"
        placeholder="Search..."
        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800"
      />
    </div>
  </div>
)}
```

### Add Notifications

```tsx
// Add to bottom section
<motion.button className="relative">
  <MaterialIcon icon="notifications" size={24} />
  {notificationCount > 0 && (
    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
      {notificationCount}
    </span>
  )}
</motion.button>
```

### Add Submenu

```tsx
const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

// In nav item
{item.submenu && (
  <motion.button
    onClick={() => setOpenSubmenu(openSubmenu === item.name ? null : item.name)}
  >
    <MaterialIcon 
      icon={openSubmenu === item.name ? 'expand_less' : 'expand_more'} 
    />
  </motion.button>
)}

{openSubmenu === item.name && (
  <motion.div className="ml-8 mt-2 space-y-1">
    {item.submenu.map(subItem => (
      <Link href={subItem.href}>...</Link>
    ))}
  </motion.div>
)}
```

---

## 🎨 Styling Options

### Glassmorphism Effect

```tsx
className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl"
```

### Rounded Corners

```tsx
className="rounded-r-3xl"  // Right side rounded
```

### Shadow Effects

```tsx
className="shadow-2xl shadow-gray-900/10"
```

### Border Styles

```tsx
className="border-r-2 border-gradient-to-b from-[#2A52BE] to-[#F97316]"
```

---

## 📊 Performance

### Optimization Tips

1. **Lazy Load Icons**
```tsx
const MaterialIcon = dynamic(() => import('./MaterialIcon'))
```

2. **Memoize Navigation**
```tsx
const navSections = useMemo(() => [...], [])
```

3. **Debounce Hover**
```tsx
const debouncedExpand = debounce(() => setIsExpanded(true), 100)
```

4. **Virtual Scrolling** (for many items)
```tsx
import { FixedSizeList } from 'react-window'
```

---

## 🔧 Troubleshooting

### Sidebar Not Expanding
- Check `isExpanded` state
- Verify `onMouseEnter` event
- Check z-index conflicts

### Icons Not Showing
- Verify Material Symbols loaded
- Check icon names are correct
- Ensure MaterialIcon component imported

### Layout Shifts
- Add `ml-20` to main content
- Use `transition-all` for smooth shifts
- Set fixed width on sidebar

### Mobile Issues
- Check backdrop z-index
- Verify touch events work
- Test on actual devices

---

## 🎯 Use Cases

### When to Use Side Navigation

✅ **Good For:**
- Dashboard applications
- Admin panels
- Content management systems
- Apps with many sections
- Professional/enterprise sites

❌ **Not Ideal For:**
- Marketing landing pages
- Simple websites (< 5 pages)
- Content-heavy blogs
- E-commerce product pages

---

## 📱 Demo

### View Demo Page
```
http://localhost:3000/demo-sidenav
```

### Features Demonstrated
- Auto expand/collapse
- Section organization
- Active state indicators
- Smooth animations
- Responsive behavior
- User profile section

---

## 🎨 Design Inspiration

Based on modern design trends:
- **Behance**: Dual-tier navigation patterns
- **Material Design**: Google's design system
- **Dribbble**: Contemporary UI patterns
- **Figma Community**: Professional dashboards

---

## 📚 Related Components

- **MaterialIcon** - Icon system
- **Header** - Top navigation (alternative)
- **Footer** - Bottom content
- **Tooltip** - Hover hints
- **Modal** - Dialogs

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Collapsible submenu support
- [ ] Drag-to-reorder items
- [ ] Customizable themes
- [ ] Pin/unpin sidebar
- [ ] Recent pages section
- [ ] Favorites/bookmarks
- [ ] Search functionality
- [ ] Keyboard shortcuts overlay

---

## 📖 Examples

### Basic Usage
```tsx
import SideNavLayout from '@/components/SideNavLayout'

export default function Page() {
  return (
    <SideNavLayout>
      <div className="p-8">
        <h1>Your Content</h1>
      </div>
    </SideNavLayout>
  )
}
```

### With Custom Sections
```tsx
// Edit SideNav.tsx
const navSections = [
  {
    title: 'Your Section',
    items: [
      { name: 'Item 1', href: '/item1', icon: 'star' },
      { name: 'Item 2', href: '/item2', icon: 'favorite' },
    ]
  }
]
```

### With Badges
```tsx
{ 
  name: 'Notifications', 
  href: '/notifications', 
  icon: 'notifications',
  badge: unreadCount 
}
```

---

## ✅ Checklist

### Implementation
- [ ] Import SideNavLayout
- [ ] Update app/layout.tsx
- [ ] Customize navigation items
- [ ] Test on all devices
- [ ] Check accessibility
- [ ] Verify animations
- [ ] Test dark mode

### Customization
- [ ] Update brand colors
- [ ] Adjust widths
- [ ] Customize icons
- [ ] Add/remove sections
- [ ] Configure badges
- [ ] Style active states

---

## 🎉 Summary

### What You Get
✅ **Modern Design** - Contemporary dual-tier navigation  
✅ **Auto Expand** - Smooth hover interactions  
✅ **Organized** - Grouped by sections  
✅ **Responsive** - Works on all devices  
✅ **Accessible** - WCAG compliant  
✅ **Customizable** - Easy to modify  
✅ **Performant** - Optimized animations  

### Benefits
- 🎨 Professional appearance
- ⚡ Smooth user experience
- 📱 Mobile-friendly
- ♿ Accessible to all
- 🔧 Easy to maintain
- 🎯 Space-efficient

---

**Last Updated**: November 27, 2025  
**Version**: 2.4.0  
**Status**: ✅ Production Ready
