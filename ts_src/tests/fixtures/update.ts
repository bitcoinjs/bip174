const b = (hex: string): Buffer => Buffer.from(hex, 'hex');
export const fixtures = [
  {
    description:
      'Step 1: From 2 empty inputs and 2 empty outputs, add set of info.',
    before:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD///' +
      '//g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAW' +
      'ABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI' +
      '8AAAAAAAAAAAA=',
    inputData: [
      {
        nonWitnessUtxo: b(
          '0200000001aad73931018bd25f84ae400b68848be09db706eac2ac18298babee71' +
            'ab656f8b0000000048473044022058f6fc7c6a33e1b31548d481c826c015bd3013' +
            '5aad42cd67790dab66d2ad243b02204a1ced2604c6735b6393e5b41691dd78b00f' +
            '0c5942fb9f751856faa938157dba01feffffff0280f0fa020000000017a9140fb9' +
            '463421696b82c833af241c78c17ddbde493487d0f20a270100000017a91429ca74' +
            'f8a08f81999428185c97b5d852e4063f618765000000',
        ),
        witnessUtxo: {
          script: b('0014ce2ef55e561be15ef65dcc79f998117e142d6016'),
          value: 10413n,
        },
        redeemScript: b(
          '5221029583bf39ae0a609747ad199addd634fa6108559d6c5cd39b4c2183f1ab96' +
            'e07f2102dab61ff49a14db6a7d02b0cd1fbb78fc4b18312b5b4e54dae4dba2fbfe' +
            'f536d752ae',
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
          value: 200000000n,
        },
        redeemScript: b(
          '00208c2353173743b595dfb4a07b72ba8e42e3797da74e87fe7d9d7497e3b2028903',
        ),
        witnessScript: b(
          '522103089dc10c7ac6db54f91329af617333db388cead0c231f723379d1b99030b' +
            '02dc21023add904f3d6dcf59ddb906b0dee23529b7ffb9ed50e5e8615192686022' +
            '1f0e7352ae',
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
    outputData: [
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
    after:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911' +
      'AAAAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAAAA' +
      'AP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAA' +
      'FgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL0l+E' +
      'rkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8fGoz4bMVSNSB' +
      'yCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDwxZQvuf' +
      'dRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQceMF9295J' +
      'NIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAAABAR+tKAAA' +
      'AAAAABYAFM4u9V5WG+Fe9l3MefmYEX4ULWAWAQRHUiEClYO/Oa4KYJdHrRma' +
      '3dY0+mEIVZ1sXNObTCGD8auW4H8hAtq2H/SaFNtqfQKwzR+7ePxLGDErW05U' +
      '2uTbovv+9TbXUq4iBgKVg785rgpgl0etGZrd1jT6YQhVnWxc05tMIYPxq5bg' +
      'fxDZDGpPAAAAgAAAAIAAAACAIgYC2rYf9JoU22p9ArDNH7t4/EsYMStbTlTa' +
      '5Nui+/71NtcQ2QxqTwAAAIAAAACAAQAAgAABASAAwusLAAAAABepFLf1+vQO' +
      'PUClpFmx2zU18rcvqSHohwEEIgAgjCNTFzdDtZXftKB7crqOQuN5fadOh/59' +
      'nXSX47ICiQMBBUdSIQMIncEMesbbVPkTKa9hczPbOIzq0MIx9yM3nRuZAwsC' +
      '3CECOt2QTz1tz1nduQaw3uI1Kbf/ue1Q5ehhUZJoYCIfDnNSriIGAjrdkE89' +
      'bc9Z3bkGsN7iNSm3/7ntUOXoYVGSaGAiHw5zENkMak8AAACAAAAAgAMAAIAi' +
      'BgMIncEMesbbVPkTKa9hczPbOIzq0MIx9yM3nRuZAwsC3BDZDGpPAAAAgAAA' +
      'AIACAACAACICA6mkw39ZltOqJdusa1cK8GUDlEkpQkYLNUdT7Z7spYdxENkM' +
      'ak8AAACAAAAAgAQAAIAAIgICf2OZdX0u/1WhNq0CxoSxg4tlVuXxtrNCgqlL' +
      'a1AFEJYQ2QxqTwAAAIAAAACABQAAgAA=',
  },
  {
    description: 'Step 2: Adds SIGHASH_ALL to both inputs',
    inputData: [
      {
        sighashType: 1,
      },
      {
        sighashType: 1,
      },
    ],
    outputData: [],
    after:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq91' +
      '1AAAAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAA' +
      'AAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAA' +
      'AAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL' +
      '0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8fGoz4bM' +
      'VSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDw' +
      'xZQvufdRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQce' +
      'MF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAAAB' +
      'AR+tKAAAAAAAABYAFM4u9V5WG+Fe9l3MefmYEX4ULWAWAQMEAQAAAAEER1I' +
      'hApWDvzmuCmCXR60Zmt3WNPphCFWdbFzTm0whg/GrluB/IQLath/0mhTban' +
      '0CsM0fu3j8SxgxK1tOVNrk26L7/vU211KuIgYClYO/Oa4KYJdHrRma3dY0+' +
      'mEIVZ1sXNObTCGD8auW4H8Q2QxqTwAAAIAAAACAAAAAgCIGAtq2H/SaFNtq' +
      'fQKwzR+7ePxLGDErW05U2uTbovv+9TbXENkMak8AAACAAAAAgAEAAIAAAQE' +
      'gAMLrCwAAAAAXqRS39fr0Dj1ApaRZsds1NfK3L6kh6IcBAwQBAAAAAQQiAC' +
      'CMI1MXN0O1ld+0oHtyuo5C43l9p06H/n2ddJfjsgKJAwEFR1IhAwidwQx6x' +
      'ttU+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcIQI63ZBPPW3PWd25BrDe4jUp' +
      't/+57VDl6GFRkmhgIh8Oc1KuIgYCOt2QTz1tz1nduQaw3uI1Kbf/ue1Q5eh' +
      'hUZJoYCIfDnMQ2QxqTwAAAIAAAACAAwAAgCIGAwidwQx6xttU+RMpr2FzM9' +
      's4jOrQwjH3IzedG5kDCwLcENkMak8AAACAAAAAgAIAAIAAIgIDqaTDf1mW0' +
      '6ol26xrVwrwZQOUSSlCRgs1R1Ptnuylh3EQ2QxqTwAAAIAAAACABAAAgAAi' +
      'AgJ/Y5l1fS7/VaE2rQLGhLGDi2VW5fG2s0KCqUtrUAUQlhDZDGpPAAAAgAA' +
      'AAIAFAACAAA==',
  },
  {
    description: 'Step 3: Adds partialSigs to both inputs',
    inputData: [
      {
        partialSig: [
          {
            pubkey: b(
              '029583bf39ae0a609747ad199addd634fa6108559d6c5cd39b4c2183f1ab96e07f',
            ),
            signature: b(
              '3044022074018ad4180097b873323c0015720b3684cc8123891048e7dbcd9b' +
                '55ad679c99022073d369b740e3eb53dcefa33823c8070514ca55a7dd9544f1' +
                '57c167913261118c01',
            ),
          },
        ],
      },
      {
        partialSig: [
          {
            pubkey: b(
              '03089dc10c7ac6db54f91329af617333db388cead0c231f723379d1b99030b02dc',
            ),
            signature: b(
              '3044022062eb7a556107a7c73f45ac4ab5a1dddf6f7075fb1275969a7f383e' +
                'fff784bcb202200c05dbb7470dbf2f08557dd356c7325c1ed30913e996cd38' +
                '40945db12228da5f01',
            ),
          },
        ],
      },
    ],
    outputData: [],
    after:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq91' +
      '1AAAAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAA' +
      'AAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAA' +
      'AAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL' +
      '0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8fGoz4bM' +
      'VSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDw' +
      'xZQvufdRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQce' +
      'MF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAAAB' +
      'AR+tKAAAAAAAABYAFM4u9V5WG+Fe9l3MefmYEX4ULWAWIgIClYO/Oa4KYJd' +
      'HrRma3dY0+mEIVZ1sXNObTCGD8auW4H9HMEQCIHQBitQYAJe4czI8ABVyCz' +
      'aEzIEjiRBI59vNm1WtZ5yZAiBz02m3QOPrU9zvozgjyAcFFMpVp92VRPFXw' +
      'WeRMmERjAEBAwQBAAAAAQRHUiEClYO/Oa4KYJdHrRma3dY0+mEIVZ1sXNOb' +
      'TCGD8auW4H8hAtq2H/SaFNtqfQKwzR+7ePxLGDErW05U2uTbovv+9TbXUq4' +
      'iBgKVg785rgpgl0etGZrd1jT6YQhVnWxc05tMIYPxq5bgfxDZDGpPAAAAgA' +
      'AAAIAAAACAIgYC2rYf9JoU22p9ArDNH7t4/EsYMStbTlTa5Nui+/71NtcQ2' +
      'QxqTwAAAIAAAACAAQAAgAABASAAwusLAAAAABepFLf1+vQOPUClpFmx2zU1' +
      '8rcvqSHohyICAwidwQx6xttU+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcRzB' +
      'EAiBi63pVYQenxz9FrEq1od3fb3B1+xJ1lpp/OD7/94S8sgIgDAXbt0cNvy' +
      '8IVX3TVscyXB7TCRPpls04QJRdsSIo2l8BAQMEAQAAAAEEIgAgjCNTFzdDt' +
      'ZXftKB7crqOQuN5fadOh/59nXSX47ICiQMBBUdSIQMIncEMesbbVPkTKa9h' +
      'czPbOIzq0MIx9yM3nRuZAwsC3CECOt2QTz1tz1nduQaw3uI1Kbf/ue1Q5eh' +
      'hUZJoYCIfDnNSriIGAjrdkE89bc9Z3bkGsN7iNSm3/7ntUOXoYVGSaGAiHw' +
      '5zENkMak8AAACAAAAAgAMAAIAiBgMIncEMesbbVPkTKa9hczPbOIzq0MIx9' +
      'yM3nRuZAwsC3BDZDGpPAAAAgAAAAIACAACAACICA6mkw39ZltOqJdusa1cK' +
      '8GUDlEkpQkYLNUdT7Z7spYdxENkMak8AAACAAAAAgAQAAIAAIgICf2OZdX0' +
      'u/1WhNq0CxoSxg4tlVuXxtrNCgqlLa1AFEJYQ2QxqTwAAAIAAAACABQAAgAA=',
  },
  {
    description:
      'Step 4: Adds separate partialSigs to both inputs (second signers)',
    before:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq91' +
      '1AAAAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAA' +
      'AAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAA' +
      'AAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL' +
      '0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8fGoz4bM' +
      'VSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDw' +
      'xZQvufdRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQce' +
      'MF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAAAB' +
      'AR+tKAAAAAAAABYAFM4u9V5WG+Fe9l3MefmYEX4ULWAWAQMEAQAAAAEER1I' +
      'hApWDvzmuCmCXR60Zmt3WNPphCFWdbFzTm0whg/GrluB/IQLath/0mhTban' +
      '0CsM0fu3j8SxgxK1tOVNrk26L7/vU211KuIgYClYO/Oa4KYJdHrRma3dY0+' +
      'mEIVZ1sXNObTCGD8auW4H8Q2QxqTwAAAIAAAACAAAAAgCIGAtq2H/SaFNtq' +
      'fQKwzR+7ePxLGDErW05U2uTbovv+9TbXENkMak8AAACAAAAAgAEAAIAAAQE' +
      'gAMLrCwAAAAAXqRS39fr0Dj1ApaRZsds1NfK3L6kh6IcBAwQBAAAAAQQiAC' +
      'CMI1MXN0O1ld+0oHtyuo5C43l9p06H/n2ddJfjsgKJAwEFR1IhAwidwQx6x' +
      'ttU+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcIQI63ZBPPW3PWd25BrDe4jUp' +
      't/+57VDl6GFRkmhgIh8Oc1KuIgYCOt2QTz1tz1nduQaw3uI1Kbf/ue1Q5eh' +
      'hUZJoYCIfDnMQ2QxqTwAAAIAAAACAAwAAgCIGAwidwQx6xttU+RMpr2FzM9' +
      's4jOrQwjH3IzedG5kDCwLcENkMak8AAACAAAAAgAIAAIAAIgIDqaTDf1mW0' +
      '6ol26xrVwrwZQOUSSlCRgs1R1Ptnuylh3EQ2QxqTwAAAIAAAACABAAAgAAi' +
      'AgJ/Y5l1fS7/VaE2rQLGhLGDi2VW5fG2s0KCqUtrUAUQlhDZDGpPAAAAgAA' +
      'AAIAFAACAAA==',
    inputData: [
      {
        partialSig: [
          {
            pubkey: b(
              '02dab61ff49a14db6a7d02b0cd1fbb78fc4b18312b5b4e54dae4dba2fbfef536d7',
            ),
            signature: b(
              '3045022100f61038b308dc1da865a34852746f015772934208c6d24454393c' +
                'd99bdf2217770220056e675a675a6d0a02b85b14e5e29074d8a25a9b5760' +
                'bea2816f661910a006ea01',
            ),
          },
        ],
      },
      {
        partialSig: [
          {
            pubkey: b(
              '023add904f3d6dcf59ddb906b0dee23529b7ffb9ed50e5e86151926860221f0e73',
            ),
            signature: b(
              '3044022065f45ba5998b59a27ffe1a7bed016af1f1f90d54b3aa8f7450aa5f' +
                '56a25103bd02207f724703ad1edb96680b284b56d4ffcb88f7fb759eabbe' +
                '08aa30f29b851383d201',
            ),
          },
        ],
      },
    ],
    outputData: [],
    after:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq91' +
      '1AAAAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BA' +
      'AAAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QU' +
      'AAAAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQ' +
      'GL0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8fGoz4' +
      'bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3Xiw' +
      'DwxZQvufdRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQ' +
      'ceMF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAA' +
      'ABAR+tKAAAAAAAABYAFM4u9V5WG+Fe9l3MefmYEX4ULWAWIgIC2rYf9JoU2' +
      '2p9ArDNH7t4/EsYMStbTlTa5Nui+/71NtdIMEUCIQD2EDizCNwdqGWjSFJ0' +
      'bwFXcpNCCMbSRFQ5PNmb3yIXdwIgBW5nWmdabQoCuFsU5eKQdNiiWptXYL6' +
      'igW9mGRCgBuoBAQMEAQAAAAEER1IhApWDvzmuCmCXR60Zmt3WNPphCFWdbF' +
      'zTm0whg/GrluB/IQLath/0mhTban0CsM0fu3j8SxgxK1tOVNrk26L7/vU21' +
      '1KuIgYClYO/Oa4KYJdHrRma3dY0+mEIVZ1sXNObTCGD8auW4H8Q2QxqTwAA' +
      'AIAAAACAAAAAgCIGAtq2H/SaFNtqfQKwzR+7ePxLGDErW05U2uTbovv+9Tb' +
      'XENkMak8AAACAAAAAgAEAAIAAAQEgAMLrCwAAAAAXqRS39fr0Dj1ApaRZsd' +
      's1NfK3L6kh6IciAgI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc' +
      '0cwRAIgZfRbpZmLWaJ//hp77QFq8fH5DVSzqo90UKpfVqJRA70CIH9yRwOt' +
      'HtuWaAsoS1bU/8uI9/t1nqu+CKow8puFE4PSAQEDBAEAAAABBCIAIIwjUxc' +
      '3Q7WV37Sge3K6jkLjeX2nTof+fZ10l+OyAokDAQVHUiEDCJ3BDHrG21T5Ey' +
      'mvYXMz2ziM6tDCMfcjN50bmQMLAtwhAjrdkE89bc9Z3bkGsN7iNSm3/7ntU' +
      'OXoYVGSaGAiHw5zUq4iBgI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhg' +
      'Ih8OcxDZDGpPAAAAgAAAAIADAACAIgYDCJ3BDHrG21T5EymvYXMz2ziM6tD' +
      'CMfcjN50bmQMLAtwQ2QxqTwAAAIAAAACAAgAAgAAiAgOppMN/WZbTqiXbrG' +
      'tXCvBlA5RJKUJGCzVHU+2e7KWHcRDZDGpPAAAAgAAAAIAEAACAACICAn9jm' +
      'XV9Lv9VoTatAsaEsYOLZVbl8bazQoKpS2tQBRCWENkMak8AAACAAAAAgAUAAIAA',
  },
  {
    description: 'Step 5: Finalize inputs (combine step is in combiner tests)',
    cleanForFinalize: true,
    before:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq91' +
      '1AAAAAAD/////g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BA' +
      'AAAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QU' +
      'AAAAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQ' +
      'GL0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8fGoz4' +
      'bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3Xiw' +
      'DwxZQvufdRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQ' +
      'ceMF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAA' +
      'ABAR+tKAAAAAAAABYAFM4u9V5WG+Fe9l3MefmYEX4ULWAWIgIC2rYf9JoU2' +
      '2p9ArDNH7t4/EsYMStbTlTa5Nui+/71NtdIMEUCIQD2EDizCNwdqGWjSFJ0' +
      'bwFXcpNCCMbSRFQ5PNmb3yIXdwIgBW5nWmdabQoCuFsU5eKQdNiiWptXYL6' +
      'igW9mGRCgBuoBAQMEAQAAAAEER1IhApWDvzmuCmCXR60Zmt3WNPphCFWdbF' +
      'zTm0whg/GrluB/IQLath/0mhTban0CsM0fu3j8SxgxK1tOVNrk26L7/vU21' +
      '1KuIgYClYO/Oa4KYJdHrRma3dY0+mEIVZ1sXNObTCGD8auW4H8Q2QxqTwAA' +
      'AIAAAACAAAAAgCIGAtq2H/SaFNtqfQKwzR+7ePxLGDErW05U2uTbovv+9Tb' +
      'XENkMak8AAACAAAAAgAEAAIAAAQEgAMLrCwAAAAAXqRS39fr0Dj1ApaRZsd' +
      's1NfK3L6kh6IciAgI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc' +
      '0cwRAIgZfRbpZmLWaJ//hp77QFq8fH5DVSzqo90UKpfVqJRA70CIH9yRwOt' +
      'HtuWaAsoS1bU/8uI9/t1nqu+CKow8puFE4PSAQEDBAEAAAABBCIAIIwjUxc' +
      '3Q7WV37Sge3K6jkLjeX2nTof+fZ10l+OyAokDAQVHUiEDCJ3BDHrG21T5Ey' +
      'mvYXMz2ziM6tDCMfcjN50bmQMLAtwhAjrdkE89bc9Z3bkGsN7iNSm3/7ntU' +
      'OXoYVGSaGAiHw5zUq4iBgI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhg' +
      'Ih8OcxDZDGpPAAAAgAAAAIADAACAIgYDCJ3BDHrG21T5EymvYXMz2ziM6tD' +
      'CMfcjN50bmQMLAtwQ2QxqTwAAAIAAAACAAgAAgAAiAgOppMN/WZbTqiXbrG' +
      'tXCvBlA5RJKUJGCzVHU+2e7KWHcRDZDGpPAAAAgAAAAIAEAACAACICAn9jm' +
      'XV9Lv9VoTatAsaEsYOLZVbl8bazQoKpS2tQBRCWENkMak8AAACAAAAAgAUAAIAA',
    inputData: [
      {
        finalScriptSig: b(
          '00473044022074018ad4180097b873323c0015720b3684cc8123891048e7dbcd9b' +
            '55ad679c99022073d369b740e3eb53dcefa33823c8070514ca55a7dd9544f157c1' +
            '67913261118c01483045022100f61038b308dc1da865a34852746f015772934208' +
            'c6d24454393cd99bdf2217770220056e675a675a6d0a02b85b14e5e29074d8a25a' +
            '9b5760bea2816f661910a006ea01475221029583bf39ae0a609747ad199addd634' +
            'fa6108559d6c5cd39b4c2183f1ab96e07f2102dab61ff49a14db6a7d02b0cd1fbb' +
            '78fc4b18312b5b4e54dae4dba2fbfef536d752ae',
        ),
      },
      {
        finalScriptSig: b(
          '2200208c2353173743b595dfb4a07b72ba8e42e3797da74e87fe7d9d7497e3b2028903',
        ),
        finalScriptWitness: b(
          '0400473044022062eb7a556107a7c73f45ac4ab5a1dddf6f7075fb1275969a7f38' +
            '3efff784bcb202200c05dbb7470dbf2f08557dd356c7325c1ed30913e996cd3840' +
            '945db12228da5f01473044022065f45ba5998b59a27ffe1a7bed016af1f1f90d54' +
            'b3aa8f7450aa5f56a25103bd02207f724703ad1edb96680b284b56d4ffcb88f7fb' +
            '759eabbe08aa30f29b851383d20147522103089dc10c7ac6db54f91329af617333' +
            'db388cead0c231f723379d1b99030b02dc21023add904f3d6dcf59ddb906b0dee2' +
            '3529b7ffb9ed50e5e86151926860221f0e7352ae',
        ),
      },
    ],
    outputData: [],
    after:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD/////' +
      'g40EJ9DsZQpoqka7CwmK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAWABTY' +
      'XCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAAFgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAA' +
      'AAEAuwIAAAABqtc5MQGL0l+ErkALaISL4J23BurCrBgpi6vucatlb4sAAAAASEcwRAIgWPb8' +
      'fGoz4bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDwxZQvuf' +
      'dRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQceMF9295JNIfQ8gonAQAA' +
      'ABepFCnKdPigj4GZlCgYXJe12FLkBj9hh2UAAAABAR+tKAAAAAAAABYAFM4u9V5WG+Fe9l3M' +
      'efmYEX4ULWAWAQfaAEcwRAIgdAGK1BgAl7hzMjwAFXILNoTMgSOJEEjn282bVa1nnJkCIHPT' +
      'abdA4+tT3O+jOCPIBwUUylWn3ZVE8VfBZ5EyYRGMAUgwRQIhAPYQOLMI3B2oZaNIUnRvAVdy' +
      'k0IIxtJEVDk82ZvfIhd3AiAFbmdaZ1ptCgK4WxTl4pB02KJam1dgvqKBb2YZEKAG6gFHUiEC' +
      'lYO/Oa4KYJdHrRma3dY0+mEIVZ1sXNObTCGD8auW4H8hAtq2H/SaFNtqfQKwzR+7ePxLGDEr' +
      'W05U2uTbovv+9TbXUq4AAQEgAMLrCwAAAAAXqRS39fr0Dj1ApaRZsds1NfK3L6kh6IcBByMi' +
      'ACCMI1MXN0O1ld+0oHtyuo5C43l9p06H/n2ddJfjsgKJAwEI2gQARzBEAiBi63pVYQenxz9F' +
      'rEq1od3fb3B1+xJ1lpp/OD7/94S8sgIgDAXbt0cNvy8IVX3TVscyXB7TCRPpls04QJRdsSIo' +
      '2l8BRzBEAiBl9FulmYtZon/+GnvtAWrx8fkNVLOqj3RQql9WolEDvQIgf3JHA60e25ZoCyhL' +
      'VtT/y4j3+3Weq74IqjDym4UTg9IBR1IhAwidwQx6xttU+RMpr2FzM9s4jOrQwjH3IzedG5kD' +
      'CwLcIQI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc1KuACICA6mkw39ZltOqJdus' +
      'a1cK8GUDlEkpQkYLNUdT7Z7spYdxENkMak8AAACAAAAAgAQAAIAAIgICf2OZdX0u/1WhNq0C' +
      'xoSxg4tlVuXxtrNCgqlLa1AFEJYQ2QxqTwAAAIAAAACABQAAgAA=',
  },
];
