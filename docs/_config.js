import path from "path";
import {addStatsProperty} from "@wolframkriesing/picossg/src/plugins/stats.js";
import packageJson from '../package.json' with {type: 'json'};

// Site wide properties
const site = {
  title: 'SPAish',
  abstract: 'SPAish - progressive enhancer for your MPA, make it feel SPAish.',
  summaryImage: '/og-image.webp',
  version: packageJson.version,
};

const toSlug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const DOCS_DIR = '';

const addPropertyNav = (files, {toSlug}) => {
  const pages = new Map([
    ['Overview', [
      '.',
      'colorScheme',
      'details',
      'scroll',
    ]],
    ['API', [
      'api/colorScheme',
      'api/details',
      'api/scroll',
    ]],
    ['About', [
      'changelog',
    ]],
  ]);

  const nav = new Map();
  pages.keys().toArray().forEach(title => nav.set(title, {id: toSlug(title), items: []}));

  for (const [title, pagePaths] of pages) {
    for (const pagePath of pagePaths) {
      for (const [filename, data] of files) {
        if (filename.startsWith(path.join(DOCS_DIR, pagePath, 'index.html'))) {
          nav.get(title).items.push(data);
        }
      }
    }
  }
  for (const [_, data] of files) {
    data.nav = nav;
  }
};

const preprocess = (files) => {
  addStatsProperty(files);

  for (const [filename, data] of files) {
    data._frontmatter.layout = '_base.njk';
    data.title = data._file.content.match(/#\s*(.*)/)?.[1];

    data._site = site
  }
  
  addPropertyNav(files, {toSlug});
}

const configure = ({njk}) => {
  njk.addFilter('slug', toSlug);
  njk.addFilter('readableDateTime', (date) => new Date(date).toLocaleString('en-EN', {
    dateStyle: 'long',
    timeStyle: 'medium',
    hourCycle: 'h23'
  }));
}

export {preprocess, configure}
