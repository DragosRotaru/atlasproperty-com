const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackHarddiskPlugin = require("html-webpack-harddisk-plugin");
const path = require("path");

const buildPath = path.resolve(__dirname, "build");
const mainPath = path.resolve(__dirname, "src/index.jsx");
const indexPath = path.resolve(__dirname, "src/index.ejs");
const nodeModulesPath = path.resolve(__dirname, "node_modules");

module.exports = {
  entry: mainPath,
  output: {
    filename: "[name].[hash].js",
    path: buildPath,
    publicPath: "/",
  },
  resolve: {
    extensions: [".mjs", ".js", ".jsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: nodeModulesPath,
        use: "babel-loader",
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: nodeModulesPath,
        use: "graphql-tag/loader",
      },
      {
        test: /\.(woff|woff2)$/,
        use: "url-loader?limit=100000",
      },
      {
        test: /\.(png|svg|jpg|gif|mp4)$/,
        exclude: nodeModulesPath,
        use: "file-loader",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(["build"]),
    new HtmlWebpackPlugin({ template: indexPath }),
    new HtmlWebpackHarddiskPlugin(),
  ],
};
