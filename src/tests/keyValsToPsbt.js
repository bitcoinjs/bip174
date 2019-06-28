'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const fromBuffer_1 = require('../lib/parser/fromBuffer');
const keyValsToPsbt_1 = require('./fixtures/keyValsToPsbt');
for (const f of keyValsToPsbt_1.fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      fromBuffer_1.psbtFromKeyVals(f.data);
    }, new RegExp(f.exception));
    t.end();
  });
}
