const loaderUtils = require("loader-utils");
const extractValues = require('./extract-values');
const Plugin = require('./plugin');

function loader(source) {
    const options = loaderUtils.getOptions(this);

    return extractValues.call(this, options || {}, source);
}

module.exports = loader;
module.exports.Plugin = Plugin;
module.exports.extractValues = extractValues;