'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../../lib/psbt');
const valid_1 = require('../fixtures/valid');
const txTools_1 = require('../utils/txTools');
for (const f of valid_1.fixtures) {
  tape(`Test: Should not throw`, t => {
    let psbt;
    t.doesNotThrow(() => {
      psbt = psbt_1.Psbt.fromBase64(f, txTools_1.transactionFromBuffer);
    }, 'fromBase64');
    t.doesNotThrow(() => {
      const out = psbt.toBase64();
      t.equal(out, f);
    }, 'toBase64');
    t.end();
  });
}
