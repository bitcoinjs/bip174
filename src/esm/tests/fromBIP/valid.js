import tape from 'tape';
import { Psbt } from '../../lib/psbt.js';
import { fixtures } from '../fixtures/valid.js';
import { transactionFromBuffer } from '../utils/txTools.js';
for (const f of fixtures) {
  tape(`Test: Should not throw`, t => {
    let psbt;
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
