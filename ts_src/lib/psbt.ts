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
const {
  globals: {
    unsignedTx: { isTransactionInput, isTransactionOutput },
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

  addNonWitnessUtxoToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    nonWitnessUtxo: NonWitnessUtxo,
  ): T {
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

  addWitnessUtxoToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    witnessUtxo: WitnessUtxo,
  ): T {
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

  addPartialSigToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    partialSig: PartialSig,
  ): T {
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

  addSighashTypeToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    sighashType: SighashType,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    if (typeof sighashType !== 'number') {
      throw new Error('sighashType should be a number');
    }
    input.sighashType = sighashType;
    return this;
  }

  addRedeemScriptToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    redeemScript: RedeemScript,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    input.redeemScript = redeemScript;
    return this;
  }

  addWitnessScriptToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    witnessScript: WitnessScript,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    input.witnessScript = witnessScript;
    return this;
  }

  addBip32DerivationToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    bip32Derivation: Bip32Derivation,
  ): T {
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

  addFinalScriptSigToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    finalScriptSig: FinalScriptSig,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptSig)) {
      throw new Error('finalScriptSig should be a Buffer');
    }
    input.finalScriptSig = finalScriptSig;
    return this;
  }

  addFinalScriptWitnessToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    finalScriptWitness: FinalScriptWitness,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptWitness)) {
      throw new Error('finalScriptWitness should be a Buffer');
    }
    input.finalScriptWitness = finalScriptWitness;
    return this;
  }

  addPorCommitmentToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    porCommitment: PorCommitment,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    if (typeof porCommitment !== 'string') {
      throw new Error('porCommitment should be a string');
    }
    input.porCommitment = porCommitment;
    return this;
  }

  addRedeemScriptToOutput<T extends InstanceType<typeof Psbt>>(
    this: T,
    outputIndex: number,
    redeemScript: RedeemScript,
  ): T {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    output.redeemScript = redeemScript;
    return this;
  }

  addWitnessScriptToOutput<T extends InstanceType<typeof Psbt>>(
    this: T,
    outputIndex: number,
    witnessScript: WitnessScript,
  ): T {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    output.witnessScript = witnessScript;
    return this;
  }

  addBip32DerivationToOutput<T extends InstanceType<typeof Psbt>>(
    this: T,
    outputIndex: number,
    bip32Derivation: Bip32Derivation,
  ): T {
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

  addKeyValToGlobal<T extends InstanceType<typeof Psbt>>(
    this: T,
    keyVal: KeyValue,
  ): T {
    checkHasKey(keyVal, this.globalMap.keyVals, getEnumLength(GlobalTypes));
    this.globalMap.keyVals.push(keyVal);
    return this;
  }

  addKeyValToInput<T extends InstanceType<typeof Psbt>>(
    this: T,
    inputIndex: number,
    keyVal: KeyValue,
  ): T {
    const input = checkForInput(this.inputs, inputIndex);
    checkHasKey(keyVal, input.keyVals, getEnumLength(InputTypes));
    input.keyVals.push(keyVal);
    return this;
  }

  addKeyValToOutput<T extends InstanceType<typeof Psbt>>(
    this: T,
    outputIndex: number,
    keyVal: KeyValue,
  ): T {
    const output = checkForOutput(this.outputs, outputIndex);
    checkHasKey(keyVal, output.keyVals, getEnumLength(OutputTypes));
    output.keyVals.push(keyVal);
    return this;
  }

  addInput<V extends InstanceType<typeof Psbt>>(
    this: V,
    inputData: TransactionInput,
  ): V;
  addInput<T, V extends InstanceType<typeof Psbt>>(
    this: V,
    inputData: T,
    transactionInputAdder?: (input: T, txBuffer: Buffer) => Buffer,
  ): V;
  addInput<T, V extends InstanceType<typeof Psbt>>(
    this: V,
    inputData: T | TransactionInput,
    transactionInputAdder?: (
      input: T | TransactionInput,
      txBuffer: Buffer,
    ) => Buffer,
  ): V {
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
    return this;
  }

  addOutput<V extends InstanceType<typeof Psbt>>(
    this: V,
    outputData: TransactionOutput,
    allowNoInput?: boolean,
  ): V;
  addOutput<T, V extends InstanceType<typeof Psbt>>(
    this: V,
    outputData: T,
    allowNoInput?: boolean,
    transactionOutputAdder?: (output: T, txBuffer: Buffer) => Buffer,
  ): V;
  addOutput<T, V extends InstanceType<typeof Psbt>>(
    this: V,
    outputData: T | TransactionOutput,
    allowNoInput: boolean = false,
    transactionOutputAdder?: (
      output: T | TransactionOutput,
      txBuffer: Buffer,
    ) => Buffer,
  ): V {
    if (!allowNoInput && this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    const txBuf = this.getTransaction();
    let newTxBuf: Buffer;
    if (isTransactionOutput(outputData)) {
      newTxBuf = convert.globals.unsignedTx.addOutput(outputData, txBuf);
    } else {
      if (transactionOutputAdder === undefined) {
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
    return this;
  }

  combine<T extends InstanceType<typeof Psbt>>(this: T, ...those: Psbt[]): T {
    // Combine this with those.
    // Return self for chaining.
    const result = combine([this as Psbt].concat(those));
    Object.assign(this, result);
    return this;
  }

  getTransaction(): Buffer {
    const txKeyVals = this.globalMap.keyVals.filter(
      kv => kv.key[0] === GlobalTypes.UNSIGNED_TX,
    );
    const len = txKeyVals.length;
    const tx = this.globalMap.unsignedTx;
    const hasTx = tx !== undefined ? 1 : 0;
    if (len + hasTx !== 1) {
      throw new Error(
        `Extract Transaction: Expected one Transaction, got ${len + hasTx}`,
      );
    }
    return tx !== undefined ? tx : txKeyVals[0].value;
  }
}

function insertTxInGlobalMap(txBuf: Buffer, globalMap: PsbtGlobal): void {
  const txKeyVals = globalMap.keyVals.filter(
    kv => kv.key[0] === GlobalTypes.UNSIGNED_TX,
  );
  const len = txKeyVals.length;
  const tx = globalMap.unsignedTx;
  const hasTx = tx !== undefined ? 1 : 0;
  if (len + hasTx !== 1) {
    throw new Error(
      `Extract Transaction: Expected one Transaction, got ${len + hasTx}`,
    );
  }
  if (tx !== undefined) globalMap.unsignedTx = txBuf;
  else txKeyVals[0].value = txBuf;
}

function checkForInput(inputs: PsbtInput[], inputIndex: number): PsbtInput {
  const input = inputs[inputIndex];
  if (input === undefined) throw new Error(`No input #${inputIndex}`);
  return input;
}

function checkForOutput(
  outputs: PsbtOutput[],
  outputIndex: number,
): PsbtOutput {
  const output = outputs[outputIndex];
  if (output === undefined) throw new Error(`No output #${outputIndex}`);
  return output;
}

function checkHasKey(
  checkKeyVal: KeyValue,
  keyVals: KeyValue[],
  enumLength: number,
): void {
  if (checkKeyVal.key[0] < enumLength) {
    throw new Error(
      `Use the method for your specific key instead of addKeyVal*`,
    );
  }
  if (keyVals.filter(kv => kv.key.equals(checkKeyVal.key)).length !== 0) {
    throw new Error(`Duplicate Key: ${checkKeyVal.key.toString('hex')}`);
  }
}

function getEnumLength(myenum: any): number {
  let count = 0;
  Object.keys(myenum).forEach(val => {
    if (Number(isNaN(Number(val)))) {
      count++;
    }
  });
  return count;
}
