---
layout: _base.njk
---

# Color Scheme

SPAish allows you to toggle and remember the color scheme of your site, light or dark mode.

## How To Use

The first script you should add to your page is to restore the last used color scheme when the page loads:

```html
<script src="https://cdn.jsdelivr.net/npm/@wolframkriesing/spaish/dist/spaish.min.js"></script>
<script>
  spaish.colorScheme.restoreLast();
</script>
```

The color scheme is stored in the `sessionStorage` and restored on page load.

The toggle button, that you can put on your page, must call the function below to toggle the color scheme:

```html
<button onclick="spaish.colorScheme.toggle()">toggle</button>
```

This will toggle the `data-theme` attribute on the `<html>` element between `light` and `dark`,
and store the last used color scheme in `sessionStorage`.

```html
<html data-theme="light">
OR
<html data-theme="dark">
```

## CSS Styling

With this you can easily style either mode.

### The simplest way

```css
[data-theme="dark"] {
  background-color: white;
  color: black;
}

[data-theme="light"] {
  background-color: black;
  color: white;
}
```

The drawback here is that user-preferred color schemes are not respected, let's solve this next.

### Respecting User Preferences

You want to use the `prefers-color-scheme` media query to respect the user's preference,
but also allow toggling between light and dark modes.

```css
@media (prefers-color-scheme: dark) {
  [data-theme="light"] {
    background-color: black;
    color: white;
  }

  [data-theme="dark"] {
    background-color: white;
    color: black;
  }
}

/* Put the following blocks after the above to override the user preference when toggled */
[data-theme="light"] {
  background-color: white;
  color: black;
}

[data-theme="dark"] {
  background-color: black;
  color: white;
}
```

### Use CSS Variables

Even better, use CSS variables and respect user preferences while allowing toggling.

```css
:root {
  --dark-background-color: white;
  --dark-text-color: black;

  --light-background-color: black;
  --light-text-color: white;

  /* Lets assume the "default" is the dark mode */
  --background-color: var(--dark-background-color);
  --text-color: var(--dark-text-color);
}
/* If the user prefers light mode, set the default to light */
@media (prefers-color-scheme: light) {
  :root {
    --background-color: var(--light-background-color);
    --text-color: var(--light-text-color);
  }
}
/* If the user toggles to dark mode, set the variables accordingly */
[data-theme="dark"] {
  --background-color: var(--dark-background-color);
  --text-color: var(--dark-text-color);
}
/* If the user toggles to light mode, set the variables accordingly */
[data-theme="light"] {
  --background-color: var(--light-background-color);
  --text-color: var(--light-text-color);
}
```

This looks like a lot of duplication, and it is.

The advantages are, the user's preference is respected, the toggle works, and you can use the variables in your CSS
in one place to style your site.

The disadvantage is that you have to edit/add/delete the variables in many places, but only when you edit the styles.
Using a preprocessor might make this easier, but it is not necessary.
