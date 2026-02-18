# Chinese Zodiac Feature - System Design

This document describes the architecture and implementation of the Chinese Zodiac feature. It should be updated whenever features are added or changed.

## Overview

The Chinese Zodiac feature allows users to explore the 12 Chinese zodiac animals and 5 elements, discover their year's sign, and view detailed information about animal-element combinations.

## Architecture

### Component Structure

```
ChineseZodiac/
├── ChineseZodiac.jsx      # Main container component (routing, state management)
├── YearSearch.jsx         # Year search input component
├── YearTable.jsx          # Table view of years with filtering
├── YearDetail.jsx         # Detailed view for a specific year
├── AnimalInfo.jsx         # Animal sign information display
├── ElementInfo.jsx        # Element information display
├── CombinedMeaning.jsx    # Animal + Element intersection meaning
├── zodiacData.js          # Static data (animals, elements, meanings)
├── zodiacUtils.js         # Utility functions (calculations, validations)
└── SYSTEM_DESIGN.md      # This file
```

### Data Flow

```
User Input
    ↓
ChineseZodiac (state management)
    ↓
YearSearch / YearTable (user interactions)
    ↓
YearDetail (displays selected year)
    ↓
AnimalInfo / ElementInfo / CombinedMeaning (displays details)
```

## Core Components

### ChineseZodiac.jsx

**Purpose**: Main container that manages routing, URL parameters, and view state.

**Responsibilities**:
- Read URL parameters (`?year=X` or `?animal=X&element=Y`)
- Manage selected year state
- Handle navigation between table view and detail view
- Update URL when year is selected
- Clear URL when returning to table view

**URL Parameters**:
- `?year=1996` - Direct link to a specific year
- `?animal=rat&element=fire` - Link to a specific combination (finds matching year)
- No params - Shows table view

**State Management**:
- `selectedYear`: null (table view) or number (detail view)
- Uses React Router's `useSearchParams` for URL synchronization

### YearSearch.jsx

**Purpose**: Input component for searching by year.

**Features**:
- Number input with validation (1900-2100)
- Error messages for invalid input
- Direct navigation to detail view on search

### YearTable.jsx

**Purpose**: Table/grid view showing multiple years with filtering capabilities.

**Features**:
- Displays years in a scrollable table
- Filter by animal, element, or combination
- Click on any year to view details
- Responsive design for mobile/tablet/desktop

### YearDetail.jsx

**Purpose**: Comprehensive detail view for a selected year.

**Displays**:
- Year header with navigation (previous/next year buttons)
- Animal information card
- Element information card
- Combined meaning section
- Back button to return to table

**Navigation**:
- Previous/Next year buttons (disabled at boundaries)
- Back button to table view
- URL updates automatically when navigating years

### AnimalInfo.jsx

**Purpose**: Display detailed information about a zodiac animal.

**Shows**:
- Animal name and emoji
- Personality traits
- Strengths and weaknesses
- General personality description

### ElementInfo.jsx

**Purpose**: Display detailed information about a zodiac element.

**Shows**:
- Element name and emoji
- Characteristics
- Personality influence
- Strengths and challenges

### CombinedMeaning.jsx

**Purpose**: Display how animal and element interact together.

**Shows**:
- Combination name (e.g., "Fire Rat")
- Combined personality description
- How element influences the animal

## Data Layer

### zodiacData.js

**Purpose**: Static data storage for all zodiac information.

**Exports**:
- `ANIMAL_DATA`: Object mapping animal names to their data
- `ELEMENT_DATA`: Object mapping element names to their data
- `getCombinedMeaning(animal, element)`: Function that returns combined meaning

**Data Structure**:
```javascript
ANIMAL_DATA = {
  Rat: {
    name: 'Rat',
    emoji: '🐭',
    order: 1,
    traits: [...],
    personality: '...',
    strengths: [...],
    weaknesses: [...]
  },
  // ... other animals
}
```

### zodiacUtils.js

**Purpose**: Utility functions for zodiac calculations and validations.

**Functions**:
- `getAnimalForYear(year)`: Calculate animal for a given year
- `getElementForYear(year)`: Calculate element for a given year
- `getZodiacForYear(year)`: Get both animal and element for a year
- `generateYearRange(start, end)`: Generate zodiac data for year range
- `isValidYear(year)`: Validate year is in supported range (1900-2100)
- `findYearByCombination(animal, element)`: Find a year matching animal+element combination

**Constants**:
- `ANIMALS`: Array of 12 animals in order
- `ELEMENTS`: Array of 5 elements

## URL Linking

### Supported URL Formats

1. **Year-based linking**:
   ```
   /zodiac?year=1996
   ```
   Directly links to a specific year's detail view.

2. **Combination-based linking**:
   ```
   /zodiac?animal=rat&element=fire
   ```
   Finds the first matching year (1900-2100) for the combination and redirects to year-based URL.

