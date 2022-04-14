'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const methods_1 = require('./fixtures/methods');
const txTools_1 = require('./utils/txTools');
const BJSON = require('buffer-json');
function run(f, typ) {
  tape(`check ${typ} method: ${f.method}`, t => {
    let func;
    let psbt;
    if (!f.addInputOutput) {
      // @ts-ignore
      func = psbt_1.Psbt[f.method].bind(psbt_1.Psbt);
    } else {
      psbt = new psbt_1.Psbt(txTools_1.getDefaultTx());
      addInputOutput(psbt);
      // @ts-ignore
      func = psbt[f.method].bind(psbt);
    }
    try {
      psbt = func(...f.args);
      if (f.twice) {
        const dup = JSON.parse(BJSON.stringify(f.args), (key, value) => {
          if (
            key &&
            value &&
            value.type &&
            value.type === 'Buffer' &&
            value.data.startsWith('base64:')
          ) {
            const buf = Buffer.from(value.data.slice(7), 'base64');
            if (
              ['pubkey', 'extendedPubkey', 'controlBlock'].indexOf(key) > -1
            ) {
              buf[2] = 0xff;
            }
            return buf;
          }
          return value;
        });
        psbt = func(...dup);
      }
      if (f.exception) {
        t.equal('NO ERROR', f.exception);
        return t.end();
      }
    } catch (err) {
      if (!f.exception) throw err;
      t.throws(() => {
        if (err) throw err;
      }, new RegExp(f.exception));
      return t.end();
    }
    if (f.expected) t.equal(psbt.toBase64(), f.expected);
    else console.log(f.method + '\n' + psbt.toBase64() + '\n');
    t.end();
  });
}
for (const f of methods_1.fixtures.valid) {
  run(f, 'valid');
}
for (const f of methods_1.fixtures.invalid) {
  run(f, 'invalid');
}
function addInputOutput(psbt) {
  psbt.addInput({
    hash: '865dce988413971fd812d0e81a3395ed916a87ea533e1a16c0f4e15df96fa7d4',
    index: 3,
  });
  psbt.addOutput({
    script: Buffer.from(
      'a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87',
      'hex',
    ),
    value: 1234567890,
  });
}
