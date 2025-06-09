# Changelog

Find here all changes tracked while developing SPAish.

## (Maybe) Future Version

- [ ] tab accordion restore
- [ ] sidebar/menu toggle restore
- [ ] auto-open details when current page linked inside, not sure if this makes always sense
- [ ] A copy-button to copy a headline's URL
- [ ] make `spaish.section.addAnchors()` also copy the URL to the clipboard? maybe show a separate icon when hovering the anchor icon?
- [ ] section: multiple headlines with the same text create the same `id`, so the anchor icon does not work, maybe add a number to the `id`?
- [ ] copy-to-clipboard function
- [ ] details: when `open` attribute is set in the HTML, it should be opened initially but the "update" should come from the storage, so user's changes are respected

## v1.0.5

- [x] add `spaish.section.addAnchors()` which adds `id` attribute if needed and a visual anchor icon to the headings of a section
- [x] added documentation for all functionality, see the [docs](https://picossg.dev/tools/spaish/)
- [ ] put the docs online at https://picossg.dev/tools/spaish/

## v1.0.4

- [x] 1.0.3 did just not work, made it work

## v1.0.3

- [x] namespace all functions to `spaish.{details,colorScheme,scroll}`, tidying up

## v1.0.2

- [x] theme (re)store

## v1.0.0

- [x] details-reopen
- [x] scroll-restore
