'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fixtures = {
  valid: [
    {
      dec: 0,
      hex: '00',
    },
    {
      dec: 1,
      hex: '01',
    },
    {
      dec: 252,
      hex: 'fc',
    },
    {
      dec: 253,
      hex: 'fdfd00',
    },
    {
      dec: 254,
      hex: 'fdfe00',
    },
    {
      dec: 255,
      hex: 'fdff00',
    },
    {
      dec: 65534,
      hex: 'fdfeff',
    },
    {
      dec: 65535,
      hex: 'fdffff',
    },
    {
      dec: 65536,
      hex: 'fe00000100',
    },
    {
      dec: 65537,
      hex: 'fe01000100',
    },
    {
      dec: 4294967295,
      hex: 'feffffffff',
    },
    {
      dec: 4294967296,
      hex: 'ff0000000001000000',
    },
    {
      dec: 4294967297,
      hex: 'ff0100000001000000',
    },
    {
      dec: 9007199254740991,
      hex: 'ffffffffffffff1f00',
    },
  ],
  invalid: [
    {
      dec: -1,
      msg: '^RangeError: value out of range$',
    },
    {
      dec: 9007199254740992,
      hex: 'ffffffffff00002000',
      msg: '^RangeError: value out of range$',
    },
    {
      dec: 0.1,
      msg: '^RangeError: value out of range$',
    },
  ],
};
