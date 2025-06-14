import {docsKit} from '../../picossg/src/kits/index.js';
import packageJson from '../package.json' with {type: 'json'};

/**
 * @typedef {import('../../picossg/src/kits/docs/index.js').DocsKitPages} DocsKitPages
 * @typedef {import('../../picossg/src/kits/docs/index.js').DocsKitNav} DocsKitNav
 * @typedef {import('../../picossg/src/kits/docs/index.js').DocsKitSite} DocsKitSite
 * @typedef {import('../../picossg/src/config.js').Config} Config
 */

const preprocess = async (files, config) => {
  /** @type {DocsKitPages} */
  const pages = new Map([
    ['index.md', 'index.html'],
    ['colorScheme.md', 'colorScheme/index.html'],
    ['section.md', 'section/index.html'],
    ['details.md', 'details/index.html'],
    ['scroll.md', 'scroll/index.html'],
    ['section.md', 'section/index.html'],
    
    ['api/colorScheme.md', 'api/colorScheme.html'],
    ['api/section.md', 'api/section.html'],
    ['api/details.md', 'api/details.html'],
    ['api/scroll.md', 'api/scroll.html'],
    ['api/store.md', 'api/store.html'],
  ]);

  /** @type {DocsKitNav} */
  const nav = new Map([
    ['Overview', [
      'index.md',
      'colorScheme.md',
      'details.md',
      'scroll.md',
    ]],
    ['API', [
      'api/colorScheme.md',
      'api/details.md',
      'api/scroll.md',
      'api/section.md',
      'api/store.md',
    ]],
    ['About', [
      // 'changelog',
    ]],
  ]);

  /** @type {DocsKitSite} */
  const site = {
    title: 'SPAish',
    description: 'SPAish....',
    summaryImage: '/og-image.webp',
    version: packageJson.version,
    baseUrl: '/tools/spaish',
    url: 'https://picossg.dev',
    links: [
      {url: 'https://codeberg.org/wolframkriesing/picossg', title: 'Source code'},
      {url: 'https://mastodontech.de/@wolframkriesing', title: 'Contact'},
    ]
  };
  
  await docsKit.preprocess(files, config, {pages, nav, site});
}

const configure = ({njk}) => {
  docsKit.configure({njk});
}

/**
 * @param config {Config}
 */
const preCreateProcessors = (config) => {
  config.templatePaths = [
    config.contentDir,
    docsKit.KITS_TEMPLATE_PATH,
  ];
}

export {preprocess, configure, preCreateProcessors}
