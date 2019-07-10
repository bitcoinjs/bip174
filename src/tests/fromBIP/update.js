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
    const psbt = psbt_1.Psbt.fromBase64(before, txTools_1.getInputOutputCounts);
    for (const [i, input] of f.inputData.entries()) {
      for (const key of Object.keys(input)) {
        const upperKey = key.replace(/^./, s => s.toUpperCase());
        // @ts-ignore
        const func = psbt['add' + upperKey + 'ToInput'].bind(psbt);
        // @ts-ignore
        const data = input[key];
        if (Array.isArray(data)) {
          data.forEach(d => func(i, d));
        } else {
          func(i, data);
        }
      }
      if (f.cleanForFinalize) psbt.clearFinalizedInput(i);
    }
    for (const [i, output] of f.outputData.entries()) {
      for (const key of Object.keys(output)) {
        const upperKey = key.replace(/^./, s => s.toUpperCase());
        // @ts-ignore
        const func = psbt['add' + upperKey + 'ToOutput'].bind(psbt);
        // @ts-ignore
        const data = output[key];
        if (Array.isArray(data)) {
          data.forEach(d => func(i, d));
        } else {
          if (data === 'delete') {
            // @ts-ignore
            delete psbt.outputs[i][key];
          } else {
            func(i, data);
          }
        }
      }
    }
    const result = psbt.toBase64();
    t.equal(f.after, result);
    lastAfter = f.after;
    t.end();
  });
}
