import { Transaction as BTransaction } from 'bitcoinjs-lib';
import { reverseBuffer } from '../../lib/converter/tools.js';
import {
  Transaction as ITransaction,
  TransactionFromBuffer,
} from '../../lib/interfaces';

export function getDefaultTx(version: number = 1): Transaction {
  const TX = new Transaction(Buffer.from([1, 0, 0, 0, 0, 0, 0, 0, 0, 0]));
  TX.tx.version = version;
  return TX;
}

export const transactionFromBuffer: TransactionFromBuffer = (
  buffer: Uint8Array,
): Transaction => new Transaction(buffer);

export class Transaction implements ITransaction {
  tx: BTransaction;
  constructor(buffer: Uint8Array) {
    this.tx = BTransaction.fromBuffer(Buffer.from(buffer));
    if (this.tx.ins.some(input => input.script.length !== 0)) {
      throw new Error('Format Error: Transaction ScriptSigs are not empty');
    }
  }

  getInputOutputCounts(): {
    inputCount: number;
    outputCount: number;
  } {
    return {
      inputCount: this.tx.ins.length,
      outputCount: this.tx.outs.length,
    };
  }

  addInput(input: any): void {
    const hash =
      typeof input.hash === 'string'
        ? reverseBuffer(Buffer.from(input.hash, 'hex'))
        : input.hash;
    this.tx.addInput(hash, input.index, input.sequence);
  }

  addOutput(output: any): void {
    this.tx.addOutput(output.script, Number(output.value));
  }

  toBuffer(): Buffer {
    return this.tx.toBuffer();
  }
}
