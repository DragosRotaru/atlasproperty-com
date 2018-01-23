/* eslint-disable global-require */

const config = {
  plugins: [
    require('postcss-cssnext'), // includes autoprefixer
    require('postcss-modules-values'),
    require('postcss-font-magician'),
    require('postcss-reporter'),
    /* require('doiuse')({
      browsers: ['> 1%'],
    }),
    require('cssnano')({
      preset: ['default', {
        autoprefixer: false,
      }],
    }), */
  ],
};
/* eslint-enable global-require */

module.exports = config;
