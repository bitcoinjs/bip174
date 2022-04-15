'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const typeFields_1 = require('../typeFields');
const globalXpub = require('./global/globalXpub');
const unsignedTx = require('./global/unsignedTx');
const finalScriptSig = require('./input/finalScriptSig');
const finalScriptWitness = require('./input/finalScriptWitness');
const nonWitnessUtxo = require('./input/nonWitnessUtxo');
const partialSig = require('./input/partialSig');
const porCommitment = require('./input/porCommitment');
const sighashType = require('./input/sighashType');
const tapKeySig = require('./input/tapKeySig');
const tapLeafScript = require('./input/tapLeafScript');
const tapMerkleRoot = require('./input/tapMerkleRoot');
const tapScriptSig = require('./input/tapScriptSig');
const witnessUtxo = require('./input/witnessUtxo');
const tapTree = require('./output/tapTree');
const bip32Derivation = require('./shared/bip32Derivation');
const checkPubkey = require('./shared/checkPubkey');
const redeemScript = require('./shared/redeemScript');
const tapBip32Derivation = require('./shared/tapBip32Derivation');
const tapInternalKey = require('./shared/tapInternalKey');
const witnessScript = require('./shared/witnessScript');
const globals = {
  unsignedTx,
  globalXpub,
  // pass an Array of key bytes that require pubkey beside the key
  checkPubkey: checkPubkey.makeChecker([]),
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
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1.InputTypes.PARTIAL_SIG,
    typeFields_1.InputTypes.BIP32_DERIVATION,
  ]),
  tapKeySig,
  tapScriptSig,
  tapLeafScript,
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1.InputTypes.TAP_BIP32_DERIVATION,
  ),
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1.InputTypes.TAP_INTERNAL_KEY,
  ),
  tapMerkleRoot,
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
  checkPubkey: checkPubkey.makeChecker([
    typeFields_1.OutputTypes.BIP32_DERIVATION,
  ]),
  tapBip32Derivation: tapBip32Derivation.makeConverter(
    typeFields_1.OutputTypes.TAP_BIP32_DERIVATION,
  ),
  tapTree,
  tapInternalKey: tapInternalKey.makeConverter(
    typeFields_1.OutputTypes.TAP_INTERNAL_KEY,
  ),
};
exports.outputs = outputs;
