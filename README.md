# SPAish

**SPAish** makes Multi-Page Applications (MPAs) feel a bit more like Single-Page Applications (SPAs) — without changing your architecture.

It's a small, framework-agnostic JavaScript library that allows you to:
- Restore scroll positions across navigations
- Reopen `<details>` elements after reload
- Store all state in `sessionStorage`
- It adds no dependencies, weighs ~2KB minified

Use it with a `<script>` tag and enhance your site with just a few lines.

## 💡 Why?

MPAs often lose state (scroll, UI toggles, etc.) between page loads.
SPAs often come with huge frameworks and complexity, size and speed overhead without much gain.  
SPAish helps you preserve these micro-interactions without rewriting your site.

## 🚀 Getting Started

Include via a script tag at the end of your page, or at least after the
DOM nodes referred to have been rendered.

```html
<script src="https://cdn.jsdelivr.net/npm/@wolframkriesing/spaish/dist/spaish.min.js"></script>
<script>
  // Restore scroll position, useful e.g. when filtering/sorting data, big forms, comments, threads, ...
  spaish.scrollRestore(location.pathname, ['#scrollable-node']);
  // Reopen the <details> on page changes or when coming back to the page.
  spaish.detailsReopen(location.pathname, ['details.faq']);
</script>