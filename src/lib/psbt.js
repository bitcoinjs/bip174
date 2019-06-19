'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const bitcoinjs_lib_1 = require('bitcoinjs-lib');
const combiner_1 = require('./combiner');
const parser_1 = require('./parser');
class Psbt {
  static fromBase64(data) {
    const buffer = Buffer.from(data, 'base64');
    return Psbt.fromBuffer(buffer);
  }
  static fromHex(data) {
    const buffer = Buffer.from(data, 'hex');
    return Psbt.fromBuffer(buffer);
  }
  static fromBuffer(buffer) {
    const psbt = new Psbt();
    const results = parser_1.psbtFromBuffer(buffer);
    Object.assign(psbt, results);
    return psbt;
  }
  constructor() {
    this.globalMap = { keyVals: [] };
    this.inputs = [];
    this.outputs = [];
    this.unsignedTx = new bitcoinjs_lib_1.Transaction();
    this.globalMap.keyVals.push({
      key: Buffer.from([0]),
      value: this.unsignedTx.toBuffer(),
    });
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
    const { unsignedTx, globalMap, inputs, outputs } = this;
    return parser_1.psbtToBuffer({ unsignedTx, globalMap, inputs, outputs });
  }
  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.
  combine(...those) {
    // Combine this with those.
    // Return self for chaining.
    let self;
    {
      const { unsignedTx, globalMap, inputs, outputs } = this;
      self = { unsignedTx, globalMap, inputs, outputs };
    }
    const dataToJoin = [];
    those.forEach(psbt => {
      const { unsignedTx, globalMap, inputs, outputs } = psbt;
      dataToJoin.push({ unsignedTx, globalMap, inputs, outputs });
    });
    const result = combiner_1.combine([self].concat(dataToJoin));
    Object.assign(this, result);
    return this;
  }
  finalize() {
    // Finalize all inputs, default throw if can not
    // Return self for chaining.
    return this;
  }
  extractTransaction() {
    return new bitcoinjs_lib_1.Transaction();
  }
}
exports.Psbt = Psbt;
