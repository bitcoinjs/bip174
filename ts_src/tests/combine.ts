import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/combine';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const psbts = f.psbts.map(p => Psbt.fromHex(p));
    const jsonA1 = jsonify(psbts[0]);
    const jsonA2 = jsonify(psbts[1]);
    psbts[0].combine(psbts[1]);
    const jsonB1 = jsonify(psbts[0]);
    const jsonB2 = jsonify(psbts[1]);

    // console.log(jsonA1);
    // console.log(jsonA2);
    // console.log(jsonB1);
    // console.log(jsonB2);

    t.notDeepEqual(JSON.parse(jsonA1), JSON.parse(jsonB1));
    t.deepEqual(JSON.parse(jsonA2), JSON.parse(jsonB2));
    t.equal(psbts[0].toHex(), f.result);
    t.end();
  });
}

function jsonify(parsed: any): string {
  return JSON.stringify(
    parsed,
    (key, value) => {
      return key !== undefined && value.type === 'Buffer'
        ? Buffer.from(value.data).toString('hex')
        : value;
    },
    2,
  );
}
