import { KeyValue, WitnessUtxo } from '../../interfaces';
import { InputTypes } from '../../typeFields';
import { reverseBuffer } from '../tools';

const varuint = require('varuint-bitcoin');

export function decode(keyVal: KeyValue): WitnessUtxo {
  if (keyVal.key[0] !== InputTypes.WITNESS_UTXO) {
    throw new Error(
      'Decode Error: could not decode witnessUtxo with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const valBuf = keyVal.value.slice(0, 8);
  const revBuf = reverseBuffer(Buffer.from(valBuf));
  const value = parseInt(revBuf.toString('hex'), 16);
  let _offset = 8;
  const scriptLen = varuint.decode(keyVal.value, _offset);
  _offset += varuint.encodingLength(scriptLen);
  const script = keyVal.value.slice(_offset);
  if (script.length !== scriptLen) {
    throw new Error('Decode Error: WITNESS_UTXO script is not proper length');
  }
  return {
    script,
    value,
  };
}

export function encode(data: WitnessUtxo): KeyValue {
  const { script, value } = data;
  const varintLen = varuint.encodingLength(script.length);
  const valueBuf = Buffer.from(
    ('0'.repeat(16) + value.toString(16)).slice(-16),
    'hex',
  );
  const reversed = reverseBuffer(valueBuf);

  const result = Buffer.allocUnsafe(8 + varintLen + script.length);

  reversed.copy(result, 0);
  varuint.encode(script.length, result, 8);
  script.copy(result, 8 + varintLen);

  return {
    key: Buffer.from([InputTypes.WITNESS_UTXO]),
    value: result,
  };
}
