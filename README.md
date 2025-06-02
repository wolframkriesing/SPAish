# SPAish

SPAish - progressive enhancer for your MPA, make it feel SPAish.

[![Minified bundle size](https://img.shields.io/bundlephobia/minzip/@wolframkriesing/spaish.svg)](https://bundlephobia.com/package/@wolframkriesing/spaish)
[![really open source](https://img.shields.io/badge/really-open_source-red)](https://codeberg.org/wolframkriesing/spaish)
[![License](https://img.shields.io/npm/l/@wolframkriesing/spaish.svg)](https://codeberg.org/wolframkriesing/spaish/src/branch/main/LICENSE)
[![npm version](https://img.shields.io/npm/v/@wolframkriesing/spaish.svg)](https://www.npmjs.com/package/@wolframkriesing/spaish)

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
  spaish.scroll.restore(location.pathname, ['#scrollable-node']);
  
  // Reopen the <details> on page changes or when coming back to the page.
  spaish.details.reopen(location.pathname, ['details.faq']);
  
  // Restore the color scheme, e.g. light or dark mode.
  spaish.colorScheme.restoreLast();
</script>

<p>Toggle the color scheme.</p>
<button onclick="spaish.colorScheme.toggle();">Toggle Color Scheme</button>
```
