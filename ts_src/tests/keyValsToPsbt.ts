import * as tape from 'tape';
import { psbtFromKeyVals } from '../lib/parser/fromBuffer';
import { fixtures } from './fixtures/keyValsToPsbt';

for (const f of fixtures) {
  tape('From Buffer should throw:', t => {
    t.throws(() => {
      psbtFromKeyVals(f.data);
    }, f.exception);
    t.end();
  });
}
