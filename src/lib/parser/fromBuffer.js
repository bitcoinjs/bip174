'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const convert = require('../converter');
const tools_1 = require('../converter/tools');
const typeFields_1 = require('../typeFields');
const varuint = require('varuint-bitcoin');
function psbtFromBuffer(buffer) {
  let offset = 0;
  function varSlice() {
    const keyLen = varuint.decode(buffer, offset);
    offset += varuint.encodingLength(keyLen);
    const key = buffer.slice(offset, offset + keyLen);
    offset += keyLen;
    return key;
  }
  function readUInt32BE() {
    const num = buffer.readUInt32BE(offset);
    offset += 4;
    return num;
  }
  function readUInt8() {
    const num = buffer.readUInt8(offset);
    offset += 1;
    return num;
  }
  function getKeyValue() {
    const key = varSlice();
    const value = varSlice();
    return {
      key,
      value,
    };
  }
  function checkEndOfKeyValPairs() {
    if (offset >= buffer.length) {
      throw new Error('Format Error: Unexpected End of PSBT');
    }
    const isEnd = buffer.readUInt8(offset) === 0;
    if (isEnd) {
      offset++;
    }
    return isEnd;
  }
  if (readUInt32BE() !== 0x70736274) {
    throw new Error('Format Error: Invalid Magic Number');
  }
  if (readUInt8() !== 0xff) {
    throw new Error(
      'Format Error: Magic Number must be followed by 0xff separator',
    );
  }
  // Global fields (Currently only UNSIGNED_TX)
  const globalMap = { keyVals: [] };
  {
    // closing scope for const variables
    const globalMapKeyVals = [];
    globalMap.keyVals = globalMapKeyVals;
    const globalKeyIndex = {};
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      const hexKey = keyVal.key.toString('hex');
      if (globalKeyIndex[hexKey]) {
        throw new Error(
          'Format Error: Keys must be unique for global keymap: key ' + hexKey,
        );
      }
      globalKeyIndex[hexKey] = 1;
      globalMapKeyVals.push(keyVal);
    }
  }
  const unsignedTxMaps = globalMap.keyVals.filter(
    keyVal => keyVal.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
  );
  if (unsignedTxMaps.length !== 1) {
    throw new Error('Format Error: Only one UNSIGNED_TX allowed');
  }
  const unsignedTx = convert.globals.unsignedTx.decode(unsignedTxMaps[0]);
  // We know there is exactly one, so remove it
  globalMap.keyVals = globalMap.keyVals.filter(
    keyVal => keyVal.key[0] !== typeFields_1.GlobalTypes.UNSIGNED_TX,
  );
  if (
    !unsignedTx.ins.every(
      input => input.script.length === 0 && input.witness.length === 0,
    )
  ) {
    throw new Error(
      'Format Error: Encoded transaction must have no scriptSigs or witnessStacks',
    );
  }
  // Get input and output counts to loop the respective fields
  const inputCount = unsignedTx.ins.length;
  const outputCount = unsignedTx.outs.length;
  const inputs = [];
  const outputs = [];
  // Get input fields
  for (const index of tools_1.range(inputCount)) {
    const inputKeyIndex = {};
    const input = {
      keyVals: [],
    };
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      const hexKey = keyVal.key.toString('hex');
      if (inputKeyIndex[hexKey]) {
        throw new Error(
          'Format Error: Keys must be unique for each input: ' +
            'input index ' +
            index +
            ' key ' +
            hexKey,
        );
      }
      inputKeyIndex[hexKey] = 1;
      input.keyVals.push(keyVal);
      let pubkey;
      if (
        [
          typeFields_1.InputTypes.PARTIAL_SIG,
          typeFields_1.InputTypes.BIP32_DERIVATION,
        ].includes(keyVal.key[0])
      ) {
        pubkey = keyVal.key.slice(1);
        if (
          !(pubkey.length === 33 || pubkey.length === 65) ||
          ![2, 3, 4].includes(pubkey[0])
        ) {
          throw new Error(
            'Format Error: invalid pubkey in key 0x' +
              keyVal.key.toString('hex'),
          );
        }
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
          input.nonWitnessUtxo = convert.inputs.nonWitnessUtxo.decode(keyVal);
          input.keyVals.pop();
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
          input.witnessUtxo = convert.inputs.witnessUtxo.decode(keyVal);
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.PARTIAL_SIG:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: PARTIAL_SIG requires pubkey in the key of KeyValue',
            );
          }
          if (input.partialSig === undefined) {
            input.partialSig = [];
          }
          input.partialSig.push(convert.inputs.partialSig.decode(keyVal));
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.SIGHASH_TYPE:
          if (input.sighashType !== undefined) {
            throw new Error('Format Error: Input has multiple SIGHASH_TYPE');
          }
          input.sighashType = convert.inputs.sighashType.decode(keyVal);
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.REDEEM_SCRIPT:
          if (input.redeemScript !== undefined) {
            throw new Error('Format Error: Input has multiple REDEEM_SCRIPT');
          }
          input.redeemScript = convert.inputs.redeemScript.decode(keyVal);
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.WITNESS_SCRIPT:
          if (input.witnessScript !== undefined) {
            throw new Error('Format Error: Input has multiple WITNESS_SCRIPT');
          }
          input.witnessScript = convert.inputs.witnessScript.decode(keyVal);
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.BIP32_DERIVATION:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: Input BIP32_DERIVATION requires pubkey in the key of KeyValue',
            );
          }
          if (input.bip32Derivation === undefined) {
            input.bip32Derivation = [];
          }
          input.bip32Derivation.push(
            convert.inputs.bip32Derivation.decode(keyVal),
          );
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.FINAL_SCRIPTSIG:
          input.finalScriptSig = convert.inputs.finalScriptSig.decode(keyVal);
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.FINAL_SCRIPTWITNESS:
          input.finalScriptWitness = convert.inputs.finalScriptWitness.decode(
            keyVal,
          );
          input.keyVals.pop();
          break;
        case typeFields_1.InputTypes.POR_COMMITMENT:
          input.porCommitment = convert.inputs.porCommitment.decode(keyVal);
          input.keyVals.pop();
          break;
        default:
        // default is to do nothing and not pop the keyVal.
        // This will allow inclusion during serialization.
      }
    }
    inputs.push(input);
  }
  for (const index of tools_1.range(outputCount)) {
    const outputKeyIndex = {};
    const output = {
      keyVals: [],
    };
    while (!checkEndOfKeyValPairs()) {
      const keyVal = getKeyValue();
      const hexKey = keyVal.key.toString('hex');
      if (outputKeyIndex[hexKey]) {
        throw new Error(
          'Format Error: Keys must be unique for each output: ' +
            'output index ' +
            index +
            ' key ' +
            hexKey,
        );
      }
      outputKeyIndex[hexKey] = 1;
      output.keyVals.push(keyVal);
      let pubkey;
      if (typeFields_1.InputTypes.BIP32_DERIVATION === keyVal.key[0]) {
        pubkey = keyVal.key.slice(1);
      }
      switch (keyVal.key[0]) {
        case typeFields_1.OutputTypes.REDEEM_SCRIPT:
          if (output.redeemScript !== undefined) {
            throw new Error('Format Error: Output has multiple REDEEM_SCRIPT');
          }
          output.redeemScript = convert.outputs.redeemScript.decode(keyVal);
          output.keyVals.pop();
          break;
        case typeFields_1.OutputTypes.WITNESS_SCRIPT:
          if (output.witnessScript !== undefined) {
            throw new Error('Format Error: Output has multiple WITNESS_SCRIPT');
          }
          output.witnessScript = convert.outputs.witnessScript.decode(keyVal);
          output.keyVals.pop();
          break;
        case typeFields_1.OutputTypes.BIP32_DERIVATION:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: Output BIP32_DERIVATION requires pubkey in the key of KeyValue',
            );
          }
          if (output.bip32Derivation === undefined) {
            output.bip32Derivation = [];
          }
          output.bip32Derivation.push(
            convert.outputs.bip32Derivation.decode(keyVal),
          );
          output.keyVals.pop();
          break;
        default:
      }
    }
    outputs.push(output);
  }
  return { unsignedTx, globalMap, inputs, outputs };
}
exports.psbtFromBuffer = psbtFromBuffer;
