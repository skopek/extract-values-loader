const path = require("path");
const slash = require('slash');
const Module = require("module");

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

    if (!options.extract) {
        options.extract = Object.keys(output);
    }

    const obj = {};

    options.extract.forEach((key) => {
        obj[key] = output[key];
    });

    obj.file = './' + slash(path.relative(this.rootContext, this.resourcePath));

    this.addValue(obj);

    return source;
}

module.exports = extractValues;