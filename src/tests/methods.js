'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const tape = require('tape');
const psbt_1 = require('../lib/psbt');
const methods_1 = require('./fixtures/methods');
const BJSON = require('json-buffer');
function run(f, typ) {
  tape(`check ${typ} method: ${f.method}`, t => {
    let func;
    let psbt;
    if (!f.addInputOutput) {
      // @ts-ignore
      func = psbt_1.Psbt[f.method].bind(psbt_1.Psbt);
    } else {
      psbt = new psbt_1.Psbt();
      addInputOutput(psbt);
      if (f.switchTx || f.dupeTx) {
        psbt.globalMap.keyVals.push({
          key: Buffer.from([0]),
          value: psbt.globalMap.unsignedTx,
        });
        if (!f.dupeTx) delete psbt.globalMap.unsignedTx;
      }
      // @ts-ignore
      func = psbt[f.method].bind(psbt);
    }
    try {
      psbt = func(...f.args);
      if (f.twice) {
        const dup = BJSON.parse(BJSON.stringify(f.args));
        const pubkeyArgs = dup.filter(arg => !!arg.pubkey);
        pubkeyArgs.forEach(arg => {
          arg.pubkey[2] = 0xff;
        });
        psbt = func(...dup);
      }
      if (f.exception) {
        t.equal('NO ERROR', f.exception);
        return t.end();
      }
    } catch (err) {
      if (!f.exception) throw err;
      t.equal(err.message, f.exception);
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
