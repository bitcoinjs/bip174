import * as tape from 'tape';
import { psbtFromKeyVals } from '../lib/parser/fromBuffer';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/keyValsToPsbt';
import { getDefaultTx, transactionFromBuffer } from './utils/txTools';

for (const f of fixtures) {
  if (f.exception) {
    tape('From keyVals should throw:', t => {
      t.throws(() => {
        psbtFromKeyVals(getDefaultTx(), f.data);
      }, new RegExp(f.exception));
      t.end();
    });
  } else {
    const tx = transactionFromBuffer(
      f.data.globalMapKeyVals.filter(kv => kv.key[0] === 0)[0].value,
    );
    tape('From keyVals should not throw:', t => {
      const data = psbtFromKeyVals(tx, f.data);
      const psbt = new Psbt(tx);
      Object.assign(psbt, data);
      t.strictEqual(psbt.toBase64(), f.expected);
      // else console.log(psbt.toBase64());
      t.end();
    });
  }
}
