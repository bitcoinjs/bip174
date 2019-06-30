'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../../lib/psbt');
const valid_1 = require('../fixtures/valid');
for (const f of valid_1.fixtures) {
  tape(`Test: Should not throw`, t => {
    t.doesNotThrow(() => {
      psbt_1.Psbt.fromBase64(f);
    });
    t.end();
  });
}
