---
layout: _base.njk
---

# `spaish.colorScheme`

API for managing light/dark color scheme toggling and persistence.

## `toggle()`

Toggles the current color scheme between light and dark mode.

### Parameters
None

### Description
- Reads the current `data-theme` attribute from `document.documentElement`
- Switches between `'light'` and `'dark'` values
- Sets the new theme on `document.documentElement.setAttribute('data-theme', newTheme)`
- Stores the new theme in sessionStorage using key `'spaish-color-scheme'`

### DOM Requirements
- Expects `document.documentElement` (the `<html>` element) to exist
- No specific DOM structure required

### Example
```javascript
spaish.colorScheme.toggle();
// If current theme was 'light', switches to 'dark'
// If current theme was 'dark', switches to 'light'
// If no theme was set, defaults to 'dark'
```

## `restoreLast()`

Restores the previously saved color scheme or falls back to system preference.

### Parameters
None

### Description
- Reads saved theme from sessionStorage using key `'spaish-color-scheme'`
- If no saved theme exists, detects system preference using `window.matchMedia('(prefers-color-scheme: dark)')`
- Sets the determined theme on `document.documentElement.setAttribute('data-theme', theme)`
- Priority order: saved theme → system preference → 'light' (fallback)

### DOM Requirements
- Expects `document.documentElement` (the `<html>` element) to exist
- Should be called before DOM content is rendered to prevent flash of unstyled content

### Example
```javascript
spaish.colorScheme.restoreLast();
// Restores 'dark' if previously saved
// Otherwise uses system preference
// Falls back to 'light' if system preference unavailable
```

### Browser Support
- Uses `window.matchMedia()` for system preference detection
- Gracefully degrades if matchMedia is not supported