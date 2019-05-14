"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Get from DER

  {
    x: <Buffer Object>
  }

  @returns
  <Buffer Object>
*/
function fromDer({ x }) {
    if (x[0] === 0x00) {
        x = x.slice(1);
    }
    const bstart = Math.max(0, 32 - x.length);
    const buffer = Buffer.alloc(32, 0);
    x.copy(buffer, bstart);
    return buffer;
}
exports.fromDer = fromDer;
