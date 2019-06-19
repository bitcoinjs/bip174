import { Transaction } from 'bitcoinjs-lib';
import { combine } from './combiner';
import { PsbtGlobal, PsbtInput, PsbtOutput } from './interfaces';
import { PsbtAttributes, psbtFromBuffer, psbtToBuffer } from './parser';

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
    this.globalMap.keyVals.push({
      key: Buffer.from([0]),
      value: this.unsignedTx.toBuffer(),
    });
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
    let self: PsbtAttributes;
    {
      const { unsignedTx, globalMap, inputs, outputs } = this;
      self = { unsignedTx, globalMap, inputs, outputs };
    }
    const dataToJoin: PsbtAttributes[] = [];
    those.forEach(psbt => {
      const { unsignedTx, globalMap, inputs, outputs } = psbt;
      dataToJoin.push({ unsignedTx, globalMap, inputs, outputs });
    });
    const result = combine([self].concat(dataToJoin));
    Object.assign(this, result);
    return this;
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
