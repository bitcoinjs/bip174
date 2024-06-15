import tape from 'tape';
import { Psbt } from '../../lib/psbt';
import { fixtures } from '../fixtures/valid';
import { transactionFromBuffer } from '../utils/txTools';

for (const f of fixtures) {
  tape(`Test: Should not throw`, t => {
    let psbt: Psbt;
    t.doesNotThrow(() => {
      psbt = Psbt.fromBase64(f, transactionFromBuffer);
    }, 'fromBase64');

    t.doesNotThrow(() => {
      const out = psbt.toBase64();
      t.equal(out, f);
    }, 'toBase64');

    t.end();
  });
}
