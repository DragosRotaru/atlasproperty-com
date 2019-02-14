const webpack = require("webpack");
const merge = require("webpack-merge");
const DashboardPlugin = require("webpack-dashboard/plugin");
const common = require("./webpack.config.common.js");

module.exports = merge(common, {
  mode: "development",
  stats: "detailed",
  devtool: "eval",
  devServer: {
    contentBase: common.output.path,
    historyApiFallback: true,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization",
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          "style-loader",
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
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.APP_NAME": JSON.stringify(""),
      "process.env.APP_COLOR": JSON.stringify(""),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new DashboardPlugin(),
  ],
});
