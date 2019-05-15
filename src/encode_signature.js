"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { encode } = require('bip66');
const der_encode_1 = require("./der_encode");
const pointSize = 32;
/** Encode a signature

  {
    flag: <Signature Hash Flag Number>
    signature: <Signature Hex String>
  }

  @returns
  <Encoded Signature Buffer>
*/
function encodeSignature({ flag, signature }) {
    const hashType = Buffer.from([flag]);
    const sEnd = pointSize + pointSize;
    const sig = Buffer.from(signature, 'hex');
    const r = der_encode_1.derEncode({ point: sig.slice(0, pointSize).toString('hex') });
    const s = der_encode_1.derEncode({ point: sig.slice(pointSize, sEnd).toString('hex') });
    return Buffer.concat([encode(r, s), hashType]);
}
exports.encodeSignature = encodeSignature;
