import tape from 'tape';
import { Psbt } from '../../lib/psbt.js';
import { fixtures } from '../fixtures/update.js';
import { transactionFromBuffer } from '../utils/txTools.js';
let lastAfter;
for (const f of fixtures) {
  tape(f.description, t => {
    const before = f.before || lastAfter;
    const psbt = Psbt.fromBase64(before, transactionFromBuffer);
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
