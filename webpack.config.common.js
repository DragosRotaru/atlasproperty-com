const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');

const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const mainPath = path.resolve(__dirname, 'src/Root.jsx');
const indexPath = path.resolve(__dirname, 'src/index.ejs');
const nodeModulesPath = path.resolve(__dirname, 'node_modules');

const config = {
  entry: mainPath,
  output: {
    filename: '[name].[hash].js',
    path: buildPath,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: nodeModulesPath,
        use: 'babel-loader',
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: nodeModulesPath,
        use: 'graphql-tag/loader',
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: '[name]--[local]--[hash:base64:8]',
              },
            },
            'postcss-loader',
          ],
        }),
      },
      {
        test: /\.(woff|woff2)$/,
        use: 'url-loader?limit=100000',
      },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        exclude: nodeModulesPath,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(['build']),
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      title: 'DEVELOPMENT',
      template: indexPath,
    }),
    new HtmlWebpackHarddiskPlugin(),
//    new DashboardPlugin(),
  ],
};

module.exports = config;
