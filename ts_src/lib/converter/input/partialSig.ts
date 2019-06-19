import { KeyValue, PartialSig } from '../../interfaces';
import { InputTypes } from '../../typeFields';

export function decode(keyVal: KeyValue): PartialSig {
  if (keyVal.key[0] !== InputTypes.PARTIAL_SIG) {
    throw new Error(
      'Decode Error: could not decode partialSig with key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  if (
    !(keyVal.key.length === 34 || keyVal.key.length === 66) ||
    ![2, 3, 4].includes(keyVal.key[1])
  ) {
    throw new Error(
      'Decode Error: partialSig has invalid pubkey in key 0x' +
        keyVal.key.toString('hex'),
    );
  }
  const pubkey = keyVal.key.slice(1);
  return {
    pubkey,
    signature: keyVal.value,
  };
}

export function encode(pSig: PartialSig): KeyValue {
  const head = Buffer.from([InputTypes.PARTIAL_SIG]);
  return {
    key: Buffer.concat([head, pSig.pubkey]),
    value: pSig.signature,
  };
}
