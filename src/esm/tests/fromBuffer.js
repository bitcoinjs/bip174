import tape from 'tape';
import { Psbt } from '../lib/psbt.js';
import { fixtures } from './fixtures/fromBuffer.js';
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
for (const f of fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      Psbt.fromHex(f.hex, fromBuf);
    }, new RegExp(f.exception));
    t.end();
  });
}
