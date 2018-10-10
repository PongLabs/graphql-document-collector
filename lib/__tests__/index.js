"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../index");
var chai_1 = require("chai");
var path = require("path");
var documentsJson = require('../../example/documents.json');
describe('Load, Transform and Flatten', function () {
    it('should load documents in a structured object', function () {
        return index_1.default(path.join(__dirname, '..', '..', 'example'), '**/*.graphql')
            .then(function (docMap) {
            chai_1.assert.deepEqual(JSON.parse(JSON.stringify(docMap)), documentsJson);
        });
    });
});
//# sourceMappingURL=index.js.map