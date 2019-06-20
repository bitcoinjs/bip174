import { combine } from './combiner';
import * as convert from './converter';
import {
  PsbtGlobal,
  PsbtInput,
  PsbtOutput,
  TransactionInput,
  TransactionInputAdder,
  TransactionIOCountGetter,
  TransactionOutput,
  TransactionOutputAdder,
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

  addInput(
    inputData: TransactionInput,
    transactionInputAdder: TransactionInputAdder = convert.globals.unsignedTx
      .addInput,
  ): Psbt {
    const txBuf = this.extractTransaction();
    const newTxBuf = transactionInputAdder(inputData, txBuf);
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.inputs.push({
      keyVals: [],
    });
    return this;
  }

  addOutput(
    outputData: TransactionOutput,
    transactionInputAdder: TransactionOutputAdder = convert.globals.unsignedTx
      .addOutput,
  ): Psbt {
    if (this.inputs.length === 0) {
      throw new Error(
        'Add Output: can not add an output before adding an input.',
      );
    }
    const txBuf = this.extractTransaction();
    const newTxBuf = transactionInputAdder(outputData, txBuf);
    insertTxInGlobalMap(newTxBuf, this.globalMap);
    this.outputs.push({
      keyVals: [],
    });
    return this;
  }

  combine(...those: Psbt[]): Psbt {
    // Combine this with those.
    // Return self for chaining.
    const result = combine([this as Psbt].concat(those));
    Object.assign(this, result);
    return this;
  }

  extractTransaction(): Buffer {
    const txKeyVals = this.globalMap.keyVals.filter(
      kv => kv.key[0] === GlobalTypes.UNSIGNED_TX,
    );
    const len = txKeyVals.length;
    if (len !== 1) {
      throw new Error(
        `Extract Transaction: Expected one Transaction, got ${len}`,
      );
    }
    return txKeyVals[0].value;
  }
}

function insertTxInGlobalMap(txBuf: Buffer, globalMap: PsbtGlobal): void {
  const txKeyVals = globalMap.keyVals.filter(
    kv => kv.key[0] === GlobalTypes.UNSIGNED_TX,
  );
  const len = txKeyVals.length;
  if (len !== 1) {
    throw new Error(
      `Extract Transaction: Expected one Transaction, got ${len}`,
    );
  }
  txKeyVals[0].value = txBuf;
}
