"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zero = Buffer.from('00', 'hex');
/** DER encode bytes to eliminate sign confusion in a big-endian number.

  {
    point: <Point Hex String>
  }

  @return
  <Encoded Point Buffer>
*/
function derEncode({ point }) {
    let i = 0;
    let x = Buffer.from(point, 'hex');
    while (x[i] === 0) {
        ++i;
    }
    if (i === x.length) {
        return zero;
    }
    x = x.slice(i);
    if (x[0] & 0x80) {
        return Buffer.concat([zero, x], x.length + 1);
    }
    else {
        return x;
    }
}
exports.derEncode = derEncode;
