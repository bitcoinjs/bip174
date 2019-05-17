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
export declare function checkWitnessVersion({ version }: CheckWitnessVersionInput): void;
