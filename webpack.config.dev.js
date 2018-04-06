const webpack = require('webpack');
const merge = require('webpack-merge');
const DashboardPlugin = require('webpack-dashboard/plugin');
const common = require('./webpack.config.common.js');

const config = merge(common, {
  stats: 'detailed',
  devtool: 'eval',
  devServer: {
    contentBase: common.output.path,
    historyApiFallback: true,
    hot: true,
    /* proxy: [
      {
        context: ['/graphql'],
        target: 'http://localhost:5000',
        secure: false,
      },
    ],
    */
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
      'process.env.DEBUG': JSON.stringify('*'),
      'process.env.APP_NAME': JSON.stringify('Rotaru & Co.'),
      'process.env.APP_COLOR': JSON.stringify('#fffff'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
});

module.exports = config;
