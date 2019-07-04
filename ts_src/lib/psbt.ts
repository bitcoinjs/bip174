import { combine } from './combiner';
import * as convert from './converter';
import {
  Bip32Derivation,
  FinalScriptSig,
  FinalScriptWitness,
  isBip32Derivation,
  isPartialSig,
  isWitnessUtxo,
  KeyValue,
  NonWitnessUtxo,
  PartialSig,
  PorCommitment,
  PsbtGlobal,
  PsbtInput,
  PsbtOutput,
  RedeemScript,
  SighashType,
  TransactionInput,
  TransactionIOCountGetter,
  TransactionOutput,
  WitnessScript,
  WitnessUtxo,
} from './interfaces';
import { psbtFromBuffer, psbtToBuffer } from './parser';
import { GlobalTypes, InputTypes, OutputTypes } from './typeFields';
import {
  addInputAttributes,
  addOutputAttributes,
  checkForInput,
  checkForOutput,
  checkHasKey,
  getEnumLength,
  getTransactionFromGlobalMap,
  inputCheckUncleanFinalized,
  insertTxInGlobalMap,
} from './utils';
const {
  globals: {
    unsignedTx: { isTransactionInput, isTransactionOutputScript },
  },
} = convert;

export class Psbt {
  static fromTransaction<T extends typeof Psbt>(
    this: T,
    txBuf: Buffer,
    txCountGetter?: TransactionIOCountGetter,
  ): InstanceType<T> {
    if (txCountGetter === undefined)
      txCountGetter = convert.globals.unsignedTx.getInputOutputCounts;
    const result = txCountGetter(txBuf);
    const psbt = new this() as InstanceType<T>;
    psbt.globalMap.unsignedTx = txBuf;
    while (result.inputCount > 0) {
      psbt.inputs.push({
        keyVals: [],
      });
      result.inputCount--;
    }
    while (result.outputCount > 0) {
      psbt.outputs.push({
        keyVals: [],
      });
      result.outputCount--;
    }
    return psbt;
  }
  static fromBase64<T extends typeof Psbt>(
    this: T,
    data: string,
    txCountGetter?: TransactionIOCountGetter,
  ): InstanceType<T> {
    const buffer = Buffer.from(data, 'base64');
    return this.fromBuffer(buffer, txCountGetter);
  }
  static fromHex<T extends typeof Psbt>(
    this: T,
    data: string,
    txCountGetter?: TransactionIOCountGetter,
  ): InstanceType<T> {
    const buffer = Buffer.from(data, 'hex');
    return this.fromBuffer(buffer, txCountGetter);
  }
  static fromBuffer<T extends typeof Psbt>(
    this: T,
    buffer: Buffer,
    txCountGetter?: TransactionIOCountGetter,
  ): InstanceType<T> {
    const psbt = new this() as InstanceType<T>;
    const results = psbtFromBuffer(buffer, txCountGetter);
    Object.assign(psbt, results);
    return psbt;
  }

  inputs: PsbtInput[];
  outputs: PsbtOutput[];
  globalMap: PsbtGlobal;

  constructor() {
    this.globalMap = {
      keyVals: [],
      // version 1, locktime 0, 0 ins, 0 outs
      unsignedTx: Buffer.from('01000000000000000000', 'hex'),
    };
    this.inputs = [];
    this.outputs = [];
  }

  toBase64(): string {
    const buffer = this.toBuffer();
    return buffer.toString('base64');
  }

  toHex(): string {
    const buffer = this.toBuffer();
    return buffer.toString('hex');
  }

  toBuffer(): Buffer {
    return psbtToBuffer(this);
  }

