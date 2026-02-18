# Learnings

## Fixing List Indentation Issues in React Components

### Problem
Career timeline entries were appearing with inconsistent indentation - some entries were indented more than others, even though they used the same component structure.

### Root Cause
Browser default margins and padding on `<ul>` and `<li>` elements can cause inconsistent indentation, especially when mixing string bullets and object bullets with subBullets. Even with `list-none`, some browsers may still apply default spacing.

### Solution
Add explicit margin and padding resets (`m-0 p-0`) to all list-related elements:

1. **Parent container**: `m-0 p-0` on the main flex container
2. **Entry cards**: `m-0` on each card container
3. **Content wrapper**: `m-0 p-0` on the flex-1 content div
4. **Header wrapper**: `m-0 p-0` on divs wrapping titles/headers
5. **All `<ul>` elements**: `p-0 m-0` to remove default list spacing
6. **All `<li>` elements**: `m-0 p-0` to remove default list item spacing
7. **Nested lists**: `p-0 m-0` on nested `<ul>` elements (subBullets)

### Key Takeaway
When using custom list styling with flexbox, always explicitly reset margins and padding on all list-related elements to ensure consistent rendering across different browsers and entry structures.

### Example Fix
```jsx
<ul className="list-none flex flex-col gap-3 mt-3 p-0 m-0">
  {items.map((item) => (
    <li key={item.id} className="flex flex-col gap-2 m-0 p-0">
      <div className="flex items-start gap-2 m-0">
        {/* content */}
      </div>
      {subItems.length > 0 && (
        <ul className="list-none flex flex-col gap-2 ml-6 p-0 m-0">
          {/* sub-items */}
        </ul>
      )}
    </li>
  ))}
</ul>
```
