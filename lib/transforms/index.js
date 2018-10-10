"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var resolveFragments_1 = require("./resolveFragments");
exports.resolveFragments = resolveFragments_1.resolveFragments;
function applyTransforms(dir) {
    var transforms = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        transforms[_i - 1] = arguments[_i];
    }
    var transformedDir = dir;
    transforms.forEach(function (transform) {
        transformedDir = transform(transformedDir);
    });
    return transformedDir;
}
exports.applyTransforms = applyTransforms;
//# sourceMappingURL=index.js.map