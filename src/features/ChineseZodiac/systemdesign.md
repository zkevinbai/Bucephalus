# Chinese Zodiac App - System Design Document

## 1. Overview

### 1.1 Purpose
A web application feature that allows users to explore Chinese zodiac information including:
- Chinese zodiac animals (12-year cycle)
- Chinese zodiac elements (5 elements: Wood, Fire, Earth, Metal, Water)
- Combined animal-element meanings for any given year
- Year lookup and table view functionality
- Online information about animal and element meanings

### 1.2 Scope
- Display zodiac information for years (recommended range: 1900-2100)
- Search functionality for specific years
- Table view showing multiple years at a glance
- Detailed information about each animal sign
- Detailed information about each element
- Combined meaning for animal-element intersections
- Integration with existing React/Vite/Tailwind CSS architecture

## 2. Technical Architecture

### 2.1 Technology Stack
- **Framework**: React 18 (existing)
- **Build Tool**: Vite (existing)
- **Styling**: Tailwind CSS (existing)
- **Routing**: React Router DOM (existing)
- **Data Fetching**: Native fetch API or axios (if needed)
- **State Management**: React hooks (useState, useEffect)

### 2.2 Project Structure
```
src/
├── features/
│   └── ChineseZodiac/
│       ├── ChineseZodiac.jsx          # Main container component
│       ├── YearSearch.jsx              # Year search input component
│       ├── YearTable.jsx               # Table view of years
│       ├── YearDetail.jsx              # Detailed view for a specific year
│       ├── AnimalInfo.jsx              # Animal sign information display
│       ├── ElementInfo.jsx             # Element information display
│       ├── CombinedMeaning.jsx         # Animal + Element intersection meaning
│       ├── zodiacData.js               # Static data: year mappings, animal info, element info
│       └── zodiacUtils.js              # Utility functions for calculations
└── App.jsx                              # Add new route
```

### 2.3 Routing
- **New Route**: `/zodiac` - Main Chinese Zodiac app page
- Integration with existing 3D cube rotation system (optional - can be standalone or integrated)

## 3. Data Model

### 3.1 Chinese Zodiac System
- **12 Animals**: Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig
- **5 Elements**: Wood, Fire, Earth, Metal, Water
- **60-Year Cycle**: Combination of 12 animals × 5 elements
- **Element Cycle**: Elements follow a 10-year pattern (each element appears for 2 consecutive years)

### 3.2 Year Calculation Logic
- **Animal**: Determined by year position in 12-year cycle
  - Reference year: 1900 = Rat (starting point)
  - Formula: `(year - 1900) % 12`
- **Element**: Determined by last digit of year
  - 0, 1 → Metal
  - 2, 3 → Water
  - 4, 5 → Wood
  - 6, 7 → Fire
  - 8, 9 → Earth
- **Note**: Chinese New Year typically starts late January/early February, but for simplicity, we'll use calendar year

### 3.3 Data Structure

#### 3.3.1 Animal Data
```javascript
{
  name: "Rat",
  emoji: "🐭",
  order: 1,
  years: [1900, 1912, 1924, ...], // All years this animal appears
  traits: ["clever", "quick-witted", "resourceful"],
  personality: "Detailed description...",
  strengths: ["...", "..."],
  weaknesses: ["...", "..."],
  compatibility: ["...", "..."]
}
```

#### 3.3.2 Element Data
```javascript
{
  name: "Wood",
  emoji: "🌳",
  characteristics: ["growth", "renewal", "vision"],
  description: "Detailed description...",
  personality: "Detailed description...",
  strengths: ["...", "..."],
  challenges: ["...", "..."]
}
```

#### 3.3.3 Combined Meaning Data
```javascript
{
  animal: "Rat",
  element: "Wood",
  combination: "Wood Rat",
  description: "Detailed description of how Wood influences Rat...",
  personality: "Combined personality traits...",
  yearRange: [1984, 2044, ...] // Years with this combination
}
```

## 4. Features & Components

### 4.1 Main View (`ChineseZodiac.jsx`)
- Hero section with title and brief introduction
- Navigation tabs or sections:
  1. Year Search
  2. Year Table
  3. Animal Guide
  4. Element Guide

### 4.2 Year Search (`YearSearch.jsx`)
- Input field for year entry
- Real-time validation (year range)
- Display results:
  - Animal sign with emoji
  - Element with emoji
  - Combined name (e.g., "Wood Rat")
  - Quick facts
  - Link to detailed view

### 4.3 Year Table (`YearTable.jsx`)
- Scrollable table/grid showing years in ranges
- Columns: Year | Animal | Element | Combination
- Pagination or infinite scroll for large ranges
- Filter options:
  - By animal
  - By element
  - By year range
- Sortable columns
- Export functionality (optional)

### 4.4 Year Detail (`YearDetail.jsx`)
- Comprehensive view for a selected year
- Shows:
  - Animal information card
  - Element information card
  - Combined meaning section
  - Related years (same combination)
  - Navigation to previous/next year

