const dummyPubkey = (): Buffer =>
  Buffer.from(
    '03b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd46',
    'hex',
  );
const dummyXpub = (): Buffer =>
  Buffer.from(
    '0488b21e034a346d9880000000032e6467810075260ee7a831189d814e656a300ab7f9a' +
      '151b7377efffe91051103b034ec32baa6c3c05481a9d15c6ee6c48a9692e18285c174d4' +
      '14718f85670e22',
    'hex',
  );
const dummySig = (): Buffer =>
  Buffer.from(
    '304302200424b58effaaa694e1559ea5c93bbfd4a89064224055cdf070b6' +
      '771469442d07021f5c8eb0fea6516d60b8acb33ad64ede60e8785bfb3aa9' +
      '4b99bdf86151db9a9a01',
    'hex',
  );
const dummy4Byte = (): Buffer => Buffer.from([1, 2, 3, 4]);

export const fixtures = {
  valid: [
    {
      method: 'updateGlobal',
      addInputOutput: true,
      args: [
        {
          globalXpub: [
            {
              masterFingerprint: dummy4Byte(),
              extendedPubkey: dummyXpub(),
              path: "m/4'/5/7",
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAE8BBIiyHgNKNG2Y' +
        'gAAAAAMuZGeBAHUmDueoMRidgU5lajAKt/mhUbc3fv/+kQURA7A07DK6psPAVIGp0Vxu' +
        '5sSKlpLhgoXBdNQUcY+FZw4iEAECAwQEAACABQAAAAcAAAAAAAA=',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { nonWitnessUtxo: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2G' +
        'AwAAAAD/////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABAAMB' +
        'AgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        { witnessUtxo: { script: Buffer.from([1, 2, 3]), value: 1234567890 } },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABAQzSApZJAAAA' +
        'AAMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        { partialSig: [{ pubkey: dummyPubkey(), signature: dummySig() }] },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAiAgOxNBzLp2g7' +
        'avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RkYwQwIgBCS1jv+qppThVZ6lyTu/1KiQZCJA' +
        'Vc3wcLZ3FGlELQcCH1yOsP6mUW1guKyzOtZO3mDoeFv7OqlLmb34YVHbmpoBIgIDsf8c' +
        'y6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUZGMEMCIAQktY7/qqaU4VWepck7v9So' +
        'kGQiQFXN8HC2dxRpRC0HAh9cjrD+plFtYLisszrWTt5g6Hhb+zqpS5m9+GFR25qaAQAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { sighashType: 1 }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABAwQBAAAAAAA=',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { redeemScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABBAMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { witnessScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABBQMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              masterFingerprint: dummy4Byte(),
              path: 'm/3',
              pubkey: dummyPubkey(),
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAiBgOxNBzLp2g7' +
        'avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RggBAgMEAwAAAAAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptSig: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABBwMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptWitness: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABCAMBAgMAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { porCommitment: 'test' }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABCQR0ZXN0AAA=',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { redeemScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAAQADAQIDAA==',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { witnessScript: Buffer.from([1, 2, 3]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAAQEDAQIDAA==',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              masterFingerprint: dummy4Byte(),
              path: 'm/3',
              pubkey: dummyPubkey(),
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAIgIDsTQcy6do' +
        'O2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYIAQIDBAMAAAAiAgOx/xzLp2g7avTxI4zW' +
        '6X5xZ9Vp+sR/HkjUdUGEQ1W9RggBAgMEAwAAAAA=',
    },
    {
      method: 'addUnknownKeyValToGlobal',
      addInputOutput: true,
      args: [{ key: Buffer.from([255]), value: Buffer.from([255]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAH/Af8AAAA=',
    },
    {
      method: 'addUnknownKeyValToInput',
      addInputOutput: true,
      args: [0, { key: Buffer.from([255]), value: Buffer.from([255]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAB/wH/AAA=',
    },
    {
      method: 'addUnknownKeyValToOutput',
      addInputOutput: true,
      args: [0, { key: Buffer.from([255]), value: Buffer.from([255]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAAf8B/wA=',
    },
    {
      method: 'addInput',
      addInputOutput: true,
      args: [
        {
          hash:
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
          index: 1,
        },
      ],
      expected:
        'cHNidP8BAHwBAAAAAtSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AA8ODQwLCgkIBwYFBAMCAQAPDg0MCwoJCAcGBQQDAgEBAAAAAP////8B0gKWSQAA' +
        'AAAXqRThiHDywpf7/KVMXG9kXHdFpbZu2ocAAAAAAAAAAA==',
    },
    {
      method: 'addOutput',
      addInputOutput: true,
      args: [
        {
          script: Buffer.from(
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
            'hex',
          ),
          value: 3,
        },
      ],
      expected:
        'cHNidP8BAHwBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AtIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAwAAAAAAAAAgAQIDBAUG' +
        'BwgJCgsMDQ4PAAECAwQFBgcICQoLDA0ODwAAAAAAAAAAAA==',
    },
  ],
  invalid: [
    {
      method: 'updateGlobal',
      addInputOutput: true,
      twice: false,
      args: [
        {
          globalXpub: 4,
        },
      ],
      exception: 'Key type globalXpub must be an array',
    },
    {
      method: 'updateGlobal',
      addInputOutput: true,
      twice: false,
      args: [
        {
          globalXpub: [4],
        },
      ],
      exception:
        'Data for global key globalXpub is incorrect: Expected { ' +
        'masterFingerprint: Buffer; extendedPubkey: Buffer; path: string; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: false,
      args: [0, { nonWitnessUtxo: 'blah' }],
      exception:
        'Data for input key nonWitnessUtxo is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [0, { nonWitnessUtxo: dummy4Byte() }],
      exception: 'Can not add duplicate data to input',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          witnessUtxo: { scripty: Buffer.from([1, 2, 3]), vyalue: 1234567890 },
        },
      ],
      exception:
        'Data for input key witnessUtxo is incorrect: Expected { ' +
        'script: Buffer; value: number; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        { witnessUtxo: { script: Buffer.from([1, 2, 3]), value: 1234567890 } },
      ],
      exception: 'Can not add duplicate data to input',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        { partialSig: [{ pubkdey: dummyPubkey(), signdature: dummySig() }] },
      ],
      exception:
        'Data for input key partialSig is incorrect: Expected { pubkey: ' +
        'Buffer; signature: Buffer; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { sighashType: 'a' }],
      exception:
        'Data for input key sighashType is incorrect: Expected number and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { redeemScript: 'a' }],
      exception:
        'Data for input key redeemScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { witnessScript: 'a' }],
      exception:
        'Data for input key witnessScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              a: 1,
            },
          ],
        },
      ],
      exception:
        'Data for input key bip32Derivation is incorrect: Expected { ' +
        'masterFingerprint: Buffer; pubkey: Buffer; path: string; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptSig: 8 }],
      exception:
        'Data for input key finalScriptSig is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { finalScriptWitness: 8 }],
      exception:
        'Data for input key finalScriptWitness is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { porCommitment: 8 }],
      exception:
        'Data for input key porCommitment is incorrect: Expected string and got',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { redeemScript: 8 }],
      exception:
        'Data for output key redeemScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [0, { witnessScript: 8 }],
      exception:
        'Data for output key witnessScript is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [
        0,
        {
          bip32Derivation: [
            {
              a: 8,
            },
          ],
        },
      ],
      exception:
        'Data for output key bip32Derivation is incorrect: Expected { ' +
        'masterFingerprint: Buffer; pubkey: Buffer; path: string; } and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [12, dummy4Byte()],
      exception: 'No input #12',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [12, dummy4Byte()],
      exception: 'No output #12',
    },
    {
      method: 'addInput',
      addInputOutput: true,
      args: [
        {
          hash:
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
          index: 1,
          unknownKeyVals: 34,
        },
      ],
      exception: 'unknownKeyVals must be an Array',
    },
    {
      method: 'addOutput',
      addInputOutput: true,
      args: [
        {
          script: Buffer.from(
            '0102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f00',
            'hex',
          ),
          value: 3,
          unknownKeyVals: 34,
        },
      ],
      exception: 'unknownKeyVals must be an Array',
    },
    {
      method: 'addUnknownKeyValToGlobal',
      addInputOutput: true,
      args: [{ key: Buffer.from([0]), value: Buffer.from([255]) }],
      exception:
        'Use the method for your specific key instead of addUnknownKeyVal*',
    },
    {
      method: 'addUnknownKeyValToGlobal',
      addInputOutput: true,
      twice: true,
      args: [{ key: Buffer.from([255]), value: Buffer.from([255]) }],
      exception: 'Duplicate Key: ff',
    },
  ],
};
