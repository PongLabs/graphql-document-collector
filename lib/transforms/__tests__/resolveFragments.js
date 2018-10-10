"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var loader_1 = require("../../loader");
var resolveFragments_1 = require("../resolveFragments");
var path = require("path");
describe('Resolve fragments transformer', function () {
    describe('createFragmentMap', function () {
        it('should map fragments in a plain JS object', function () {
            return Promise.all([
                loader_1.loadGlob(path.join(__dirname, '..', '..', '..', 'example'), '**/*.graphql'),
                loader_1.loadDocument(path.join(__dirname, '..', '..', '..', 'example', 'fragments', 'onFilm', 'Movie.graphql')),
            ])
                .then(function (_a) {
                var root = _a[0], movieFragDoc = _a[1];
                var fMap = resolveFragments_1.createFragmentMap(root);
                chai_1.assert.deepEqual(fMap['Movie'], movieFragDoc.definitions[0]);
            });
        });
    });
    describe('addFragmentsToDocument', function () {
        it('should resolve all nested fragments', function () {
            return loader_1.loadGlob(path.join(__dirname, '..', '..', '..', 'example'), '**/*.graphql')
                .then(function (root) {
                var fMap = resolveFragments_1.createFragmentMap(root);
                var origDoc = root.directories[1].documents[0];
                var transformedDoc = resolveFragments_1.addFragmentsToDocument(origDoc, fMap);
                chai_1.assert.equal(transformedDoc.definitions.length, 3);
            });
        });
    });
    describe('resolveFragments', function () {
        it('should resolve all nested fragments in inner docs', function () {
            return loader_1.loadGlob(path.join(__dirname, '..', '..', '..', 'example'), '**/*.graphql')
                .then(function (root) {
                var transformedRoot = resolveFragments_1.resolveFragments(root);
                chai_1.assert.equal(transformedRoot.directories[1].documents[0].definitions.length, 3);
            });
        });
        it('should not re-add fragments already defined in the document', function () {
            return loader_1.loadGlob(path.join(__dirname, '..', '..', '..', 'example'), '**/*.graphql')
                .then(function (root) {
                var transformedRoot = resolveFragments_1.resolveFragments(resolveFragments_1.resolveFragments(root));
                chai_1.assert.equal(transformedRoot.directories[1].documents[0].definitions.length, 3);
            });
        });
    });
});
//# sourceMappingURL=resolveFragments.js.map