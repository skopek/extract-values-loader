
const extractValuesLoader = require.resolve("../lib/index.js");
const pathToMainJs = require.resolve("./lib/main.js");
const pathToItemsJs = require.resolve("./lib/items.js");
const pathToItem1Js = require.resolve("./lib/1.item.js");
const pathToItem2Js = require.resolve("./lib/2.item.js");

module.exports = {
  entry: [
    pathToMainJs,
    pathToItem1Js,
    pathToItem2Js,
    pathToItemsJs
  ],
  module: {
    rules: [
      {
        test: /\.item\.js$/,
        loader: extractValuesLoader,
        options: {
          extract: ["priority"]
        }
      },
      {
        test: pathToItemsJs,
        loader: extractValuesLoader,
        options: {
          insert: true
        }
      }
    ]
  }
};