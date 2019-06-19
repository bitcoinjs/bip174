'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fixtures = [
  {
    description: 'Check one fixture',
    input:
      '70736274ff0100550200000001279a2323a5dfb51fc45f220fa58b0fc13e1e3342792a' +
      '85d7e36cd6333b5cbc390000000000ffffffff01a05aea0b000000001976a914ffe9c0' +
      '061097cc3b636f2cb0460fa4fc427d2b4588ac0000000000010120955eea0b00000000' +
      '17a9146345200f68d189e1adc0df1c4d16ea8f14c0dbeb87220203b1341ccba7683b6a' +
      'f4f1238cd6e97e7167d569fac47f1e48d47541844355bd4646304302200424b58effaa' +
      'a694e1559ea5c93bbfd4a89064224055cdf070b6771469442d07021f5c8eb0fea6516d' +
      '60b8acb33ad64ede60e8785bfb3aa94b99bdf86151db9a9a010104220020771fd18ad4' +
      '59666dd49f3d564e3dbc42f4c84774e360ada16816a8ed488d5681010547522103b134' +
      '1ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd462103de55d1' +
      'e1dac805e3f8a58c1fbf9b94c02f3dbaafe127fefca4995f26f82083bd52ae220603b1' +
      '341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd4610b4a6ba' +
      '67000000800000008004000080220603de55d1e1dac805e3f8a58c1fbf9b94c02f3dba' +
      'afe127fefca4995f26f82083bd10b4a6ba670000008000000080050000800000',
    output: {
      globalMap: {
        keyVals: [],
      },
      inputs: [
        {
          keyVals: [],
          witnessUtxo: {
            script: 'a9146345200f68d189e1adc0df1c4d16ea8f14c0dbeb87',
            value: 199909013,
          },
          partialSig: [
            {
              pubkey:
                '03b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd46',
              signature:
                '304302200424b58effaaa694e1559ea5c93bbfd4a89064224055cdf070b6' +
                '771469442d07021f5c8eb0fea6516d60b8acb33ad64ede60e8785bfb3aa9' +
                '4b99bdf86151db9a9a01',
            },
          ],
          redeemScript:
            '0020771fd18ad459666dd49f3d564e3dbc42f4c84774e360ada16816a8ed488d5681',
          witnessScript:
            '522103b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d4754184' +
            '4355bd462103de55d1e1dac805e3f8a58c1fbf9b94c02f3dbaafe127fefca4' +
            '995f26f82083bd52ae',
          bip32Derivation: [
            {
              masterFingerprint: 'b4a6ba67',
              pubkey:
                '03b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd46',
              path: "m/0'/0'/4'",
            },
            {
              masterFingerprint: 'b4a6ba67',
              pubkey:
                '03de55d1e1dac805e3f8a58c1fbf9b94c02f3dbaafe127fefca4995f26f82083bd',
              path: "m/0'/0'/5'",
            },
          ],
        },
      ],
      outputs: [
        {
          keyVals: [],
        },
      ],
      unsignedTx: {
        version: 2,
        locktime: 0,
        ins: [
          {
            hash:
              '279a2323a5dfb51fc45f220fa58b0fc13e1e3342792a85d7e36cd6333b5cbc39',
            index: 0,
            script: '',
            sequence: 4294967295,
            witness: [],
          },
        ],
        outs: [
          {
            value: 199908000,
            script: '76a914ffe9c0061097cc3b636f2cb0460fa4fc427d2b4588ac',
          },
        ],
      },
    },
  },
];
