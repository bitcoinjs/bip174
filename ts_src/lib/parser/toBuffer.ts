import { PsbtAttributes } from './index';

export function psbtToBuffer(psbtData: PsbtAttributes): Buffer {
  return Buffer.from([psbtData.inputs.length]);
}
