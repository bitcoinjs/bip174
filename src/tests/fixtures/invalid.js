'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.fixtures = [
  {
    exception: 'Format Error: Invalid Magic Number',
    b64:
      'AgAAAAEmgXE3Ht/yhek3re6ks3t4AAwFZsuzrWRkFxPKQhcb9gAAAABqRzBEAiBwsiRRI+a/R01gxbUMBD1MaRpdJD' +
      'XwmjSnZiqdwlF5CgIgATKcqdrPKAvfMHQOwDkEIkIsgctFg5RXrrdvwS7dlbMBIQJlfRGNM1e44PTCzUbbezn22cON' +
      'mnCry5st5dyNv+TOMf7///8C09/1BQAAAAAZdqkU0MWZA8W6woaHYOkP1SGkZlqnZSCIrADh9QUAAAAAF6kUNUXm4z' +
      'uDLEcFDyTT7rk8nAOUi8eHsy4TAA==',
  },
  {
    exception: 'Format Error: Unexpected End of PSBT',
    b64:
      'cHNidP8BAHUCAAAAASaBcTce3/KF6Tet7qSze3gADAVmy7OtZGQXE8pCFxv2AAAAAAD+////AtPf9QUAAAAAGXapFN' +
      'DFmQPFusKGh2DpD9UhpGZap2UgiKwA4fUFAAAAABepFDVF5uM7gyxHBQ8k0+65PJwDlIvHh7MuEwAAAQD9pQEBAAAA' +
      'AAECiaPHHqtNIOA3G7ukzGmPopXJRjr6Ljl/hTPMti+VZ+UBAAAAFxYAFL4Y0VKpsBIDna89p95PUzSe7LmF/////4' +
      'b4qkOnHf8USIk6UwpyN+9rRgi7st0tAXHmOuxqSJC0AQAAABcWABT+Pp7xp0XpdNkCxDVZQ6vLNL1TU/////8CAMLr' +
      'CwAAAAAZdqkUhc/xCX/Z4Ai7NK9wnGIZeziXikiIrHL++E4sAAAAF6kUM5cluiHv1irHU6m80GfWx6ajnQWHAkcwRA' +
      'IgJxK+IuAnDzlPVoMR3HyppolwuAJf3TskAinwf4pfOiQCIAGLONfc0xTnNMkna9b7QPZzMlvEuqFEyADS8vAtsnZc' +
      'ASED0uFWdJQbrUqZY3LLh+GFbTZSYG2YVi/jnF6efkE/IQUCSDBFAiEA0SuFLYXc2WHS9fSrZgZU327tzHlMDDPOXM' +
      'MJ/7X85Y0CIGczio4OFyXBl/saiK9Z9R5E5CVbIBZ8hoQDHAXR8lkqASECI7cr7vCWXRC+B3jv7NYfysb3mk6haTkz' +
      'gHNEZPhPKrMAAAAAAA==',
  },
  {
    exception: 'Format Error: Transaction ScriptSigs are not empty',
    b64:
      'cHNidP8BAP0KAQIAAAACqwlJoIxa98SbghL0F+LxWrP1wz3PFTghqBOfh3pbe+QAAAAAakcwRAIgR1lmF5fAGwNrJZ' +
      'KJSGhiGDR9iYZLcZ4ff89X0eURZYcCIFMJ6r9Wqk2Ikf/REf3xM286KdqGbX+EhtdVRs7tr5MZASEDXNxh/HupccC1' +
      'AaZGoqg7ECy0OIEhfKaC3Ibi1z+ogpL+////qwlJoIxa98SbghL0F+LxWrP1wz3PFTghqBOfh3pbe+QBAAAAAP7///' +
      '8CYDvqCwAAAAAZdqkUdopAu9dAy+gdmI5x3ipNXHE5ax2IrI4kAAAAAAAAGXapFG9GILVT+glechue4O/p+gOcykWX' +
      'iKwAAAAAAAABASAA4fUFAAAAABepFDVF5uM7gyxHBQ8k0+65PJwDlIvHhwEEFgAUhdE1N/LiZUBaNNuvqePdoB+4Iw' +
      'gAAAA=',
  },
  {
    exception: 'Format Error: Only one UNSIGNED_TX allowed',
    b64:
      'cHNidP8AAQD9pQEBAAAAAAECiaPHHqtNIOA3G7ukzGmPopXJRjr6Ljl/hTPMti+VZ+UBAAAAFxYAFL4Y0VKpsBIDna' +
      '89p95PUzSe7LmF/////4b4qkOnHf8USIk6UwpyN+9rRgi7st0tAXHmOuxqSJC0AQAAABcWABT+Pp7xp0XpdNkCxDVZ' +
      'Q6vLNL1TU/////8CAMLrCwAAAAAZdqkUhc/xCX/Z4Ai7NK9wnGIZeziXikiIrHL++E4sAAAAF6kUM5cluiHv1irHU6' +
      'm80GfWx6ajnQWHAkcwRAIgJxK+IuAnDzlPVoMR3HyppolwuAJf3TskAinwf4pfOiQCIAGLONfc0xTnNMkna9b7QPZz' +
      'MlvEuqFEyADS8vAtsnZcASED0uFWdJQbrUqZY3LLh+GFbTZSYG2YVi/jnF6efkE/IQUCSDBFAiEA0SuFLYXc2WHS9f' +
      'SrZgZU327tzHlMDDPOXMMJ/7X85Y0CIGczio4OFyXBl/saiK9Z9R5E5CVbIBZ8hoQDHAXR8lkqASECI7cr7vCWXRC+' +
      'B3jv7NYfysb3mk6haTkzgHNEZPhPKrMAAAAAAA==',
  },
  {
    exception:
      'Format Error: Keys must be unique for each input: input index 0 key 00',
    b64:
      'cHNidP8BAHUCAAAAASaBcTce3/KF6Tet7qSze3gADAVmy7OtZGQXE8pCFxv2AAAAAAD+////AtPf9QUAAAAAGXapFN' +
      'DFmQPFusKGh2DpD9UhpGZap2UgiKwA4fUFAAAAABepFDVF5uM7gyxHBQ8k0+65PJwDlIvHh7MuEwAAAQD9pQEBAAAA' +
      'AAECiaPHHqtNIOA3G7ukzGmPopXJRjr6Ljl/hTPMti+VZ+UBAAAAFxYAFL4Y0VKpsBIDna89p95PUzSe7LmF/////4' +
      'b4qkOnHf8USIk6UwpyN+9rRgi7st0tAXHmOuxqSJC0AQAAABcWABT+Pp7xp0XpdNkCxDVZQ6vLNL1TU/////8CAMLr' +
      'CwAAAAAZdqkUhc/xCX/Z4Ai7NK9wnGIZeziXikiIrHL++E4sAAAAF6kUM5cluiHv1irHU6m80GfWx6ajnQWHAkcwRA' +
      'IgJxK+IuAnDzlPVoMR3HyppolwuAJf3TskAinwf4pfOiQCIAGLONfc0xTnNMkna9b7QPZzMlvEuqFEyADS8vAtsnZc' +
      'ASED0uFWdJQbrUqZY3LLh+GFbTZSYG2YVi/jnF6efkE/IQUCSDBFAiEA0SuFLYXc2WHS9fSrZgZU327tzHlMDDPOXM' +
      'MJ/7X85Y0CIGczio4OFyXBl/saiK9Z9R5E5CVbIBZ8hoQDHAXR8lkqASECI7cr7vCWXRC+B3jv7NYfysb3mk6haTkz' +
      'gHNEZPhPKrMAAAAAAQA/AgAAAAH//////////////////////////////////////////wAAAAAA/////wEAAAAAAA' +
      'AAAANqAQAAAAAAAAAA',
  },
  {
    exception: 'Format Error: Invalid global key: 0001',
    b64:
      'cHNidP8CAAFVAgAAAAEnmiMjpd+1H8RfIg+liw/BPh4zQnkqhdfjbNYzO1y8OQAAAAAA/////wGgWuoLAAAAABl2qR' +
      'T/6cAGEJfMO2NvLLBGD6T8Qn0rRYisAAAAAAABASCVXuoLAAAAABepFGNFIA9o0YnhrcDfHE0W6o8UwNvrhyICA7E0' +
      'HMunaDtq9PEjjNbpfnFn1Wn6xH8eSNR1QYRDVb1GRjBDAiAEJLWO/6qmlOFVnqXJO7/UqJBkIkBVzfBwtncUaUQtBw' +
      'IfXI6w/qZRbWC4rLM61k7eYOh4W/s6qUuZvfhhUduamgEBBCIAIHcf0YrUWWZt1J89Vk49vEL0yEd042CtoWgWqO1I' +
      'jVaBAQVHUiEDsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYhA95V0eHayAXj+KWMH7+blMAvPbqv4Sf+/K' +
      'SZXyb4IIO9Uq4iBgOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RhC0prpnAAAAgAAAAIAEAACAIgYD3lXR' +
      '4drIBeP4pYwfv5uUwC89uq/hJ/78pJlfJvggg70QtKa6ZwAAAIAAAACABQAAgAAA',
  },
  {
    exception: 'Format Error: Invalid input key: 0100',
    b64:
      'cHNidP8BAFUCAAAAASeaIyOl37UfxF8iD6WLD8E+HjNCeSqF1+Ns1jM7XLw5AAAAAAD/////AaBa6gsAAAAAGXapFP' +
      '/pwAYQl8w7Y28ssEYPpPxCfStFiKwAAAAAAAIBACCVXuoLAAAAABepFGNFIA9o0YnhrcDfHE0W6o8UwNvrhyICA7E0' +
      'HMunaDtq9PEjjNbpfnFn1Wn6xH8eSNR1QYRDVb1GRjBDAiAEJLWO/6qmlOFVnqXJO7/UqJBkIkBVzfBwtncUaUQtBw' +
      'IfXI6w/qZRbWC4rLM61k7eYOh4W/s6qUuZvfhhUduamgEBBCIAIHcf0YrUWWZt1J89Vk49vEL0yEd042CtoWgWqO1I' +
      'jVaBAQVHUiEDsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYhA95V0eHayAXj+KWMH7+blMAvPbqv4Sf+/K' +
      'SZXyb4IIO9Uq4iBgOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RhC0prpnAAAAgAAAAIAEAACAIgYD3lXR' +
      '4drIBeP4pYwfv5uUwC89uq/hJ/78pJlfJvggg70QtKa6ZwAAAIAAAACABQAAgAAA',
  },
  {
    exception:
      'Format Error: invalid pubkey in key 0x0203b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd',
    b64:
      'cHNidP8BAFUCAAAAASeaIyOl37UfxF8iD6WLD8E+HjNCeSqF1+Ns1jM7XLw5AAAAAAD/////AaBa6gsAAAAAGXapFP' +
      '/pwAYQl8w7Y28ssEYPpPxCfStFiKwAAAAAAAEBIJVe6gsAAAAAF6kUY0UgD2jRieGtwN8cTRbqjxTA2+uHIQIDsTQc' +
      'y6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYwQwIgBCS1jv+qppThVZ6lyTu/1KiQZCJAVc3wcLZ3FGlELQcCH1' +
      'yOsP6mUW1guKyzOtZO3mDoeFv7OqlLmb34YVHbmpoBAQQiACB3H9GK1FlmbdSfPVZOPbxC9MhHdONgraFoFqjtSI1W' +
      'gQEFR1IhA7E0HMunaDtq9PEjjNbpfnFn1Wn6xH8eSNR1QYRDVb1GIQPeVdHh2sgF4/iljB+/m5TALz26r+En/vykmV' +
      '8m+CCDvVKuIgYDsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYQtKa6ZwAAAIAAAACABAAAgCIGA95V0eHa' +
      'yAXj+KWMH7+blMAvPbqv4Sf+/KSZXyb4IIO9ELSmumcAAACAAAAAgAUAAIAAAA==',
  },
  {
    exception: 'Format Error: Invalid input key: 0400',
    b64:
      'cHNidP8BAFUCAAAAASeaIyOl37UfxF8iD6WLD8E+HjNCeSqF1+Ns1jM7XLw5AAAAAAD/////AaBa6gsAAAAAGXapFP' +
      '/pwAYQl8w7Y28ssEYPpPxCfStFiKwAAAAAAAEBIJVe6gsAAAAAF6kUY0UgD2jRieGtwN8cTRbqjxTA2+uHIgIDsTQc' +
      'y6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUZGMEMCIAQktY7/qqaU4VWepck7v9SokGQiQFXN8HC2dxRpRC0HAh' +
      '9cjrD+plFtYLisszrWTt5g6Hhb+zqpS5m9+GFR25qaAQIEACIAIHcf0YrUWWZt1J89Vk49vEL0yEd042CtoWgWqO1I' +
      'jVaBAQVHUiEDsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYhA95V0eHayAXj+KWMH7+blMAvPbqv4Sf+/K' +
      'SZXyb4IIO9Uq4iBgOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RhC0prpnAAAAgAAAAIAEAACAIgYD3lXR' +
      '4drIBeP4pYwfv5uUwC89uq/hJ/78pJlfJvggg70QtKa6ZwAAAIAAAACABQAAgAAA',
  },
  {
    exception: 'Format Error: Invalid input key: 0500',
    b64:
      'cHNidP8BAFUCAAAAASeaIyOl37UfxF8iD6WLD8E+HjNCeSqF1+Ns1jM7XLw5AAAAAAD/////AaBa6gsAAAAAGXapFP' +
      '/pwAYQl8w7Y28ssEYPpPxCfStFiKwAAAAAAAEBIJVe6gsAAAAAF6kUY0UgD2jRieGtwN8cTRbqjxTA2+uHIgIDsTQc' +
      'y6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUZGMEMCIAQktY7/qqaU4VWepck7v9SokGQiQFXN8HC2dxRpRC0HAh' +
      '9cjrD+plFtYLisszrWTt5g6Hhb+zqpS5m9+GFR25qaAQEEIgAgdx/RitRZZm3Unz1WTj28QvTIR3TjYK2haBao7UiN' +
      'VoECBQBHUiEDsTQcy6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUYhA95V0eHayAXj+KWMH7+blMAvPbqv4Sf+/K' +
      'SZXyb4IIO9Uq4iBgOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RhC0prpnAAAAgAAAAIAEAACAIgYD3lXR' +
      '4drIBeP4pYwfv5uUwC89uq/hJ/78pJlfJvggg70QtKa6ZwAAAIAAAACABQAAgAAA',
  },
  {
    exception:
      'Format Error: invalid pubkey in key 0x0603b1341ccba7683b6af4f1238cd6e97e7167d569fac47f1e48d47541844355bd',
    b64:
      'cHNidP8BAFUCAAAAASeaIyOl37UfxF8iD6WLD8E+HjNCeSqF1+Ns1jM7XLw5AAAAAAD/////AaBa6gsAAAAAGXapFP' +
      '/pwAYQl8w7Y28ssEYPpPxCfStFiKwAAAAAAAEBIJVe6gsAAAAAF6kUY0UgD2jRieGtwN8cTRbqjxTA2+uHIgIDsTQc' +
      'y6doO2r08SOM1ul+cWfVafrEfx5I1HVBhENVvUZGMEMCIAQktY7/qqaU4VWepck7v9SokGQiQFXN8HC2dxRpRC0HAh' +
      '9cjrD+plFtYLisszrWTt5g6Hhb+zqpS5m9+GFR25qaAQEEIgAgdx/RitRZZm3Unz1WTj28QvTIR3TjYK2haBao7UiN' +
      'VoEBBUdSIQOxNBzLp2g7avTxI4zW6X5xZ9Vp+sR/HkjUdUGEQ1W9RiED3lXR4drIBeP4pYwfv5uUwC89uq/hJ/78pJ' +
      'lfJvggg71SriEGA7E0HMunaDtq9PEjjNbpfnFn1Wn6xH8eSNR1QYRDVb0QtKa6ZwAAAIAAAACABAAAgCIGA95V0eHa' +
      'yAXj+KWMH7+blMAvPbqv4Sf+/KSZXyb4IIO9ELSmumcAAACAAAAAgAUAAIAAAA==',
  },
  {
    exception: 'Format Error: Invalid input key: 0000',
    b64:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD/////g40EJ9DsZQpoqka7Cw' +
      'mK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAA' +
      'FgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAIAALsCAAAAAarXOTEBi9JfhK5AC2iEi+CdtwbqwqwYKYur7nGrZW' +
      '+LAAAAAEhHMEQCIFj2/HxqM+GzFUjUgcgmwBW9MBNarULNZ3kNq2bSrSQ7AiBKHO0mBMZzW2OT5bQWkd14sA8MWUL7' +
      'n3UYVvqpOBV9ugH+////AoDw+gIAAAAAF6kUD7lGNCFpa4LIM68kHHjBfdveSTSH0PIKJwEAAAAXqRQpynT4oI+BmZ' +
      'QoGFyXtdhS5AY/YYdlAAAAAQfaAEcwRAIgdAGK1BgAl7hzMjwAFXILNoTMgSOJEEjn282bVa1nnJkCIHPTabdA4+tT' +
      '3O+jOCPIBwUUylWn3ZVE8VfBZ5EyYRGMAUgwRQIhAPYQOLMI3B2oZaNIUnRvAVdyk0IIxtJEVDk82ZvfIhd3AiAFbm' +
      'daZ1ptCgK4WxTl4pB02KJam1dgvqKBb2YZEKAG6gFHUiEClYO/Oa4KYJdHrRma3dY0+mEIVZ1sXNObTCGD8auW4H8h' +
      'Atq2H/SaFNtqfQKwzR+7ePxLGDErW05U2uTbovv+9TbXUq4AAQEgAMLrCwAAAAAXqRS39fr0Dj1ApaRZsds1NfK3L6' +
      'kh6IcBByMiACCMI1MXN0O1ld+0oHtyuo5C43l9p06H/n2ddJfjsgKJAwEI2gQARzBEAiBi63pVYQenxz9FrEq1od3f' +
      'b3B1+xJ1lpp/OD7/94S8sgIgDAXbt0cNvy8IVX3TVscyXB7TCRPpls04QJRdsSIo2l8BRzBEAiBl9FulmYtZon/+Gn' +
      'vtAWrx8fkNVLOqj3RQql9WolEDvQIgf3JHA60e25ZoCyhLVtT/y4j3+3Weq74IqjDym4UTg9IBR1IhAwidwQx6xttU' +
      '+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcIQI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc1KuACICA6mkw3' +
      '9ZltOqJdusa1cK8GUDlEkpQkYLNUdT7Z7spYdxENkMak8AAACAAAAAgAQAAIAAIgICf2OZdX0u/1WhNq0CxoSxg4tl' +
      'VuXxtrNCgqlLa1AFEJYQ2QxqTwAAAIAAAACABQAAgAA=',
  },
  {
    exception: 'Format Error: Invalid input key: 0700',
    b64:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD/////g40EJ9DsZQpoqka7Cw' +
      'mK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAA' +
      'FgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL0l+ErkALaISL4J23BurCrBgpi6vucatlb4' +
      'sAAAAASEcwRAIgWPb8fGoz4bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDwxZQvuf' +
      'dRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQceMF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlC' +
      'gYXJe12FLkBj9hh2UAAAACBwDaAEcwRAIgdAGK1BgAl7hzMjwAFXILNoTMgSOJEEjn282bVa1nnJkCIHPTabdA4+tT' +
      '3O+jOCPIBwUUylWn3ZVE8VfBZ5EyYRGMAUgwRQIhAPYQOLMI3B2oZaNIUnRvAVdyk0IIxtJEVDk82ZvfIhd3AiAFbm' +
      'daZ1ptCgK4WxTl4pB02KJam1dgvqKBb2YZEKAG6gFHUiEClYO/Oa4KYJdHrRma3dY0+mEIVZ1sXNObTCGD8auW4H8h' +
      'Atq2H/SaFNtqfQKwzR+7ePxLGDErW05U2uTbovv+9TbXUq4AAQEgAMLrCwAAAAAXqRS39fr0Dj1ApaRZsds1NfK3L6' +
      'kh6IcBByMiACCMI1MXN0O1ld+0oHtyuo5C43l9p06H/n2ddJfjsgKJAwEI2gQARzBEAiBi63pVYQenxz9FrEq1od3f' +
      'b3B1+xJ1lpp/OD7/94S8sgIgDAXbt0cNvy8IVX3TVscyXB7TCRPpls04QJRdsSIo2l8BRzBEAiBl9FulmYtZon/+Gn' +
      'vtAWrx8fkNVLOqj3RQql9WolEDvQIgf3JHA60e25ZoCyhLVtT/y4j3+3Weq74IqjDym4UTg9IBR1IhAwidwQx6xttU' +
      '+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcIQI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc1KuACICA6mkw3' +
      '9ZltOqJdusa1cK8GUDlEkpQkYLNUdT7Z7spYdxENkMak8AAACAAAAAgAQAAIAAIgICf2OZdX0u/1WhNq0CxoSxg4tl' +
      'VuXxtrNCgqlLa1AFEJYQ2QxqTwAAAIAAAACABQAAgAA=',
  },
  {
    exception: 'Format Error: Invalid input key: 0800',
    b64:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD/////g40EJ9DsZQpoqka7Cw' +
      'mK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAA' +
      'FgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL0l+ErkALaISL4J23BurCrBgpi6vucatlb4' +
      'sAAAAASEcwRAIgWPb8fGoz4bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDwxZQvuf' +
      'dRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQceMF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlC' +
      'gYXJe12FLkBj9hh2UAAAABB9oARzBEAiB0AYrUGACXuHMyPAAVcgs2hMyBI4kQSOfbzZtVrWecmQIgc9Npt0Dj61Pc' +
      '76M4I8gHBRTKVafdlUTxV8FnkTJhEYwBSDBFAiEA9hA4swjcHahlo0hSdG8BV3KTQgjG0kRUOTzZm98iF3cCIAVuZ1' +
      'pnWm0KArhbFOXikHTYolqbV2C+ooFvZhkQoAbqAUdSIQKVg785rgpgl0etGZrd1jT6YQhVnWxc05tMIYPxq5bgfyEC' +
      '2rYf9JoU22p9ArDNH7t4/EsYMStbTlTa5Nui+/71NtdSrgABASAAwusLAAAAABepFLf1+vQOPUClpFmx2zU18rcvqS' +
      'HohwEHIyIAIIwjUxc3Q7WV37Sge3K6jkLjeX2nTof+fZ10l+OyAokDAggA2gQARzBEAiBi63pVYQenxz9FrEq1od3f' +
      'b3B1+xJ1lpp/OD7/94S8sgIgDAXbt0cNvy8IVX3TVscyXB7TCRPpls04QJRdsSIo2l8BRzBEAiBl9FulmYtZon/+Gn' +
      'vtAWrx8fkNVLOqj3RQql9WolEDvQIgf3JHA60e25ZoCyhLVtT/y4j3+3Weq74IqjDym4UTg9IBR1IhAwidwQx6xttU' +
      '+RMpr2FzM9s4jOrQwjH3IzedG5kDCwLcIQI63ZBPPW3PWd25BrDe4jUpt/+57VDl6GFRkmhgIh8Oc1KuACICA6mkw3' +
      '9ZltOqJdusa1cK8GUDlEkpQkYLNUdT7Z7spYdxENkMak8AAACAAAAAgAQAAIAAIgICf2OZdX0u/1WhNq0CxoSxg4tl' +
      'VuXxtrNCgqlLa1AFEJYQ2QxqTwAAAIAAAACABQAAgAA=',
  },
  {
    exception:
      'Format Error: invalid pubkey in key 0x0203a9a4c37f5996d3aa25dbac6b570af0650394492942460b354753ed9eeca587',
    b64:
      'cHNidP8BAJoCAAAAAljoeiG1ba8MI76OcHBFbDNvfLqlyHV5JPVFiHuyq911AAAAAAD/////g40EJ9DsZQpoqka7Cw' +
      'mK6kQiwHGyyng1Kgd5WdB86h0BAAAAAP////8CcKrwCAAAAAAWABTYXCtx0AYLCcmIauuBXlCZHdoSTQDh9QUAAAAA' +
      'FgAUAK6pouXw+HaliN9VRuh0LR2HAI8AAAAAAAEAuwIAAAABqtc5MQGL0l+ErkALaISL4J23BurCrBgpi6vucatlb4' +
      'sAAAAASEcwRAIgWPb8fGoz4bMVSNSByCbAFb0wE1qtQs1neQ2rZtKtJDsCIEoc7SYExnNbY5PltBaR3XiwDwxZQvuf' +
      'dRhW+qk4FX26Af7///8CgPD6AgAAAAAXqRQPuUY0IWlrgsgzryQceMF9295JNIfQ8gonAQAAABepFCnKdPigj4GZlC' +
      'gYXJe12FLkBj9hh2UAAAABB9oARzBEAiB0AYrUGACXuHMyPAAVcgs2hMyBI4kQSOfbzZtVrWecmQIgc9Npt0Dj61Pc' +
      '76M4I8gHBRTKVafdlUTxV8FnkTJhEYwBSDBFAiEA9hA4swjcHahlo0hSdG8BV3KTQgjG0kRUOTzZm98iF3cCIAVuZ1' +
      'pnWm0KArhbFOXikHTYolqbV2C+ooFvZhkQoAbqAUdSIQKVg785rgpgl0etGZrd1jT6YQhVnWxc05tMIYPxq5bgfyEC' +
      '2rYf9JoU22p9ArDNH7t4/EsYMStbTlTa5Nui+/71NtdSrgABASAAwusLAAAAABepFLf1+vQOPUClpFmx2zU18rcvqS' +
      'HohwEHIyIAIIwjUxc3Q7WV37Sge3K6jkLjeX2nTof+fZ10l+OyAokDAQjaBABHMEQCIGLrelVhB6fHP0WsSrWh3d9v' +
      'cHX7EnWWmn84Pv/3hLyyAiAMBdu3Rw2/LwhVfdNWxzJcHtMJE+mWzThAlF2xIijaXwFHMEQCIGX0W6WZi1mif/4ae+' +
      '0BavHx+Q1Us6qPdFCqX1aiUQO9AiB/ckcDrR7blmgLKEtW1P/LiPf7dZ6rvgiqMPKbhROD0gFHUiEDCJ3BDHrG21T5' +
      'EymvYXMz2ziM6tDCMfcjN50bmQMLAtwhAjrdkE89bc9Z3bkGsN7iNSm3/7ntUOXoYVGSaGAiHw5zUq4AIQIDqaTDf1' +
      'mW06ol26xrVwrwZQOUSSlCRgs1R1PtnuylhxDZDGpPAAAAgAAAAIAEAACAACICAn9jmXV9Lv9VoTatAsaEsYOLZVbl' +
      '8bazQoKpS2tQBRCWENkMak8AAACAAAAAgAUAAIAA',
  },
  {
    exception: 'Format Error: Invalid input key: 0300',
    b64:
      'cHNidP8BAHMCAAAAATAa6YblFqHsisW0vGVz0y+DtGXiOtdhZ9aLOOcwtNvbAAAAAAD/////AnR7AQAAAAAAF6kUA6' +
      'oXrogrXQ1Usl1jEE5P/s57nqKHYEOZOwAAAAAXqRS5IbG6b3IuS/qDtlV6MTmYakLsg4cAAAAAAAEBHwDKmjsAAAAA' +
      'FgAU0tlLZK4IWH7vyO6xh8YB6Tn5A3wCAwABAAAAAAEAFgAUYunpgv/zTdgjlhAxawkM0qO3R8sAAQAiACCHa62DLx' +
      '0WgBXtQSMqnqZaGBXZ7xPA74dZ9ktbKyeKZQEBJVEhA7fOI6AcW0vwCmQlN836uzFbZoMyhnR471EwnSvVf4qHUa4A',
  },
  {
    exception: 'Format Error: Invalid output key: 0000',
    b64:
      'cHNidP8BAHMCAAAAATAa6YblFqHsisW0vGVz0y+DtGXiOtdhZ9aLOOcwtNvbAAAAAAD/////AnR7AQAAAAAAF6kUA6' +
      'oXrogrXQ1Usl1jEE5P/s57nqKHYEOZOwAAAAAXqRS5IbG6b3IuS/qDtlV6MTmYakLsg4cAAAAAAAEBHwDKmjsAAAAA' +
      'FgAU0tlLZK4IWH7vyO6xh8YB6Tn5A3wAAgAAFgAUYunpgv/zTdgjlhAxawkM0qO3R8sAAQAiACCHa62DLx0WgBXtQS' +
      'MqnqZaGBXZ7xPA74dZ9ktbKyeKZQEBJVEhA7fOI6AcW0vwCmQlN836uzFbZoMyhnR471EwnSvVf4qHUa4A',
  },
  {
    exception: 'Format Error: Unexpected End of PSBT',
    b64:
      'cHNidP8BAHMCAAAAATAa6YblFqHsisW0vGVz0y+DtGXiOtdhZ9aLOOcwtNvbAAAAAAD/////AnR7AQAAAAAAF6kUA6' +
      'oXrogrXQ1Usl1jEE5P/s57nqKHYEOZOwAAAAAXqRS5IbG6b3IuS/qDtlV6MTmYakLsg4cAAAAAAAEBHwDKmjsAAAAA' +
      'FgAU0tlLZK4IWH7vyO6xh8YB6Tn5A3wAAQAWABRi6emC//NN2COWEDFrCQzSo7dHywABACIAIIdrrYMvHRaAFe1BIy' +
      'qeploYFdnvE8Dvh1n2S1srJ4plIQEAJVEhA7fOI6AcW0vwCmQlN836uzFbZoMyhnR471EwnSvVf4qHUa4A',
  },
  // start BIP371
  {
    exception: 'Decode Error: tapInternalKey not a 32-byte x-only pubkey',
    b64:
      'cHNidP8BAHECAAAAASd0Srq/MCf+DWzyOpbu4u+xiO9SMBlUWFiD5ptmJLJCAAAAAAD/////Anh8AQAAAAAAFgAUg6' +
      'fjS9mf8DpJYu+KGhAbspVGHs5gawQqAQAAABYAFHrDad8bIOAz1hFmI5V7CsSfPFLoAAAAAAABASsA8gUqAQAAACJR' +
      'IFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXARchAv40kGTJjW4qhT+jybEr2LMEoZwZXGDvp+4jkwRtP6' +
      'IyAAAA',
  },
  {
    exception:
      'Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature',
    b64:
      'cHNidP8BAHECAAAAASd0Srq/MCf+DWzyOpbu4u+xiO9SMBlUWFiD5ptmJLJCAAAAAAD/////Anh8AQAAAAAAFgAUg6' +
      'fjS9mf8DpJYu+KGhAbspVGHs5gawQqAQAAABYAFHrDad8bIOAz1hFmI5V7CsSfPFLoAAAAAAABASsA8gUqAQAAACJR' +
      'IFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXARM/Fzuz02wHSvtxb+xjB6BpouRQuZXzyCeFlFq43w4kJg' +
      '3NcDsMvzTeOZGEqUgawrNYbbZgHwJqd/fkk4SBvDR1AAAA',
  },
  {
    exception:
      'Decode Error: tapKeySig not a valid 64-65-byte BIP340 signature',
    b64:
      'cHNidP8BAHECAAAAASd0Srq/MCf+DWzyOpbu4u+xiO9SMBlUWFiD5ptmJLJCAAAAAAD/////Anh8AQAAAAAAFgAUg6' +
      'fjS9mf8DpJYu+KGhAbspVGHs5gawQqAQAAABYAFHrDad8bIOAz1hFmI5V7CsSfPFLoAAAAAAABASsA8gUqAQAAACJR' +
      'IFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXARNCFzuz02wHSvtxb+xjB6BpouRQuZXzyCeFlFq43w4kJg' +
      '3NcDsMvzTeOZGEqUgawrNYbbZgHwJqd/fkk4SBvDR1FwGqAAAA',
  },
  {
    exception:
      'Decode Error: bip32Derivation has invalid pubkey in key 0x1602fe349064c98d6e2a853fa3c9b12bd8b304a19c19',
    b64:
      'cHNidP8BAHECAAAAASd0Srq/MCf+DWzyOpbu4u+xiO9SMBlUWFiD5ptmJLJCAAAAAAD/////Anh8AQAAAAAAFgAUg6' +
      'fjS9mf8DpJYu+KGhAbspVGHs5gawQqAQAAABYAFHrDad8bIOAz1hFmI5V7CsSfPFLoAAAAAAABASsA8gUqAQAAACJR' +
      'IFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXIhYC/jSQZMmNbiqFP6PJsSvYswShnBlcYO+n7iOTBG0/oj' +
      'IZAHcrLadWAACAAQAAgAAAAIABAAAAAAAAAAAAAA==',
  },
  {
    exception: 'Decode Error: tapInternalKey not a 32-byte x-only pubkey',
    b64:
      'cHNidP8BAH0CAAAAASd0Srq/MCf+DWzyOpbu4u+xiO9SMBlUWFiD5ptmJLJCAAAAAAD/////Aoh7AQAAAAAAFgAUI4' +
      'KHHH6EIaAAk/dU2RKB5nWHS59gawQqAQAAACJRIFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXAAAAAAAB' +
      'ASsA8gUqAQAAACJRIFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXAAABBSEC/jSQZMmNbiqFP6PJsSvYsw' +
      'ShnBlcYO+n7iOTBG0/ojIA',
  },
  {
    exception:
      'Decode Error: bip32Derivation has invalid pubkey in key 0x0702fe349064c98d6e2a853fa3c9b12bd8b304a19c19',
    b64:
      'cHNidP8BAH0CAAAAASd0Srq/MCf+DWzyOpbu4u+xiO9SMBlUWFiD5ptmJLJCAAAAAAD/////Aoh7AQAAAAAAFgAUI4' +
      'KHHH6EIaAAk/dU2RKB5nWHS59gawQqAQAAACJRIFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXAAAAAAAB' +
      'ASsA8gUqAQAAACJRIFosLPW1LPMfg60ujaY/8DGD7Nj2CcdRCuikjgORCgdXAAAiBwL+NJBkyY1uKoU/o8mxK9izBK' +
      'GcGVxg76fuI5MEbT+iMhkAdystp1YAAIABAACAAAAAgAEAAAAAAAAAAA==',
  },
  {
    exception:
      'Decode Error: tapScriptSig has invalid key 0x14022cb13ac68248de806aa6a3659cf3c03eb6821d09c8114a4e868fe',
    b64:
      'cHNidP8BAF4CAAAAAZvUh2UjC/mnLmYgAflyVW5U8Mb5f+tWvLVgDYF/aZUmAQAAAAD/////AUjmBSoBAAAAIlEgAw' +
      '2k/OT32yjCyylRYx4ANxOFZZf+ljiCy1AOaBEsymMAAAAAAAEBKwDyBSoBAAAAIlEgwiR++/2SrEf29AuNQtFpF1oZ' +
      '+p+hDkol1/NetN2FtpJCFAIssTrGgkjegGqmo2Wc88A+toIdCcgRSk6Gj+vehlu20s2XDhX1P8DIL5UP1WD/qRm3YX' +
      'K+AXNoqJkTrwdPQAsJQIl1aqNznMxonsD886NgvjLMC1mxbpOh6LtGBXJrLKej/3BsQXZkljKyzGjh+RK4pXjjcZzn' +
      'cQiFx6lm9JvNQ8sAAA==',
  },
  {
    exception:
      'Decode Error: tapScriptSig has invalid signature in key 0x142cb13ac68248de806aa6a3659cf3c03eb6821d09c8',
    b64:
      'cHNidP8BAF4CAAAAAZvUh2UjC/mnLmYgAflyVW5U8Mb5f+tWvLVgDYF/aZUmAQAAAAD/////AUjmBSoBAAAAIlEgAw' +
      '2k/OT32yjCyylRYx4ANxOFZZf+ljiCy1AOaBEsymMAAAAAAAEBKwDyBSoBAAAAIlEgwiR++/2SrEf29AuNQtFpF1oZ' +
      '+p+hDkol1/NetN2FtpJBFCyxOsaCSN6AaqajZZzzwD62gh0JyBFKToaP696GW7bSzZcOFfU/wMgvlQ/VYP+pGbdhcr' +
      '4Bc2iomROvB09ACwlCiXVqo3OczGiewPzzo2C+MswLWbFuk6Hou0YFcmssp6P/cGxBdmSWMrLMaOH5ErileONxnOdx' +
      'CIXHqWb0m81DywEBAAA=',
  },
  {
    exception:
      'Decode Error: tapScriptSig has invalid signature in key 0x142cb13ac68248de806aa6a3659cf3c03eb6821d09c8',
    b64:
      'cHNidP8BAF4CAAAAAZvUh2UjC/mnLmYgAflyVW5U8Mb5f+tWvLVgDYF/aZUmAQAAAAD/////AUjmBSoBAAAAIlEgAw' +
      '2k/OT32yjCyylRYx4ANxOFZZf+ljiCy1AOaBEsymMAAAAAAAEBKwDyBSoBAAAAIlEgwiR++/2SrEf29AuNQtFpF1oZ' +
      '+p+hDkol1/NetN2FtpJBFCyxOsaCSN6AaqajZZzzwD62gh0JyBFKToaP696GW7bSzZcOFfU/wMgvlQ/VYP+pGbdhcr' +
      '4Bc2iomROvB09ACwk/iXVqo3OczGiewPzzo2C+MswLWbFuk6Hou0YFcmssp6P/cGxBdmSWMrLMaOH5ErileONxnOdx' +
      'CIXHqWb0m81DAAA=',
  },
  {
    exception:
      'Decode Error: tapLeafScript has invalid control block in key 0x15c150929b74c1a04954b78b4b6035e97a5e078',
    b64:
      'cHNidP8BAF4CAAAAAZvUh2UjC/mnLmYgAflyVW5U8Mb5f+tWvLVgDYF/aZUmAQAAAAD/////AUjmBSoBAAAAIlEgAw' +
      '2k/OT32yjCyylRYx4ANxOFZZf+ljiCy1AOaBEsymMAAAAAAAEBKwDyBSoBAAAAIlEgwiR++/2SrEf29AuNQtFpF1oZ' +
      '+p+hDkol1/NetN2FtpJjFcFQkpt0waBJVLeLS2A16XpeB4paDyjsltVHv+6azoA6wG99YgWelJehpKJnVp2YdtpgEB' +
      'r/OONSm5uTnOf5GulwEV8uSQr3zEXE94UR82BXzlxaXFYyWin7RN/CA/NW4fgAIyAssTrGgkjegGqmo2Wc88A+toId' +
      'CcgRSk6Gj+vehlu20qzAAAA=',
  },
  {
    exception:
      'Decode Error: tapLeafScript has invalid control block in key 0x15c150929b74c1a04954b78b4b6035e97a5e078',
    b64:
      'cHNidP8BAF4CAAAAAZvUh2UjC/mnLmYgAflyVW5U8Mb5f+tWvLVgDYF/aZUmAQAAAAD/////AUjmBSoBAAAAIlEgAw' +
      '2k/OT32yjCyylRYx4ANxOFZZf+ljiCy1AOaBEsymMAAAAAAAEBKwDyBSoBAAAAIlEgwiR++/2SrEf29AuNQtFpF1oZ' +
      '+p+hDkol1/NetN2FtpJhFcFQkpt0waBJVLeLS2A16XpeB4paDyjsltVHv+6azoA6wG99YgWelJehpKJnVp2YdtpgEB' +
      'r/OONSm5uTnOf5GulwEV8uSQr3zEXE94UR82BXzlxaXFYyWin7RN/CA/NW4SMgLLE6xoJI3oBqpqNlnPPAPraCHQnI' +
      'EUpOho/r3oZbttKswAAA',
  },
];
