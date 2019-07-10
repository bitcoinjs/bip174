import * as tape from 'tape';
import { psbtFromKeyVals } from '../lib/parser/fromBuffer';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/keyValsToPsbt';

for (const f of fixtures) {
  if (f.exception) {
    tape('From keyVals should throw:', t => {
      t.throws(() => {
        psbtFromKeyVals(f.data);
      }, new RegExp(f.exception));
      t.end();
    });
  } else {
    tape('From keyVals should not throw:', t => {
      const data = psbtFromKeyVals(f.data);
      const psbt = new Psbt();
      Object.assign(psbt, data);
      t.strictEqual(psbt.toBase64(), f.expected);
      // else console.log(psbt.toBase64());
      t.end();
    });
  }
}
