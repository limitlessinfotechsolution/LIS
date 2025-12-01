# Material Symbols Icons Guide

## 🎨 Overview

The project now uses **Google Material Symbols** instead of React Icons for a more modern, consistent, and customizable icon system.

---

## ✨ Benefits

### Why Material Symbols?

1. **Modern Design** - Latest Google Material Design 3 icons
2. **Customizable** - Adjust weight, fill, and size dynamically
3. **Performance** - Font-based, loads faster than SVG libraries
4. **Consistency** - Unified design language across all icons
5. **Variety** - 2,500+ icons available
6. **Accessibility** - Better screen reader support
7. **No Bundle Size** - Loaded from Google Fonts CDN

---

## 🚀 Implementation

### 1. Google Fonts Integration

Added to `app/layout.tsx`:
```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
/>
```

### 2. CSS Configuration

Added to `app/globals.css`:
```css
.material-symbols-rounded {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24;
  user-select: none;
}

.material-symbols-rounded.filled {
  font-variation-settings: 'FILL' 1;
}

.material-symbols-rounded.light {
  font-variation-settings: 'wght' 300;
}

.material-symbols-rounded.bold {
  font-variation-settings: 'wght' 600;
}
```

### 3. MaterialIcon Component

Created `components/MaterialIcon.tsx`:
```typescript
interface MaterialIconProps {
  icon: string
  className?: string
  filled?: boolean
  weight?: 'light' | 'normal' | 'bold'
  size?: number
}

export default function MaterialIcon({ 
  icon, 
  className = '', 
  filled = false,
  weight = 'normal',
  size 
}: MaterialIconProps) {
  // Component implementation
}
```

---

## 📖 Usage Examples

### Basic Usage
```tsx
import MaterialIcon from '@/components/MaterialIcon'

<MaterialIcon icon="home" />
```

### With Size
```tsx
<MaterialIcon icon="settings" size={24} />
<MaterialIcon icon="mail" size={32} />
```

### With Fill
```tsx
<MaterialIcon icon="favorite" filled />
<MaterialIcon icon="star" filled />
```

### With Weight
```tsx
<MaterialIcon icon="search" weight="light" />
<MaterialIcon icon="menu" weight="bold" />
```

### With Custom Classes
```tsx
<MaterialIcon 
  icon="check_circle" 
  className="text-green-500"
  size={28}
/>
```

### Combined Props
```tsx
<MaterialIcon 
  icon="notifications" 
  filled
  weight="bold"
  size={24}
  className="text-blue-600"
/>
```

---

## 🎯 Icon Mapping

### Navigation Icons (Updated)
```typescript
const navLinks = [
  { name: 'Home', icon: 'home' },
  { name: 'About', icon: 'groups' },
  { name: 'Services', icon: 'settings' },
  { name: 'Portfolio', icon: 'work' },
  { name: 'Team', icon: 'badge' },
  { name: 'Blog', icon: 'article' },
  { name: 'Portal', icon: 'lock' },
  { name: 'Contact', icon: 'mail' }
]
```

### Common Icons Reference

#### Actions
- `add` - Add/Plus
- `remove` - Remove/Minus
- `edit` - Edit/Pencil
- `delete` - Delete/Trash
- `save` - Save/Disk
- `close` - Close/X
- `check` - Checkmark
- `cancel` - Cancel
- `refresh` - Refresh/Reload
- `search` - Search/Magnifying glass

#### Navigation
- `home` - Home
- `menu` - Hamburger menu
- `arrow_back` - Back arrow
- `arrow_forward` - Forward arrow
- `arrow_upward` - Up arrow
- `arrow_downward` - Down arrow
- `expand_more` - Chevron down
- `expand_less` - Chevron up
- `navigate_next` - Next
- `navigate_before` - Previous

#### Communication
- `mail` - Email
- `phone` - Phone
- `chat` - Chat/Message
- `notifications` - Bell
- `send` - Send/Paper plane
- `forum` - Forum/Discussion
- `comment` - Comment
- `feedback` - Feedback

