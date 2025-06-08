import {docsKit} from '../../picossg/src/kits/index.js';
import packageJson from '../package.json' with {type: 'json'};

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
  ])

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
    ]],
    ['About', [
      // 'changelog',
    ]],
  ]);

  /** @type {DocsKitSite} */
  const site = {
    title: 'SPAish',
    abstract: 'SPAish....',
    summaryImage: '/og-image.webp',
    version: packageJson.version,
    links: [
      {url: 'https://codeberg.org/wolframkriesing/picossg', title: 'Source code'},
      {url: 'https://mastodontech.de/@wolframkriesing', title: 'Contact'},
    ]
  };
  
  await docsKit.preprocess(files, config, {pages, nav, site})
  
  const data = files.get('index.md')
  data._frontmatter.layout = '_base.njk';
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
