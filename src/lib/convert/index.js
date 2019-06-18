'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../typeFields');
const unsignedTx = require('./global/unsignedTx');
const finalScriptSig = require('./input/finalScriptSig');
const finalScriptWitness = require('./input/finalScriptWitness');
const nonWitnessUtxo = require('./input/nonWitnessUtxo');
const partialSig = require('./input/partialSig');
const porCommitment = require('./input/porCommitment');
const sighashType = require('./input/sighashType');
const witnessUtxo = require('./input/witnessUtxo');
const bip32Derivation = require('./shared/bip32Derivation');
const redeemScript = require('./shared/redeemScript');
const witnessScript = require('./shared/witnessScript');
const globals = {
  unsignedTx,
};
exports.globals = globals;
const inputs = {
  nonWitnessUtxo,
  partialSig,
  sighashType,
  finalScriptSig,
  finalScriptWitness,
  porCommitment,
  witnessUtxo,
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1.InputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1.InputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1.InputTypes.WITNESS_SCRIPT,
  ),
};
exports.inputs = inputs;
const outputs = {
  bip32Derivation: bip32Derivation.makeConverter(
    typeFields_1.OutputTypes.BIP32_DERIVATION,
  ),
  redeemScript: redeemScript.makeConverter(
    typeFields_1.OutputTypes.REDEEM_SCRIPT,
  ),
  witnessScript: witnessScript.makeConverter(
    typeFields_1.OutputTypes.WITNESS_SCRIPT,
  ),
};
exports.outputs = outputs;
