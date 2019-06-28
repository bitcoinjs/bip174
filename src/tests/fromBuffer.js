'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const fromBuffer_1 = require('./fixtures/fromBuffer');
for (const f of fromBuffer_1.fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      psbt_1.Psbt.fromHex(f.hex, tx => {
        return {
          inputCount: tx[0],
          outputCount: tx[1],
        };
      });
    }, f.exception);
    t.end();
  });
}
