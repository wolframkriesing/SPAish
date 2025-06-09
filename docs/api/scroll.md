---
layout: _base.njk
---

# `spaish.scroll`

API for storing and restoring scroll positions across page loads for both window and specific scrollable elements.

## `restore(pageKey [, otherNodeSelectors = []])`

Stores current scroll positions before page unload and restores them on page load.

### Parameters
- `pageKey` (string) - Unique identifier for storing scroll positions in sessionStorage
- `otherNodeSelectors` (Array<string>, optional) - Array of CSS selectors for additional scrollable elements. Defaults to `[]`

### Description
The function sets up two main behaviors:

#### Storage (on beforeunload)
- Captures `window.scrollY` position
- For each selector in `otherNodeSelectors`:
  - Safely queries the DOM using try/catch
  - Captures `scrollTop` value for found elements
  - Stores as `[selector, scrollTopValue]` pairs
- Creates a Map with `'window'` and selector entries
- Stores in sessionStorage using key `${pageKey}---scroll-restore`

#### Restoration (immediate)
- Sets `history.scrollRestoration = 'manual'` to disable browser's default scroll restoration
- Reads stored scroll positions from sessionStorage
- Restores `window.scrollY` for the window
- Restores `scrollTop` for each matching element selector
- Skips missing elements gracefully

### DOM Requirements
- `window` object must exist
- `history.scrollRestoration` API support (gracefully handled if missing)
- Selector elements should be scrollable containers with `scrollTop` property
- Elements matching selectors should exist when restoration occurs

### Storage Details
- Uses `sessionStorage` (persists only during browser session)
- Storage key format: `${pageKey}---scroll-restore`
- Stores as JSON serialized Map entries: `[['window', '123'], ['#sidebar', '456']]`
- Scroll positions stored as string numbers using `toFixed(0)`

### Example
```javascript
// Basic usage - window scroll only
spaish.scroll.restore('my-page');

// With additional scrollable elements
spaish.scroll.restore('docs-page', [
  '#sidebar',
  '.content-area',
  '[data-scrollable="true"]'
]);

// Cross-page state with same key
spaish.scroll.restore('shared-layout', ['#navigation']);
```

### Error Handling
- Invalid selectors are caught and ignored
- Missing elements during restoration are skipped
- Malformed storage data defaults to empty Map
- Non-numeric scroll values are handled by `parseInt()`

### Browser Events
- Uses `beforeunload` event for storage (Safari compatible)
- Executes restoration immediately when called
- Requires `sessionStorage` support

### Performance Notes
- Scroll positions are captured only once per page unload
- Restoration queries DOM once per selector
- Storage operations are synchronous