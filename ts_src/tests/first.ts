import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/first';

for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = Psbt.fromBuffer(Buffer.from(f.input, 'hex'));
    const hex = parsed.toHex();
    const parsed2 = Psbt.fromHex(hex);
    const hex2 = parsed.toHex();
    const parsed3 = Psbt.fromHex(hex2);
    const bufHexxedString = jsonify(parsed);
    const bufHexxedString2 = jsonify(parsed2);
    const bufHexxedString3 = jsonify(parsed3);
    const strippedParsed = stripIndices(parsed);
    const strippedParsed2 = stripIndices(parsed2);

    t.deepEqual(JSON.parse(bufHexxedString), f.output);
    t.deepEqual(JSON.parse(bufHexxedString2), JSON.parse(bufHexxedString3));
    t.deepEqual(strippedParsed, strippedParsed2);
    t.equal(hex, hex2);
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

function stripIndices(psbt: Psbt): Psbt {
  const newPsbt = JSON.parse(
    JSON.stringify(psbt, (key, value) => {
      if (key === 'index') {
        return 0;
      } else if (key === 'keyVals') {
        return [];
      } else {
        return value;
      }
    }),
  ) as Psbt;
  return newPsbt;
}
