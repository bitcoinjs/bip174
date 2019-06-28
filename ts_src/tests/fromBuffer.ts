import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/fromBuffer';

for (const f of fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      Psbt.fromHex(f.hex, (tx: Buffer) => {
        return {
          inputCount: tx[0],
          outputCount: tx[1],
        };
      });
    }, f.exception);
    t.end();
  });
}
