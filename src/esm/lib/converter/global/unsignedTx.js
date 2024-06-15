import { GlobalTypes } from '../../typeFields.js';
export function encode(data) {
  return {
    key: Buffer.from([GlobalTypes.UNSIGNED_TX]),
    value: data.toBuffer(),
  };
}
