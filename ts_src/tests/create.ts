import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/create';

const getNewPsbt = (): Psbt => {
  const psbt = new Psbt();
  psbt.globalMap.unsignedTx![0] = 2; // BIP fixtures all use version 2
  return psbt;
};

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const psbt = getNewPsbt();
    for (const input of f.input.addInputs) {
      psbt.addInput(input);
    }
    for (const output of f.input.addOutputs) {
      psbt.addOutput(output);
    }
    t.equal(psbt.toBase64(), f.expectedBeforeUpdate);
    for (const [i, input] of f.input.updateInputData.entries()) {
      const attrs = Object.keys(input);
      for (const attr of attrs) {
        const upperAttr = attr.replace(/^./, s => s.toUpperCase());
        // @ts-ignore
        let adder = psbt[`add${upperAttr}ToInput`];
        if (adder !== undefined) {
          adder = adder.bind(psbt);
          // @ts-ignore
          const data = input[attr];
          if (Array.isArray(data)) {
            data.forEach(d => adder(i, d));
          } else {
            adder(i, data);
          }
        }
      }
    }
    for (const [i, output] of f.input.updateOutputData.entries()) {
      const attrs = Object.keys(output);
      for (const attr of attrs) {
        const upperAttr = attr.replace(/^./, s => s.toUpperCase());
        // @ts-ignore
        let adder = psbt[`add${upperAttr}ToOutput`];
        if (adder !== undefined) {
          adder = adder.bind(psbt);
          // @ts-ignore
          const data = output[attr];
          if (Array.isArray(data)) {
            data.forEach(d => adder(i, d));
          } else {
            adder(i, data);
          }
        }
      }
    }
    t.equal(psbt.toBase64(), f.expectedAfterUpdate);
    t.end();
  });
}
