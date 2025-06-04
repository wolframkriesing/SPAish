spaish.section = {
  ID_PREFIX: 'section',
  HAS_SECTION_ANCHOR_FLAG_NAME: 'hasSpaishSectionAnchor',
  ANCHOR_TEXT: '#',
  
  addId($section, prefix = this.ID_PREFIX) {
    if (!$section.id) {
      $section.id = `${prefix}-${spaish._toSlug($section.textContent.trim())}`;
    }
  },
  addIds(prefix = this.ID_PREFIX) {
    const $sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    $sections.forEach(($section) => this.addId($section, prefix));
  },
  addAnchor($section) {
    this.addId($section);
    if ($section.dataset[this.HAS_SECTION_ANCHOR_FLAG_NAME]) {
      return;
    }

    // Only set position if not already relative or absolute.
    // So the `link` below can be positioned absolutely.
    if (!['relative', 'absolute'].includes($section.style.position)) {
      $section.style.position = 'relative';
    }
    const link = document.createElement('a');
    link.href = `#${$section.id}`;
    link.innerHTML = this.ANCHOR_TEXT;
    link.style.position = 'absolute';
    link.style.left = '0';
    link.style.top = '0';
    link.style.transform = 'translateX(-100%)';
    link.style.paddingInlineEnd = '0.2em';
    $section.appendChild(link);
    $section.dataset[this.HAS_SECTION_ANCHOR_FLAG_NAME] = 'true';

    const removeHandler = () => {
      delete $section.dataset[this.HAS_SECTION_ANCHOR_FLAG_NAME];
      $section.removeChild(link);
    };
    $section.addEventListener('pointerleave', removeHandler, {once: true});
  },
  addAnchors() {
    this.addIds();
    const addAnchorOnHover = ($el) => {
      $el.addEventListener('pointerover', (e) => this.addAnchor(e.currentTarget));
    };

    document
      .querySelectorAll('h1, h2, h3, h4, h5, h6')
      .forEach(addAnchorOnHover);
  },
};
