import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/create';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const psbt = new Psbt();
    for (const input of f.input.addInputs) {
      psbt.addInput(input);
    }
    for (const output of f.input.addOutputs) {
      psbt.addOutput(output);
    }
    t.equal(psbt.toBase64(), f.expected);
    t.end();
  });
}
