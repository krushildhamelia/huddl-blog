const path = require('path');

const baseUrl = '';

module.exports = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  basePath: baseUrl,
  env: {
    baseUrl: baseUrl,
  },
};
