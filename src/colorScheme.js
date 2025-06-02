spaish.colorScheme = {
  toggle: () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    spaish.sessionStore.writeString('spaish-color-scheme', newTheme);
  },
  restoreLast: () => {
    // Initialize theme from storage or system preference
    const savedTheme = spaish.sessionStore.readString('spaish-color-scheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', initialTheme);
  },
}
