import { Transaction as BTransaction } from 'bitcoinjs-lib';
import { reverseBuffer } from '../../lib/converter/tools.js';
export function getDefaultTx(version = 1) {
  const TX = new Transaction(Buffer.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  TX.tx.version = version;
  return TX;
}
export const transactionFromBuffer = buffer => new Transaction(buffer);
export class Transaction {
  constructor(buffer) {
    this.tx = BTransaction.fromBuffer(Buffer.from(buffer));
    if (this.tx.ins.some(input => input.script.length !== 0)) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
  }
  getInputOutputCounts() {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length,
    };
  }
  addInput(input) {
    const hash =
      typeof input.hash === 'string'
        ? reverseBuffer(Buffer.from(input.hash, 'hex'))
        : input.hash;
    this.tx.addInput(hash, input.index, input.sequence);
  }
  addOutput(output) {
    this.tx.addOutput(output.script, Number(output.value));
  }
  toBuffer() {
    return this.tx.toBuffer();
  }
}
