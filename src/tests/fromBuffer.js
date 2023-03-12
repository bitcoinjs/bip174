'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const fromBuffer_1 = require('./fixtures/fromBuffer');
const txTools_1 = require('./utils/txTools');
const fromBuf = b => new txTools_1.Transaction(b);
for (const f of fromBuffer_1.fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      psbt_1.Psbt.fromHex(f.hex, fromBuf);
    }, new RegExp(f.exception));
    t.end();
  });
}
