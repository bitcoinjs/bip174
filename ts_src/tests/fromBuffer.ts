import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/fromBuffer';
import { Transaction } from './utils/txTools';

const fromBuf = (b: Buffer): Transaction => new Transaction(b);

for (const f of fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      Psbt.fromHex(f.hex, fromBuf);
    }, new RegExp(f.exception));
    t.end();
  });
}
