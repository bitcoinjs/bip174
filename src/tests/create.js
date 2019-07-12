'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const create_1 = require('./fixtures/create');
const txTools_1 = require('./utils/txTools');
for (const f of create_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const psbt = new psbt_1.Psbt(txTools_1.getDefaultTx(2));
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
