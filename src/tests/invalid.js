'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const invalid_1 = require('./fixtures/invalid');
// const res: any[] = [];
for (const f of invalid_1.fixtures) {
  tape(`Test: Should throw "${f.exception}"`, t => {
    t.throws(() => {
      psbt_1.Psbt.fromBase64(f.b64);
    }, new RegExp(f.exception));
    t.end();
  });
}
// setTimeout(() => {
//   let jsonStr = JSON.stringify(res, null, 2).replace(/("b64": ")/g, 'X$1');
//   jsonStr = jsonStr.replace(/X("b64": "[^"]{90})/g, '$1" +\nY"b64": "');
//   while (!!jsonStr.match(/"b64": "[^"]{91}/)) {
//     jsonStr = jsonStr.replace(/Y"b64": ("[^"]{90})/g, '$1" +\nY"b64": "');
//   }
//   jsonStr = jsonStr.replace(/^Y"b64": /gm, '');
//   jsonStr = jsonStr.replace(/ \+\n""\n/g, '');
//   console.log(jsonStr);
// }, 3000);
