'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const fromBuffer_1 = require('../lib/parser/fromBuffer');
const psbt_1 = require('../lib/psbt');
const keyValsToPsbt_1 = require('./fixtures/keyValsToPsbt');
const txTools_1 = require('./utils/txTools');
for (const f of keyValsToPsbt_1.fixtures) {
  if (f.exception) {
    tape('From keyVals should throw:', t => {
      t.throws(
        () => {
          fromBuffer_1.psbtFromKeyVals(txTools_1.getDefaultTx(), f.data);
        },
        Error,
        f.exception,
      );
      t.end();
    });
  } else {
    const tx = txTools_1.transactionFromBuffer(
      f.data.globalMapKeyVals.filter(kv => kv.key[0] === 0)[0].value,
    );
    tape('From keyVals should not throw:', t => {
      const data = fromBuffer_1.psbtFromKeyVals(tx, f.data);
      const psbt = new psbt_1.Psbt(tx);
      Object.assign(psbt, data);
      t.strictEqual(psbt.toBase64(), f.expected);
      // else console.log(psbt.toBase64());
      t.end();
    });
  }
}
