import tape from 'tape';
import * as tools from 'uint8array-tools';
import { decode, encode } from '../lib/converter/output/tapTree.js';
import { Psbt } from '../lib/psbt.js';
import { transactionFromBuffer } from './utils/txTools.js';

const key = Uint8Array.of(6);

for (const hex of [
  '00c00551',
  '00c001',
  '01c0015101c00551',
  '00c0fd000151',
  '00c0ffffffffffffffffff',
]) {
  tape('tapTree rejects truncated script: ' + hex, t => {
    t.throws(
      () => decode({ key, value: tools.fromHex(hex) }),
      /Decode Error: tapTree script length exceeds remaining data/,
    );
    t.end();
  });
}

for (const hex of ['00c000', '00c00151', '01c0015101c00152']) {
  tape('tapTree preserves complete scripts: ' + hex, t => {
    const keyVal = { key, value: tools.fromHex(hex) };
    t.deepEqual(encode(decode(keyVal)), keyVal);
    t.end();
  });
}

tape('PSBT parsing rejects a truncated output tapTree script', t => {
  const hex =
    '70736274ff01003d0100000001010101010101010101010101010101010101010101010101010101' +
    '01010101010000000000ffffffff01e803000000000000015100000000000001060400c0055100';
  t.throws(
    () => Psbt.fromHex(hex, transactionFromBuffer),
    /Decode Error: tapTree script length exceeds remaining data/,
  );
  t.end();
});
