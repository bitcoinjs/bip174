import * as tape from 'tape';
import { Psbt } from '../../lib/psbt';
import { fixtures } from '../fixtures/valid';
import { transactionFromBuffer } from '../utils/txTools';

for (const f of fixtures) {
  tape(`Test: Should not throw`, t => {
    t.doesNotThrow(() => {
      Psbt.fromBase64(f, transactionFromBuffer);
    });
    t.end();
  });
}
