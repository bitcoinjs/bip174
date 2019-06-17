'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const bitcoinjs_lib_1 = require('bitcoinjs-lib');
const typeFields_1 = require('./typeFields');
const varuint = require('varuint-bitcoin');
const range = n => [...Array(n).keys()];
class Psbt {
  static fromBase64(data) {
    const buffer = Buffer.from(data, 'base64');
    return Psbt.fromBuffer(buffer);
  }
  static fromBuffer(buffer) {
    const psbt = new Psbt();
    psbtFromBuffer(buffer, (uTx, inputs, outputs) => {
      psbt.unsignedTx = uTx;
      psbt.inputs = inputs;
      psbt.outputs = outputs;
    });
    return psbt;
  }
  constructor() {
    this.inputs = [];
    this.outputs = [];
    this.unsignedTx = new bitcoinjs_lib_1.Transaction();
  }
  toBase64() {
    // encode self into base64 string rep of official binary encoding
    return '';
  }
  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.
  combine(...those) {
    // Combine this with those.
    // Return self for chaining.
    return this;
  }
  finalize() {
    // Finalize all inputs, default throw if can not
    // Return self for chaining.
    return this;
  }
  extractTransaction() {
    return new bitcoinjs_lib_1.Transaction();
  }
}
exports.Psbt = Psbt;
function psbtFromBuffer(buffer, callback) {
  let offset = 0;
  function getKeyValue() {
    const keyLen = varuint.decode(buffer, offset);
    offset += varuint.encodingLength(keyLen);
    const key = buffer.slice(offset, offset + keyLen);
    offset += keyLen;
    const valLen = varuint.decode(buffer, offset);
    offset += varuint.encodingLength(valLen);
    const value = buffer.slice(offset, offset + valLen);
    offset += valLen;
    return {
      key,
      value,
    };
  }
  function checkEndOfKeyValPairs() {
    if (offset >= buffer.length) {
      throw new Error('Format Error: Unexpected End of PSBT');
    }
    return buffer.readUInt8(offset) === 0;
  }
  const magicNumber = buffer.readUInt32BE(offset);
  offset += 4;
  const globalSeparator = buffer.readUInt8(offset);
  offset += 1;
  if (magicNumber !== 0x70736274) {
    throw new Error('Format Error: Invalid Magic Number');
  }
  if (globalSeparator !== 0xff) {
    throw new Error(
      'Format Error: Magic Number must be followed by 0xff separator',
    );
  }
  // Global fields (Currently only UNSIGNED_TX)
  const globalMaps = [];
  while (!checkEndOfKeyValPairs()) {
    globalMaps.push(getKeyValue());
  }
  offset += 1;
  if (
    globalMaps.length !== 1 ||
    globalMaps[0].key[0] !== typeFields_1.GlobalTypes.UNSIGNED_TX
  ) {
    throw new Error(
      'Format Error: Only one Global KeyValue map allowed, ' +
        'and it must be an UNSIGNED_TX',
    );
  }
  let unsignedTx;
  try {
    unsignedTx = bitcoinjs_lib_1.Transaction.fromBuffer(globalMaps[0].value);
  } catch (err) {
    throw new Error('Format Error: Error parsing Transaction: ' + err.message);
  }
  // Get input and output counts to loop the respective fields
  const inputCount = unsignedTx.ins.length;
  const outputCount = unsignedTx.outs.length;
  const inputs = [];
  const outputs = [];
  // Get input fields
  for (const index of range(inputCount)) {
    const input = {
      keyVals: [],
    };
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      input.keyVals.push(keyVal);
      const keyValPos = input.keyVals.length - 1;
      let pubkey;
      if (
        [
          typeFields_1.InputTypes.PARTIAL_SIG,
          typeFields_1.InputTypes.BIP32_DERIVATION,
        ].includes(keyVal.key[0])
      ) {
        pubkey = keyVal.key.slice(1);
      }
      switch (keyVal.key[0]) {
        case typeFields_1.InputTypes.NON_WITNESS_UTXO:
          if (
            input.nonWitnessUtxo !== undefined ||
            input.witnessUtxo !== undefined
          ) {
            throw new Error(
              'Format Error: Input has multiple [NON_]WITNESS_UTXO',
            );
          }
          try {
            const myData = {
              tx: bitcoinjs_lib_1.Transaction.fromBuffer(keyVal.value),
              index: keyValPos,
            };
            input.nonWitnessUtxo = myData;
          } catch (err) {
            throw new Error(
              'Format Error: Error parsing NON_WITNESS_UTXO: ' + err.message,
            );
          }
          break;
        case typeFields_1.InputTypes.WITNESS_UTXO:
          if (
            input.nonWitnessUtxo !== undefined ||
            input.witnessUtxo !== undefined
          ) {
            throw new Error(
              'Format Error: Input has multiple [NON_]WITNESS_UTXO',
            );
          }
          const valBuf = keyVal.value.slice(0, 8);
          const revBuf = reverseBuffer(Buffer.from(valBuf));
          const value = parseInt(revBuf.toString('hex'), 16);
          let _offset = 8;
          const scriptLen = varuint.decode(keyVal.value, _offset);
          _offset += varuint.encodingLength(scriptLen);
          const script = keyVal.value.slice(_offset);
          if (script.length !== scriptLen) {
            throw new Error(
              'Format Error: WITNESS_UTXO script is not proper length',
            );
          }
          input.witnessUtxo = {
            index: keyValPos,
            data: {
              script,
              value,
            },
          };
          break;
        case typeFields_1.InputTypes.PARTIAL_SIG:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: PARTIAL_SIG requires pubkey in the key of KeyValue',
            );
          }
          if (input.partialSigs === undefined) {
            input.partialSigs = [];
          }
          input.partialSigs.push({
            index: keyValPos,
            pubkey,
            signature: keyVal.value,
          });
          break;
        case typeFields_1.InputTypes.SIGHASH_TYPE:
          if (input.sighashType !== undefined) {
            throw new Error('Format Error: Input has multiple SIGHASH_TYPE');
          }
          input.sighashType = {
            index: keyValPos,
            data: keyVal.value.readUInt32LE(0),
          };
          break;
        case typeFields_1.InputTypes.REDEEM_SCRIPT:
          if (input.redeemScript !== undefined) {
            throw new Error('Format Error: Input has multiple REDEEM_SCRIPT');
          }
          input.redeemScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case typeFields_1.InputTypes.WITNESS_SCRIPT:
          if (input.witnessScript !== undefined) {
            throw new Error('Format Error: Input has multiple WITNESS_SCRIPT');
          }
          input.witnessScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case typeFields_1.InputTypes.BIP32_DERIVATION:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: Input BIP32_DERIVATION requires pubkey in the key of KeyValue',
            );
          }
          if ((keyVal.value.length / 4) % 1 !== 0) {
            throw new Error(
              'Format Error: Input BIP32_DERIVATION value length should be multiple of 4',
            );
          }
          if (input.bip32Derivation === undefined) {
            input.bip32Derivation = [];
          }
          const data = {
            index: keyValPos,
            // What is a master key fingerprint??? master node parent fingerprint is 0x00000000???
            masterFingerprint: keyVal.value.slice(0, 4),
            pubkey,
            path: 'm',
          };
          for (const i of range(keyVal.value.length / 4 - 1)) {
            const val = keyVal.value.readUInt32LE(i * 4 + 4);
            const isHard = !!(val & 0x80000000);
            const idx = val & 0x7fffffff;
            data.path += '/' + idx.toString(10) + (isHard ? "'" : '');
          }
          input.bip32Derivation.push(data);
          break;
        case typeFields_1.InputTypes.FINAL_SCRIPTSIG:
          input.finalScriptSig = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case typeFields_1.InputTypes.FINAL_SCRIPTWITNESS:
          input.finalScriptWitness = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case typeFields_1.InputTypes.POR_COMMITMENT:
          input.porCommitment = {
            index: keyValPos,
            data: keyVal.value.toString('utf8'),
          };
          break;
        default:
      }
    }
    // skip the ending byte of the keymap
    offset += 1;
    inputs.push(input);
  }
  for (const index of range(outputCount)) {
    const output = {
      keyVals: [],
    };
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      output.keyVals.push(keyVal);
      const keyValPos = output.keyVals.length - 1;
      let pubkey;
      if (typeFields_1.InputTypes.BIP32_DERIVATION === keyVal.key[0]) {
        pubkey = keyVal.key.slice(1);
      }
      switch (keyVal.key[0]) {
        case typeFields_1.OutputTypes.REDEEM_SCRIPT:
          if (output.redeemScript !== undefined) {
            throw new Error('Format Error: Output has multiple REDEEM_SCRIPT');
          }
          output.redeemScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case typeFields_1.OutputTypes.WITNESS_SCRIPT:
          if (output.witnessScript !== undefined) {
            throw new Error('Format Error: Output has multiple WITNESS_SCRIPT');
          }
          output.witnessScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case typeFields_1.OutputTypes.BIP32_DERIVATION:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: Output BIP32_DERIVATION requires pubkey in the key of KeyValue',
            );
          }
          if ((keyVal.value.length / 4) % 1 !== 0) {
            throw new Error(
              'Format Error: Output BIP32_DERIVATION value length should be multiple of 4',
            );
          }
          if (output.bip32Derivation === undefined) {
            output.bip32Derivation = [];
          }
          const data = {
            index: keyValPos,
            masterFingerprint: keyVal.value.slice(0, 4),
            pubkey,
            path: 'm',
          };
          for (const i of range(keyVal.value.length / 4 - 1)) {
            const val = keyVal.value.readUInt32BE(i * 4 + 4);
            const isHard = !!(val & 0x80000000);
            const idx = val & 0x7fffffff;
            data.path += '/' + idx.toString(10) + (isHard ? "'" : '');
          }
          output.bip32Derivation.push(data);
          break;
        default:
      }
    }
    // skip the ending byte of the keymap
    offset += 1;
    outputs.push(output);
  }
  callback(unsignedTx, inputs, outputs);
}
function reverseBuffer(buffer) {
  if (buffer.length < 1) return buffer;
  let j = buffer.length - 1;
  let tmp = 0;
  for (let i = 0; i < buffer.length / 2; i++) {
    tmp = buffer[i];
    buffer[i] = buffer[j];
    buffer[j] = tmp;
    j--;
  }
  return buffer;
}
