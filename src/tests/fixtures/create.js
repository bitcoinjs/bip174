'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const b = hex => Buffer.from(hex, 'hex');
exports.fixtures = [
  {
    description: 'Should create a psbt',
    input: {
      addInputs: [
        {
          hash:
            '75ddabb27b8845f5247975c8a5ba7c6f336c4570708ebe230caf6db5217ae858',
          index: 0,
        },
        {
          hash:
            '1dea7cd05979072a3578cab271c02244ea8a090bbb46aa680a65ecd027048d83',
          index: 1,
        },
      ],
      addOutputs: [
        {
          script: b('0014d85c2b71d0060b09c9886aeb815e50991dda124d'),
          value: 149990000,
        },
        {
          script: b('001400aea9a2e5f0f876a588df5546e8742d1d87008f'),
          value: 100000000,
        },
      ],
      updateInputData: [],
      updateOutputData: [],
    },
    expected:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AA' +
      'AAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrw' +
      'CAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAAFgAUAK6pouXw+HaliN9VRu' +
      'h0LR2HAI8AAAAAAAAAAAA=',
  },
];
