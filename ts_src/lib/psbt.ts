import { combine } from './combiner';
import * as convert from './converter';
import {
  PsbtGlobal,
  PsbtInput,
  PsbtOutput,
  TransactionIOCountGetter,
} from './interfaces';
import { psbtFromBuffer, psbtToBuffer } from './parser';
import { GlobalTypes } from './typeFields';

export class Psbt {
  static fromTransaction(
    txBuf: Buffer,
    txCountGetter?: TransactionIOCountGetter,
  ): Psbt {
    if (txCountGetter === undefined)
      txCountGetter = convert.globals.unsignedTx.getInputOutputCounts;
    const result = txCountGetter(txBuf);
    const psbt = new Psbt();
    psbt.globalMap.keyVals[0].value = txBuf;
    while (result.inputCount > 0) {
      psbt.inputs.push({
        keyVals: [],
      });
      result.inputCount--;
    }
    while (result.outputCount > 0) {
      psbt.outputs.push({
        keyVals: [],
      });
      result.outputCount--;
    }
    return psbt;
  }
  static fromBase64(
    data: string,
    txCountGetter?: TransactionIOCountGetter,
  ): Psbt {
    const buffer = Buffer.from(data, 'base64');
    return Psbt.fromBuffer(buffer, txCountGetter);
  }
  static fromHex(data: string, txCountGetter?: TransactionIOCountGetter): Psbt {
    const buffer = Buffer.from(data, 'hex');
    return Psbt.fromBuffer(buffer, txCountGetter);
  }
  static fromBuffer(
    buffer: Buffer,
    txCountGetter?: TransactionIOCountGetter,
  ): Psbt {
    const psbt = new Psbt();
    const results = psbtFromBuffer(buffer, txCountGetter);
    Object.assign(psbt, results);
    return psbt;
  }

  inputs: PsbtInput[];
  outputs: PsbtOutput[];
  globalMap: PsbtGlobal;

  constructor() {
    this.globalMap = {
      keyVals: [
        {
          key: Buffer.from([GlobalTypes.UNSIGNED_TX]),
          // version 1, locktime 0, 0 ins, 0 outs
          value: Buffer.from('01000000000000000000', 'hex'),
        },
      ],
    };
    this.inputs = [];
    this.outputs = [];
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
    return psbtToBuffer(this);
  }

  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.

  combine(...those: Psbt[]): Psbt {
    // Combine this with those.
    // Return self for chaining.
    const result = combine([this as Psbt].concat(those));
    Object.assign(this, result);
    return this;
  }

  finalize(): Psbt {
    // Finalize all inputs, default throw if can not
    // Return self for chaining.
    return this;
  }

  extractTransaction(): Buffer {
    return Buffer.from([]);
  }
}
