import tape from 'tape';
import { combine } from '../lib/combiner/index.js';
import {
  globals as convertGlobal,
  inputs as convertInputs,
} from '../lib/converter/index.js';
import { getDefaultTx } from './utils/txTools.js';
import * as tools from 'uint8array-tools';
const b = hex => Buffer.from(hex, 'hex');
tape('should not pass isPartialSig with invalid DER signature', t => {
  const data = {
    pubkey: b(
      '03000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f',
    ),
    signature: b(''),
  };
  const sigs = [
    b('00'),
    b('000000000000000000'),
    b('300000000000000000'),
    b('300600000000000000'),
    b('300602000000000000'),
    b('300602010000000000'),
    b('300602010002000000'),
    b('30070201000201000000'),
  ];
  for (const sig of sigs) {
    data.signature = sig;
    t.assert(convertInputs.partialSig.check(data) === false);
  }
  const keyVal = {
    key: b('ff'),
    value: b('ff'),
  };
  t.throws(() => {
    convertInputs.nonWitnessUtxo.decode(keyVal);
  }, new RegExp('Decode Error: could not decode nonWitnessUtxo with key 0xff'));
  t.throws(() => {
    convertInputs.witnessUtxo.decode(keyVal);
  }, new RegExp('Decode Error: could not decode witnessUtxo with key 0xff'));
  t.throws(() => {
    convertInputs.finalScriptSig.decode(keyVal);
  }, new RegExp('Decode Error: could not decode finalScriptSig with key 0xff'));
  t.throws(() => {
    convertInputs.finalScriptWitness.decode(keyVal);
  }, new RegExp('Decode Error: could not decode finalScriptWitness with key 0xff'));
  t.throws(() => {
    convertInputs.porCommitment.decode(keyVal);
  }, new RegExp('Decode Error: could not decode porCommitment with key 0xff'));
  t.throws(() => {
    convertInputs.sighashType.decode(keyVal);
  }, new RegExp('Decode Error: could not decode sighashType with key 0xff'));
  t.throws(() => {
    convertInputs.redeemScript.decode(keyVal);
  }, new RegExp('Decode Error: could not decode redeemScript with key 0xff'));
  t.throws(() => {
    convertInputs.witnessScript.decode(keyVal);
  }, new RegExp('Decode Error: could not decode witnessScript with key 0xff'));
  t.throws(() => {
    convertInputs.bip32Derivation.decode(keyVal);
  }, new RegExp('Decode Error: could not decode bip32Derivation with key 0xff'));
  t.throws(() => {
    convertInputs.partialSig.decode(keyVal);
  }, new RegExp('Decode Error: could not decode partialSig with key 0xff'));
  keyVal.key = b('02ff');
  t.throws(() => {
    convertInputs.partialSig.decode(keyVal);
  }, new RegExp('Decode Error: partialSig has invalid pubkey in key 0x02ff'));
  keyVal.key = Buffer.concat([b('02'), data.pubkey, data.pubkey.slice(1)]);
  const result = convertInputs.partialSig.decode(keyVal);
  // t.assert(result.pubkey.equals(keyVal.key.slice(1)));
  t.assert(tools.compare(result.pubkey, keyVal.key.slice(1)) === 0);
  const psbt1 = {
    globalMap: {
      unknownKeyVals: [],
    },
    inputs: [],
    outputs: [],
  };
  const psbt2 = {
    globalMap: {
      unknownKeyVals: [],
    },
    inputs: [],
    outputs: [],
  };
  t.throws(() => {
    combine([psbt1]);
  }, new RegExp('Combine: Nothing to combine'));
  t.throws(() => {
    combine([psbt1, psbt2]);
  }, new RegExp('Combine: Self missing transaction'));
  psbt1.globalMap.unsignedTx = getDefaultTx(1);
  psbt2.globalMap.unsignedTx = getDefaultTx(2);
  t.throws(() => {
    combine([psbt1, psbt2]);
  }, new RegExp('Combine: One of the Psbts does not have the same transaction.'));
  psbt1.globalMap.unknownKeyVals.push({
    key: b('09'),
    value: b('ff'),
  });
  psbt1.globalMap.unknownKeyVals.push({
    key: b('09'),
    value: b('ff'),
  });
  t.throws(() => {
    combine([psbt1, psbt2]);
  }, new RegExp('Combine: KeyValue Map keys should be unique'));
  t.ok(
    convertGlobal.globalXpub.check({
      masterFingerprint: b('3442193e'),
      extendedPubkey: b(
        // tslint:disable-next-line:max-line-length
        '0488b21e000000000000000000873dff81c02f525623fd1fe5167eac3a55a049de3d314bb42ee227ffed37d5080339a36013301597daef41fbe593a02cc513d0b55527ec2df1050e2e8ff49c85c2',
      ),
      path: 'm',
    }),
  );
  t.end();
});
