spaish.scroll = {
  /**
   * Stores and restores scroll offsets. Initially just for the window.
   * If `otherNodeSelectors` are provided, they will be scrolled to their last position too.
   */
  restore: (pageKey, otherNodeSelectors = []) => {

    const safeQuerySelector = (selector) => {
      try {
        // In case the selector is e.g. empty, this would throw, handle it too.
        const $node = document.querySelector(selector);
        return [selector, $node];
      } catch {
        return null;
      }
    }

    const storeScrollOffsets = (sessionKey, otherNodeSelectors) => {
      window.addEventListener('beforeunload', () => { // `scrollend` is much nicer, but doesn't work in Safari :(
        const selectorAndOffset = otherNodeSelectors.map(safeQuerySelector)
          .filter(v => v !== null)
          // use `$node?.` to prevent errors thrown when the selector didn't find a node
          .map(([selector, $node]) => [selector, $node?.scrollTop.toFixed(0)])
        ;
        const offsets = new Map([
          ['window', window.scrollY.toFixed(0)],
          ...selectorAndOffset,
        ]);
        spaish.sessionStore.writeMap(sessionKey, offsets);
      });
    }

    const restoreScrollOffsets = (sessionKey) => {
      if ('scrollRestoration' in history) {
        // Disable scroll position restoration when BACK button was clicked.
        history.scrollRestoration = 'manual';
      }

      const selectorToOffsetMap = spaish.sessionStore.readMap(sessionKey);
      for (const [selector, offset] of selectorToOffsetMap) {
        const scrollToY = Number.parseInt(offset);
        if (selector === 'window') {
          window.scrollTo(0, scrollToY);
        } else {
          const $node = document.querySelector(selector);
          if ($node) {
            $node.scrollTop = scrollToY;
          }
        }
      }
    }

    const sessionKey = `${pageKey}---scroll-restore`;
    storeScrollOffsets(sessionKey, otherNodeSelectors);
    restoreScrollOffsets(sessionKey);
  },
};
