const maxWitnessVersion: number = 16;
const minWitnessVersion: number = 0;

export interface CheckWitnessVersionInput {
  version: number;
}

/** Check that a witness version is correct

  {
    version: <Version Number>
  }

  @throws
  <UnexpectedWitnessVersion Error>
*/
export function checkWitnessVersion({ version }: CheckWitnessVersionInput) {
  if (version === null || version === undefined) {
    throw new Error('ExpectedWitnessVersion');
  }

  if (version < minWitnessVersion || version > maxWitnessVersion) {
    throw new Error('InvalidVersionNumberForWitnessScriptPub');
  }
}
