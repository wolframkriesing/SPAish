// File is prefixed with "_" to come first in the build process.
const spaish = {
  _toSlug: (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''),
};
