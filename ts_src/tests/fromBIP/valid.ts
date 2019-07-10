import * as tape from 'tape';
import { Psbt } from '../../lib/psbt';
import { fixtures } from '../fixtures/valid';
import { getInputOutputCounts as ioGet } from '../utils/txTools';

for (const f of fixtures) {
  tape(`Test: Should not throw`, t => {
    t.doesNotThrow(() => {
      Psbt.fromBase64(f, ioGet);
    });
    t.end();
  });
}
