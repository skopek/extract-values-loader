
const path = require("path");
const ExtractValuesWebpackPlugin = require("../../lib/index.js").Plugin;

const extractValuesLoader = require.resolve("../../lib/index.js");
const pathToItem1Js = require.resolve("./lib/1.item.js");
const pathToItem2Js = require.resolve("./lib/2.item.js");

module.exports = {
  mode: 'production',
  entry: {
    item1: pathToItem1Js,
    item2: pathToItem2Js
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.item\.js$/,
        loader: extractValuesLoader
      }
    ]
  },
  plugins: [
    new ExtractValuesWebpackPlugin('items.js')
  ]
};