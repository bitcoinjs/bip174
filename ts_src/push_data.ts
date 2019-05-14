import { BN } from 'bn.js';
import { OP_PUSHDATA1, OP_PUSHDATA2, OP_PUSHDATA4 } from 'bitcoin-ops';
import * as pushdata from 'pushdata-bitcoin';

const decBase = 10;
const endianness = 'le';

/** Get a push data buffer for data to push on the stack

  {
    [data]: <Data to Encode in Push Data Buffer>
    [encode]: <Data to Encode In Push Data Hex String>
  }

  @throws
  <Encode Data As Push Data Error>

  @returns
  <Push Data Buffer>
*/
export function pushData({ data, encode }) {
  const dataToEncode = data || Buffer.from(encode, 'hex');

  const dataLength = dataToEncode.length;

  switch (Buffer.alloc(pushdata.encodingLength(dataLength)).length) {
    case 1:
      return Buffer.concat([
        new BN(dataLength).toArrayLike(Buffer),
        dataToEncode,
      ]);

    case 2:
      return Buffer.concat([
        new BN(OP_PUSHDATA1, decBase).toArrayLike(Buffer),
        new BN(dataLength, decBase).toArrayLike(Buffer),
        dataToEncode,
      ]);

    case 3:
      return Buffer.concat([
        new BN(OP_PUSHDATA2, decBase).toArrayLike(Buffer),
        new BN(dataLength, decBase).toArrayLike(Buffer, endianness, 2),
        dataToEncode,
      ]);

    case 5:
      return Buffer.concat([
        new BN(OP_PUSHDATA4, decBase).toArrayLike(Buffer),
        new BN(dataLength, decBase).toArrayLike(Buffer, endianness, 4),
        dataToEncode,
      ]);

    default:
      throw new Error('UnexpectedLengthForDataPush');
  }
}
