# Extract Values Loader

Webpack loader to extract values from modules by executing given source codes. 

## Installing

```
npm install extract-values-loader --save-dev
```

## Example

### 1.item.js
```javascript
module.exports = () => {
    console.log("Item 1");
};

module.exports.priority = 3;
```

### 2.item.js
```javascript
module.exports = () => {
    console.log("Item 2");
};

module.exports.priority = 5;
```

### items.js
```javascript
module.exports = [];
```

### main.js
```javascript
const items = require("./items.js");

console.log(items);
// [ { priority: 3, file: './lib/1.item.js' },
//   { priority: 5, file: './lib/2.item.js' } ]
```

### webpack.config.js
```javascript
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
        loader: 'extract-values-loader',
        options: {
          extract: ["priority"]
        }
      },
      {
        test: pathToItemsJs,
        loader: 'extract-values-loader',
        options: {
          insert: true
        }
      }
    ]
  }
};
```
