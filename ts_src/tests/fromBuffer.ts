import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/fromBuffer';

class Blah {
  constructor(public buf: Buffer) {}

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
  toBuffer(): Buffer {
    return this.buf;
  }
}

const fromBuf = (b: Buffer): Blah => new Blah(b);

for (const f of fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      Psbt.fromHex(f.hex, fromBuf);
    }, new RegExp(f.exception));
    t.end();
  });
}
