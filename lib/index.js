"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var transforms_1 = require("./transforms");
var flatten_1 = require("./flatten");
var loader_1 = require("./loader");
__export(require("./transforms"));
__export(require("./flatten"));
__export(require("./loader"));
function loadTransformAndFlatten(basePath, globPath, transforms) {
    if (transforms === void 0) { transforms = [transforms_1.resolveFragments]; }
    return loader_1.loadGlob(basePath, globPath)
        .then(function (root) {
        return flatten_1.flattenDirectoryStructure(transforms_1.applyTransforms.apply(void 0, [root].concat(transforms)));
    });
}
exports.default = loadTransformAndFlatten;
//# sourceMappingURL=index.js.map