import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/first';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = Psbt.fromBuffer(Buffer.from(f.input, 'hex'));
    const bufHexxedString = JSON.stringify(
      parsed,
      (key, value) => {
        return key !== undefined && value.type === 'Buffer'
          ? Buffer.from(value.data).toString('hex')
          : value;
      },
      2,
    );
    console.log(bufHexxedString);
    t.deepEqual(JSON.parse(bufHexxedString), f.output);
    t.end();
  });
}
