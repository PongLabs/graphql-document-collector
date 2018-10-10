"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var promisify_1 = require("./util/promisify");
var fs = require("fs");
var path = require("path");
var cbGlob = require("glob");
var readFile = promisify_1.promisify(fs.readFile);
var glob = promisify_1.promisify(cbGlob);
function loadDocument(pt) {
    var splitPath = pt.split(path.sep);
    return readFile(pt)
        .then(function (fileBuffer) { return graphql_1.parse(fileBuffer.toString()); })
        .then(function (doc) { return Object.assign({}, doc, { name: { kind: 'Name', value: splitPath[splitPath.length - 1] } }); });
}
exports.loadDocument = loadDocument;
function loadDirectory(basePath, paths) {
    var documentFileNames = paths.filter(function (pt) { return pt.length === 1; }).map(function (pt) { return pt[0]; });
    var pathsInDirs = paths.filter(function (pt) { return pt.length > 1; });
    var uniqueDirs = Array.from(new Set(pathsInDirs.map(function (pt) { return pt[0]; })));
    return Promise.all([
        Promise.all(documentFileNames.map(function (fileName) {
            return loadDocument(path.join(basePath.join(path.sep), fileName));
        })),
        Promise.all(uniqueDirs.map(function (dirName) {
            var pathsInDir = pathsInDirs
                .filter(function (pt) { return pt[0] === dirName; })
                .map(function (pt) { return pt.slice(1); });
            return loadDirectory(basePath.concat([dirName]), pathsInDir);
        })),
    ])
        .then(function (_a) {
        var documents = _a[0], directories = _a[1];
        return {
            kind: 'DocumentDirectory',
            name: {
                kind: 'Name',
                value: basePath[basePath.length - 1],
            },
            documents: documents,
            directories: directories,
        };
    });
}
function loadGlob(basePath, globPath) {
    var rootDirectory = {};
    return glob(path.join(basePath, globPath))
        .then(function (paths) {
        return paths.map(function (pt) { return pt.slice(basePath.length + 1).split(path.sep); });
    })
        .then(function (paths) { return loadDirectory(basePath.split(path.sep), paths); });
}
exports.loadGlob = loadGlob;
//# sourceMappingURL=loader.js.map