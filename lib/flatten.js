"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function flattenDirectoryStructure(dir, flatMap, cwd) {
    if (flatMap === void 0) { flatMap = {}; }
    if (cwd === void 0) { cwd = []; }
    dir.documents.forEach(function (doc) {
        flatMap[cwd.concat([doc.name.value]).join('/')] = doc;
    });
    dir.directories.forEach(function (dir) {
        flattenDirectoryStructure(dir, flatMap, cwd.concat([dir.name.value]));
    });
    return flatMap;
}
exports.flattenDirectoryStructure = flattenDirectoryStructure;
//# sourceMappingURL=flatten.js.map