import * as tape from 'tape';
import { Psbt } from '../../lib/psbt';
import { fixtures } from '../fixtures/update';

let lastAfter: any;

for (const f of fixtures) {
  tape(f.description, t => {
    const before = f.before || lastAfter;
    const psbt = Psbt.fromBase64(before);
    for (const [i, input] of f.inputData.entries()) {
      for (const key of Object.keys(input)) {
        const upperKey = key.replace(/^./, s => s.toUpperCase());
        // @ts-ignore
        const func: any = psbt['add' + upperKey + 'ToInput'].bind(psbt);
        // @ts-ignore
        const data = input[key];
        if (Array.isArray(data)) {
          data.forEach((d: any) => func(i, d));
        } else {
          if (data === 'delete') {
            // @ts-ignore
            delete psbt.inputs[i][key];
          } else {
            func(i, data);
          }
        }
      }
    }
    for (const [i, output] of f.outputData.entries()) {
      for (const key of Object.keys(output)) {
        const upperKey = key.replace(/^./, s => s.toUpperCase());
        // @ts-ignore
        const func: any = psbt['add' + upperKey + 'ToOutput'].bind(psbt);
        // @ts-ignore
        const data = output[key];
        if (Array.isArray(data)) {
          data.forEach((d: any) => func(i, d));
        } else {
          if (data === 'delete') {
            // @ts-ignore
            delete psbt.outputs[i][key];
          } else {
            func(i, data);
          }
        }
      }
    }
    const result = psbt.toBase64();
    t.equal(f.after, result);
    lastAfter = f.after;
    t.end();
  });
}
