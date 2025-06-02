spaish.details = {
  reopen: (pageKey, nodeSelectors) => {

    const storeOpenSection = (sessionKey, nodeSelectors) => {
      window.addEventListener('beforeunload', () => {
        const openSections = nodeSelectors.filter(sel => document.querySelector(sel)?.open);
        spaish.sessionStore.writeArray(sessionKey, openSections);
      });
    }

    const restoreOpenSections = (sessionKey) => {
      const openSectionsSelectors = spaish.sessionStore.readArray(sessionKey);
      const selector = openSectionsSelectors.join(',');
      if (selector) {
        document.querySelectorAll(selector).forEach($el => $el.open = true);
      }
    }

    const sessionKey = `${pageKey}---dialog-reopen`;
    restoreOpenSections(sessionKey);
    storeOpenSection(sessionKey, nodeSelectors);
  },
};