#### Content
- `article` - Article/Document
- `description` - Description/File
- `folder` - Folder
- `image` - Image/Photo
- `video_library` - Video
- `audio_file` - Audio
- `attach_file` - Attachment
- `link` - Link/Chain

#### Social
- `share` - Share
- `favorite` - Heart/Like
- `star` - Star/Rating
- `thumb_up` - Thumbs up
- `thumb_down` - Thumbs down
- `bookmark` - Bookmark
- `flag` - Flag

#### User
- `person` - Person/User
- `groups` - Group/Team
- `account_circle` - Account
- `badge` - Badge/ID
- `admin_panel_settings` - Admin
- `supervisor_account` - Supervisor
- `face` - Face/Avatar

#### Business
- `work` - Work/Briefcase
- `business` - Business/Building
- `store` - Store/Shop
- `shopping_cart` - Cart
- `payment` - Payment/Card
- `receipt` - Receipt
- `trending_up` - Trending up
- `analytics` - Analytics/Chart

#### Settings
- `settings` - Settings/Gear
- `tune` - Tune/Adjust
- `build` - Build/Tools
- `code` - Code
- `bug_report` - Bug
- `security` - Security/Shield
- `lock` - Lock
- `vpn_key` - Key

#### Status
- `check_circle` - Success
- `error` - Error
- `warning` - Warning
- `info` - Info
- `help` - Help/Question
- `schedule` - Schedule/Clock
- `hourglass_empty` - Loading
- `done_all` - All done

#### Media
- `play_arrow` - Play
- `pause` - Pause
- `stop` - Stop
- `skip_next` - Next
- `skip_previous` - Previous
- `volume_up` - Volume up
- `volume_off` - Mute
- `fullscreen` - Fullscreen

#### Misc
- `dashboard` - Dashboard
- `calendar_today` - Calendar
- `location_on` - Location/Pin
- `language` - Language/Globe
- `dark_mode` - Dark mode
- `light_mode` - Light mode
- `visibility` - Visible/Eye
- `visibility_off` - Hidden
- `download` - Download
- `upload` - Upload
- `print` - Print
- `qr_code` - QR Code
- `rocket_launch` - Rocket
- `all_inclusive` - Infinity

---

## 🎨 Customization

### Font Variation Settings

Material Symbols support four axes:

1. **FILL** (0-1)
   - 0 = Outlined
   - 1 = Filled

2. **wght** (100-700)
   - 100-300 = Light
   - 400 = Regular
   - 500-700 = Bold

3. **GRAD** (-50 to 200)
   - Adjusts visual weight
   - -50 = Lighter appearance
   - 0 = Default
   - 200 = Heavier appearance

4. **opsz** (20-48)
   - Optical size
   - 20 = Small
   - 24 = Default
   - 48 = Large

### Custom Variations

Create custom classes in `globals.css`:

```css
.material-symbols-rounded.extra-bold {
  font-variation-settings:
    'FILL' 0,
    'wght' 700,
    'GRAD' 0,
    'opsz' 24;
}

.material-symbols-rounded.large {
  font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48;
}
```

---

## 🔄 Migration from React Icons

### Before (React Icons)
```tsx
import { FaHome, FaUser, FaCog } from 'react-icons/fa'

<FaHome className="text-xl" />
<FaUser size={24} />
<FaCog />
```

### After (Material Symbols)
```tsx
import MaterialIcon from '@/components/MaterialIcon'

<MaterialIcon icon="home" size={20} />
<MaterialIcon icon="person" size={24} />
<MaterialIcon icon="settings" />
```

### Icon Name Mapping

| React Icons | Material Symbols |
|-------------|------------------|
| FaHome | home |
| FaUser | person |
| FaCog | settings |
| FaEnvelope | mail |
| FaPhone | phone |
| FaBars | menu |
| FaTimes | close |
| FaSearch | search |
| FaHeart | favorite |
| FaStar | star |
| FaCheck | check |
| FaTrash | delete |
| FaEdit | edit |
| FaPlus | add |
| FaMinus | remove |
| FaArrowRight | arrow_forward |
| FaArrowLeft | arrow_back |
| FaChevronDown | expand_more |
| FaChevronUp | expand_less |
| FaInfinity | all_inclusive |

