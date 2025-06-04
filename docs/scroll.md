# Scroll

SPAish allows you to store and restore scroll positions across page loads, maintaining the user's scroll position in both the window and specific scrollable elements.

## How To Use

Add the script to your page and call restore with a unique page key:

```html
<script src="https://cdn.jsdelivr.net/npm/@wolframkriesing/spaish/dist/spaish.min.js"></script>
<script>
  spaish.scroll.restore('my-page-key');
</script>
```

This will:
- Store the current scroll position before page unload
- Restore the scroll position when the page loads
- Disable browser's default scroll restoration

## Scrollable Elements

You can also restore scroll positions for specific scrollable elements:

```javascript
spaish.scroll.restore('my-page-key', [
  '#sidebar',
  '.content-area',
  '[data-scrollable]'
]);
```

Both window and element scroll positions will be preserved.

## Storage

Scroll positions are stored in `sessionStorage` using the provided page key:
- Key format: `{pageKey}---scroll-restore`
- Window scroll stored as `window`
- Elements stored by their CSS selector
- Only works within the same browser session

## Important Notes

- Call `restore()` immediately after page load for best results
- Uses `beforeunload` event to capture scroll positions
- Automatically sets `history.scrollRestoration = 'manual'` to prevent conflicts
- Invalid selectors are safely ignored
- Missing elements at restore time are skipped