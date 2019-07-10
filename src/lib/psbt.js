'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const combiner_1 = require('./combiner');
const interfaces_1 = require('./interfaces');
const parser_1 = require('./parser');
const typeFields_1 = require('./typeFields');
const utils_1 = require('./utils');
// version 1, locktime 0, 0 ins, 0 outs
const DEFAULT_UNSIGNED_TX = Buffer.from('01000000000000000000', 'hex');
class Psbt {
  constructor() {
    this.inputs = [];
    this.outputs = [];
    this.globalMap = {
      keyVals: [],
      unsignedTx: Buffer.from(DEFAULT_UNSIGNED_TX),
    };
  }
  static fromTransaction(txBuf, txCountGetter) {
    const result = txCountGetter(txBuf);
    const psbt = new this();
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
  static fromBase64(data, txCountGetter) {
    const buffer = Buffer.from(data, 'base64');
    return this.fromBuffer(buffer, txCountGetter);
  }
  static fromHex(data, txCountGetter) {
    const buffer = Buffer.from(data, 'hex');
    return this.fromBuffer(buffer, txCountGetter);
  }
  static fromBuffer(buffer, txCountGetter) {
    const psbt = new this();
    const results = parser_1.psbtFromBuffer(buffer, txCountGetter);
    Object.assign(psbt, results);
    return psbt;
  }
  toBase64() {
    const buffer = this.toBuffer();
    return buffer.toString('base64');
  }
  toHex() {
    const buffer = this.toBuffer();
    return buffer.toString('hex');
  }
  toBuffer() {
    return parser_1.psbtToBuffer(this);
  }
  setVersion(version, transactionVersionSetter) {
    let func;
    if (transactionVersionSetter !== undefined) {
      func = transactionVersionSetter;
    } else {
      func = utils_1.defaultVersionSetter;
    }
    const updated = func(version, this.globalMap.unsignedTx);
    utils_1.insertTxInGlobalMap(updated, this.globalMap);
    return this;
  }
  setLocktime(locktime, transactionLocktimeSetter) {
    let func;
    if (transactionLocktimeSetter !== undefined) {
      func = transactionLocktimeSetter;
    } else {
      func = utils_1.defaultLocktimeSetter;
    }
    const updated = func(locktime, this.globalMap.unsignedTx);
    utils_1.insertTxInGlobalMap(updated, this.globalMap);
    return this;
  }
  addGlobalXpubToGlobal(globalXpub) {
    if (!interfaces_1.isGlobalXpub(globalXpub)) {
      throw new Error(
        'globalXpub should be { masterFingerprint: Buffer; extendedPubkey: ' +
          'Buffer; path: string; }',
      );
    }
    this.globalMap.globalXpub = globalXpub;
    return this;
  }
  addNonWitnessUtxoToInput(inputIndex, nonWitnessUtxo) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (input.nonWitnessUtxo || input.witnessUtxo) {
      throw new Error(`Input #${inputIndex} already has a Utxo attribute`);
    }
    if (!Buffer.isBuffer(nonWitnessUtxo)) {
      throw new Error('nonWitnessUtxo should be a Buffer of a Transaction');
    }
    input.nonWitnessUtxo = nonWitnessUtxo;
    return this;
  }
  addWitnessUtxoToInput(inputIndex, witnessUtxo) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (input.nonWitnessUtxo || input.witnessUtxo) {
      throw new Error(`Input #${inputIndex} already has a Utxo attribute`);
    }
    if (!interfaces_1.isWitnessUtxo(witnessUtxo)) {
      throw new Error(
        'witnessUtxo should be { script: Buffer; value: number; }',
      );
    }
    input.witnessUtxo = witnessUtxo;
    return this;
  }
  addPartialSigToInput(inputIndex, partialSig) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (!interfaces_1.isPartialSig(partialSig)) {
      throw new Error(
        'partialSig should be { pubkey: Buffer; signature: Buffer; }',
      );
    }
    if (input.partialSig === undefined) input.partialSig = [];
    input.partialSig.push(partialSig);
    return this;
  }
  addSighashTypeToInput(inputIndex, sighashType) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (typeof sighashType !== 'number') {
      throw new Error('sighashType should be a number');
    }
    input.sighashType = sighashType;
    return this;
  }
  addRedeemScriptToInput(inputIndex, redeemScript) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    input.redeemScript = redeemScript;
    return this;
  }
  addWitnessScriptToInput(inputIndex, witnessScript) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    input.witnessScript = witnessScript;
    return this;
  }
  addBip32DerivationToInput(inputIndex, bip32Derivation) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (!interfaces_1.isBip32Derivation(bip32Derivation)) {
      throw new Error(
        'bip32Derivation should be { masterFingerprint: Buffer; pubkey: ' +
          'Buffer; path: string; }',
      );
    }
    if (input.bip32Derivation === undefined) input.bip32Derivation = [];
    input.bip32Derivation.push(bip32Derivation);
    return this;
  }
  addFinalScriptSigToInput(inputIndex, finalScriptSig) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptSig)) {
      throw new Error('finalScriptSig should be a Buffer');
    }
    input.finalScriptSig = finalScriptSig;
    return this;
  }
  addFinalScriptWitnessToInput(inputIndex, finalScriptWitness) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptWitness)) {
      throw new Error('finalScriptWitness should be a Buffer');
    }
    input.finalScriptWitness = finalScriptWitness;
    return this;
  }
  addPorCommitmentToInput(inputIndex, porCommitment) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    if (typeof porCommitment !== 'string') {
      throw new Error('porCommitment should be a string');
    }
    input.porCommitment = porCommitment;
    return this;
  }
  addRedeemScriptToOutput(outputIndex, redeemScript) {
    const output = utils_1.checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    output.redeemScript = redeemScript;
    return this;
  }
  addWitnessScriptToOutput(outputIndex, witnessScript) {
    const output = utils_1.checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    output.witnessScript = witnessScript;
    return this;
  }
  addBip32DerivationToOutput(outputIndex, bip32Derivation) {
    const output = utils_1.checkForOutput(this.outputs, outputIndex);
    if (!interfaces_1.isBip32Derivation(bip32Derivation)) {
      throw new Error(
        'bip32Derivation should be { masterFingerprint: Buffer; pubkey: ' +
          'Buffer; path: string; }',
      );
    }
    if (output.bip32Derivation === undefined) output.bip32Derivation = [];
    output.bip32Derivation.push(bip32Derivation);
    return this;
  }
  addKeyValToGlobal(keyVal) {
    utils_1.checkHasKey(
      keyVal,
      this.globalMap.keyVals,
      utils_1.getEnumLength(typeFields_1.GlobalTypes),
    );
    this.globalMap.keyVals.push(keyVal);
    return this;
  }
  addKeyValToInput(inputIndex, keyVal) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    utils_1.checkHasKey(
      keyVal,
      input.keyVals,
      utils_1.getEnumLength(typeFields_1.InputTypes),
    );
    input.keyVals.push(keyVal);
    return this;
  }
  addKeyValToOutput(outputIndex, keyVal) {
    const output = utils_1.checkForOutput(this.outputs, outputIndex);
    utils_1.checkHasKey(
      keyVal,
      output.keyVals,
      utils_1.getEnumLength(typeFields_1.OutputTypes),
    );
    output.keyVals.push(keyVal);
    return this;
  }
  addInput(inputData, transactionInputAdder) {
    if (transactionInputAdder === undefined) {
      throw new Error('You must pass a function to handle the input.');
    }
    const txBuf = this.getTransaction();
    let newTxBuf;
    newTxBuf = transactionInputAdder(inputData, txBuf);
    utils_1.insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.inputs.push({
      keyVals: [],
    });
    const addKeyVals = inputData.keyVals || [];
    const inputIndex = this.inputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('keyVals must be an Array');
    }
    addKeyVals.forEach(keyVal => this.addKeyValToInput(inputIndex, keyVal));
    utils_1.addInputAttributes(this, inputData);
    return this;
  }
  addOutput(outputData, transactionOutputAdder, allowNoInput) {
    if (!allowNoInput && this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    if (transactionOutputAdder === undefined) {
      throw new Error('You must pass a function to handle the output.');
    }
    const txBuf = this.getTransaction();
    let newTxBuf;
    newTxBuf = transactionOutputAdder(outputData, txBuf);
    utils_1.insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.outputs.push({
      keyVals: [],
    });
    const addKeyVals = outputData.keyVals || [];
    const outputIndex = this.outputs.length - 1;
    if (!Array.isArray(addKeyVals)) {
      throw new Error('keyVals must be an Array');
    }
    addKeyVals.forEach(keyVal => this.addKeyValToInput(outputIndex, keyVal));
    utils_1.addOutputAttributes(this, outputData);
    return this;
  }
  clearFinalizedInput(inputIndex) {
    const input = utils_1.checkForInput(this.inputs, inputIndex);
    utils_1.inputCheckUncleanFinalized(inputIndex, input);
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
  combine(...those) {
    // Combine this with those.
    // Return self for chaining.
    const result = combiner_1.combine([this].concat(those));
    Object.assign(this, result);
    return this;
  }
  getTransaction() {
    return utils_1.getTransactionFromGlobalMap(this.globalMap);
  }
}
exports.Psbt = Psbt;
