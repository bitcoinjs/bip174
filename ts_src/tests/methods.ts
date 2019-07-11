import * as tape from 'tape';
import { Psbt } from '../lib/psbt';
import { fixtures } from './fixtures/methods';
import { addInput, addOutput } from './utils/txTools';
const BJSON = require('json-buffer');

function run(f: any, typ: string): void {
  tape(`check ${typ} method: ${f.method}`, t => {
    let func: any;
    let psbt: Psbt | undefined;
    if (!f.addInputOutput) {
      // @ts-ignore
      func = Psbt[f.method].bind(Psbt);
    } else {
      psbt = new Psbt();
      addInputOutput(psbt);
      if (f.switchTx || f.dupeTx) {
        psbt.globalMap.unknownKeyVals.push({
          key: Buffer.from([0]),
          value: psbt.globalMap.unsignedTx!,
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
        const pubkeyArgs = dup.filter((arg: any) => !!arg.pubkey);
        pubkeyArgs.forEach((arg: any) => {
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
    t.equal(psbt!.toBase64(), f.expected);
    // else console.log(f.method + '\n' + psbt!.toBase64() + '\n');
    t.end();
  });
}

for (const f of fixtures.valid) {
  run(f, 'valid');
}

for (const f of fixtures.invalid) {
  run(f, 'invalid');
}

function addInputOutput(psbt: Psbt): void {
  psbt.addInput(
    {
      hash: '865dce988413971fd812d0e81a3395ed916a87ea533e1a16c0f4e15df96fa7d4',
      index: 3,
    },
    addInput,
  );
  psbt.addOutput(
    {
      script: Buffer.from(
        'a914e18870f2c297fbfca54c5c6f645c7745a5b66eda87',
        'hex',
      ),
      value: 1234567890,
    },
    addOutput,
  );
}
