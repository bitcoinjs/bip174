import { Transaction } from 'bitcoinjs-lib';
import { KeyValue, PsbtGlobal, PsbtInput, PsbtOutput } from './interfaces';
import { GlobalTypes, InputTypes, OutputTypes } from './typeFields';

const varuint = require('varuint-bitcoin');
const range = (n: number): number[] => [...Array(n).keys()];

export class Psbt {
  static fromBase64(data: string): Psbt {
    const buffer = Buffer.from(data, 'base64');
    return Psbt.fromBuffer(buffer);
  }
  static fromBuffer(buffer: Buffer): Psbt {
    const psbt = new Psbt();
    psbtFromBuffer(buffer, results => {
      Object.assign(psbt, results);
    });
    return psbt;
  }

  inputs: PsbtInput[];
  outputs: PsbtOutput[];
  globalMap: PsbtGlobal;
  unsignedTx: Transaction;

  constructor() {
    this.globalMap = {};
    this.inputs = [];
    this.outputs = [];
    this.unsignedTx = new Transaction();
  }

  toBase64(): string {
    // encode self into base64 string rep of official binary encoding
    return '';
  }

  toBuffer(): Buffer {
    // encode self into base64 string rep of official binary encoding
    // const { unsignedTx, globalMap, inputs, outputs } = this;

    return Buffer.from([]);
  }

  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.

  combine(...those: Psbt[]): Psbt {
    // Combine this with those.
    // Return self for chaining.
    return those[0];
  }
  finalize(): Psbt {
    // Finalize all inputs, default throw if can not
    // Return self for chaining.
    return this;
  }

  extractTransaction(): Transaction {
    return new Transaction();
  }
}

interface FromBufferCallbackArg {
  unsignedTx: Transaction;
  globalMap: PsbtGlobal;
  inputs: PsbtInput[];
  outputs: PsbtOutput[];
}
type FromBufferCallback = (arg: FromBufferCallbackArg) => void;

function psbtFromBuffer(buffer: Buffer, callback: FromBufferCallback): void {
  let offset = 0;

  function getKeyValue(): KeyValue {
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
  const globalMap: any = {};
  {
    // closing scope for const variables
    const globalMapKeyVals: KeyValue[] = [];
    globalMap.keyVals = globalMapKeyVals;
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
  }

  const unsignedTxMaps = globalMap.keyVals.filter(
    (keyVal: KeyValue) => keyVal.key[0] === GlobalTypes.UNSIGNED_TX,
  );

  if (unsignedTxMaps.length !== 1) {
    throw new Error('Format Error: Only one UNSIGNED_TX allowed');
  }

  let unsignedTx: Transaction;
  try {
    unsignedTx = Transaction.fromBuffer(unsignedTxMaps[0].value);
  } catch (err) {
    throw new Error('Format Error: Error parsing Transaction: ' + err.message);
  }

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
  const inputs: PsbtInput[] = [];
  const outputs: PsbtOutput[] = [];

  // Get input fields
  for (const index of range(inputCount)) {
    const inputKeyIndex: { [index: string]: number } = {};
    const input: PsbtInput = {
      keyVals: [] as KeyValue[],
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
      const keyValPos = input.keyVals.length - 1;

      let pubkey: Buffer | undefined;
      if (
        [InputTypes.PARTIAL_SIG, InputTypes.BIP32_DERIVATION].includes(
          keyVal.key[0],
        )
      ) {
        pubkey = keyVal.key.slice(1);
      }

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
          try {
            const myData = {
              tx: Transaction.fromBuffer(keyVal.value),
              index: keyValPos,
            };
            input.nonWitnessUtxo = myData;
          } catch (err) {
            throw new Error(
              'Format Error: Error parsing NON_WITNESS_UTXO: ' + err.message,
            );
          }
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
        case InputTypes.PARTIAL_SIG:
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
        case InputTypes.SIGHASH_TYPE:
          if (input.sighashType !== undefined) {
            throw new Error('Format Error: Input has multiple SIGHASH_TYPE');
          }
          input.sighashType = {
            index: keyValPos,
            data: keyVal.value.readUInt32LE(0),
          };
          break;
        case InputTypes.REDEEM_SCRIPT:
          if (input.redeemScript !== undefined) {
            throw new Error('Format Error: Input has multiple REDEEM_SCRIPT');
          }
          input.redeemScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case InputTypes.WITNESS_SCRIPT:
          if (input.witnessScript !== undefined) {
            throw new Error('Format Error: Input has multiple WITNESS_SCRIPT');
          }
          input.witnessScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case InputTypes.BIP32_DERIVATION:
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
        case InputTypes.FINAL_SCRIPTSIG:
          input.finalScriptSig = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case InputTypes.FINAL_SCRIPTWITNESS:
          input.finalScriptWitness = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case InputTypes.POR_COMMITMENT:
          input.porCommitment = {
            index: keyValPos,
            data: keyVal.value.toString('utf8'),
          };
          break;
        default:
      }
    }
    inputs.push(input);
  }

  for (const index of range(outputCount)) {
    const outputKeyIndex: { [index: string]: number } = {};
    const output: PsbtOutput = {
      keyVals: [] as KeyValue[],
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
      const keyValPos = output.keyVals.length - 1;

      let pubkey: Buffer | undefined;
      if (InputTypes.BIP32_DERIVATION === keyVal.key[0]) {
        pubkey = keyVal.key.slice(1);
      }

      switch (keyVal.key[0]) {
        case OutputTypes.REDEEM_SCRIPT:
          if (output.redeemScript !== undefined) {
            throw new Error('Format Error: Output has multiple REDEEM_SCRIPT');
          }
          output.redeemScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case OutputTypes.WITNESS_SCRIPT:
          if (output.witnessScript !== undefined) {
            throw new Error('Format Error: Output has multiple WITNESS_SCRIPT');
          }
          output.witnessScript = {
            index: keyValPos,
            data: keyVal.value,
          };
          break;
        case OutputTypes.BIP32_DERIVATION:
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
    outputs.push(output);
  }

  callback({ unsignedTx, globalMap, inputs, outputs });
}

function reverseBuffer(buffer: Buffer): Buffer {
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
