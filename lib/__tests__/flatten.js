"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var loader_1 = require("../loader");
var flatten_1 = require("../flatten");
var path = require("path");
describe('Directory structure flattener', function () {
    it('should make docs accessible by path', function () {
        return loader_1.loadGlob(path.join(__dirname, '..', '..', 'example'), '**/*.graphql')
            .then(function (root) {
            var flattened = flatten_1.flattenDirectoryStructure(root);
            chai_1.assert.deepEqual(Object.keys(flattened), [
                "fragments/onFilm/Movie.graphql",
                "fragments/onPlanet/Place.graphql",
                "queries/ListMovies.graphql",
            ]);
        });
    });
});
//# sourceMappingURL=flatten.js.map