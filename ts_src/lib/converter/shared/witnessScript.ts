import { KeyValue, WitnessScript } from '../../interfaces';

export function makeConverter(
  TYPE_BYTE: number,
): {
  decode: (keyVal: KeyValue) => WitnessScript;
  encode: (data: WitnessScript) => KeyValue;
} {
  return {
    decode,
    encode,
  };

  function decode(keyVal: KeyValue): WitnessScript {
    if (keyVal.key[0] !== TYPE_BYTE) {
      throw new Error(
        'Decode Error: could not decode witnessScript with key 0x' +
          keyVal.key.toString('hex'),
      );
    }
    return {
      index: 0,
      data: keyVal.value,
    };
  }

  function encode(data: WitnessScript): KeyValue {
    const key = Buffer.from([TYPE_BYTE]);
    return {
      key,
      value: data.data,
    };
  }
}
