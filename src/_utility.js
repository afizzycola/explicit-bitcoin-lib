export var BitcoinTimeUnits;
(function (BitcoinTimeUnits) {
    BitcoinTimeUnits["seconds"] = "seconds";
    BitcoinTimeUnits["blocks"] = "blocks";
})(BitcoinTimeUnits || (BitcoinTimeUnits = {}));
export function toPaddedHex(decToPad) {
    const halfPaddedHex = decToPad.toString(16).padStart(8, 0);
    return halfPaddedHex.toString(16).padStart(10, "0x");
}
