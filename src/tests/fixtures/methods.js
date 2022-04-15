'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const b = h => Buffer.from(h, 'hex');
const dummyPubkeys = [
  '03b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd46',
  '0375169f4001aa68f15bbed28b218df1d0a62cbbcf1188c6665110c293c907b831',
];
const dummyXOnlyPubkeys = dummyPubkeys.map(k => k.slice(2));
const dummyControlBlocks = [
  'c155adf4e8967fbd2e29f20ac896e60c3b0f1d5b0efa9d34941b5958c7b0a0312d' +
    '737ed1fe30bc42b8022d717b44f0d93516617af64a64753b7a06bf16b26cd711' +
    'f154e8e8e17c31d3462d7132589ed29353c6fafdb884c5a6e04ea938834f0d9d',
  'c055adf4e8967fbd2e29f20ac896e60c3b0f1d5b0efa9d34941b5958c7b0a0312d',
];
const dummyLeafHashes = [
  '737ed1fe30bc42b8022d717b44f0d93516617af64a64753b7a06bf16b26cd711',
  'f154e8e8e17c31d3462d7132589ed29353c6fafdb884c5a6e04ea938834f0d9d',
];
const chainCode =
  '032e6467810075260ee7a831189d814e656a300ab7f9a151b7377efffe910511';
const dummyXpubs = dummyPubkeys.map(
  pk => '0488b21e034a346d9880000000' + chainCode + pk,
);
const dummySig =
  '3043' +
  '02200424b58effaaa694e1559ea5c93bbfd4a89064224055cdf070b6771469442d07' +
  '021f5c8eb0fea6516d60b8acb33ad64ede60e8785bfb3aa94b99bdf86151db9a9a' +
  '01';
const dummySchnorrSig =
  'a251221c339a7129dd0b769698aca40d8d9da9570ab796a1820b91ab7dbf5acb' +
  'ea21c88ba8f1e9308a21729baf080734beaf97023882d972f75e380d480fd704';
