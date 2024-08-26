import { KeyValue, TapLeaf, TapTree } from '../../interfaces';
import { OutputTypes } from '../../typeFields.js';
// import * as varuint from '../varint.js';
import * as varuint from 'varuint-bitcoin';
import * as tools from 'uint8array-tools';

export function decode(keyVal: KeyValue): TapTree {
  if (keyVal.key[0] !== OutputTypes.TAP_TREE || keyVal.key.length !== 1) {
    throw new Error(
      'Decode Error: could not decode tapTree with key 0x' +
        tools.toHex(keyVal.key),
    );
  }
  let _offset = 0;
  const data: TapLeaf[] = [];
  while (_offset < keyVal.value.length) {
    const depth = keyVal.value[_offset++];
    const leafVersion = keyVal.value[_offset++];
    const { numberValue: scriptLen, bytes } = varuint.decode(
      keyVal.value,
      _offset,
    );
    _offset += bytes;
    data.push({
      depth,
      leafVersion,
      script: keyVal.value.slice(_offset, _offset + scriptLen!),
    });
    _offset += scriptLen!;
  }
  return { leaves: data };
}

export function encode(tree: TapTree): KeyValue {
  const key = Uint8Array.from([OutputTypes.TAP_TREE]);

  const bufs = ([] as Uint8Array[]).concat(
    ...tree.leaves.map(tapLeaf => [
      Uint8Array.of(tapLeaf.depth, tapLeaf.leafVersion),
      varuint.encode(BigInt(tapLeaf.script.length)).buffer,
      tapLeaf.script,
    ]),
  );
  return {
    key,
    value: tools.concat(bufs),
  };
}

export const expected =
  '{ leaves: [{ depth: number; leafVersion: number, script: Uint8Array; }] }';
export function check(data: any): data is TapTree {
  return (
    Array.isArray(data.leaves) &&
    data.leaves.every(
      (tapLeaf: any) =>
        tapLeaf.depth >= 0 &&
        tapLeaf.depth <= 128 &&
        (tapLeaf.leafVersion & 0xfe) === tapLeaf.leafVersion &&
        tapLeaf.script instanceof Uint8Array,
    )
  );
}

export function canAdd(currentData: any, newData: any): boolean {
  return !!currentData && !!newData && currentData.tapTree === undefined;
}
