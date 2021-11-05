const PluginFootnotes = require('eleventy-plugin-footnotes')
const { asideShortcode, imageShortcode, iconShortcode, socialIconShortcode, quoteShortcode } = require('./config/shortcodes');
const {
  wordCount,
  limit,
  sortByKey,
  toHtml,
  where,
  toISOString,
  dividedBy,
  newlineToBr,
  toAbsoluteUrl,
  stripNewlines,
  stripHtml,
  jsonParse,
  getLatestCollectionItemDate,
  compileAndMinifyScss,
} = require('./config/filters');
const { getAllPosts, getAllUniqueCategories, getPostsByCategory } = require('./config/collections');
const markdownLib = require('./config/plugins/markdown');
const { dir, imagePaths } = require('./config/constants');
const { slugifyString } = require('./config/utils');
const { escape } = require('lodash');
const dotenv = require('dotenv');

// Load .env environment variables
dotenv.config()

const TEMPLATE_ENGINE = 'liquid';

module.exports = (eleventyConfig) => {
  // Watch targets
  eleventyConfig.addWatchTarget(imagePaths.source);

  // Pass-through copy for static assets
  eleventyConfig.addPassthroughCopy(`${dir.input}/${dir.assets}/fonts`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/art`);
  eleventyConfig.addPassthroughCopy(`${imagePaths.source}/404`);

  // Custom shortcodes
  eleventyConfig.addPairedShortcode('aside', asideShortcode);
  eleventyConfig.addPairedShortcode('quote', quoteShortcode);
  eleventyConfig.addShortcode('image', imageShortcode);
  eleventyConfig.addShortcode('icon', iconShortcode);
  eleventyConfig.addShortcode('socialIcon', socialIconShortcode);

  // Custom filters
  eleventyConfig.addFilter('wordCount', wordCount);
  eleventyConfig.addFilter('limit', limit);
  eleventyConfig.addFilter('sortByKey', sortByKey);
  eleventyConfig.addFilter('where', where);
  eleventyConfig.addFilter('escape', escape);
  eleventyConfig.addFilter('jsonify', JSON.stringify);
  eleventyConfig.addFilter('toHtml', toHtml);
  eleventyConfig.addFilter('toIsoString', toISOString);
  eleventyConfig.addFilter('dividedBy', dividedBy);
  eleventyConfig.addFilter('newlineToBr', newlineToBr);
  eleventyConfig.addFilter('toAbsoluteUrl', toAbsoluteUrl);
  eleventyConfig.addFilter('stripNewlines', stripNewlines);
  eleventyConfig.addFilter('stripHtml', stripHtml);
  eleventyConfig.addFilter('slugify', slugifyString);
  eleventyConfig.addFilter('jsonParse', jsonParse);
  eleventyConfig.addFilter('getLatestCollectionItemDate', getLatestCollectionItemDate);
  eleventyConfig.addFilter('compileAndMinifyScss', compileAndMinifyScss);
  eleventyConfig.addFilter('keys', Object.keys);
  eleventyConfig.addFilter('values', Object.values);
  eleventyConfig.addFilter('entries', Object.entries);

  // Custom collections
  eleventyConfig.addCollection('posts', getAllPosts);
  eleventyConfig.addCollection('categories', getAllUniqueCategories);
  eleventyConfig.addCollection('postsByCategory', getPostsByCategory);

  // Plugins
  eleventyConfig.addPlugin(PluginFootnotes, {
    baseClass: 'footnotes',
    classes: {
      list: 'list',
    },
    title: 'Footnotes',
    titleId: 'footnotes-label',
    backLinkLabel: (footnote, index) => `Back to reference ${index + 1}`,
  });
  eleventyConfig.setLibrary('md', markdownLib);

  return {
    dir,
    dataTemplateEngine: TEMPLATE_ENGINE,
    markdownTemplateEngine: TEMPLATE_ENGINE,
    htmlTemplateEngine: TEMPLATE_ENGINE,
    templateFormats: ['html', 'md', TEMPLATE_ENGINE],
  };
};
