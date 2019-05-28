import { updatePsbt } from './update_psbt';

export interface PsbtObject {
  psbt: string;
}

/** Finalize the inputs of a PSBT
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }

  @throws
  <Finalize PSBT Error>

  @returns
  {
    psbt: <BIP 174 Encoded PSBT Hex String>
  }
*/
export function finalizePsbt({ psbt }: PsbtObject): PsbtObject {
  return updatePsbt({ is_final: true, psbt });
}
