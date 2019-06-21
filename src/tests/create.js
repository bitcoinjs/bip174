'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const create_1 = require('./fixtures/create');
for (const f of create_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const psbt = new psbt_1.Psbt();
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
