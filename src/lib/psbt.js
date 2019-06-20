'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const combiner_1 = require('./combiner');
const convert = require('./converter');
const parser_1 = require('./parser');
const typeFields_1 = require('./typeFields');
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
      keyVals: [
        {
          key: Buffer.from([typeFields_1.GlobalTypes.UNSIGNED_TX]),
          // version 1, locktime 0, 0 ins, 0 outs
          value: Buffer.from('01000000000000000000', 'hex'),
        },
      ],
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
  addInput(
    inputData,
    transactionInputAdder = convert.globals.unsignedTx.addInput,
  ) {
    const txBuf = this.extractTransaction();
    const newTxBuf = transactionInputAdder(inputData, txBuf);
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.inputs.push({
      keyVals: [],
    });
    return this;
  }
  addOutput(
    outputData,
    transactionInputAdder = convert.globals.unsignedTx.addOutput,
  ) {
    if (this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    const txBuf = this.extractTransaction();
    const newTxBuf = transactionInputAdder(outputData, txBuf);
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
  extractTransaction() {
    const txKeyVals = this.globalMap.keyVals.filter(
      kv => kv.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
    );
    const len = txKeyVals.length;
    if (len !== 1) {
      throw new Error(
        `Extract Transaction: Expected one Transaction, got ${len}`,
      );
    }
    return txKeyVals[0].value;
  }
}
exports.Psbt = Psbt;
function insertTxInGlobalMap(txBuf, globalMap) {
  const txKeyVals = globalMap.keyVals.filter(
    kv => kv.key[0] === typeFields_1.GlobalTypes.UNSIGNED_TX,
  );
  const len = txKeyVals.length;
  if (len !== 1) {
    throw new Error(
      `Extract Transaction: Expected one Transaction, got ${len}`,
    );
  }
  txKeyVals[0].value = txBuf;
}
