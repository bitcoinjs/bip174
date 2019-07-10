'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const fromBuffer_1 = require('../lib/parser/fromBuffer');
const psbt_1 = require('../lib/psbt');
const keyValsToPsbt_1 = require('./fixtures/keyValsToPsbt');
for (const f of keyValsToPsbt_1.fixtures) {
  if (f.exception) {
    tape('From keyVals should throw:', t => {
      t.throws(() => {
        fromBuffer_1.psbtFromKeyVals(f.data);
      }, new RegExp(f.exception));
      t.end();
    });
  } else {
    tape('From keyVals should not throw:', t => {
      const data = fromBuffer_1.psbtFromKeyVals(f.data);
      const psbt = new psbt_1.Psbt();
      Object.assign(psbt, data);
      t.strictEqual(psbt.toBase64(), f.expected);
      // else console.log(psbt.toBase64());
      t.end();
    });
  }
}
