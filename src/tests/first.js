'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const first_1 = require('./fixtures/first');
for (const f of first_1.fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = psbt_1.Psbt.fromBuffer(Buffer.from(f.input, 'hex'));
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
