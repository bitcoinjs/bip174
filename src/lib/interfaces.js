'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function isPartialSig(data) {
  return Buffer.isBuffer(data.pubkey) && Buffer.isBuffer(data.signature);
}
exports.isPartialSig = isPartialSig;
function isBip32Derivation(data) {
  return (
    Buffer.isBuffer(data.pubkey) &&
    Buffer.isBuffer(data.masterFingerprint) &&
    typeof data.path === 'string'
  );
}
exports.isBip32Derivation = isBip32Derivation;
function isWitnessUtxo(data) {
  return Buffer.isBuffer(data.script) && typeof data.value === 'number';
}
exports.isWitnessUtxo = isWitnessUtxo;
