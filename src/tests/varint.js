'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const test = require('tape');
const varuint = require('../lib/converter/varint');
const varint_1 = require('./fixtures/varint');
varint_1.fixtures.valid.forEach((fixture, i) => {
  test('valid encode #' + (i + 1), t => {
    t.same(varuint.encode(fixture.dec).toString('hex'), fixture.hex);
    // @ts-ignore
    t.same(varuint.encode.bytes, fixture.hex.length / 2);
    t.end();
  });
  test('valid decode #' + (i + 1), t => {
    t.same(varuint.decode(Buffer.from(fixture.hex, 'hex')), fixture.dec);
    // @ts-ignore
    t.same(varuint.decode.bytes, fixture.hex.length / 2);
    t.end();
  });
  test('valid encodingLength #' + (i + 1), t => {
    t.same(varuint.encodingLength(fixture.dec), fixture.hex.length / 2);
    t.end();
  });
});
varint_1.fixtures.invalid.forEach((fixture, i) => {
  test('invalid encode #' + (i + 1), t => {
    t.throws(() => {
      varuint.encode(fixture.dec);
    }, new RegExp(fixture.msg));
    t.end();
  });
  test('invalid encodingLength #' + (i + 1), t => {
    t.throws(() => {
      varuint.encodingLength(fixture.dec);
    }, new RegExp(fixture.msg));
    t.end();
  });
  if (fixture.hex) {
    test('invalid decode #' + (i + 1), t => {
      t.throws(() => {
        // @ts-ignore
        t.decode(varuint.decode(Buffer.from(fixture.hex, 'hex')));
      }, new RegExp(fixture.msg));
      t.end();
    });
  }
});
test('encode', t => {
  t.test('write to buffer with offset', _t => {
    const buffer = Buffer.from([0x00, 0x00]);
    _t.same(varuint.encode(0xfc, buffer, 1).toString('hex'), '00fc');
    // @ts-ignore
    _t.same(varuint.encode.bytes, 1);
    _t.end();
  });
  t.test('should be a buffer', _t => {
    _t.throws(() => {
      // @ts-ignore
      varuint.encode(0, []);
    }, new RegExp('buffer must be a Buffer instance'));
    _t.end();
  });
  t.end();
});
test('decode', t => {
  t.test('read from buffer with offset', _t => {
    const buffer = Buffer.from([0x00, 0xfc]);
    _t.same(varuint.decode(buffer, 1), 0xfc);
    // @ts-ignore
    _t.same(varuint.decode.bytes, 1);
    _t.end();
  });
  t.test('should be a buffer', _t => {
    _t.throws(() => {
      // @ts-ignore
      varuint.decode([]);
    }, new RegExp('buffer must be a Buffer instance'));
    _t.end();
  });
  t.end();
});
