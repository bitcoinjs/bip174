interface Dict {
  [details: string]: string;
}

export const global: Dict = {
  magic: 'psbt',
  separator: 'ff',
  unsigned_tx: '00',
};

export const input: Dict = {
  bip32_derivation: '06',
  final_scriptsig: '07',
  final_scriptwitness: '08',
  non_witness_utxo: '00',
  partial_sig: '02',
  redeem_script: '04',
  sighash_type: '03',
  witness_script: '05',
  witness_utxo: '01',
};

export const output: Dict = {
  bip32_derivation: '02',
  redeem_script: '00',
  witness_script: '01',
};
