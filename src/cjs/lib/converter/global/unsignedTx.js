'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_js_1 = require('../../typeFields.js');
function encode(data) {
  return {
    key: Buffer.from([typeFields_js_1.GlobalTypes.UNSIGNED_TX]),
    value: data.toBuffer(),
  };
}
exports.encode = encode;
