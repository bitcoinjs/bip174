"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bip66 = require('bip66');
const from_der_1 = require("./from_der");
const sigHashByteLength = 1;
/** Decode signature

  {
    signature: <Signature Buffer Object>
  }

  @returns
  {
    hash_type: <Hash Type Number>
    signature: <Signature Buffer Object>
  }
*/
function decodeSignature({ signature }) {
    if (!Buffer.isBuffer(signature)) {
        throw new Error('ExpectedSignatureBufferToDecode');
    }
    const buffer = signature;
    const hashType = buffer.readUInt8(buffer.length - sigHashByteLength);
    const decode = bip66.decode(buffer.slice(0, -sigHashByteLength));
    const r = from_der_1.fromDer({ x: decode.r });
    const s = from_der_1.fromDer({ x: decode.s });
    return { hash_type: hashType, signature: Buffer.concat([r, s], 64) };
}
exports.decodeSignature = decodeSignature;
