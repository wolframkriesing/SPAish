spaish.toggleColorScheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', newTheme);
  spaish._store.writeString('spaish-color-scheme', newTheme);
}

spaish.restoreLastColorScheme = () => {
  // Initialize theme from storage or system preference
  const savedTheme = spaish._store.readString('spaish-color-scheme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', initialTheme);
}
