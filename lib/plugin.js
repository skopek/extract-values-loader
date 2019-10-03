const { RawSource } = require('webpack-sources');

class ExtractValuesWebpackPlugin {
  constructor(options) {
    if (typeof options === 'string') {
      this.options = { filename: options };
    } else {
      this.options = { ...options };
    }

    this.values = [];
  }

  apply(compiler) {
    compiler.hooks.thisCompilation.tap('ExtractValuesWebpackPlugin', (compilation) => {
      compilation.hooks.normalModuleLoader.tap('ExtractValuesWebpackPlugin', (loaderContext, mod) => {
        loaderContext.addValue = (value) => {
          this.values.push(value);
        };
      });

      compilation.hooks.additionalAssets.tapAsync('ExtractValuesWebpackPlugin', (callback) => {
        const { filename } = this.options;
        const stringifiedValues = JSON.stringify(this.values);

        compilation.assets[filename] = new RawSource(`module.exports = ${stringifiedValues};`);

        callback();
      });
    });
  }
}

module.exports = ExtractValuesWebpackPlugin;