'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const first_1 = require('./fixtures/first');
for (const f of first_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = psbt_1.Psbt.fromBuffer(Buffer.from(f.input, 'hex'));
    const hex = parsed.toHex();
    const parsed2 = psbt_1.Psbt.fromHex(hex);
    const hex2 = parsed.toHex();
    const parsed3 = psbt_1.Psbt.fromHex(hex2);
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
function jsonify(parsed) {
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
function stripIndices(psbt) {
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
  );
  return newPsbt;
}
