"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const update_psbt_1 = require("./update_psbt");
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
function finalizePsbt({ psbt }) {
    return update_psbt_1.updatePsbt({ is_final: true, psbt });
}
exports.finalizePsbt = finalizePsbt;
