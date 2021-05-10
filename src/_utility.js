const TaggedHash = require('../tmp_modules/tagged-hash');
export var BitcoinTimeUnits;
(function (BitcoinTimeUnits) {
    BitcoinTimeUnits["seconds"] = "seconds";
    BitcoinTimeUnits["blocks"] = "blocks";
})(BitcoinTimeUnits || (BitcoinTimeUnits = {}));
export function toPaddedHex(decToPad) {
    const halfPaddedHex = decToPad.toString(16).padStart(8, 0);
    return halfPaddedHex.toString(16).padStart(10, "0x");
}
export function createTaggedHash(tag, message) {
    const buffer = Buffer.from(message, 'hex');
    const taggedHash = new TaggedHash(tag);
    return taggedHash.hash(buffer).toString('hex');
}
