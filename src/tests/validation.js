'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const combiner_1 = require('../lib/combiner');
const converter_1 = require('../lib/converter');
const txTools_1 = require('./utils/txTools');
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
    t.assert(converter_1.inputs.partialSig.check(data) === false);
  }
  const keyVal = {
    key: b('ff'),
    value: b('ff'),
  };
  t.throws(() => {
    converter_1.inputs.nonWitnessUtxo.decode(keyVal);
  }, new RegExp('Decode Error: could not decode nonWitnessUtxo with key 0xff'));
  t.throws(() => {
    converter_1.inputs.witnessUtxo.decode(keyVal);
  }, new RegExp('Decode Error: could not decode witnessUtxo with key 0xff'));
  t.throws(() => {
    converter_1.inputs.finalScriptSig.decode(keyVal);
  }, new RegExp('Decode Error: could not decode finalScriptSig with key 0xff'));
  t.throws(() => {
    converter_1.inputs.finalScriptWitness.decode(keyVal);
  }, new RegExp('Decode Error: could not decode finalScriptWitness with key 0xff'));
  t.throws(() => {
    converter_1.inputs.porCommitment.decode(keyVal);
  }, new RegExp('Decode Error: could not decode porCommitment with key 0xff'));
  t.throws(() => {
    converter_1.inputs.sighashType.decode(keyVal);
  }, new RegExp('Decode Error: could not decode sighashType with key 0xff'));
  t.throws(() => {
    converter_1.inputs.redeemScript.decode(keyVal);
  }, new RegExp('Decode Error: could not decode redeemScript with key 0xff'));
  t.throws(() => {
    converter_1.inputs.witnessScript.decode(keyVal);
  }, new RegExp('Decode Error: could not decode witnessScript with key 0xff'));
  t.throws(() => {
    converter_1.inputs.bip32Derivation.decode(keyVal);
  }, new RegExp('Decode Error: could not decode bip32Derivation with key 0xff'));
  t.throws(() => {
    converter_1.inputs.partialSig.decode(keyVal);
  }, new RegExp('Decode Error: could not decode partialSig with key 0xff'));
  keyVal.key = b('02ff');
  t.throws(() => {
    converter_1.inputs.partialSig.decode(keyVal);
  }, new RegExp('Decode Error: partialSig has invalid pubkey in key 0x02ff'));
  keyVal.key = Buffer.concat([b('02'), data.pubkey, data.pubkey.slice(1)]);
  const result = converter_1.inputs.partialSig.decode(keyVal);
  t.assert(result.pubkey.equals(keyVal.key.slice(1)));
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
    combiner_1.combine([psbt1]);
  }, new RegExp('Combine: Nothing to combine'));
  t.throws(() => {
    combiner_1.combine([psbt1, psbt2]);
  }, new RegExp('Combine: Self missing transaction'));
  psbt1.globalMap.unsignedTx = txTools_1.getDefaultTx(1);
  psbt2.globalMap.unsignedTx = txTools_1.getDefaultTx(2);
  t.throws(() => {
    combiner_1.combine([psbt1, psbt2]);
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
    combiner_1.combine([psbt1, psbt2]);
  }, new RegExp('Combine: KeyValue Map keys should be unique'));
  t.end();
});
