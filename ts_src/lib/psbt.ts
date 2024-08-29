import { combine } from './combiner/index.js';
import {
  KeyValue,
  PsbtGlobal,
  PsbtGlobalUpdate,
  PsbtInput,
  PsbtInputExtended,
  PsbtInputUpdate,
  PsbtOutput,
  PsbtOutputExtended,
  PsbtOutputUpdate,
  Transaction,
  TransactionFromBuffer,
} from './interfaces.js';
import { psbtFromBuffer, psbtToBuffer } from './parser/index.js';
import { GlobalTypes, InputTypes, OutputTypes } from './typeFields.js';
import {
  addInputAttributes,
  addOutputAttributes,
  checkForInput,
  checkForOutput,
  checkHasKey,
  getEnumLength,
  inputCheckUncleanFinalized,
  updateGlobal,
  updateInput,
  updateOutput,
} from './utils.js';

import * as tools from 'uint8array-tools';

export class Psbt {
  static fromBase64<T extends typeof Psbt>(
    this: T,
    data: string,
    txFromBuffer: TransactionFromBuffer,
  ): InstanceType<T> {
    const buffer = tools.fromBase64(data);
    return this.fromBuffer(buffer, txFromBuffer);
  }
  static fromHex<T extends typeof Psbt>(
    this: T,
    data: string,
    txFromBuffer: TransactionFromBuffer,
  ): InstanceType<T> {
    const buffer = tools.fromHex(data);
    return this.fromBuffer(buffer, txFromBuffer);
  }
  static fromBuffer<T extends typeof Psbt>(
    this: T,
    buffer: Uint8Array,
    txFromBuffer: TransactionFromBuffer,
  ): InstanceType<T> {
    const results = psbtFromBuffer(buffer, txFromBuffer);
    const psbt = new this(results.globalMap.unsignedTx) as InstanceType<T>;
    Object.assign(psbt, results);
    return psbt;
  }

  readonly inputs: PsbtInput[] = [];
  readonly outputs: PsbtOutput[] = [];
  readonly globalMap: PsbtGlobal;

  constructor(tx: Transaction) {
    this.globalMap = {
      unsignedTx: tx,
    };
  }

  toBase64(): string {
    const buffer = this.toBuffer();
    return tools.toBase64(buffer);
  }

  toHex(): string {
    const buffer = this.toBuffer();
    return tools.toHex(buffer);
  }

  toBuffer(): Uint8Array {
    return psbtToBuffer(this);
  }

  updateGlobal(updateData: PsbtGlobalUpdate): this {
    updateGlobal(updateData, this.globalMap);
    return this;
  }

  updateInput(inputIndex: number, updateData: PsbtInputUpdate): this {
    const input = checkForInput(this.inputs, inputIndex);
    updateInput(updateData, input);
    return this;
  }

  updateOutput(outputIndex: number, updateData: PsbtOutputUpdate): this {
    const output = checkForOutput(this.outputs, outputIndex);
    updateOutput(updateData, output);
    return this;
  }

  addUnknownKeyValToGlobal(keyVal: KeyValue): this {
    checkHasKey(
      keyVal,
      this.globalMap.unknownKeyVals,
      getEnumLength(GlobalTypes),
    );
    if (!this.globalMap.unknownKeyVals) this.globalMap.unknownKeyVals = [];
    this.globalMap.unknownKeyVals.push(keyVal);
    return this;
  }

  addUnknownKeyValToInput(inputIndex: number, keyVal: KeyValue): this {
    const input = checkForInput(this.inputs, inputIndex);
    checkHasKey(keyVal, input.unknownKeyVals, getEnumLength(InputTypes));
    if (!input.unknownKeyVals) input.unknownKeyVals = [];
    input.unknownKeyVals.push(keyVal);
    return this;
  }

  addUnknownKeyValToOutput(outputIndex: number, keyVal: KeyValue): this {
    const output = checkForOutput(this.outputs, outputIndex);
    checkHasKey(keyVal, output.unknownKeyVals, getEnumLength(OutputTypes));
    if (!output.unknownKeyVals) output.unknownKeyVals = [];
    output.unknownKeyVals.push(keyVal);
    return this;
  }

  addInput(inputData: PsbtInputExtended): this {
    this.globalMap.unsignedTx.addInput(inputData);
    this.inputs.push({
      unknownKeyVals: [],
    });
    const addKeyVals = inputData.unknownKeyVals || [];
    const inputIndex = this.inputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('unknownKeyVals must be an Array');
    }
    addKeyVals.forEach((keyVal: KeyValue) =>
      this.addUnknownKeyValToInput(inputIndex, keyVal),
    );
    addInputAttributes(this.inputs, inputData);
    return this;
  }

  addOutput(outputData: PsbtOutputExtended): this {
    this.globalMap.unsignedTx.addOutput(outputData);
    this.outputs.push({
      unknownKeyVals: [],
    });
    const addKeyVals = outputData.unknownKeyVals || [];
    const outputIndex = this.outputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('unknownKeyVals must be an Array');
    }
    addKeyVals.forEach((keyVal: KeyValue) =>
      this.addUnknownKeyValToOutput(outputIndex, keyVal),
    );
    addOutputAttributes(this.outputs, outputData);
    return this;
  }

  clearFinalizedInput(inputIndex: number): this {
    const input = checkForInput(this.inputs, inputIndex);
    inputCheckUncleanFinalized(inputIndex, input);
    for (const key of Object.keys(input)) {
      if (
        ![
          'witnessUtxo',
          'nonWitnessUtxo',
          'finalScriptSig',
          'finalScriptWitness',
          'unknownKeyVals',
        ].includes(key)
      ) {
        // @ts-ignore
        delete input[key];
      }
    }
    return this;
  }

  combine(...those: this[]): this {
    // Combine this with those.
    // Return self for chaining.
    const result = combine([this].concat(those));
    Object.assign(this, result);
    return this;
  }

  getTransaction(): Uint8Array {
    return this.globalMap.unsignedTx.toBuffer();
  }
}

export {
  Bip32Derivation,
  NonWitnessUtxo,
  ControlBlock,
  FinalScriptSig,
  FinalScriptWitness,
  GlobalXpub,
  KeyValue,
  PartialSig,
  PorCommitment,
  PsbtGlobal,
  PsbtGlobalUpdate,
  PsbtInput,
  PsbtInputExtended,
  PsbtInputUpdate,
  PsbtOutput,
  PsbtOutputExtended,
  PsbtOutputUpdate,
  RedeemScript,
  SighashType,
  TapBip32Derivation,
  TapInternalKey,
  TapKeySig,
  TapLeaf,
  TapLeafScript,
  TapMerkleRoot,
  TapScriptSig,
  TapTree,
  Transaction,
  TransactionFromBuffer,
  TransactionIOCountGetter,
  TransactionLocktimeSetter,
  TransactionVersionSetter,
  WitnessScript,
  WitnessUtxo,
} from './interfaces.js';

export {
  checkForInput,
  checkForOutput,
} from './utils.js';
