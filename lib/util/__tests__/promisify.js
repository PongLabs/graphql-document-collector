"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var promisify_1 = require("../promisify");
describe('Promisification utility', function () {
    var simpleFunc = function (cb) {
        cb(null, 'done');
    };
    var erroringFunc = function (cb) {
        cb(new Error('errored'));
    };
    var multiArgsFunc = function (a, b, cb) {
        cb(null, a + b);
    };
    it('should handle simple callbacks', function (done) {
        promisify_1.promisify(simpleFunc)()
            .then(function (res) {
            chai_1.assert.equal(res, 'done');
            done();
        });
    });
    it('should handle erroring callbacks', function (done) {
        promisify_1.promisify(erroringFunc)()
            .catch(function (err) {
            chai_1.assert.equal(err.message, 'errored');
            done();
        });
    });
    it('should handle callbacks from multi args functions', function (done) {
        promisify_1.promisify(multiArgsFunc)(1, 2)
            .then(function (res) {
            chai_1.assert.equal(res, 3);
            done();
        });
    });
});
//# sourceMappingURL=promisify.js.map