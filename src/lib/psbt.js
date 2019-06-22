'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const combiner_1 = require('./combiner');
const convert = require('./converter');
const interfaces_1 = require('./interfaces');
const parser_1 = require('./parser');
const typeFields_1 = require('./typeFields');
const {
  globals: {
    unsignedTx: { isTransactionInput, isTransactionOutput },
  },
} = convert;
class Psbt {
  static fromTransaction(txBuf, txCountGetter) {
    if (txCountGetter === undefined)
      txCountGetter = convert.globals.unsignedTx.getInputOutputCounts;
    const result = txCountGetter(txBuf);
    const psbt = new Psbt();
    psbt.globalMap.keyVals[0].value = txBuf;
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
    return Psbt.fromBuffer(buffer, txCountGetter);
  }
  static fromHex(data, txCountGetter) {
    const buffer = Buffer.from(data, 'hex');
    return Psbt.fromBuffer(buffer, txCountGetter);
  }
  static fromBuffer(buffer, txCountGetter) {
    const psbt = new Psbt();
    const results = parser_1.psbtFromBuffer(buffer, txCountGetter);
    Object.assign(psbt, results);
    return psbt;
  }
  constructor() {
    this.globalMap = {
      keyVals: [],
      // version 1, locktime 0, 0 ins, 0 outs
      unsignedTx: Buffer.from('01000000000000000000', 'hex'),
    };
    this.inputs = [];
    this.outputs = [];
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
  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.
  addNonWitnessUtxoToInput(inputIndex, nonWitnessUtxo) {
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
  addWitnessUtxoToInput(inputIndex, witnessUtxo) {
    const input = checkForInput(this.inputs, inputIndex);
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
    const input = checkForInput(this.inputs, inputIndex);
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
    const input = checkForInput(this.inputs, inputIndex);
    if (typeof sighashType !== 'number') {
      throw new Error('sighashType should be a number');
    }
    input.sighashType = sighashType;
    return this;
  }
  addRedeemScriptToInput(inputIndex, redeemScript) {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    input.redeemScript = redeemScript;
    return this;
  }
  addWitnessScriptToInput(inputIndex, witnessScript) {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    input.witnessScript = witnessScript;
    return this;
  }
  addBip32DerivationToInput(inputIndex, bip32Derivation) {
    const input = checkForInput(this.inputs, inputIndex);
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
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptSig)) {
      throw new Error('finalScriptSig should be a Buffer');
    }
    input.finalScriptSig = finalScriptSig;
    return this;
  }
  addFinalScriptWitnessToInput(inputIndex, finalScriptWitness) {
    const input = checkForInput(this.inputs, inputIndex);
    if (!Buffer.isBuffer(finalScriptWitness)) {
      throw new Error('finalScriptWitness should be a Buffer');
    }
    input.finalScriptWitness = finalScriptWitness;
    return this;
  }
  addPorCommitmentToInput(inputIndex, porCommitment) {
    const input = checkForInput(this.inputs, inputIndex);
    if (typeof porCommitment !== 'string') {
      throw new Error('porCommitment should be a string');
    }
    input.porCommitment = porCommitment;
    return this;
  }
  addRedeemScriptToOutput(outputIndex, redeemScript) {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(redeemScript)) {
      throw new Error('redeemScript should be a Buffer');
    }
    output.redeemScript = redeemScript;
    return this;
  }
  addWitnessScriptToOutput(outputIndex, witnessScript) {
    const output = checkForOutput(this.outputs, outputIndex);
    if (!Buffer.isBuffer(witnessScript)) {
      throw new Error('witnessScript should be a Buffer');
    }
    output.witnessScript = witnessScript;
    return this;
  }
  addBip32DerivationToOutput(outputIndex, bip32Derivation) {
    const output = checkForOutput(this.outputs, outputIndex);
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
    checkHasKey(keyVal, this.globalMap.keyVals);
    this.globalMap.keyVals.push(keyVal);
    return this;
  }
  addKeyValToInput(inputIndex, keyVal) {
    const input = checkForInput(this.inputs, inputIndex);
    checkHasKey(keyVal, input.keyVals);
    input.keyVals.push(keyVal);
    return this;
  }
  addKeyValToOutput(outputIndex, keyVal) {
    const output = checkForOutput(this.outputs, outputIndex);
    checkHasKey(keyVal, output.keyVals);
    output.keyVals.push(keyVal);
    return this;
  }
  addInput(inputData, transactionInputAdder) {
    const txBuf = this.getTransaction();
    let newTxBuf;
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
  addOutput(outputData, allowNoInput = false, transactionOutputAdder) {
    if (!allowNoInput && this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    const txBuf = this.getTransaction();
    let newTxBuf;
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
  combine(...those) {
    // Combine this with those.
    // Return self for chaining.
    const result = combiner_1.combine([this].concat(those));
    Object.assign(this, result);
    return this;
  }
  getTransaction() {
    const txKeyVals = this.globalMap.keyVals.filter(
      kv => kv.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
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
exports.Psbt = Psbt;
function insertTxInGlobalMap(txBuf, globalMap) {
  const txKeyVals = globalMap.keyVals.filter(
    kv => kv.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
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
function checkForInput(inputs, inputIndex) {
  const input = inputs[inputIndex];
  if (input === undefined) throw new Error(`No input #${inputIndex}`);
  return input;
}
function checkForOutput(outputs, outputIndex) {
  const output = outputs[outputIndex];
  if (output === undefined) throw new Error(`No output #${outputIndex}`);
  return output;
}
function checkHasKey(checkKeyVal, keyVals) {
  if (keyVals.filter(kv => kv.key.equals(checkKeyVal.key)).length !== 0) {
    throw new Error(`Duplicate Key: ${checkKeyVal.key.toString('hex')}`);
  }
}
