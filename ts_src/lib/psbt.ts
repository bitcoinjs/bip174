import { combine } from './combiner';
import {
  PsbtGlobal,
  PsbtInput,
  PsbtOutput,
  TransactionIOCountGetter,
} from './interfaces';
import { PsbtAttributes, psbtFromBuffer, psbtToBuffer } from './parser';
import { GlobalTypes } from './typeFields';

export class Psbt {
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
    const { globalMap, inputs, outputs } = this;
    return psbtToBuffer({ globalMap, inputs, outputs });
  }

  // TODO:
  // Add methods to update various parts. (ie. "updater" responsibility)
  // Return self for chaining.

  combine(...those: Psbt[]): Psbt {
    // Combine this with those.
    // Return self for chaining.
    let self: PsbtAttributes;
    {
      const { globalMap, inputs, outputs } = this;
      self = { globalMap, inputs, outputs };
    }
    const dataToJoin: PsbtAttributes[] = [];
    those.forEach(psbt => {
      const { globalMap, inputs, outputs } = psbt;
      dataToJoin.push({ globalMap, inputs, outputs });
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

  extractTransaction(): Buffer {
    return Buffer.from([]);
  }
}