---

## 📱 Responsive Sizing

### Recommended Sizes

```tsx
// Mobile
<MaterialIcon icon="menu" size={20} />

// Tablet
<MaterialIcon icon="menu" size={24} />

// Desktop
<MaterialIcon icon="menu" size={28} />

// Large displays
<MaterialIcon icon="menu" size={32} />
```

### Responsive with Tailwind

```tsx
<MaterialIcon 
  icon="home" 
  className="text-xl md:text-2xl lg:text-3xl"
/>
```

---

## ♿ Accessibility

### Best Practices

1. **Use with Text**
```tsx
<button>
  <MaterialIcon icon="save" size={20} />
  <span>Save</span>
</button>
```

2. **Aria Labels**
```tsx
<button aria-label="Close menu">
  <MaterialIcon icon="close" size={24} />
</button>
```

3. **Decorative Icons**
```tsx
<MaterialIcon 
  icon="star" 
  aria-hidden="true"
/>
```

---

## 🎯 Performance

### Benefits

1. **No JavaScript Bundle** - Icons loaded from CDN
2. **Cached** - Google Fonts CDN caching
3. **Fast Loading** - Font file ~50KB (all icons)
4. **No Tree Shaking Needed** - Only load what you use

### Optimization

```html
<!-- Preconnect to Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
```

---

## 🔍 Finding Icons

### Resources

1. **Official Gallery**
   - https://fonts.google.com/icons

2. **Search**
   - Browse 2,500+ icons
   - Filter by category
   - Preview variations

3. **Categories**
   - Action
   - Alert
   - AV
   - Communication
   - Content
   - Device
   - Editor
   - File
   - Hardware
   - Image
   - Maps
   - Navigation
   - Notification
   - Places
   - Social
   - Toggle

---

## 🎨 Theming

### Dark Mode Support

```tsx
<MaterialIcon 
  icon="dark_mode" 
  className="text-gray-800 dark:text-white"
/>
```

### Brand Colors

```tsx
<MaterialIcon 
  icon="check_circle" 
  className="text-[#2A52BE]"
/>

<MaterialIcon 
  icon="error" 
  className="text-[#F97316]"
/>
```

---

## 📊 Comparison

### Material Symbols vs React Icons

| Feature | Material Symbols | React Icons |
|---------|-----------------|-------------|
| Icons | 2,500+ | 20,000+ |
| Bundle Size | ~50KB (font) | Varies (SVG) |
| Customization | High | Medium |
| Performance | Excellent | Good |
| Design System | Material Design | Mixed |
| Loading | CDN | Bundle |
| Tree Shaking | N/A | Required |
| Consistency | High | Varies |

---

## 🚀 Advanced Usage

### Dynamic Icons

```tsx
const iconMap = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

<MaterialIcon icon={iconMap[status]} />
```

### Icon Button Component

```tsx
interface IconButtonProps {
  icon: string
  onClick: () => void
  label: string
}

function IconButton({ icon, onClick, label }: IconButtonProps) {
  return (
    <button 
      onClick={onClick}
      aria-label={label}
      className="p-2 hover:bg-gray-100 rounded-lg"
    >
      <MaterialIcon icon={icon} size={24} />
    </button>
  )
}
```

---

## 🎉 Summary

### What Changed

✅ **Replaced React Icons** with Material Symbols  
✅ **Created MaterialIcon component** for easy usage  
✅ **Updated Header navigation** with new icons  
✅ **Added CSS configuration** for customization  
✅ **Improved performance** with CDN loading  
✅ **Better accessibility** with semantic icons  
✅ **Modern design** with Material Design 3  

### Benefits

- 🎨 More modern and consistent design
- ⚡ Better performance (CDN vs bundle)
- 🎯 Highly customizable (weight, fill, size)
- ♿ Better accessibility
- 📦 Smaller bundle size
- 🔄 Easy to use and maintain

---

**Last Updated**: November 27, 2025  
**Version**: 2.3.0  
**Status**: ✅ Production Ready