3. **Table view**:
   ```
   /zodiac
   ```
   Shows the default table view with all years.

### URL Parameter Handling

- **Reading**: `useSearchParams` hook reads parameters on mount and when they change
- **Writing**: URL updates automatically when year is selected
- **Clearing**: URL parameters are cleared when returning to table view
- **Priority**: Year parameter takes precedence over animal+element

### Example Links

- Fire Rat: `/zodiac?animal=rat&element=fire` or `/zodiac?year=1996` (if 1996 is Fire Rat)
- Wood Dragon: `/zodiac?animal=dragon&element=wood`
- Any year: `/zodiac?year=2024`

## State Management

### Local State

The feature uses React's `useState` for local component state:
- `selectedYear`: Managed in `ChineseZodiac.jsx`
- `yearInput`, `error`: Managed in `YearSearch.jsx`
- Filter/search state: Managed in `YearTable.jsx`

### URL State

URL parameters are used for:
- Deep linking (shareable URLs)
- Browser back/forward navigation
- Bookmarking specific years

### State Synchronization

- When user selects a year → URL updates → State updates
- When URL changes → State updates → View updates
- When user clicks back → State clears → URL clears

## User Interactions

### Search Flow

1. User enters year in search box
2. Validation checks year range (1900-2100)
3. On submit, `handleYearSelect(year)` is called
4. URL updates with `?year=X`
5. `YearDetail` component renders
6. User can navigate previous/next or go back to table

### Table Flow

1. User views table of years
2. User can filter by animal, element, or combination
3. User clicks on a year row
4. `handleYearSelect(year)` is called
5. URL updates, detail view shows

### Navigation Flow

1. User is viewing year detail
2. User clicks "← Back" button
3. `handleBackToTable()` is called
4. URL parameters cleared
5. Table view shows

## Styling

### Design System Integration

- Uses shared `Grid` and `GridBox` components from Portfolio feature
- Follows design system patterns from `KEVIN_DESIGN_SYSTEM.md`
- Responsive design with `max-[950px]:` breakpoints
- Consistent spacing, typography, and colors

### Component Styling

- All components use Tailwind CSS utility classes
- Consistent padding: `p-6` (desktop), `max-[950px]:p-4` (mobile)
- Consistent gaps: `gap-4` or `gap-6`
- Font: Raleway font family throughout

## Performance Considerations

### Data Loading

- All data is static and loaded from JavaScript files
- No API calls or async data fetching
- Data is bundled with the application

### Calculations

- Zodiac calculations are simple modulo operations (O(1))
- Year range generation is done on-demand
- No expensive computations

### Rendering

- `useMemo` used in `YearDetail` to avoid recalculating zodiac data
- Table uses efficient filtering (client-side)
- No virtual scrolling needed (manageable number of years)

## Future Enhancements

Potential features to add:

1. **Slug-style URLs**: `/zodiac/fire-rat` instead of query params
2. **Year range selection**: Filter table by year range
3. **Comparison view**: Compare two years side-by-side
4. **Compatibility checker**: Check compatibility between two years
5. **Export functionality**: Export year data to PDF/image
6. **Share buttons**: Social sharing for specific years
7. **Favorites**: Save favorite years locally
8. **Chinese New Year calculation**: Account for actual Chinese New Year dates

## Testing Considerations

When adding or modifying features:

1. **URL linking**: Test all URL formats work correctly
2. **Navigation**: Test back/forward browser buttons
3. **Validation**: Test year input validation
4. **Filtering**: Test table filtering works correctly
5. **Responsive**: Test on mobile, tablet, desktop
6. **Edge cases**: Test boundary years (1900, 2100)
7. **Invalid inputs**: Test invalid year/animal/element combinations

## Dependencies

### External

- `react-router-dom`: For URL parameter handling (`useSearchParams`)

### Internal

- `../Portfolio/Grid`: Shared grid layout component
- `../Portfolio/GridBox`: Shared card component

## File Organization

- **Components**: One component per file
- **Data**: Static data in `zodiacData.js`
- **Utils**: Pure functions in `zodiacUtils.js`
- **Documentation**: `SYSTEM_DESIGN.md` (this file)

## Maintenance Notes

### When Adding Features

1. Update this `SYSTEM_DESIGN.md` file
2. Document new components, functions, or data structures
3. Update URL linking section if adding new URL formats
4. Update "Future Enhancements" if feature was planned
5. Add testing considerations for new features

### When Modifying Features

1. Update relevant sections in this document
2. Document breaking changes
3. Update examples if they change
4. Note any new dependencies

### Code Style

- Follow existing patterns
- Use functional components with hooks
- Keep components focused and single-purpose
- Use TypeScript-style JSDoc comments for functions
- Maintain consistent naming conventions
