'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
function psbtToBuffer(psbtData) {
  return Buffer.from([psbtData.inputs.length]);
}
exports.psbtToBuffer = psbtToBuffer;
