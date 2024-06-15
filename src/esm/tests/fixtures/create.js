const b = hex => Buffer.from(hex, 'hex');
export const fixtures = [
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
      updateInputData: [
        {
          nonWitnessUtxo: b(
            '0200000001aad73931018bd25f84ae400b68848be09db706eac2ac18298babee' +
              '71ab656f8b0000000048473044022058f6fc7c6a33e1b31548d481c826c015bd' +
              '30135aad42cd67790dab66d2ad243b02204a1ced2604c6735b6393e5b41691dd' +
              '78b00f0c5942fb9f751856faa938157dba01feffffff0280f0fa020000000017' +
              'a9140fb9463421696b82c833af241c78c17ddbde493487d0f20a270100000017' +
              'a91429ca74f8a08f81999428185c97b5d852e4063f618765000000',
          ),
          redeemScript: b(
            '5221029583bf39ae0a609747ad199addd634fa6108559d6c5cd39b4c2183f1ab' +
              '96e07f2102dab61ff49a14db6a7d02b0cd1fbb78fc4b18312b5b4e54dae4dba2' +
              'fbfef536d752ae',
          ),
          bip32Derivation: [
            {
              masterFingerprint: b('d90c6a4f'),
              pubkey: b(
                '029583bf39ae0a609747ad199addd634fa6108559d6c5cd39b4c2183f1ab96e07f',
              ),
              path: "m/0'/0'/0'",
            },
            {
              masterFingerprint: b('d90c6a4f'),
              pubkey: b(
                '02dab61ff49a14db6a7d02b0cd1fbb78fc4b18312b5b4e54dae4dba2fbfef536d7',
              ),
              path: "m/0'/0'/1'",
            },
          ],
        },
        {
          witnessUtxo: {
            script: b('a914b7f5faf40e3d40a5a459b1db3535f2b72fa921e887'),
            value: 200000000,
          },
          redeemScript: b(
            '00208c2353173743b595dfb4a07b72ba8e42e3797da74e87fe7d9d7497e3b2028903',
          ),
          witnessScript: b(
            '522103089dc10c7ac6db54f91329af617333db388cead0c231f723379d1b9903' +
              '0b02dc21023add904f3d6dcf59ddb906b0dee23529b7ffb9ed50e5e861519268' +
              '60221f0e7352ae',
          ),
          bip32Derivation: [
            {
              masterFingerprint: b('d90c6a4f'),
              pubkey: b(
                '023add904f3d6dcf59ddb906b0dee23529b7ffb9ed50e5e86151926860221f0e73',
              ),
              path: "m/0'/0'/3'",
            },
            {
              masterFingerprint: b('d90c6a4f'),
              pubkey: b(
                '03089dc10c7ac6db54f91329af617333db388cead0c231f723379d1b99030b02dc',
              ),
              path: "m/0'/0'/2'",
            },
          ],
        },
      ],
      updateOutputData: [
        {
          bip32Derivation: [
            {
              masterFingerprint: b('d90c6a4f'),
              pubkey: b(
                '03a9a4c37f5996d3aa25dbac6b570af0650394492942460b354753ed9eeca58771',
              ),
              path: "m/0'/0'/4'",
            },
          ],
        },
        {
          bip32Derivation: [
            {
              masterFingerprint: b('d90c6a4f'),
              pubkey: b(
                '027f6399757d2eff55a136ad02c684b1838b6556e5f1b6b34282a94b6b50051096',
              ),
              path: "m/0'/0'/5'",
            },
          ],
        },
      ],
    },
    expectedBeforeUpdate:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AA' +
      'AAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrw' +
      'CAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAAFgAUAK6pouXw+HaliN9VRu' +
      'h0LR2HAI8AAAAAAAAAAAA=',
    expectedAfterUpdate:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD///' +
      '//g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAW' +
      'ABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI' +
      '8AAAAAAAEAuwIAAAABqtc5MQGL0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcw' +
      'RAIgWPb8fGoz4bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3X' +
      'iwDwxZQvufdRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQceMF9295J' +
      'NIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAAABBEdSIQKVg785rgpgl0' +
      'etGZrd1jT6YQhVnWxc05tMIYPxq5bgfyEC2rYf9JoU22p9ArDNH7t4/EsYMStbTlTa5Nui' +
      '+/71NtdSriIGApWDvzmuCmCXR60Zmt3WNPphCFWdbFzTm0whg/GrluB/ENkMak8AAACAAA' +
      'AAgAAAAIAiBgLath/0mhTban0CsM0fu3j8SxgxK1tOVNrk26L7/vU21xDZDGpPAAAAgAAA' +
      'AIABAACAAAEBIADC6wsAAAAAF6kUt/X69A49QKWkWbHbNTXyty+pIeiHAQQiACCMI1MXN0' +
      'O1ld+0oHtyuo5C43l9p06H/n2ddJfjsgKJAwEFR1IhAwidwQx6xttU+RMpr2FzM9s4jOrQ' +
      'wjH3IzedG5kDCwLcIQI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc1KuIgYCOt' +
      '2QTz1tz1nduQaw3uI1Kbf/ue1Q5ehhUZJoYCIfDnMQ2QxqTwAAAIAAAACAAwAAgCIGAwid' +
      'wQx6xttU+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcENkMak8AAACAAAAAgAIAAIAAIgIDqa' +
      'TDf1mW06ol26xrVwrwZQOUSSlCRgs1R1Ptnuylh3EQ2QxqTwAAAIAAAACABAAAgAAiAgJ/' +
      'Y5l1fS7/VaE2rQLGhLGDi2VW5fG2s0KCqUtrUAUQlhDZDGpPAAAAgAAAAIAFAACAAA==',
  },
];
