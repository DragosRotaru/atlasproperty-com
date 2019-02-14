/* eslint-disable global-require */
const fs = require("fs");

const configFile = JSON.parse(fs.readFileSync("package.json").toString());

module.exports = {
  plugins: [
    require("postcss-cssnext"), // includes autoprefixer
    require("postcss-modules-values"),
    require("postcss-font-magician"),
    require("doiuse")({ browsers: configFile.browserslist }),
    require("postcss-reporter")({ clearAllMessages: true }),
  ],
};
/* eslint-enable global-require */
