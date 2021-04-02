"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPaddedHex = void 0;
function toPaddedHex(stringToPad) {
    return '0x' + stringToPad.toString(16).padStart(8, '0');
}
exports.toPaddedHex = toPaddedHex;
