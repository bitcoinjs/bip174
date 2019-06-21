import * as tape from 'tape';
import { Psbt } from '../lib/psbt';

tape('Test: add Input Output', t => {
  const psbt = new Psbt();
  t.throws(() => {
    psbt.addOutput({
      script: Buffer.from([]),
      value: 1,
    });
  }, 'Add Output: can not add an output before adding an input.');
  psbt.addInput({
    hash: '865dce988413971fd812d0e81a3395ed916a87ea533e1a16c0f4e15df96fa7d4',
    index: 3,
  });
  psbt.addInput({
    hash: 'ff5dce988413971fd812d0e81a3395ed916a87ea533e1a16c0f4e15df96fa7d4',
    index: 1,
  });
  psbt.addOutput({
    script: Buffer.from(
      'a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87',
      'hex',
    ),
    value: 1234567890,
  });
  psbt.addOutput({
    script: Buffer.from(
      'a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87',
      'hex',
    ),
    value: 987654321,
  });
  const hex = psbt.toHex();
  const hex2 = Psbt.fromHex(hex).toHex();
  t.equal(
    hex,
    '70736274ff01009c0200000002d4a76ff95de1f4c0161a3e53ea876a91ed95331ae8d01' +
      '2d81f97138498ce5d860300000000ffffffffd4a76ff95de1f4c0161a3e53ea876a91' +
      'ed95331ae8d012d81f97138498ce5dff0100000000ffffffff02d2029649000000001' +
      '7a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87b168de3a0000000017a914' +
      'e18870f2c297fbfca54c5c6f645c7745a5b66eda87000000000000000000',
  );
  t.equal(hex, hex2);

  // console.log(jsonA1);
  // console.log(jsonA2);
  // console.log(jsonB1);
  // console.log(jsonB2);

  // t.notDeepEqual(JSON.parse(jsonA1), JSON.parse(jsonB1));
  // t.deepEqual(JSON.parse(jsonA2), JSON.parse(jsonB2));
  t.end();
});
