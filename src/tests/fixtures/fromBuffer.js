'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fixtures = [
  {
    hex: '70736274fe',
    exception: 'Format Error: Magic Number must be followed by 0xff separator',
  },
  {
    hex: '70736274ff010801ff010801ff00',
    exception: 'Format Error: Keys must be unique for global keymap: key 08',
  },
  {
    hex:
      '70736274ff01004c020000000002d3dff505000000001976a914d0c59903c5bac2' +
      '868760e90fd521a4665aa7652088ac00e1f5050000000017a9143545e6e33b832c47050' +
      'f24d3eeb93c9c03948bc787b32e130000010801ff010801fe00',
    exception:
      'Format Error: Keys must be unique for each output: output index 0 key 08',
  },
  {
    hex: '70736274ff01000a02000000000000000000000000',
    exception: 'Format Error: Extra data after PSBT',
  },
];
