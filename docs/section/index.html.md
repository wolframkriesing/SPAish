# Section

SPAish provides GitHub-style anchor links for section headings, adding clickable # links that appear on hover.

## How To Use

Add the script to your page:

```html
<script src="https://cdn.jsdelivr.net/npm/@wolframkriesing/spaish/dist/spaish.min.js"></script>
<script>
  spaish.section.addAnchors();
</script>
```

This will automatically:
- Add IDs to all headings (h1-h6) that don't already have them
- Add hover-activated anchor links with # symbol
- Position anchor links to the left of headings

**Important:** Call `addAnchors()` or `addIds()` immediately after page load to ensure URLs with hash fragments (e.g., `page.html#section-my-heading`) can jump to the correct heading when the page loads.

## Individual Functions

### Add IDs Only

```javascript
spaish.section.addIds();
// Or with custom prefix
spaish.section.addIds('my-prefix');
```

Adds auto-generated IDs to all headings based on their text content.

### Add Single ID

```javascript
const heading = document.querySelector('h2');
spaish.section.addId(heading);
// Or with custom prefix
spaish.section.addId(heading, 'my-prefix');
```

Adds an ID to a specific heading element.

### Add Single Anchor

```javascript
const heading = document.querySelector('h2');
spaish.section.addAnchor(heading);
```

Adds an anchor link to a specific heading. This automatically calls `addId()` first if the heading doesn't have an ID.

## Generated IDs

IDs are created by converting heading text to slugs:
- "My Heading" becomes `section-my-heading`
- Special characters are removed
- Spaces become hyphens
- Text is lowercased

## Customization

You can customize the constants defined in the module:

```javascript
// Customize the ID prefix (default: 'section')
spaish.section.ID_PREFIX = 'my-section';

// Customize the anchor text (default: '#')
spaish.section.ANCHOR_TEXT = '¶';

// Customize the flag name for tracking anchors
spaish.section.HAS_SECTION_ANCHOR_FLAG_NAME = 'myCustomFlag';
```

## Styling

The anchor links are positioned absolutely and styled with:
- `#` symbol (customizable via `ANCHOR_TEXT`)
- Positioned to the left of headings
- Visible on hover
- Automatically removed when pointer leaves