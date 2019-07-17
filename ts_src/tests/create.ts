import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/create';
import { getDefaultTx } from './utils/txTools';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const psbt = new Psbt(getDefaultTx(2));
    for (const input of f.input.addInputs) {
      psbt.addInput(input);
    }
    for (const output of f.input.addOutputs) {
      psbt.addOutput(output);
    }
    t.equal(psbt.toBase64(), f.expectedBeforeUpdate);
    for (const [i, input] of f.input.updateInputData.entries()) {
      psbt.updateInput(i, input);
    }
    for (const [i, output] of f.input.updateOutputData.entries()) {
      psbt.updateOutput(i, output);
    }
    t.equal(psbt.toBase64(), f.expectedAfterUpdate);
    t.end();
  });
}
