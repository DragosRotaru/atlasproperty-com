const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const [BundleAnalyzerPlugin] = require('webpack-bundle-analyzer');
const common = require('./webpack.config.common.js');

const config = merge(common, {
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      'process.env.DEBUG': JSON.stringify('*'),
      'process.env.APP_NAME': JSON.stringify('Rotaru & Co.'),
      'process.env.APP_COLOR': JSON.stringify('#fffff'),
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new FaviconsWebpackPlugin({
      logo: process.env.APP_FAVICON,
      prefix: 'icons-[hash]/',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: process.env.APP_COLOR,
      title: process.env.APP_NAME,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        windows: true,
      },
    }),
    new BundleAnalyzerPlugin(),
  ],
});

module.exports = config;
