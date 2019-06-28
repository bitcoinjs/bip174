export const fixtures = [
  {
    hex: '70736274fe',
    exception: 'Format Error: Magic Number must be followed by 0xff separator',
  },
  {
    hex: '70736274ff010801ff010801ff00',
    exception: 'Format Error: Keys must be unique for global keymap: key 08',
  },
  {
    hex: '70736274ff010002000100010801ff010801fe00',
    exception:
      'Format Error: Keys must be unique for each output: output index 0 key 08',
  },
];
