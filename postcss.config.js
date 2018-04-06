/* eslint-disable global-require */
const fs = require('fs');

// temporary fix until DoIUse adheres to browserslist standard
const browserslistrc = fs.readFileSync('.browserslistrc').toString().split('\n');

const config = {
  plugins: [
    require('postcss-cssnext'), // includes autoprefixer
    require('postcss-modules-values'),
    require('postcss-font-magician'),
    require('doiuse')({
      browsers: browserslistrc,
    }),
    require('postcss-reporter')({
      clearAllMessages: true,
    }),
  ],
};
/* eslint-enable global-require */

module.exports = config;
