const withPlugins = require('next-compose-plugins');

const config = {
  target: 'serverless',
};

module.exports = withPlugins([], config);
