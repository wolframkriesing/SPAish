---
layout: _base.njk
---

# Details

SPAish allows you to remember which `<details>` elements were open and restore their state across page loads.

## How To Use

Add the script to your page and call reopen with a unique page key and selectors:

```html
<script src="https://cdn.jsdelivr.net/npm/@wolframkriesing/spaish/dist/spaish.min.js"></script>
<script>
  spaish.details.reopen('my-page-key', [
    '#faq-section',
    '.collapsible-info',
    '[data-details]'
  ]);
</script>
```

This will:
- Track which `<details>` elements are open before page unload
- Restore the open state when the page loads
- Only affect elements that match the provided selectors

## Example HTML

```html
<details id="faq-section">
  <summary>Frequently Asked Questions</summary>
  <p>Content that will remember if it was expanded...</p>
</details>

<details class="collapsible-info">
  <summary>More Information</summary>
  <p>This state is also preserved...</p>
</details>
```

## Storage

Open states are stored in `sessionStorage` using the provided page key:
- Key format: `{pageKey}---dialog-reopen`
- Stores an array of selectors for currently open details
- Only works within the same browser session

## Cross-Page State

Using the same page key across multiple pages allows restoring state even when the URL changes:

```javascript
// Use the same key on all documentation pages
spaish.details.reopen('docs-menu', ['#navigation-menu', '.sidebar-sections']);
```

This is useful for maintaining expanded menu states across multiple documentation pages or any site with shared navigation elements.

## Important Notes

- Call `reopen()` immediately after page load for best results
- Only tracks `<details>` elements that match your provided selectors
- Uses `beforeunload` event to capture open states
- Elements not found during restore are safely ignored
- Works with any valid CSS selector