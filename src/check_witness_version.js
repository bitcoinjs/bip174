"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maxWitnessVersion = 16;
const minWitnessVersion = 0;
/** Check that a witness version is correct

  {
    version: <Version Number>
  }

  @throws
  <UnexpectedWitnessVersion Error>
*/
function checkWitnessVersion({ version }) {
    if (version === null || version === undefined) {
        throw new Error('ExpectedWitnessVersion');
    }
    if (version < minWitnessVersion || version > maxWitnessVersion) {
        throw new Error('InvalidVersionNumberForWitnessScriptPub');
    }
}
exports.checkWitnessVersion = checkWitnessVersion;
