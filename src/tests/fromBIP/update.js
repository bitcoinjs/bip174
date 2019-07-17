'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../../lib/psbt');
const update_1 = require('../fixtures/update');
const txTools_1 = require('../utils/txTools');
let lastAfter;
for (const f of update_1.fixtures) {
  tape(f.description, t => {
    const before = f.before || lastAfter;
    const psbt = psbt_1.Psbt.fromBase64(
      before,
      txTools_1.transactionFromBuffer,
    );
    for (const [i, input] of f.inputData.entries()) {
      psbt.updateInput(i, input);
      if (f.cleanForFinalize) psbt.clearFinalizedInput(i);
    }
    for (const [i, output] of f.outputData.entries()) {
      psbt.updateOutput(i, output);
    }
    const result = psbt.toBase64();
    t.equal(f.after, result);
    lastAfter = f.after;
    t.end();
  });
}
