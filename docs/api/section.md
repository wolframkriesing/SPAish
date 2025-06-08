# `spaish.section`

API for adding GitHub-style anchor links to section headings with automatic ID generation.

## `addId($section [, prefix = 'section'])`

Adds an auto-generated ID to a heading element if it doesn't already have one.

### Parameters
- `$section` (HTMLElement) - The heading element to add an ID to
- `prefix` (string, optional) - Custom prefix for the ID. Defaults to `spaish.section.ID_PREFIX`

### Description
- Checks if the element already has an ID
- If no ID exists, generates one using the format: `${prefix}-${slug}` 
- Slug is created from `$section.textContent.trim()` using `spaish._toSlug()`
- Only modifies elements that don't already have an ID

### DOM Requirements
- Expects a valid DOM element (typically h1-h6)
- Element must have text content for slug generation
- Requires `spaish._toSlug()` utility function

### Example
```javascript
const heading = document.querySelector('h2');
spaish.section.addId(heading);
// Adds ID like "section-my-heading-text"

spaish.section.addId(heading, 'custom');
// Adds ID like "custom-my-heading-text"
```

## `addIds([prefix = 'section'])`

Adds auto-generated IDs to all headings on the page.

### Parameters
- `prefix` (string, optional) - Custom prefix for all IDs. Defaults to `spaish.section.ID_PREFIX`

### Description
- Queries for all heading elements (`h1, h2, h3, h4, h5, h6`)
- Calls `addId()` for each heading element
- Only affects headings without existing IDs

### DOM Requirements
- Page must be fully loaded
- Heading elements (h1-h6) must exist in the DOM

### Example
```javascript
spaish.section.addIds();
// Adds IDs to all headings using default prefix

spaish.section.addIds('docs');
// Adds IDs using "docs" prefix
```

## `addAnchor($section)`

Adds a hover-activated anchor link to a heading element.

### Parameters
- `$section` (HTMLElement) - The heading element to add an anchor to

### Description
- First calls `addId($section)` to ensure the element has an ID
- Checks if anchor already exists using `HAS_SECTION_ANCHOR_FLAG_NAME` data attribute
- Creates an absolutely positioned anchor link with `href="#${id}"`
- Sets CSS positioning: `position: absolute`, `left: 0`, `top: 0`, `transform: translateX(-100%)`
- Adds padding and uses `ANCHOR_TEXT` for content
- Sets up removal handler on `pointerleave` event
- Marks element with tracking flag to prevent duplicates

### DOM Requirements
- Element must have or be able to receive an ID
- Element's position should be relative or absolute (automatically set if needed)
- Requires CSS support for absolute positioning

### Example
```javascript
const heading = document.querySelector('h2');
spaish.section.addAnchor(heading);
// Adds hover-activated # link to the heading
```

## `addAnchors()`

Adds hover-activated anchor links to all headings on the page.

### Parameters
None

### Description
- First calls `addIds()` to ensure all headings have IDs
- Queries for all heading elements (`h1, h2, h3, h4, h5, h6`)
- Adds `pointerover` event listener to each heading
- Event listener calls `addAnchor()` on hover
- Anchors are created dynamically on first hover

### DOM Requirements
- Page must be fully loaded
- Heading elements (h1-h6) must exist in the DOM
- CSS must support absolute positioning for proper anchor placement

### Example
```javascript
spaish.section.addAnchors();
// All headings will show # links on hover
```

### Behavior Notes
- Anchors appear on `pointerover` and disappear on `pointerleave`
- Each anchor is created fresh on hover and removed after
- Uses event delegation for efficient memory usage
- Anchor links are functional for page navigation

## `ID_PREFIX`
Default: `'section'`  
The prefix used when generating IDs for headings.

## `HAS_SECTION_ANCHOR_FLAG_NAME`
Default: `'hasSpaishSectionAnchor'`  
Data attribute name used to track which elements have anchors to prevent duplicates.

## `ANCHOR_TEXT`
Default: `'#'`  
The text content displayed in anchor links.

