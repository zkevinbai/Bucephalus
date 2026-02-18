# Kevin's Design System

A comprehensive guide to the design patterns, colors, typography, effects, and interactions used throughout the portfolio and blog. Designed to embody **Fire Rat energy** - passion, energy, transformation, charisma, cleverness, quick-wittedness, resourcefulness, and adaptability.

## Table of Contents
1. [Design Philosophy: Fire Rat Energy](#design-philosophy-fire-rat-energy)
2. [Colors](#colors)
3. [Typography](#typography)
4. [Layout & Spacing](#layout--spacing)
5. [Navigation & Header](#navigation--header)
6. [Color Blocking & Sections](#color-blocking--sections)
7. [Cards & Containers](#cards--containers)
8. [Rounded Corners](#rounded-corners)
9. [Shadows](#shadows)
10. [Hover Effects](#hover-effects)
11. [Playful Elements](#playful-elements)
12. [Transitions & Animations](#transitions--animations)
13. [Buttons & Interactive Elements](#buttons--interactive-elements)
14. [Image Preloading](#image-preloading)
15. [Routing & URL Handling](#routing--url-handling)

---

## Design Philosophy: Fire Rat Energy

The design system embodies the Fire Rat's core characteristics through visual and interactive elements:

- **Passion & Energy**: Bold, vibrant color blocks, dynamic typography, energetic animations
- **Transformation**: Smooth transitions, state changes, progressive disclosure
- **Charisma**: Playful illustrations, memorable interactions, confident messaging
- **Clever & Quick-witted**: Smart micro-interactions, responsive feedback, intuitive navigation
- **Resourceful & Adaptable**: Flexible layouts, responsive design, modular components

### Core Design Principles

1. **Bold Color Blocking**: Solid, vibrant color sections create clear visual hierarchy and energy
2. **Modern & Sleek**: Clean lines, generous spacing, professional typography
3. **Playful Professionalism**: Balance serious content with energetic, charismatic elements
4. **Smooth Interactions**: All interactions are animated and provide clear feedback
5. **Clear Navigation**: Traditional header with breadcrumbs for orientation
6. **Mobile-First**: Responsive design that adapts gracefully across devices

---

## Colors

### Primary Color Palette (Fire Rat Energy)

**Vibrant Blue** (Primary Accent):
- `rgb(48, 127, 246)` / `#307ff6` - Primary blue
- Used for: Primary buttons, links, accents, hover states
- RGBA variants: `rgba(48,127,246,0.2)`, `rgba(48,127,246,0.3)`, `rgba(48,127,246,0.6)`, `rgba(48,127,246,0.8)`

**Light Pink/Lavender**:
- `rgb(255, 182, 193)` / `#ffb6c1` - Soft pink
- `rgb(230, 230, 250)` / `#e6e6fa` - Lavender
- Used for: Section backgrounds, cards, accents

**Light Green**:
- `rgb(144, 238, 144)` / `#90ee90` - Light green
- `rgb(152, 251, 152)` / `#98fb98` - Pale green
- Used for: Section backgrounds, tags, accents

**Light Orange/Peach**:
- `rgb(255, 218, 185)` / `#ffdab9` - Peach
- `rgb(255, 192, 203)` / `#ffc0cb` - Pink-orange
- Used for: Section backgrounds, cards, playful elements

**Light Beige/Cream**:
- `rgb(255, 250, 240)` / `#fffaf0` - Floral white
- `rgb(250, 250, 250)` / `#fafafa` - Off-white
- Used for: Section backgrounds, cards, text blocks

**Yellow** (Accent):
- `rgb(255, 255, 0)` / `#ffff00` - Bright yellow
- `rgb(255, 215, 0)` / `#ffd700` - Gold
- Used for: Emojis, illustrations, highlights, playful elements

**Dark Gray/Black** (Text):
- `rgb(31, 41, 55)` / `#1f2937` - Dark gray (primary text)
- `rgb(55, 65, 81)` / `#374151` - Medium gray
- `rgb(75, 85, 99)` / `#4b5563` - Light gray
- Used for: Headings, body text, navigation

**White**:
- `rgb(255, 255, 255)` / `#ffffff` - Pure white
- Used for: Text on colored backgrounds, card backgrounds, contrast

### Color Blocking Strategy

Instead of gradients, use **solid color blocks** to define sections:
- Each major section can have its own background color
- Creates clear visual separation and energetic flow
- Colors should contrast well with text for readability
- Use white or light beige for text-heavy sections

### Text Colors on Colored Backgrounds

- **On Dark Backgrounds**: White text (`text-white`)
- **On Light Backgrounds**: Dark gray text (`text-gray-800` or `text-gray-900`)
- **On Colored Backgrounds**: Ensure sufficient contrast (WCAG AA minimum)

### Accent Colors for Interactive Elements

- **Hover States**: Use primary blue with opacity (`rgba(48,127,246,0.2)`)
- **Active States**: Use primary blue solid (`#307ff6`)
- **Focus States**: Use primary blue with ring (`ring-2 ring-[#307ff6]`)

---

## Typography

### Font Family

- **Primary Font**: `Raleway` (`font-raleway`)
  - Sans-serif font used throughout
  - Clean, modern, professional
  - Applied to all text elements

### Font Sizes (Impactful & Bold)

- **Hero/Display**: `text-5xl` to `text-7xl` (48px - 72px) - Large, impactful headlines
- **H1 (Page Titles)**: `text-4xl` to `text-5xl` (36px - 48px) - Major page titles
- **H2 (Section Titles)**: `text-3xl` to `text-4xl` (30px - 36px) - Section headers
- **H3 (Subsection Titles)**: `text-2xl` (24px) - Subsection headers
- **Body**: `text-base` (16px) - Standard body text
- **Small**: `text-sm` (14px) - Supporting text, metadata
- **Extra Small**: `text-xs` (12px) - Tags, labels, fine print

### Mobile Text Sizing (Global)

Mobile text sizing is handled **globally** via CSS in `index.css` at the `max-width: 950px` breakpoint:

- **`text-base`** → Automatically becomes `text-sm` (14px) on mobile
- **`text-lg`** → Automatically becomes `0.95rem` on mobile
- **`leading-relaxed`** → Automatically becomes `line-height: 1.4` on mobile
- **`text-xs`** → Line height automatically becomes `1.4` on mobile
- **Headings** (h1, h2, h3, h4) → Automatically scale down proportionally on mobile

**What still needs manual mobile classes:**
- Button text sizes (may need special handling)
- Icon/emoji sizes (decorative elements)
- Spacing classes (padding, gaps, margins)
- Layout classes (flex-col, grid-cols, etc.)

### Font Weights

- **Bold**: `font-bold` (700) - For large headlines, strong emphasis
- **Semibold**: `font-semibold` (600) - For section headers, important text
- **Medium**: `font-medium` (500) - For buttons, navigation, metadata
- **Normal**: `font-normal` (400) - For body text (default)
- **Light**: `font-light` (300) - For subtle emphasis (use sparingly)

### Typography Hierarchy

**Large Headlines** (Hero sections):
```css
text-5xl md:text-6xl lg:text-7xl
font-bold
tracking-tight
leading-tight
```

**Section Titles**:
```css
text-3xl md:text-4xl
font-bold
tracking-tight
```

**Body Text**:
  ```css
text-base
font-normal
leading-relaxed
  ```

### Letter Spacing

- **Tight**: `tracking-tight` or `tracking-[-0.02em]` - For large titles
- **Normal**: `tracking-normal` - For body text
- **Slightly loose**: `tracking-wide` - For uppercase text, labels

### Line Height

- **Tight**: `leading-tight` - For large headlines
- **Normal**: `leading-normal` - For standard text
- **Relaxed**: `leading-relaxed` - For paragraphs, body text
- **Loose**: `leading-loose` - For spacious layouts

---

## Layout & Spacing

### Grid System

- **Main Grid**: 2-column on desktop (`md:grid-cols-2`), 1-column on mobile
- **3-Column Grid**: For work/project showcases (`md:grid-cols-3`)
- **Grid Gap**: `gap-6` (24px) - Standard spacing between grid items
- **Responsive Gap**: `max-[950px]:gap-4` (16px) - On smaller screens

### Section Spacing

- **Section Padding**: `py-12 md:py-16 lg:py-20` - Vertical padding for major sections
- **Container Padding**: `px-4 md:px-6 lg:px-8` - Horizontal padding for content containers
- **Card Padding**: `p-6` (24px) - Standard card padding
- **Compact Cards**: `p-4` (16px) - Nested content, smaller cards

### Breakpoints

- **Mobile**: `max-[950px]` - Mobile/tablet transition point
- **Tablet**: `md:` (768px+) - Tablet and up
- **Desktop**: `lg:` (1024px+) - Desktop and up
- Uses max-width media queries for mobile-first approach

### Max Width Containers

- **Content Container**: `max-w-7xl mx-auto` - Main content width
- **Narrow Content**: `max-w-4xl mx-auto` - Blog posts, focused content
- **Wide Content**: `max-w-full` - Full-width sections

---

## Navigation & Header

### Traditional Header (Desktop)

**Structure**:
- Fixed or sticky header at top of page
- Logo/brand on left
- Navigation links in center or right
- CTA button (e.g., "Let's Talk", "Contact") on right
- Background: Light pink, light beige, or white with subtle border

**Implementation**:
```css
fixed top-0 left-0 right-0 z-50
bg-white/90 backdrop-blur-sm
border-b border-gray-200
px-4 md:px-6 lg:px-8
py-4
```

**Navigation Links**:
- Horizontal layout on desktop
- Active state: Primary blue color or underline
- Hover: Color transition to primary blue
- Font: `font-medium text-base`

### Hamburger Menu (Mobile)

**Structure**:
- Hamburger icon (☰) in top right or left
- Click opens slide-out menu or dropdown
- Menu includes all navigation links
- Close button (×) or click outside to close

**Implementation**:
```css
md:hidden
fixed top-4 right-4 z-50
bg-white/90 backdrop-blur-sm
rounded-lg p-3
shadow-lg
```

**Mobile Menu**:
- Full-screen overlay or slide-in panel
- Navigation links stacked vertically
- Background: White or light beige
- Smooth slide-in animation

### Breadcrumbs

**Structure**:
- Below header, above main content
- Shows current location: Home > Section > Page
- Links are clickable (except current page)
- Subtle styling, doesn't compete with main content

**Implementation**:
```css
text-sm text-gray-600
flex items-center gap-2
py-2 px-4 md:px-6 lg:px-8
bg-white/50
```

**Breadcrumb Pattern**:
```javascript
Home > Portfolio > Project Name
Home > Blog > Post Title
```

---

## Color Blocking & Sections

### Section Background Strategy

Each major section can use a **solid color block** background to create visual separation and energy:

**Common Section Colors**:
- **Hero Section**: Vibrant blue or light pink
- **About Section**: Light beige or white
- **Services/Features**: Alternating colors (pink, green, orange)
- **Work/Portfolio**: Light beige or white background with colored cards
- **Testimonials**: Vibrant blue with white/beige cards
- **Blog/Journal**: Light beige or white
- **CTA Section**: Vibrant blue
- **Footer**: Dark gray or black

### Full-Width Color Blocks

```css
w-full
py-12 md:py-16 lg:py-20
bg-[color]
```

### Alternating Section Colors

Create rhythm by alternating section background colors:
- Section 1: Light beige
- Section 2: Light pink
- Section 3: Light green
- Section 4: Light orange
- Repeat pattern

---

## Cards & Containers

### Standard Card

**Modern Card Style** (replacing glass morphism):
```css
bg-white
rounded-xl
p-6
shadow-md
border border-gray-200
hover:shadow-lg
hover:-translate-y-1
transition-all duration-300
```

### Colored Card Variants

**Pink Card**:
```css
bg-pink-100
rounded-xl
p-6
shadow-md
```

**Green Card**:
```css
bg-green-100
rounded-xl
p-6
shadow-md
```

**Orange Card**:
```css
bg-orange-100
rounded-xl
p-6
shadow-md
```

### Project/Work Cards

- Colored background (pink, green, orange, yellow)
- Image or illustration
- Title and description
- Tags/categories
- Hover: Lift effect, shadow increase

---

## Rounded Corners

- **Large Cards**: `rounded-xl` (12px) - Primary container cards
- **Medium Cards**: `rounded-lg` (8px) - Buttons, badges, standard cards
- **Small Elements**: `rounded-md` (6px) - Small badges, category tags
- **Images**: `rounded-xl` or `rounded-2xl` - Photos and project images
- **Buttons**: `rounded-full` or `rounded-lg` - Pill-shaped or rounded buttons

### Usage Pattern
- **Primary containers**: `rounded-xl`
- **Interactive elements**: `rounded-lg` or `rounded-full`
- **Badges/tags**: `rounded-md` or `rounded-full`

---

## Shadows

### Standard Shadows

- **Base**: `shadow-md` - Default shadow for cards and buttons
- **Hover**: `shadow-lg` - Enhanced shadow on hover
- **Cards**: `hover:shadow-xl` - Deep shadow on card hover
- **Colored Shadows (Blue)**: `hover:shadow-[0_6px_16px_rgba(48,127,246,0.3)]` - Interactive elements
- **Image Shadows**: `shadow-[0_8px_24px_rgba(0,0,0,0.2)]` - Photos
- **Hover Image**: `hover:shadow-[0_12px_32px_rgba(48,127,246,0.3)]` - Photos on hover

### Shadow Progression

```css
shadow-sm → shadow-md → shadow-lg → shadow-xl
```

---

## Hover Effects

### Lift Effect

Buttons and cards lift on hover:
```css
hover:-translate-y-1
hover:shadow-lg
transition-all duration-300
```

### Scale Effect

Icons and images scale on hover:
```css
hover:scale-110
hover:-translate-y-1
transition-transform duration-300
```

### Color Transition

Interactive elements change color on hover:
```css
hover:bg-[rgba(48,127,246,0.1)]
hover:text-[#307ff6]
transition-colors duration-300
```

### Background Color Change

Cards change background on hover:
```css
hover:bg-white/90
hover:border-[#307ff6]
transition-all duration-300
```

---

## Playful Elements

### Emojis & Illustrations

**Strategic Placement**:
- Small emojis scattered throughout (not overwhelming)
- Used to add personality and energy
- Examples: ⭐, 😊, 🚀, 💡, ✨, 🎯
- Size: `text-xl` to `text-2xl` (20px - 24px)

**Illustration Style**:
- Hand-drawn, playful stickers
- Simple line art
- Colorful, energetic
- Used sparingly for emphasis

### Playful Typography

**Character Replacements**:
- Replace letters in headlines with illustrations (e.g., "O" becomes an eye icon)
- Use emojis within text for emphasis
- Creative spacing and sizing

**Examples**:
- "WORK" → "W👁RK" (eye in place of O)
- "TOGETHER" → "TOGETH✨R" (sparkle for emphasis)

### Decorative Elements

- Small geometric shapes
- Dotted lines or borders
- Colorful accents
- Abstract patterns (used sparingly)

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

### Smooth Easing

```css
transition-all duration-300 ease-in-out
```
Used for: Complex animations, state changes

### Micro-interactions

- Button press: Slight scale down (`active:scale-95`)
- Link hover: Color change with underline
- Card hover: Lift and shadow increase
- Icon hover: Scale and color change

---

## Buttons & Interactive Elements

### Primary Button

```css
inline-flex items-center gap-2
bg-[#307ff6] text-white
rounded-lg
px-6 py-3
font-raleway font-medium
shadow-md
hover:bg-[#2563eb]
hover:shadow-lg
hover:-translate-y-1
transition-all duration-300
```

### Secondary Button

```css
inline-flex items-center gap-2
bg-white text-gray-800
border border-gray-300
rounded-lg
px-6 py-3
font-raleway font-medium
shadow-md
hover:bg-gray-50
hover:border-[#307ff6]
hover:text-[#307ff6]
hover:shadow-lg
hover:-translate-y-1
transition-all duration-300
```

### Pill Button (Rounded)

```css
rounded-full
px-6 py-3
```

### Badge/Category Tags

```css
px-3 py-1
bg-white border border-gray-200
rounded-full
text-xs font-medium text-gray-700
hover:bg-[#307ff6] hover:text-white
hover:border-[#307ff6]
transition-all duration-200
```

### Link Buttons

Similar styling but with:
- `no-underline`
- Color transitions: `hover:text-[#307ff6]`
- Underline on hover: `hover:underline`

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
- React hooks for navigation, scroll management, and interactions
- React Router for client-side routing
- Image preloading for performance optimization
- Mobile-first responsive design approach

---

## Migration Notes

### Removed Elements

- **3D Cube Rotation**: Replaced with traditional header navigation
- **Glass Morphism**: Replaced with solid color blocks and modern cards
- **Background Gradients**: Replaced with color blocking strategy
- **Floating Buttons**: Replaced with traditional header navigation
- **Scroll-aware button minimization**: Replaced with standard header

### New Elements

- **Traditional Header**: Fixed/sticky header with navigation
- **Breadcrumbs**: Navigation breadcrumbs for orientation
- **Hamburger Menu**: Mobile navigation menu
- **Color Blocking**: Solid color sections for visual energy
- **Playful Elements**: Emojis and illustrations for charisma
- **Bold Typography**: Larger, more impactful headlines

### Design Evolution

The design system has evolved from a glass morphism aesthetic to a bold, colorful, modern design that better represents Fire Rat energy - passionate, energetic, charismatic, and clever.
