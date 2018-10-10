"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var loader_1 = require("../loader");
var path = require("path");
describe('GraphQL project loader', function () {
    describe('loadDocument', function () {
        it('should be able to load a query document', function () {
            return loader_1.loadDocument(path.join(__dirname, '..', '..', 'example', 'queries', 'ListMovies.graphql'))
                .then(function (doc) {
                chai_1.assert.equal(doc.kind, 'Document');
                chai_1.assert.equal(doc.name.value, 'ListMovies.graphql');
                chai_1.assert.equal(doc.definitions.length, 1);
                chai_1.assert.equal(doc.definitions[0].kind, 'OperationDefinition');
                chai_1.assert.equal(doc.definitions[0].name.value, 'ListMovies');
            });
        });
        it('should be able to load a fragment document', function () {
            return loader_1.loadDocument(path.join(__dirname, '..', '..', 'example', 'fragments', 'onFilm', 'Movie.graphql'))
                .then(function (doc) {
                chai_1.assert.equal(doc.kind, 'Document');
                chai_1.assert.equal(doc.name.value, 'Movie.graphql');
                chai_1.assert.equal(doc.definitions.length, 1);
                chai_1.assert.equal(doc.definitions[0].kind, 'FragmentDefinition');
                chai_1.assert.equal(doc.definitions[0].name.value, 'Movie');
            });
        });
    });
    describe('loadGlob', function () {
        it('should load the whole structure of documents in an extended AST', function () {
            return Promise.all([
                loader_1.loadGlob(path.join(__dirname, '..', '..', 'example'), '**/*.graphql'),
                loader_1.loadDocument(path.join(__dirname, '..', '..', 'example', 'queries', 'ListMovies.graphql')),
                loader_1.loadDocument(path.join(__dirname, '..', '..', 'example', 'fragments', 'onFilm', 'Movie.graphql')),
            ])
                .then(function (_a) {
                var root = _a[0], queryDoc = _a[1], fragmentDoc = _a[2];
                chai_1.assert.equal(root.kind, 'DocumentDirectory');
                chai_1.assert.equal(root.name.value, 'example');
                chai_1.assert.equal(root.directories[0].name.value, 'fragments');
                chai_1.assert.equal(root.directories[0].directories[0].name.value, 'onFilm');
                chai_1.assert.deepEqual(root.directories[0].directories[0].documents[0], fragmentDoc);
                chai_1.assert.equal(root.directories[1].name.value, 'queries');
                chai_1.assert.deepEqual(root.directories[1].documents[0], queryDoc);
            });
        });
    });
});
//# sourceMappingURL=loader.js.map