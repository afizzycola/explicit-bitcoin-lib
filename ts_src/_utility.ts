import { HexBase64Latin1Encoding } from "crypto";
const TaggedHash = require('../tmp_modules/tagged-hash');

export interface NParameter {
    hex: string;
    dec: number;
}
export interface BitcoinNValues {
    nSequence: NParameter;
    nLockTime: NParameter;
    nVersionMinimum?: number
}

export type TimeInputTypes = 'BLOCKS'| 'PERIOD_OF_TIME' | 'N_SEQUENCE'| 'N_LOCKTIME' | 'SCRIPT_ENCODING';

export enum BitcoinTimeUnits {
    seconds = 'seconds',
    blocks = 'blocks',
}

export function toPaddedHex (decToPad): string {
    const halfPaddedHex = decToPad.toString(16).padStart(8,0);

    return halfPaddedHex.toString(16).padStart(10,"0x");
}

export function createTaggedHash(tag: string, message: string): string {
    const buffer = Buffer.from(message, 'hex');
    const  taggedHash = new TaggedHash(tag);
    return taggedHash.hash(buffer).toString('hex');
}