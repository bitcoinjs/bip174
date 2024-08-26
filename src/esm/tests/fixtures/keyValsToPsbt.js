// import * as tools from 'uint8array-tools';
const b = hex => Buffer.from(hex, 'hex');
// const b = (hex: string): Uint8Array => tools.fromHex(hex);
export const fixtures = [
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
        {
          key: b('00'),
          value: b('fb'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    exception: 'Format Error: GlobalMap has multiple UNSIGNED_TX',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
        {
          key: b('01'),
          value: b('fb'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    exception:
      'Decode Error: globalXpub has invalid extended pubkey in key 0x01',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('fb'),
        },
        {
          key: b(
            '010488b21e034a346d9880000000032e6467810075260ee7a831189d814e656a' +
              '300ab7f9a151b7377efffe91051103b034ec32baa6c3c05481a9d15c6ee6c48a' +
              '9692e18285c174d414718f85670e22',
          ),
          value: b('fb'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    exception:
      'Decode Error: Global GLOBAL_XPUB value length should be multiple of 4',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('ef'),
          value: b('fb'),
        },
      ],
      inputKeyVals: [
        [
          {
            key: b('00'),
            value: b('03'),
          },
          {
            key: b('00'),
            value: b('03'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple NON_WITNESS_UTXO',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('01'),
            value: b(
              '70aaf00800000000160014d85c2b71d0060b09c9886aeb815e50991dda124d',
            ),
          },
          {
            key: b('01'),
            value: b(
              '70aaf00800000000160014d85c2b71d0060b09c9886aeb815e50991dda124d',
            ),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple WITNESS_UTXO',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('02ffff'),
            value: b('00'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: invalid pubkey in key 0x02',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('03'),
            value: b('01020304'),
          },
          {
            key: b('03'),
            value: b('01020305'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple SIGHASH_TYPE',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('04'),
            value: b('01020304'),
          },
          {
            key: b('04'),
            value: b('01020305'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple REDEEM_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [
        [
          {
            key: b('09'),
            value: b('70736274'),
          },
          {
            key: b('05'),
            value: b('01020304'),
          },
          {
            key: b('05'),
            value: b('01020305'),
          },
        ],
      ],
      outputKeyVals: [],
    },
    exception: 'Format Error: Input has multiple WITNESS_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [],
      outputKeyVals: [
        [
          {
            key: b('00'),
            value: b('01020304'),
          },
          {
            key: b('00'),
            value: b('01020305'),
          },
        ],
      ],
    },
    exception: 'Format Error: Output has multiple REDEEM_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [],
      inputKeyVals: [],
      outputKeyVals: [
        [
          {
            key: b('ef'),
            value: b('01020304'),
          },
          {
            key: b('01'),
            value: b('01020304'),
          },
          {
            key: b('01'),
            value: b('01020305'),
          },
        ],
      ],
    },
    exception: 'Format Error: Output has multiple WITNESS_SCRIPT',
  },
  {
    data: {
      globalMapKeyVals: [
        {
          key: b('00'),
          value: b('02000000000000000000'),
        },
        {
          key: b(
            '010488b21e034a346d9880000000032e6467810075260ee7a831189d814e656a' +
              '300ab7f9a151b7377efffe91051103b034ec32baa6c3c05481a9d15c6ee6c48a' +
              '9692e18285c174d414718f85670e22',
          ),
          value: b('01020304040000800500008006000000'),
        },
      ],
      inputKeyVals: [],
      outputKeyVals: [],
    },
    expected:
      'cHNidP8BAAoCAAAAAAAAAAAATwEEiLIeA0o0bZiAAAAAAy5kZ4EAdSYO56gxGJ2BTmVqM' +
      'Aq3+aFRtzd+//6RBREDsDTsMrqmw8BUganRXG7mxIqWkuGChcF01BRxj4VnDiIQAQIDBA' +
      'QAAIAFAACABgAAAAAAAA==',
  },
];
