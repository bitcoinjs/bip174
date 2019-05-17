import { encodePsbt } from './encode_psbt';
import { global } from './types';
import { Transaction } from 'bitcoinjs-lib';

const defaultTransactionVersionNumber: number = 2;
const type: Buffer = Buffer.from(global.unsigned_tx, 'hex');

interface Output {
  script: string;
  tokens: number;
}

interface Utxo {
  id: string;
  sequence?: number;
  vout: number;
}

export interface CreatePsbtsInput {
  outputs: Output[];
  utxos: Utxo[];
  timelock?: number;
  version?: number;
}

export interface CreatePsbtsOutput {
  psbt: string;
}

/** Create a PSBT

  {
    outputs: [{
      script: <Output ScriptPub Hex String>
      tokens: <Sending Tokens Number>
    }]
    utxos: [{
      id: <Transaction Id Hex String>
      [sequence]: <Sequence Number>
      vout: <Output Index Number>
    }]
    [timelock]: <Set Lock Time on Transaction To Number>
    [version]: <Transaction Version Number>
  }

  @returns
  {
    psbt: <Partially Signed Bitcoin Transaction Hex Encoded String>
  }
*/
export function createPsbt({
  outputs,
  timelock,
  utxos,
  version,
}: CreatePsbtsInput): CreatePsbtsOutput {
  if (!Array.isArray(outputs)) {
    throw new Error('ExpectedTransactionOutputsForNewPsbt');
  }

  if (!Array.isArray(utxos)) {
    throw new Error('ExpectedTransactionInputsForNewPsbt');
  }

  // Construct a new transaction that will be the basis of the PSBT
  const tx = new Transaction();

  if (timelock !== undefined) {
    tx.locktime = timelock;
  }
  tx.version = version || defaultTransactionVersionNumber;

  // Push all the unsigned inputs into the transaction
  utxos
    .map(({ id, vout }) => ({ vout, hash: Buffer.from(id, 'hex') }))
    .forEach(({ hash, vout }) => tx.addInput(hash.reverse(), vout));

  // Set sequence numbers as necessary
  utxos.forEach(({ sequence }, vin) => {
    if (sequence !== undefined) {
      tx.ins[vin].sequence = sequence;
    }
    return sequence;
  });

  // Append all the outputs to the transaction
  outputs
    .map(({ script, tokens }) => ({
      tokens,
      script: Buffer.from(script, 'hex'),
    }))
    .forEach(({ script, tokens }) => tx.addOutput(script, tokens));

  // Initialize the type value pairs with the transaction
  const pairs = [{ type, value: tx.toBuffer() }, { separator: true }];

  // Each input and output is represented as an empty key value pair
  [...outputs, ...utxos].forEach(() => pairs.push({ separator: true }));

  return encodePsbt({ pairs });
}
