"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function promisify(originalFunction) {
    return function promisified() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function promiseExec(resolve, reject) {
            originalFunction.apply(void 0, args.concat([function (err, res) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(res);
                }]));
        });
    };
}
exports.promisify = promisify;
//# sourceMappingURL=promisify.js.map