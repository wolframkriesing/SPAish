# `spaish.details`

API for preserving the open/closed state of `<details>` elements across page loads.

## `reopen(pageKey, nodeSelectors)`

Stores which details elements are open before page unload and reopens them on page load.

### Parameters
- `pageKey` (string) - Unique identifier for storing details state in sessionStorage
- `nodeSelectors` (Array<string>) - Array of CSS selectors targeting `<details>` elements to track

### Description
The function sets up two main behaviors:

#### Storage (on beforeunload)
- Iterates through each selector in `nodeSelectors`
- Queries DOM for matching `<details>` elements using `document.querySelector()`
- Checks if each element has `open` property set to `true`
- Collects selectors for currently open details elements
- Stores array of open selectors in sessionStorage using key `${pageKey}---dialog-reopen`

#### Restoration (immediate)
- Reads array of open selectors from sessionStorage
- Joins selectors with commas to create combined CSS selector
- Uses `document.querySelectorAll()` to find all previously open elements
- Sets `open = true` on each found element

### DOM Requirements
- `<details>` elements must exist in the DOM and match provided selectors
- Elements must have working `open` property (standard HTML5 details behavior)
- Page should be fully loaded when restoration occurs

### Storage Details
- Uses `sessionStorage` (persists only during browser session)
- Storage key format: `${pageKey}---dialog-reopen`
- Stores as JSON array of selector strings: `["#faq1", ".expandable-section"]`
- Only tracks elements that are currently open (have `open` attribute)

### Example
```javascript
// Track specific details elements
spaish.details.reopen('faq-page', [
  '#frequently-asked-questions',
  '#troubleshooting-section',
  '.expandable-info'
]);

// Cross-page navigation menu state
spaish.details.reopen('site-navigation', [
  '#main-menu',
  '#sidebar-sections'
]);

// Multiple selectors for flexible targeting
spaish.details.reopen('docs', [
  '[data-section="api"]',
  '[data-section="examples"]',
  'details.collapsible'
]);
```

### Selector Behavior
- Only tracks elements that match the provided selectors
- Non-matching `<details>` elements are ignored
- Missing elements during restoration are skipped silently
- Invalid selectors are filtered out during storage

### Cross-Page Functionality
- Using the same `pageKey` across multiple pages preserves state during navigation
- Useful for maintaining expanded menu/navigation states
- State persists within the browser session only
- Different pages can share state by using identical selectors and pageKey

### Error Handling
- Missing elements during storage/restoration are ignored
- Invalid selectors don't cause errors
- Malformed sessionStorage data defaults to empty array
- Non-details elements matching selectors are ignored

### Browser Events
- Uses `beforeunload` event for state capture
- Executes restoration immediately when called
- Requires `sessionStorage` support

### Performance Notes
- Queries DOM once per selector during storage
- Single combined query during restoration for efficiency
- Storage operations are synchronous
- Minimal memory footprint (only stores selector strings)