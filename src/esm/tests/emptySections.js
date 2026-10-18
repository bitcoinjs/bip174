import tape from 'tape';
import { Psbt } from '../lib/psbt.js';
// PSBTs made by Bitcoin Core v31.1.0 on regtest:
//   bitcoin-cli createpsbt '[]' '[{"<p2wpkh address>": 0.001}]'
//   bitcoin-cli createpsbt '[{"txid": "00..01", "vout": 0}]' '[]'
// `decodepsbt` accepts both, and rejects either with one extra 0x00 at the
// end ("extra data after PSBT"): a PSBT with no inputs has no input maps,
// and one with no outputs has no output maps.
const fixtures = [
  {
    description: 'no inputs, one output',
    hex:
      '70736274ff010029020000000001a086010000000000160014a018e6be08c9ef28aed9' +
      '8ba4686287472b41505a000000000000',
    inputCount: 0,
    outputCount: 1,
  },
  {
    description: 'one input, no outputs',
    hex:
      '70736274ff0100330200000001010000000000000000000000000000000000000000' +
      '00000000000000000000000000000000fdffffff00000000000000',
    inputCount: 1,
    outputCount: 0,
  },
  {
    // The BIP 174 test vector for an empty transaction: only the global
    // separator follows the global map.
    description: 'no inputs, no outputs',
    hex: '70736274ff01000a0000000000000000000000',
    inputCount: 0,
    outputCount: 0,
  },
];
// Reads the counts from the unsigned transaction in the format without
// witnesses, which is how BIP 174 stores it. The inputs have no scriptSig.
class StubTx {
  constructor(buf) {
    this.buf = buf;
  }
  getInputOutputCounts() {
    const inputCount = this.buf[4];
    const outputCount = this.buf[5 + inputCount * 41];
    return { inputCount, outputCount };
  }
  addInput() {
    return;
  }
  addOutput() {
    return;
  }
  toBuffer() {
    return this.buf;
  }
}
for (const f of fixtures) {
  tape('Test: serialize ' + f.description + ' as Bitcoin Core does', t => {
    const psbt = Psbt.fromHex(f.hex, b => new StubTx(b));
    t.equal(psbt.inputs.length, f.inputCount);
    t.equal(psbt.outputs.length, f.outputCount);
    t.equal(psbt.toHex(), f.hex);
    t.end();
  });
}
tape(
  'Test: an output field of a PSBT with no inputs survives a round trip',
  t => {
    const psbt = Psbt.fromHex(fixtures[0].hex, b => new StubTx(b));
    const redeemScript = Uint8Array.from([0x51]);
    psbt.updateOutput(0, { redeemScript });
    const back = Psbt.fromHex(psbt.toHex(), b => new StubTx(b));
    t.deepEqual(back.outputs[0].redeemScript, redeemScript);
    t.end();
  },
);
