const path = require("path");
const slash = require('slash');
const Module = require("module");
const loaderUtils = require("loader-utils");

const values = [];

function extractValues(options, source) {
    const exec = (code, filename) => {
        const mod = new Module(filename, this);
        mod.paths = Module._nodeModulePaths(this.context);
        mod.filename = filename;
        mod._compile(code, filename);

        return mod.exports;
    };

    const output = exec(source, this.resource);

    if (options.extract instanceof Array) {
        const obj = {};

        options.extract.forEach((key) => {
            obj[key] = output[key];
        });

        obj.file = './' + slash(path.relative(this.rootContext, this.resourcePath));

        values.push(obj);
    }

    if (options.insert) {
        const stringifiedValues = JSON.stringify(values);

        return `module.exports = ${stringifiedValues};`;
    }

    return source;
}

function loader(source) {
    const options = loaderUtils.getOptions(this);

    return extractValues.call(this, options, source);
}

module.exports = loader;
module.exports.extractValues = extractValues;