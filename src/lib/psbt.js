'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const combiner_1 = require('./combiner');
const parser_1 = require('./parser');
const typeFields_1 = require('./typeFields');
class Psbt {
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
    const { globalMap, inputs, outputs } = this;
    return parser_1.psbtToBuffer({ globalMap, inputs, outputs });
  }
  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.
  combine(...those) {
    // Combine this with those.
    // Return self for chaining.
    let self;
    {
      const { globalMap, inputs, outputs } = this;
      self = { globalMap, inputs, outputs };
    }
    const dataToJoin = [];
    those.forEach(psbt => {
      const { globalMap, inputs, outputs } = psbt;
      dataToJoin.push({ globalMap, inputs, outputs });
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
    return Buffer.from([]);
  }
}
exports.Psbt = Psbt;
