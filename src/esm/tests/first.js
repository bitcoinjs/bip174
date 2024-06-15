import tape from 'tape';
import { Psbt } from '../lib/psbt.js';
import { fixtures } from './fixtures/first.js';
import { transactionFromBuffer } from './utils/txTools.js';
for (const f of fixtures) {
  tape('Test: ' + f.description, t => {
    const parsed = Psbt.fromHex(f.input, transactionFromBuffer);
    const hex = parsed.toHex();
    const parsed2 = Psbt.fromHex(hex, transactionFromBuffer);
    const hex2 = parsed2.toHex();
    const parsed3 = Psbt.fromHex(hex2, transactionFromBuffer);
    t.strictEqual(parsed.toHex(), parsed2.toHex());
    t.strictEqual(parsed.toHex(), parsed3.toHex());
    // @ts-ignore
    parsed3.globalMap.unsignedTx = parsed3.globalMap.unsignedTx.toBuffer();
    t.deepEqual(JSON.parse(jsonify(parsed3)), f.output);
    t.equal(hex, hex2);
    t.end();
  });
}
function jsonify(parsed) {
  return JSON.stringify(
    parsed,
    (key, value) => {
      return key !== undefined && value !== undefined && value.type === 'Buffer'
        ? Buffer.from(value.data).toString('hex')
        : value;
    },
    2,
  );
}
