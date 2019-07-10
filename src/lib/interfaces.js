'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function isGlobalXpub(data) {
  return (
    Buffer.isBuffer(data.extendedPubkey) &&
    Buffer.isBuffer(data.masterFingerprint) &&
    typeof data.path === 'string' &&
    data.extendedPubkey.length === 78 &&
    [2, 3].includes(data.extendedPubkey[45]) &&
    data.masterFingerprint.length === 4
  );
}
exports.isGlobalXpub = isGlobalXpub;
function isPartialSig(data) {
  return (
    Buffer.isBuffer(data.pubkey) &&
    Buffer.isBuffer(data.signature) &&
    [33, 65].includes(data.pubkey.length) &&
    [2, 3, 4].includes(data.pubkey[0]) &&
    isDerSigWithSighash(data.signature)
  );
}
exports.isPartialSig = isPartialSig;
function isDerSigWithSighash(buf) {
  if (!Buffer.isBuffer(buf) || buf.length < 9) return false;
  if (buf[0] !== 0x30) return false;
  if (buf.length !== buf[1] + 3) return false;
  if (buf[2] !== 0x02) return false;
  const rLen = buf[3];
  if (rLen > 33 || rLen < 1) return false;
  if (buf[3 + rLen + 1] !== 0x02) return false;
  const sLen = buf[3 + rLen + 2];
  if (sLen > 33 || sLen < 1) return false;
  if (buf.length !== 3 + rLen + 2 + sLen + 2) return false;
  return true;
}
function isBip32Derivation(data) {
  return (
    Buffer.isBuffer(data.pubkey) &&
    Buffer.isBuffer(data.masterFingerprint) &&
    typeof data.path === 'string' &&
    [33, 65].includes(data.pubkey.length) &&
    [2, 3, 4].includes(data.pubkey[0]) &&
    data.masterFingerprint.length === 4
  );
}
exports.isBip32Derivation = isBip32Derivation;
function isWitnessUtxo(data) {
  return Buffer.isBuffer(data.script) && typeof data.value === 'number';
}
exports.isWitnessUtxo = isWitnessUtxo;
