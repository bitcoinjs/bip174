"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bitcoin_ops_1 = require("bitcoin-ops");
const bitcoinjs_lib_1 = require("bitcoinjs-lib");
const { decompile } = bitcoinjs_lib_1.script;
const maxKeyCount = 16;
const opNumberOffset = 80;
/** Determine if a script is a standard multisig script

  {
    [script]: <Script Hex String>
  }

  @returns
  <Is Multisig Script Bool>
*/
function isMultisig({ script }) {
    if (!script) {
        return false;
    }
    const decompiled = decompile(Buffer.from(script, 'hex')).map(n => {
        if (Buffer.isBuffer(n)) {
            return n;
        }
        else if (n > opNumberOffset && n <= opNumberOffset + maxKeyCount) {
            return n - opNumberOffset;
        }
        else {
            return n;
        }
    });
    const [opCheckMultiSig, keyCount, ...elements] = decompiled.reverse();
    // The final op-code must be OP_CHECKMULTISIG
    if (opCheckMultiSig !== bitcoin_ops_1.OP_CHECKMULTISIG) {
        return false;
    }
    const [keysRequired] = [elements].reverse();
    // The remaining elements must be just the pubkeys and a sigs required count
    if (keyCount !== elements.length - [keysRequired].length) {
        return false;
    }
    // The number of keys required cannot exceed the key count
    if (keysRequired > keyCount) {
        return false;
    }
    const pubKeys = elements.filter(Buffer.isBuffer);
    // The number of public key buffers must match the total key list count
    if (pubKeys.length !== keyCount) {
        return false;
    }
    return true;
}
exports.isMultisig = isMultisig;
