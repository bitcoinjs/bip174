import * as convert from '../converter';
import { range } from '../converter/tools';
import * as varuint from '../converter/varint';
import {
  KeyValue,
  PsbtGlobal,
  PsbtInput,
  PsbtOutput,
  TransactionIOCountGetter,
} from '../interfaces';
import { GlobalTypes, InputTypes, OutputTypes } from '../typeFields';
import { PsbtAttributes } from './index';

const countGetter = convert.globals.unsignedTx.getInputOutputCounts;

export function psbtFromBuffer(
  buffer: Buffer,
  txCountGetter: TransactionIOCountGetter = countGetter,
): PsbtAttributes {
  let offset = 0;

  function varSlice(): Buffer {
    const keyLen = varuint.decode(buffer, offset);
    offset += varuint.encodingLength(keyLen);
    const key = buffer.slice(offset, offset + keyLen);
    offset += keyLen;
    return key;
  }

  function readUInt32BE(): number {
    const num = buffer.readUInt32BE(offset);
    offset += 4;
    return num;
  }

  function readUInt8(): number {
    const num = buffer.readUInt8(offset);
    offset += 1;
    return num;
  }

  function getKeyValue(): KeyValue {
    const key = varSlice();
    const value = varSlice();
    return {
      key,
      value,
    };
  }

  function checkEndOfKeyValPairs(): boolean {
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

  const globalMapKeyVals: KeyValue[] = [];
  const globalKeyIndex: { [index: string]: number } = {};
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

  const unsignedTxMaps = globalMapKeyVals.filter(
    keyVal => keyVal.key[0] === GlobalTypes.UNSIGNED_TX,
  );

  if (unsignedTxMaps.length !== 1) {
    throw new Error('Format Error: Only one UNSIGNED_TX allowed');
  }

  const unsignedTx = txCountGetter(unsignedTxMaps[0].value);

  // Get input and output counts to loop the respective fields
  const inputCount = unsignedTx.inputCount;
  const outputCount = unsignedTx.outputCount;
  const inputKeyVals: KeyValue[][] = [];
  const outputKeyVals: KeyValue[][] = [];

  // Get input fields
  for (const index of range(inputCount)) {
    const inputKeyIndex: { [index: string]: number } = {};
    const input = [] as KeyValue[];
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
      input.push(keyVal);
    }
    inputKeyVals.push(input);
  }

  for (const index of range(outputCount)) {
    const outputKeyIndex: { [index: string]: number } = {};
    const output = [] as KeyValue[];
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
      output.push(keyVal);
    }
    outputKeyVals.push(output);
  }

  return psbtFromKeyVals({ globalMapKeyVals, inputKeyVals, outputKeyVals });
}

interface PsbtFromKeyValsArg {
  globalMapKeyVals: KeyValue[];
  inputKeyVals: KeyValue[][];
  outputKeyVals: KeyValue[][];
}

