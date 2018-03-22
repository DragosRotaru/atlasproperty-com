const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
//const [BundleAnalyzerPlugin] = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
// const DashboardPlugin = require('webpack-dashboard/plugin');

const path = require('path');

const buildPath = path.resolve(__dirname, 'build');
const mainPath = path.resolve(__dirname, 'src/Main.jsx');
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
    new FaviconsWebpackPlugin({
      logo: './src/Static/favicon.png',
      // The prefix for all image files (might be a folder or a name)
      prefix: 'icons-[hash]/',
      // Emit all stats of the generated icons
      emitStats: false,
      // The name of the json containing all favicon information
      statsFilename: 'iconstats-[hash].json',
      // Generate a cache file with control hashes and
      // don't rebuild the favicons until those hashes change
      persistentCache: true,
      // Inject the html into the html-webpack-plugin
      inject: true,
      // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
      background: '#5b8ada',
      // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
      title: process.env.APP_NAME,

      // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
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
    new HtmlWebpackPlugin({
      title: process.env.APP_NAME,
      template: indexPath,
    }),
    new HtmlWebpackHarddiskPlugin(),
//    new BundleAnalyzerPlugin(),
//  new DashboardPlugin(),
  ],
};

module.exports = config;
