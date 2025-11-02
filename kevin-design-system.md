# Kevin's Design System

A comprehensive guide to the design patterns, colors, typography, effects, and interactions used throughout the portfolio and blog.

## Table of Contents
1. [Colors](#colors)
2. [Typography](#typography)
3. [Layout & Spacing](#layout--spacing)
4. [Glass Effects (Liquid Glass)](#glass-effects-liquid-glass)
5. [Rounded Corners](#rounded-corners)
6. [Shadows](#shadows)
7. [Hover Effects](#hover-effects)
8. [Scroll-Aware Behavior](#scroll-aware-behavior)
9. [Navigation & Scroll Management](#navigation--scroll-management)
10. [3D Transforms](#3d-transforms)
11. [Transitions & Animations](#transitions--animations)
12. [Buttons & Interactive Elements](#buttons--interactive-elements)
13. [Gradients](#gradients)
14. [Image Preloading](#image-preloading)
15. [Routing & URL Handling](#routing--url-handling)

---

## Colors

### Primary Colors
- **Primary Blue**: `rgb(48, 127, 246)` / `#307ff6`
  - Used for: Links, hover states, accents, shadows
  - RGBA variants: `rgba(48,127,246,0.2)`, `rgba(48,127,246,0.25)`, `rgba(48,127,246,0.3)`, `rgba(48,127,246,0.6)`, `rgba(48,127,246,0.8)`

### Text Colors
- **Dark Gray (Primary)**: `text-gray-800` / `rgb(31, 41, 55)`
- **Medium Gray**: `text-gray-700` / `rgb(55, 65, 81)`
- **Light Gray**: `text-gray-600` / `rgb(75, 85, 99)`
- **Lighter Gray**: `text-gray-500` / `rgb(107, 114, 128)`

### Background Gradient
The signature gradient used throughout the application:
```css
linear-gradient(
  to bottom,
  rgb(255,254,180),  /* Light yellow */
  rgb(183,229,255),  /* Light blue */
  rgb(255,210,206),  /* Light pink */
  rgb(255,254,180)   /* Light yellow */
)
```

### Glass Background Colors (Opacity-based)
- **40% opacity**: `bg-white/40` - Base glass effect for cards
- **50% opacity**: `bg-white/50` - Medium glass effect for nested cards
- **60% opacity**: `bg-white/60` - Hover state for cards
- **70% opacity**: `bg-white/70` - Higher emphasis cards (badges, buttons)
- **90% opacity**: `bg-white/90` - Nearly opaque (Hero buttons)

### Border Colors
- **Light borders**: `border-gray-300/40` or `border-gray-300/50`
- **Hover borders**: `border-gray-400/60` or `border-[rgba(48,127,246,0.6)]`

---

## Typography

### Font Family
- **Primary Font**: `Raleway` (`font-raleway`)
  - Sans-serif font used throughout
  - Applied to all text elements
- **Display Font**: `Lobster` (defined in config, available but not commonly used)

### Font Sizes
- **H1 (Page Titles)**: `text-[2.5rem]` / `text-[2.25rem]` (40px / 36px)
- **H2 (Section Titles)**: `text-2xl` (24px)
- **Body**: `text-base` (16px)
- **Small**: `text-sm` (14px)
- **Extra Small**: `text-xs` (12px)
- **Responsive**: `max-[950px]:text-xl`, `max-[950px]:text-sm`

### Font Weights
- **Bold**: `font-bold` - For titles and emphasis
- **Semibold**: `font-semibold` - For section headers
- **Medium**: `font-medium` - For buttons and metadata
- **Light**: `font-light` - For body text (default)
- **Normal**: `font-normal` - For standard text

### Text Effects
- **Gradient Text (Shimmer)**: 
  ```css
  text-transparent 
  bg-[linear-gradient(135deg,#1a1a3a_0%,#307ff6_50%,#1a1a3a_100%)]
  bg-[length:200%_auto]
  bg-clip-text
  [-webkit-background-clip:text]
  animate-shimmer
  ```

### Letter Spacing
- **Tight**: `tracking-[-0.02em]` - For large titles
- **Normal**: `tracking-[-0.01em]` - For headings
- **Slightly loose**: `tracking-[0.01em]` - For body text

### Line Height
- **Tight**: `leading-tight` - For titles
- **Relaxed**: `leading-relaxed` - For paragraphs
- **Fixed**: `leading-[1.7]` - For body text

---

## Layout & Spacing

### Grid System
- **Main Grid**: 2-column on desktop (`md:grid-cols-2`), 1-column on mobile
- **Grid Gap**: `gap-6` (24px) - Standard spacing between grid items
- **Responsive Gap**: `max-[950px]:gap-4` (16px) - On smaller screens

### Padding
- **Large Cards**: `p-6` (24px) - Main content areas
- **Medium Cards**: `p-4` (16px) - Nested content
- **Buttons (Large)**: `px-5 py-3` - Full button state
- **Buttons (Small)**: `px-3 py-2` - Minimized button state
- **Responsive**: `max-[950px]:p-4`, `max-[950px]:p-6`

### Breakpoints
- **Main Breakpoint**: `max-[950px]` - Mobile/tablet transition point
- Uses max-width media queries for mobile-first approach

---

## Glass Effects (Liquid Glass)

The signature "liquid glass" effect combines:
- **Semi-transparent backgrounds**: `bg-white/40` to `bg-white/70`
- **Backdrop blur**: `backdrop-blur-sm`
- **Subtle borders**: `border border-gray-300/40` or `border-gray-300/50`
- **Layered opacity**: Creates depth through opacity stacking

### Standard Glass Card
```css
bg-white/40 
border border-gray-300/40 
rounded-xl 
backdrop-blur-sm
```

### Glass Card Hover State
```css
hover:bg-white/60 
hover:border-gray-400/60 
hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]
```

---

## Rounded Corners

- **Large Cards**: `rounded-xl` (12px) - Primary container cards (GridBox)
- **Medium Cards**: `rounded-lg` (8px) - Buttons, badges, skill icons
- **Small Elements**: `rounded-md` (6px) - Small badges, category tags
- **Images**: `rounded-xl` - Photos and project images

### Usage Pattern
- **Primary containers**: `rounded-xl`
- **Interactive elements**: `rounded-lg`
- **Badges/tags**: `rounded-md`

---

## Shadows

### Standard Shadows
- **Base**: `shadow-md` - Default shadow for buttons
- **Hover**: `shadow-lg` - Enhanced shadow on hover
- **Cards**: `hover:shadow-[0_8px_24px_rgba(0,0,0,0.2)]` - Deep shadow on card hover
- **Colored Shadows (Blue)**: `hover:shadow-[0_6px_16px_rgba(48,127,246,0.3)]` - Interactive elements
- **Image Shadows**: `shadow-[0_8px_24px_rgba(0,0,0,0.4)]` - Photos
- **Hover Image**: `hover:shadow-[0_12px_32px_rgba(48,127,246,0.3)]` - Photos on hover

---

## Hover Effects

### Lift Effect
Buttons and cards lift on hover:
```css
hover:-translate-y-[1px]
hover:shadow-lg
```
Or for stronger effect:
```css
hover:-translate-y-1
```

### Scale Effect
Skills icons scale on hover:
```css
hover:scale-110
hover:-translate-y-1
```

### Background Transition
Cards become more opaque on hover:
```css
hover:bg-white/60  (from bg-white/40)
hover:border-gray-400/60  (from border-gray-300/40)
```

### Color Hover
Interactive elements get blue tint:
```css
hover:bg-[rgba(48,127,246,0.2)]
hover:border-[rgba(48,127,246,0.6)]
```

---

## Scroll-Aware Behavior

Floating navigation buttons adapt based on scroll position:

### Implementation
- **Threshold**: ~600px from top
- **Full State**: Shows text + icon, `px-5 py-3 text-sm`
- **Minimized State**: Icon only, `px-3 py-2 text-xs`
- **Smooth Transition**: `transition-all duration-300`

### Use Cases
- Portfolio/Blog toggle button (upper right)
- Back to Blog button (upper left)

### Pattern
```javascript
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    const scrollThreshold = 600
    setIsScrolled(window.scrollY > scrollThreshold)
  }
  window.addEventListener('scroll', handleScroll)
  return () => window.removeEventListener('scroll', handleScroll)
}, [])
```

---

## Navigation & Scroll Management

### Scroll-to-Top on Navigation

When navigating between routes (especially from detail views back to list views), components should scroll to the top on mount to ensure users start at the beginning of the new view.

### Implementation Pattern

**For list/landing pages** (e.g., AllBlogs):
```javascript
useEffect(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}, [])
```

**For navigation from detail pages** (e.g., SingleBlog → AllBlogs):
- The detail page navigates using `navigate('/route')`
- The list component handles scrolling on mount via `useEffect`
- This ensures smooth transition and consistent user experience

### Use Cases
- Navigating from single blog post back to blog listing
- Navigating between Portfolio and Blog views (handled by 3D rotation wrapper)
- Any detail → list navigation flow

### Principles
- **Always start at top**: Users should see the beginning of a new view
- **Smooth scrolling**: Use `behavior: 'smooth'` for better UX
- **Component-level handling**: Each component manages its own scroll position on mount

---

## 3D Transforms

### 3D Cube Rotation (Portfolio ↔ Blog)
- **Perspective**: `1500px`
- **Transform Style**: `preserve-3d`
- **Rotation**: `rotateY(${isBlog ? 180 : 0}deg)`
- **Transition**: `0.8s cubic-bezier(0.4, 0, 0.2, 1)`
- **Backface Visibility**: `hidden` - Ensures only visible face is interactive

### Implementation Details
- Two faces: Portfolio (0deg) and Blog (180deg)
- Pointer events disabled on hidden face
- Smooth rotation on toggle
- Scrolls to top on rotation

---

## Transitions & Animations

### Standard Transition
```css
transition-all duration-300
```
Used for: Cards, buttons, hover effects

### Fast Transition
```css
transition-all duration-200
```
Used for: Quick interactions, color changes

### Shimmer Animation
```css
animate-shimmer
keyframes: shimmer 3s ease-in-out infinite
```
Used for: Gradient text titles

### Rotate Animation
```css
transition-transform duration-500
group-hover:rotate-180
```
Used for: Rotating emoji in toggle button

---

## Buttons & Interactive Elements

### Floating Buttons
- **Position**: `fixed top-4 left-4` or `fixed top-4 right-4`
- **Z-index**: `z-50`
- **Base Style**: Glass effect with backdrop blur
- **Responsive**: Adapts size based on scroll position

### Standard Button Style
```css
inline-flex items-center gap-2
bg-white/40 border border-gray-300/40
rounded-lg text-gray-800
font-raleway font-medium
shadow-md
hover:bg-white/60 hover:border-gray-400/60
hover:-translate-y-[1px] hover:shadow-lg
transition-all duration-300
backdrop-blur-sm
```

### Link Buttons
Similar styling but with:
- `no-underline`
- Color transitions: `hover:text-[rgba(48,127,246,0.8)]`

### Badge/Category Tags
```css
px-3 py-1
bg-white/70 border border-gray-300/50
rounded-md text-xs font-medium text-gray-700
```

---

## Gradients

### Text Gradient (Shimmer Effect)
```css
linear-gradient(135deg, #1a1a3a 0%, #307ff6 50%, #1a1a3a 100%)
background-size: 200% auto
animation: shimmer 3s ease-in-out infinite
```

### Background Gradient (Page)
```css
linear-gradient(
  to bottom,
  rgb(255,254,180),
  rgb(183,229,255),
  rgb(255,210,206),
  rgb(255,254,180)
)
```

---

## Component Patterns

### GridBox Component
Base container for all major sections:
- Glass effect background
- Rounded corners (`rounded-xl`)
- Grid layout (responsive)
- Hover effects with shadow
- Padding and gap spacing

### Grid Component
Main layout container:
- Full-width grid
- Background gradient
- Responsive column layout
- Consistent spacing

### Skill Icons
- Square containers: `h-16 w-16` (desktop), `h-14 w-14` (mobile)
- Glass effect background
- Hover: scale, lift, blue tint, shadow
- Tooltip on hover

---

## Interaction Patterns

### Clickable Elements
All interactive elements follow these patterns:
1. Visual feedback on hover (color, scale, lift)
2. Smooth transitions (300ms standard)
3. Clear visual hierarchy (glass effects, shadows)
4. Consistent spacing and sizing

### Navigation
- Floating buttons for main navigation
- Scroll-aware behavior
- Smooth scroll to top on navigation
- Visual feedback with hover states

---

## Responsive Design Patterns

### Breakpoint Strategy
- **Primary**: `max-[950px]` - Mobile/tablet transition
- Mobile-first approach
- Progressive enhancement for desktop

### Responsive Adjustments
- Padding: `p-6` → `max-[950px]:p-4`
- Grid: `grid-cols-2` → `max-[950px]:grid-cols-1`
- Font sizes: Scale down proportionally
- Spacing: Reduce gaps on mobile

---

## Design Principles

1. **Glass Morphism**: Core aesthetic using semi-transparent backgrounds with blur
2. **Smooth Transitions**: All interactions are animated (300ms standard)
3. **Consistent Spacing**: Grid-based layout with consistent gaps and padding
4. **Progressive Disclosure**: Content reveals progressively, buttons minimize on scroll
5. **Color Harmony**: Blue accent with warm gradient background
6. **Typography Hierarchy**: Clear size and weight differences
7. **Depth Through Layers**: Glass effects and shadows create visual depth
8. **Responsive First**: Mobile-friendly with progressive desktop enhancement

---

## Image Preloading

### Lazy Preloading Pattern

Images are preloaded only when components mount that actually need them, avoiding unnecessary bandwidth usage and ensuring images are cached for instant loading on subsequent views.

### Implementation Pattern

**For component-specific images** (e.g., Projects component):
```javascript
import { useEffect, useRef } from 'react'

const projectImages = [img1, img2, img3]

export default function Projects() {
  const hasPreloaded = useRef(false)
  
  useEffect(() => {
    if (!hasPreloaded.current) {
      projectImages.forEach((imageSrc) => {
        const img = new Image()
        img.src = imageSrc
      })
      hasPreloaded.current = true
    }
  }, [])
  
  // Component JSX...
}
```

### Benefits
- **On-demand loading**: Only preloads when user navigates to the relevant section
- **No impact on initial load**: Doesn't compete with critical resources
- **Browser caching**: Once preloaded, images load instantly from cache
- **Component-scoped**: Each component manages its own preloading
- **Idempotent**: `useRef` ensures preloading only happens once per mount

### Use Cases
- Project images when Projects tab is viewed
- Any heavy assets that benefit from pre-caching

---

## Routing & URL Handling

### Route Configuration

The application uses React Router with the following routes:
- `/` - Portfolio (default)
- `/portfolio` - Portfolio (alias)
- `/blog` - Blog listing
- `/blog/:slug` - Individual blog post
- `*` - Catch-all redirect to `/` (portfolio)

### Catch-All Route Pattern

Unknown routes automatically redirect to the portfolio:

```javascript
<Route path="*" element={<Navigate to="/" replace />} />
```

This ensures:
- Users never see a 404 page
- All unknown URLs redirect gracefully to portfolio
- `replace` prevents adding redirect to browser history

### GitHub Pages Configuration

For custom domains on GitHub Pages:

**404.html Configuration:**
- `pathSegmentsToKeep = 0` (for custom domains)
- Handles client-side routing redirects

**How it works:**
1. User visits `/blog` and refreshes
2. GitHub Pages serves `404.html` (no `/blog` file exists)
3. `404.html` redirects to `/?/blog`
4. `index.html` script converts it back to `/blog`
5. React Router handles the route correctly

### Principles
- **Always have a fallback**: Catch-all route prevents 404s
- **Clean URLs**: Maintain readable URLs with React Router
- **Custom domain compatibility**: `pathSegmentsToKeep = 0` for custom domains
- **History management**: Use `replace` for redirects to avoid cluttering history

---

## Implementation Notes

- Uses Tailwind CSS for utility-first styling
- Custom animations defined in `tailwind.config.js`
- Raleway font loaded via Google Fonts
- CSS custom properties for gradients and colors
- React hooks for scroll-aware behavior and 3D transforms
- React Router for client-side routing
- Image preloading for performance optimization