export function psbtFromKeyVals({
  globalMapKeyVals,
  inputKeyVals,
  outputKeyVals,
}: PsbtFromKeyValsArg): PsbtAttributes {
  // That was easy :-)
  const globalMap: PsbtGlobal = {
    keyVals: [] as KeyValue[],
  };
  for (const keyVal of globalMapKeyVals) {
    // If a globalMap item needs pubkey, uncomment
    // const pubkey = convert.globals.checkPubkey(keyVal);

    switch (keyVal.key[0]) {
      case GlobalTypes.UNSIGNED_TX:
        if (globalMap.unsignedTx !== undefined) {
          throw new Error('Format Error: GlobalMap has multiple UNSIGNED_TX');
        }
        globalMap.unsignedTx = convert.globals.unsignedTx.decode(keyVal);
        break;
      default:
        // This will allow inclusion during serialization.
        globalMap.keyVals.push(keyVal);
    }
  }

  // Get input and output counts to loop the respective fields
  const inputCount = inputKeyVals.length;
  const outputCount = outputKeyVals.length;
  const inputs: PsbtInput[] = [];
  const outputs: PsbtOutput[] = [];

  // Get input fields
  for (const index of range(inputCount)) {
    const input: PsbtInput = {
      keyVals: [] as KeyValue[],
    };
    for (const keyVal of inputKeyVals[index]) {
      const pubkey = convert.inputs.checkPubkey(keyVal);

      switch (keyVal.key[0]) {
        case InputTypes.NON_WITNESS_UTXO:
          if (
            input.nonWitnessUtxo !== undefined ||
            input.witnessUtxo !== undefined
          ) {
            throw new Error(
              'Format Error: Input has multiple [NON_]WITNESS_UTXO',
            );
          }
          input.nonWitnessUtxo = convert.inputs.nonWitnessUtxo.decode(keyVal);
          break;
        case InputTypes.WITNESS_UTXO:
          if (
            input.nonWitnessUtxo !== undefined ||
            input.witnessUtxo !== undefined
          ) {
            throw new Error(
              'Format Error: Input has multiple [NON_]WITNESS_UTXO',
            );
          }
          input.witnessUtxo = convert.inputs.witnessUtxo.decode(keyVal);
          break;
        case InputTypes.PARTIAL_SIG:
          if (pubkey === undefined) {
            throw new Error(
              'Format Error: PARTIAL_SIG requires pubkey in the key of KeyValue',
            );
          }
          if (input.partialSig === undefined) {
            input.partialSig = [];
          }
          input.partialSig.push(convert.inputs.partialSig.decode(keyVal));
          break;
        case InputTypes.SIGHASH_TYPE:
          if (input.sighashType !== undefined) {
            throw new Error('Format Error: Input has multiple SIGHASH_TYPE');
          }
          input.sighashType = convert.inputs.sighashType.decode(keyVal);
          break;
        case InputTypes.REDEEM_SCRIPT:
          if (input.redeemScript !== undefined) {
            throw new Error('Format Error: Input has multiple REDEEM_SCRIPT');
          }
          input.redeemScript = convert.inputs.redeemScript.decode(keyVal);
          break;
        case InputTypes.WITNESS_SCRIPT:
          if (input.witnessScript !== undefined) {
            throw new Error('Format Error: Input has multiple WITNESS_SCRIPT');
          }
          input.witnessScript = convert.inputs.witnessScript.decode(keyVal);
          break;
        case InputTypes.BIP32_DERIVATION:
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
          break;
        case InputTypes.FINAL_SCRIPTSIG:
          input.finalScriptSig = convert.inputs.finalScriptSig.decode(keyVal);
          break;
        case InputTypes.FINAL_SCRIPTWITNESS:
          input.finalScriptWitness = convert.inputs.finalScriptWitness.decode(
            keyVal,
          );
          break;
        case InputTypes.POR_COMMITMENT:
          input.porCommitment = convert.inputs.porCommitment.decode(keyVal);
          break;
        default:
          // This will allow inclusion during serialization.
          input.keyVals.push(keyVal);
      }
    }
    inputs.push(input);
  }

  for (const index of range(outputCount)) {
    const output: PsbtOutput = {
      keyVals: [] as KeyValue[],
    };
    for (const keyVal of outputKeyVals[index]) {
      const pubkey = convert.outputs.checkPubkey(keyVal);

      switch (keyVal.key[0]) {
        case OutputTypes.REDEEM_SCRIPT:
          if (output.redeemScript !== undefined) {
            throw new Error('Format Error: Output has multiple REDEEM_SCRIPT');
          }
          output.redeemScript = convert.outputs.redeemScript.decode(keyVal);
          break;
        case OutputTypes.WITNESS_SCRIPT:
          if (output.witnessScript !== undefined) {
            throw new Error('Format Error: Output has multiple WITNESS_SCRIPT');
          }
          output.witnessScript = convert.outputs.witnessScript.decode(keyVal);
          break;
        case OutputTypes.BIP32_DERIVATION:
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
          break;
        default:
          output.keyVals.push(keyVal);
      }
    }
    outputs.push(output);
  }

  return { globalMap, inputs, outputs };
}
