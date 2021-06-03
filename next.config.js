const withPlugins = require('next-compose-plugins');

const { nextI18NextRewrites } = require('next-i18next/rewrites');

const localeSubpaths = {
  tr: 'tr',
  en: 'en',
};

const config = {
  target: 'serverless',
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },
};

module.exports = withPlugins([], config);