  addNonWitnessUtxoToInput(
    inputIndex: number,
    nonWitnessUtxo: NonWitnessUtxo,
  ): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (input.nonWitnessUtxo || input.witnessUtxo) {
      throw new Error(`Input #${inputIndex} already has a Utxo attribute`);
    }
    if (!Buffer.isBuffer(nonWitnessUtxo)) {
      throw new Error('nonWitnessUtxo should be a Buffer of a Transaction');
    }
    input.nonWitnessUtxo = nonWitnessUtxo;
    return this;
  }

  addWitnessUtxoToInput(inputIndex: number, witnessUtxo: WitnessUtxo): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (input.nonWitnessUtxo || input.witnessUtxo) {
      throw new Error(`Input #${inputIndex} already has a Utxo attribute`);
    }
    if (!isWitnessUtxo(witnessUtxo)) {
      throw new Error(
        'witnessUtxo should be { script: Buffer; value: number; }',
      );
    }
    input.witnessUtxo = witnessUtxo;
    return this;
  }

  addPartialSigToInput(inputIndex: number, partialSig: PartialSig): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (!isPartialSig(partialSig)) {
      throw new Error(
        'partialSig should be { pubkey: Buffer; signature: Buffer; }',
      );
    }
    if (input.partialSig === undefined) input.partialSig = [];
    input.partialSig.push(partialSig);
    return this;
  }

  addSighashTypeToInput(inputIndex: number, sighashType: SighashType): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (typeof sighashType !== 'number') {
      throw new Error('sighashType should be a number');
    }
    input.sighashType = sighashType;
    return this;
  }

  addRedeemScriptToInput(inputIndex: number, redeemScript: RedeemScript): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    input.redeemScript = redeemScript;
    return this;
  }

  addWitnessScriptToInput(
    inputIndex: number,
    witnessScript: WitnessScript,
  ): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    input.witnessScript = witnessScript;
    return this;
  }

  addBip32DerivationToInput(
    inputIndex: number,
    bip32Derivation: Bip32Derivation,
  ): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (!isBip32Derivation(bip32Derivation)) {
      throw new Error(
        'bip32Derivation should be { masterFingerprint: Buffer; pubkey: ' +
          'Buffer; path: string; }',
      );
    }
    if (input.bip32Derivation === undefined) input.bip32Derivation = [];
    input.bip32Derivation.push(bip32Derivation);
    return this;
  }

  addFinalScriptSigToInput(
    inputIndex: number,
    finalScriptSig: FinalScriptSig,
  ): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptSig)) {
      throw new Error('finalScriptSig should be a Buffer');
    }
    input.finalScriptSig = finalScriptSig;
    return this;
  }

  addFinalScriptWitnessToInput(
    inputIndex: number,
    finalScriptWitness: FinalScriptWitness,
  ): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptWitness)) {
      throw new Error('finalScriptWitness should be a Buffer');
    }
    input.finalScriptWitness = finalScriptWitness;
    return this;
  }

  addPorCommitmentToInput(
    inputIndex: number,
    porCommitment: PorCommitment,
  ): this {
    const input = checkForInput(this.inputs, inputIndex);
    if (typeof porCommitment !== 'string') {
      throw new Error('porCommitment should be a string');
    }
    input.porCommitment = porCommitment;
    return this;
  }

  addRedeemScriptToOutput(
    outputIndex: number,
    redeemScript: RedeemScript,
  ): this {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    output.redeemScript = redeemScript;
    return this;
  }

  addWitnessScriptToOutput(
    outputIndex: number,
    witnessScript: WitnessScript,
  ): this {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    output.witnessScript = witnessScript;
    return this;
  }

  addBip32DerivationToOutput(
    outputIndex: number,
    bip32Derivation: Bip32Derivation,
  ): this {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!isBip32Derivation(bip32Derivation)) {
      throw new Error(
        'bip32Derivation should be { masterFingerprint: Buffer; pubkey: ' +
          'Buffer; path: string; }',
      );
    }
    if (output.bip32Derivation === undefined) output.bip32Derivation = [];
    output.bip32Derivation.push(bip32Derivation);
    return this;
  }

  addKeyValToGlobal(keyVal: KeyValue): this {
    checkHasKey(keyVal, this.globalMap.keyVals, getEnumLength(GlobalTypes));
    this.globalMap.keyVals.push(keyVal);
    return this;
  }

  addKeyValToInput(inputIndex: number, keyVal: KeyValue): this {
    const input = checkForInput(this.inputs, inputIndex);
    checkHasKey(keyVal, input.keyVals, getEnumLength(InputTypes));
    input.keyVals.push(keyVal);
    return this;
  }

  addKeyValToOutput(outputIndex: number, keyVal: KeyValue): this {
    const output = checkForOutput(this.outputs, outputIndex);
    checkHasKey(keyVal, output.keyVals, getEnumLength(OutputTypes));
    output.keyVals.push(keyVal);
    return this;
  }

  addInput(inputData: TransactionInput): this;
  addInput<T>(
    inputData: T,
    transactionInputAdder?: (input: T, txBuffer: Buffer) => Buffer,
  ): this;
  addInput<T>(
    inputData: T | TransactionInput,
    transactionInputAdder?: (
      input: T | TransactionInput,
      txBuffer: Buffer,
    ) => Buffer,
  ): this {
    const txBuf = this.getTransaction();
    let newTxBuf: Buffer;
    if (isTransactionInput(inputData)) {
      newTxBuf = convert.globals.unsignedTx.addInput(inputData, txBuf);
    } else {
      if (transactionInputAdder === undefined) {
        throw new Error(
          'If inputData is not a TransactionInput object, you must pass a ' +
            'function to handle it.',
        );
      }
      newTxBuf = transactionInputAdder(inputData, txBuf);
    }
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.inputs.push({
      keyVals: [],
    });
    const addKeyVals = (inputData as any).keyVals || [];
    const inputIndex = this.inputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('keyVals must be an Array');
    }
    addKeyVals.forEach((keyVal: KeyValue) =>
      this.addKeyValToInput(inputIndex, keyVal),
    );
    addInputAttributes(this, inputData);
    return this;
  }

  addOutput(outputData: TransactionOutput, allowNoInput?: boolean): this;
  addOutput<T>(
    outputData: T,
    allowNoInput?: boolean,
    transactionOutputAdder?: (output: T, txBuffer: Buffer) => Buffer,
  ): this;
  addOutput<T>(
    outputData: T | TransactionOutput,
    allowNoInput: boolean = false,
    transactionOutputAdder?: (
      output: T | TransactionOutput,
      txBuffer: Buffer,
    ) => Buffer,
  ): this {
    if (!allowNoInput && this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    const txBuf = this.getTransaction();
    let newTxBuf: Buffer;
    if (isTransactionOutputScript(outputData)) {
      newTxBuf = convert.globals.unsignedTx.addOutput(outputData, txBuf);
    } else {
      if (transactionOutputAdder === undefined) {
        if (typeof (outputData as any).address === 'string') {
          throw new Error(
            'Must use a transactionOutputAdder to parse address.',
          );
        }
        throw new Error(
          'If outputData is not a TransactionOutput object, you must pass a ' +
            'function to handle it.',
        );
      }
      newTxBuf = transactionOutputAdder(outputData, txBuf);
    }
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.outputs.push({
      keyVals: [],
    });
    const addKeyVals = (outputData as any).keyVals || [];
    const outputIndex = this.outputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('keyVals must be an Array');
    }
    addKeyVals.forEach((keyVal: KeyValue) =>
      this.addKeyValToInput(outputIndex, keyVal),
    );
    addOutputAttributes(this, outputData);
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
          'keyVals',
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

  getTransaction(): Buffer {
    return getTransactionFromGlobalMap(this.globalMap);
  }
}