const dummy4Byte = '01020304';
exports.fixtures = {
  valid: [
    {
      method: 'updateGlobal',
      addInputOutput: true,
      args: [
        {
          globalXpub: [
            {
              masterFingerprint: b(dummy4Byte),
              extendedPubkey: b(dummyXpubs[0]),
              path: "m/4'/5/7",
            },
            {
              masterFingerprint: b(dummy4Byte),
              extendedPubkey: b(dummyXpubs[1]),
              path: "m/4'/5/7",
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAE8BBIiyHgNKNG2Y' +
        'gAAAAAMuZGeBAHUmDueoMRidgU5lajAKt/mhUbc3fv/+kQURA3UWn0ABqmjxW77SiyGN' +
        '8dCmLLvPEYjGZlEQwpPJB7gxEAECAwQEAACABQAAAAcAAABPAQSIsh4DSjRtmIAAAAAD' +
        'LmRngQB1Jg7nqDEYnYFOZWowCrf5oVG3N37//pEFEQOxNBzLp2g7avTxI4zW6X5xZ9Vp' +
        '+sR/HkjUdUGEQ1W9RhABAgMEBAAAgAUAAAAHAAAAAAAA',
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
      args: [
        0,
        {
          partialSig: [
            { pubkey: b(dummyPubkeys[0]), signature: b(dummySig) },
            { pubkey: b(dummyPubkeys[1]), signature: b(dummySig) },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAiAgN1Fp9AAapo' +
        '8Vu+0oshjfHQpiy7zxGIxmZREMKTyQe4MUYwQwIgBCS1jv+qppThVZ6lyTu/1KiQZCJA' +
        'Vc3wcLZ3FGlELQcCH1yOsP6mUW1guKyzOtZO3mDoeFv7OqlLmb34YVHbmpoBIgIDsTQc' +
        'y6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUZGMEMCIAQktY7/qqaU4VWepck7v9So' +
        'kGQiQFXN8HC2dxRpRC0HAh9cjrD+plFtYLisszrWTt5g6Hhb+zqpS5m9+GFR25qaAQAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { tapInternalKey: b(dummyXOnlyPubkeys[0]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABFyCxNBzLp2g7' +
        'avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RgAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { tapMerkleRoot: b(dummyLeafHashes[0]) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABGCBzftH+MLxC' +
        'uAItcXtE8Nk1FmF69kpkdTt6Br8WsmzXEQAA',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [0, { tapKeySig: b(dummySchnorrSig) }],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAABE0CiUSIcM5px' +
        'Kd0LdpaYrKQNjZ2pVwq3lqGCC5Grfb9ay+ohyIuo8ekwiiFym68IBzS+r5cCOILZcvde' +
        'OA1ID9cEAAA=',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          tapScriptSig: [
            {
              pubkey: b(dummyXOnlyPubkeys[0]),
              leafHash: b(dummyLeafHashes[0]),
              signature: b(dummySchnorrSig),
            },
            {
              pubkey: b(dummyXOnlyPubkeys[1]),
              leafHash: b(dummyLeafHashes[0]),
              signature: b(dummySchnorrSig),
            },
            {
              pubkey: b(dummyXOnlyPubkeys[0]),
              leafHash: b(dummyLeafHashes[1]),
              signature: b(dummySchnorrSig),
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAABBFHUWn0ABqmjx' +
        'W77SiyGN8dCmLLvPEYjGZlEQwpPJB7gxc37R/jC8QrgCLXF7RPDZNRZhevZKZHU7ega/' +
        'FrJs1xFAolEiHDOacSndC3aWmKykDY2dqVcKt5ahgguRq32/WsvqIciLqPHpMIohcpuv' +
        'CAc0vq+XAjiC2XL3XjgNSA/XBEEUsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENV' +
        'vUZzftH+MLxCuAItcXtE8Nk1FmF69kpkdTt6Br8WsmzXEUCiUSIcM5pxKd0LdpaYrKQN' +
        'jZ2pVwq3lqGCC5Grfb9ay+ohyIuo8ekwiiFym68IBzS+r5cCOILZcvdeOA1ID9cEQRSx' +
        'NBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RvFU6OjhfDHTRi1xMlie0pNTxvr9' +
        'uITFpuBOqTiDTw2dQKJRIhwzmnEp3Qt2lpispA2NnalXCreWoYILkat9v1rL6iHIi6jx' +
        '6TCKIXKbrwgHNL6vlwI4gtly9144DUgP1wQAAA==',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      args: [
        0,
        {
          tapLeafScript: [
            {
              controlBlock: b(dummyControlBlocks[0]),
              script: Buffer.from([1, 2, 3]),
              leafVersion: 0xc0,
            },
            {
              controlBlock: b(dummyControlBlocks[1]),
              script: Buffer.from([1, 2, 3]),
              leafVersion: 0xc0,
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAiFcBVrfToln+9' +
        'LinyCsiW5gw7Dx1bDvqdNJQbWVjHsKAxLQQBAgPAYhXBVa306JZ/vS4p8grIluYMOw8d' +
        'Ww76nTSUG1lYx7CgMS1zftH+MLxCuAItcXtE8Nk1FmF69kpkdTt6Br8WsmzXEfFU6Ojh' +
        'fDHTRi1xMlie0pNTxvr9uITFpuBOqTiDTw2dBAECA8AAAA==',
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
              masterFingerprint: b(dummy4Byte),
              path: 'm/3',
              pubkey: b(dummyPubkeys[0]),
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
      args: [
        0,
        {
          tapBip32Derivation: [
            {
              leafHashes: dummyLeafHashes.map(b),
              masterFingerprint: b(dummy4Byte),
              path: 'm/3',
              pubkey: b(dummyXOnlyPubkeys[0]),
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAhFrE0HMunaDtq' +
        '9PEjjNbpfnFn1Wn6xH8eSNR1QYRDVb1GSQJzftH+MLxCuAItcXtE8Nk1FmF69kpkdTt6' +
        'Br8WsmzXEfFU6OjhfDHTRi1xMlie0pNTxvr9uITFpuBOqTiDTw2dAQIDBAMAAAAAAA==',
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
      args: [
        0,
        {
          tapTree: {
            leaves: [
              {
                depth: 1,
                script: Buffer.from([1, 2, 3]),
                leafVersion: 0xc0,
              },
              {
                depth: 2,
                script: Buffer.from([2, 3, 4]),
                leafVersion: 0xc0,
              },
              {
                depth: 2,
                script: Buffer.from([3, 4, 5]),
                leafVersion: 0xc0,
              },
            ],
          },
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAAQYSAcADAQID' +
        'AsADAgMEAsADAwQFAA==',
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
      args: [
        0,
        {
          bip32Derivation: [
            {
              masterFingerprint: b(dummy4Byte),
              path: 'm/3',
              pubkey: b(dummyPubkeys[0]),
            },
            {
              masterFingerprint: b(dummy4Byte),
              path: 'm/3',
              pubkey: b(dummyPubkeys[1]),
            },
          ],
        },
      ],
      expected:
        'cHNidP8BAFMBAAAAAdSnb/ld4fTAFho+U+qHapHtlTMa6NAS2B+XE4SYzl2GAwAAAAD/' +
        '////AdIClkkAAAAAF6kU4Yhw8sKX+/ylTFxvZFx3RaW2btqHAAAAAAAAIgIDdRafQAGq' +
        'aPFbvtKLIY3x0KYsu88RiMZmURDCk8kHuDEIAQIDBAMAAAAiAgOxNBzLp2g7avTxI4zW' +
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
      args: [0, { nonWitnessUtxo: 'blah' }],
      exception:
        'Data for input key nonWitnessUtxo is incorrect: Expected Buffer and got',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [0, { nonWitnessUtxo: b(dummy4Byte) }],
      exception: 'Can not add duplicate data to input',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        {
          partialSig: [{ pubkey: b(dummyPubkeys[0]), signature: b(dummySig) }],
        },
      ],
      exception: 'Can not add duplicate data to array',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        {
          tapScriptSig: [
            {
              pubkey: b(dummyXOnlyPubkeys[0]),
              leafHash: b(dummyLeafHashes[0]),
              signature: b(dummySchnorrSig),
            },
          ],
        },
      ],
      exception: 'Can not add duplicate data to array',
    },
    {
      method: 'updateInput',
      addInputOutput: true,
      twice: true,
      args: [
        0,
        {
          tapLeafScript: [
            {
              controlBlock: b(dummyControlBlocks[0]),
              script: Buffer.from([1, 2, 3]),
              leafVersion: 0xc0,
            },
          ],
        },
      ],
      exception: 'Can not add duplicate data to array',
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
        {
          partialSig: [
            { pubkdey: b(dummyPubkeys[0]), signdature: b(dummySig) },
          ],
        },
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
      args: [12, b(dummy4Byte)],
      exception: 'No input #12',
    },
    {
      method: 'updateOutput',
      addInputOutput: true,
      args: [12, b(dummy4Byte)],
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
