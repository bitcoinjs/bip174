'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const unsignedTx = require('./global/unsignedTx');
const nonWitnessUtxo = require('./input/nonWitnessUtxo');
const partialSig = require('./input/partialSig');
const witnessUtxo = require('./input/witnessUtxo');
const bip32Derivation = require('./shared/bip32Derivation');
const globals = {
  unsignedTx,
};
exports.globals = globals;
const inputs = {
  bip32Derivation,
  nonWitnessUtxo,
  partialSig,
  witnessUtxo,
};
exports.inputs = inputs;
const outputs = {
  bip32Derivation,
};
exports.outputs = outputs;
