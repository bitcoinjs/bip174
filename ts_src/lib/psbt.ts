import { Transaction } from 'bitcoinjs-lib';
import { PsbtGlobal, PsbtInput, PsbtOutput } from './interfaces';
import { psbtFromBuffer, psbtToBuffer } from './parser';

export class Psbt {
  static fromBase64(data: string): Psbt {
    const buffer = Buffer.from(data, 'base64');
    return Psbt.fromBuffer(buffer);
  }
  static fromHex(data: string): Psbt {
    const buffer = Buffer.from(data, 'hex');
    return Psbt.fromBuffer(buffer);
  }
  static fromBuffer(buffer: Buffer): Psbt {
    const psbt = new Psbt();
    const results = psbtFromBuffer(buffer);
    Object.assign(psbt, results);
    return psbt;
  }

  inputs: PsbtInput[];
  outputs: PsbtOutput[];
  globalMap: PsbtGlobal;
  unsignedTx: Transaction;

  constructor() {
    this.globalMap = { keyVals: [] };
    this.inputs = [];
    this.outputs = [];
    this.unsignedTx = new Transaction();
  }

  toBase64(): string {
    const buffer = this.toBuffer();
    return buffer.toString('base64');
  }

  toHex(): string {
    const buffer = this.toBuffer();
    return buffer.toString('hex');
  }

  toBuffer(): Buffer {
    const { unsignedTx, globalMap, inputs, outputs } = this;
    return psbtToBuffer({ unsignedTx, globalMap, inputs, outputs });
  }

  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.

  combine(...those: Psbt[]): Psbt {
    // Combine this with those.
    // Return self for chaining.
    return those[0];
  }
  finalize(): Psbt {
    // Finalize all inputs, default throw if can not
    // Return self for chaining.
    return this;
  }

  extractTransaction(): Transaction {
    return new Transaction();
  }
}
