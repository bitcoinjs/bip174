'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const fromBuffer_1 = require('./fixtures/fromBuffer');
class Blah {
  constructor(buf) {
    this.buf = buf;
  }
  getInputOutputCounts() {
    return {
      inputCount: this.buf[0],
      outputCount: this.buf[1],
    };
  }
  addInput() {
    return;
  }
  addOutput() {
    return;
  }
  toBuffer() {
    return this.buf;
  }
}
const fromBuf = b => new Blah(b);
for (const f of fromBuffer_1.fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      psbt_1.Psbt.fromHex(f.hex, fromBuf);
    }, new RegExp(f.exception));
    t.end();
  });
}
