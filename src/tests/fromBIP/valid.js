'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../../lib/psbt');
const valid_1 = require('../fixtures/valid');
const txTools_1 = require('../utils/txTools');
for (const f of valid_1.fixtures) {
  tape(`Test: Should not throw`, t => {
    t.doesNotThrow(() => {
      psbt_1.Psbt.fromBase64(f, txTools_1.transactionFromBuffer);
    });
    t.end();
  });
}
