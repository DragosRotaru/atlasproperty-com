/* eslint-disable global-require */

const config = {
  plugins: [
    require('postcss-cssnext'), // includes autoprefixer
    require('postcss-modules-values'),
    require('postcss-font-magician'),
    require('doiuse')({
      browsers: ['> 5%'],
      ignore: [], // features to ignore
      ignoreFiles: [], // file globs to match against original source file path, to ignore
    }),
    require('postcss-reporter'),
    /* require('cssnano')({
      preset: ['default', {
        autoprefixer: false,
      }],
    }), */
  ],
};
/* eslint-enable global-require */

module.exports = config;
