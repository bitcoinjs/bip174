import { combine } from './combiner';
import {
  Bip32Derivation,
  FinalScriptSig,
  FinalScriptWitness,
  GlobalXpub,
  isBip32Derivation,
  isGlobalXpub,
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
  TransactionIOCountGetter,
  TransactionLocktimeSetter,
  TransactionVersionSetter,
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
  defaultLocktimeSetter,
  defaultVersionSetter,
  getEnumLength,
  getTransactionFromGlobalMap,
  inputCheckUncleanFinalized,
  insertTxInGlobalMap,
} from './utils';

// version 1, locktime 0, 0 ins, 0 outs
const DEFAULT_UNSIGNED_TX = Buffer.from('01000000000000000000', 'hex');

export class Psbt {
  static fromTransaction<T extends typeof Psbt>(
    this: T,
    txBuf: Buffer,
    txCountGetter: TransactionIOCountGetter,
  ): InstanceType<T> {
    const result = txCountGetter(txBuf);
    const psbt = new this() as InstanceType<T>;
    psbt.globalMap.unsignedTx = txBuf;
    while (result.inputCount > 0) {
      psbt.inputs.push({
        unknownKeyVals: [],
      });
      result.inputCount--;
    }
    while (result.outputCount > 0) {
      psbt.outputs.push({
        unknownKeyVals: [],
      });
      result.outputCount--;
    }
    return psbt;
  }
  static fromBase64<T extends typeof Psbt>(
    this: T,
    data: string,
    txCountGetter: TransactionIOCountGetter,
  ): InstanceType<T> {
    const buffer = Buffer.from(data, 'base64');
    return this.fromBuffer(buffer, txCountGetter);
  }
  static fromHex<T extends typeof Psbt>(
    this: T,
    data: string,
    txCountGetter: TransactionIOCountGetter,
  ): InstanceType<T> {
    const buffer = Buffer.from(data, 'hex');
    return this.fromBuffer(buffer, txCountGetter);
  }
  static fromBuffer<T extends typeof Psbt>(
    this: T,
    buffer: Buffer,
    txCountGetter: TransactionIOCountGetter,
  ): InstanceType<T> {
    const psbt = new this() as InstanceType<T>;
    const results = psbtFromBuffer(buffer, txCountGetter);
    Object.assign(psbt, results);
    return psbt;
  }

  readonly inputs: PsbtInput[] = [];
  readonly outputs: PsbtOutput[] = [];
  readonly globalMap: PsbtGlobal = {
    unknownKeyVals: [],
    unsignedTx: Buffer.from(DEFAULT_UNSIGNED_TX),
  };

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

  setVersion(
    version: number,
    transactionVersionSetter?: TransactionVersionSetter,
  ): this {
    let func: TransactionVersionSetter;
    if (transactionVersionSetter !== undefined) {
      func = transactionVersionSetter;
    } else {
      func = defaultVersionSetter;
    }
    const updated = func(version, this.globalMap.unsignedTx!);
    insertTxInGlobalMap(updated, this.globalMap);
    return this;
  }

  setLocktime(
    locktime: number,
    transactionLocktimeSetter?: TransactionLocktimeSetter,
  ): this {
    let func: TransactionLocktimeSetter;
    if (transactionLocktimeSetter !== undefined) {
      func = transactionLocktimeSetter;
    } else {
      func = defaultLocktimeSetter;
    }
    const updated = func(locktime, this.globalMap.unsignedTx!);
    insertTxInGlobalMap(updated, this.globalMap);
    return this;
  }

  addGlobalXpubToGlobal(globalXpub: GlobalXpub): this {
    if (!isGlobalXpub(globalXpub)) {
      throw new Error(
        'globalXpub should be { masterFingerprint: Buffer; extendedPubkey: ' +
          'Buffer; path: string; }',
      );
    }
    this.globalMap.globalXpub = globalXpub;
    return this;
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

  addUnknownKeyValToGlobal(keyVal: KeyValue): this {
    checkHasKey(
      keyVal,
      this.globalMap.unknownKeyVals,
      getEnumLength(GlobalTypes),
    );
    this.globalMap.unknownKeyVals.push(keyVal);
    return this;
  }

  addUnknownKeyValToInput(inputIndex: number, keyVal: KeyValue): this {
    const input = checkForInput(this.inputs, inputIndex);
    checkHasKey(keyVal, input.unknownKeyVals, getEnumLength(InputTypes));
    input.unknownKeyVals.push(keyVal);
    return this;
  }

  addUnknownKeyValToOutput(outputIndex: number, keyVal: KeyValue): this {
    const output = checkForOutput(this.outputs, outputIndex);
    checkHasKey(keyVal, output.unknownKeyVals, getEnumLength(OutputTypes));
    output.unknownKeyVals.push(keyVal);
    return this;
  }

  addInput<T>(
    inputData: T,
    transactionInputAdder: (input: T, txBuffer: Buffer) => Buffer,
  ): this {
    if (transactionInputAdder === undefined) {
      throw new Error('You must pass a function to handle the input.');
    }
    const txBuf = this.getTransaction();
    let newTxBuf: Buffer;
    newTxBuf = transactionInputAdder(inputData, txBuf);
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.inputs.push({
      unknownKeyVals: [],
    });
    const addKeyVals = (inputData as any).unknownKeyVals || [];
    const inputIndex = this.inputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('unknownKeyVals must be an Array');
    }
    addKeyVals.forEach((keyVal: KeyValue) =>
      this.addUnknownKeyValToInput(inputIndex, keyVal),
    );
    addInputAttributes(this, inputData);
    return this;
  }

  addOutput<T>(
    outputData: T,
    transactionOutputAdder: (output: T, txBuffer: Buffer) => Buffer,
    allowNoInput?: boolean,
  ): this {
    if (!allowNoInput && this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    if (transactionOutputAdder === undefined) {
      throw new Error('You must pass a function to handle the output.');
    }
    const txBuf = this.getTransaction();
    let newTxBuf: Buffer;
    newTxBuf = transactionOutputAdder(outputData, txBuf);
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.outputs.push({
      unknownKeyVals: [],
    });
    const addKeyVals = (outputData as any).unknownKeyVals || [];
    const outputIndex = this.outputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('unknownKeyVals must be an Array');
    }
    addKeyVals.forEach((keyVal: KeyValue) =>
      this.addUnknownKeyValToInput(outputIndex, keyVal),
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

  getTransaction(): Buffer {
    return getTransactionFromGlobalMap(this.globalMap);
  }
}
