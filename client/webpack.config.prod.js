const webpack = require("webpack");
const merge = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
// const [BundleAnalyzerPlugin] = require('webpack-bundle-analyzer');
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "production",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { modules: true, importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
      "process.env.DEBUG": JSON.stringify(""),
      "process.env.APP_NAME": JSON.stringify(""),
      "process.env.APP_COLOR": JSON.stringify(""),
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
    }),
    new UglifyJSPlugin({
      sourceMap: true,
    }),
    new FaviconsWebpackPlugin({
      logo: "./src/static/favicon.png",
      prefix: "icons-[hash]/",
      emitStats: false,
      statsFilename: "iconstats-[hash].json",
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
  ],
});
