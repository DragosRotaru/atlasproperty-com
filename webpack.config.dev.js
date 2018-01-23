const merge = require('webpack-merge');
const common = require('./webpack.config.common.js');

const config = merge(common, {
  stats: 'detailed',
  devtool: 'eval',
  devServer: {
    contentBase: common.output.path,
    historyApiFallback: true,
    hot: true,
    proxy: [
      {
        context: ['/graphql', '/admin'],
        target: 'http://localhost:5000',
        secure: false,
      },
    ],
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
});

module.exports = config;
