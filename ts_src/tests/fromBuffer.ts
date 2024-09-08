import tape from 'tape';
import { Psbt } from '../lib/psbt.js';
import { fixtures } from './fixtures/fromBuffer.js';

class Blah {
  constructor(public buf: Uint8Array) {}

  getInputOutputCounts(): {
    inputCount: number;
    outputCount: number;
  } {
    return {
      inputCount: this.buf[0],
      outputCount: this.buf[1],
    };
  }

  addInput(): void {
    return;
  }
  addOutput(): void {
    return;
  }
  toBuffer(): Uint8Array {
    return this.buf;
  }
}

const fromBuf = (b: Uint8Array): Blah => new Blah(b);

for (const f of fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      Psbt.fromHex(f.hex, fromBuf);
    }, new RegExp(f.exception));
    t.end();
  });
}