### 4.5 Animal Info (`AnimalInfo.jsx`)
- Display information about a specific animal
- Sections:
  - Overview
  - Personality traits
  - Strengths & weaknesses
  - Compatibility
  - Years this animal appears
  - Famous people (optional)

### 4.6 Element Info (`ElementInfo.jsx`)
- Display information about a specific element
- Sections:
  - Overview
  - Characteristics
  - Personality influence
  - Strengths & challenges
  - Years this element appears

### 4.7 Combined Meaning (`CombinedMeaning.jsx`)
- Shows how animal and element interact
- Detailed interpretation
- Personality description
- Life aspects (career, relationships, health - optional)

## 5. Data Sources & Content

### 5.1 Static Data (`zodiacData.js`)
- Year-to-animal mappings (calculated)
- Year-to-element mappings (calculated)
- Animal information (curated from research)
- Element information (curated from research)
- Combined meanings (curated from research)

### 5.2 Online Information Integration
- **Option 1**: Pre-fetched and stored in static data file
- **Option 2**: Dynamic fetching from APIs (if available)
- **Option 3**: Embedded links to external resources
- **Recommendation**: Option 1 for reliability and performance

### 5.3 Content Research Areas
- Animal sign meanings and traits
- Element characteristics and influences
- Combined animal-element interpretations
- Cultural context and historical significance

## 6. User Interface Design

### 6.1 Design Principles
- Follow existing design system (`kevin-design-system.md`)
- Use liquid glass morphism effects
- Consistent with Portfolio/Blog styling
- Responsive design (mobile, tablet, desktop)
- Accessible color contrasts

### 6.2 Color Scheme
- Use existing Tailwind color palette
- Consider element-themed colors:
  - Wood: Green tones
  - Fire: Red/Orange tones
  - Earth: Brown/Yellow tones
  - Metal: Gray/Silver tones
  - Water: Blue tones

### 6.3 Component Styling
- Glass effect cards (consistent with `GridBox.jsx`)
- Smooth transitions and animations
- Hover effects for interactive elements
- Clear typography hierarchy

## 7. Implementation Plan

### 7.1 Phase 1: Core Data & Utilities
1. Create `zodiacUtils.js` with calculation functions
2. Create `zodiacData.js` with static data
3. Implement year-to-animal calculation
4. Implement year-to-element calculation
5. Generate year mappings for 1900-2100

### 7.2 Phase 2: Basic Components
1. Create `ChineseZodiac.jsx` main container
2. Create `YearSearch.jsx` with basic search
3. Create `YearTable.jsx` with table view
4. Add route to `App.jsx`

### 7.3 Phase 3: Information Display
1. Create `AnimalInfo.jsx`
2. Create `ElementInfo.jsx`
3. Create `CombinedMeaning.jsx`
4. Create `YearDetail.jsx`

### 7.4 Phase 4: Content & Polish
1. Research and add animal meanings
2. Research and add element meanings
3. Research and add combined meanings
4. Add emojis/icons for visual appeal
5. Style components with Tailwind
6. Add animations and transitions

### 7.5 Phase 5: Testing & Refinement
1. Test year calculations across range
2. Test search functionality
3. Test table filtering/sorting
4. Responsive design testing
5. Cross-browser testing
6. Performance optimization

## 8. Edge Cases & Considerations

### 8.1 Year Range
- Support years 1900-2100 (or configurable)
- Handle invalid year inputs gracefully
- Consider Chinese New Year date (optional enhancement)

### 8.2 Data Accuracy
- Verify calculation formulas
- Cross-reference with authoritative sources
- Handle year 0 and negative years (if needed)

### 8.3 Performance
- Lazy load large year tables
- Virtual scrolling for table view
- Memoize calculations

### 8.4 Accessibility
- Keyboard navigation
- Screen reader support
- ARIA labels
- Focus management

## 9. Future Enhancements (Optional)

- Integration with 3D cube rotation system
- Birth year calculator (input birthdate, get zodiac)
- Compatibility checker (compare two years)
- Year comparison tool
- Export to PDF/image
- Share functionality
- Dark mode support
- Multiple language support
- Chinese New Year date calculation
- Yin/Yang polarity information

## 10. Questions & Clarifications

### 10.1 Integration
- Should this be integrated into the 3D cube rotation system (Portfolio/Blog/Zodiac)?
- Or should it be a standalone route?

### 10.2 Year Range
- What year range should be supported? (Default: 1900-2100)

### 10.3 Chinese New Year
- Should we account for Chinese New Year dates (late Jan/early Feb)?
- Or use calendar year for simplicity?

### 10.4 Content Depth
- How detailed should the animal/element/combined meanings be?
- Should we include compatibility, career, health, etc.?

### 10.5 Data Source
- Should online information be pre-fetched and stored?
- Or dynamically fetched at runtime?

---

## Next Steps

1. **Review this design document** - Confirm approach and answer questions
2. **Research content** - Gather detailed information about animals, elements, and combinations
3. **Begin implementation** - Start with Phase 1 (Core Data & Utilities)
4. **Iterate** - Build incrementally and test as we go

---

*Document created: [Current Date]*
*Last updated: [Current Date]*
