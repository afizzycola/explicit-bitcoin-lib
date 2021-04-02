import { HexBase64Latin1Encoding } from "crypto";
import { BitcoinTimeUnits, BitcoinNValues, TimeInputTypes, toPaddedHex } from "./_utility";
const bip68 = require('bip68');
const bitcoin = require('bitcoinjs-lib');

export class RelativeTime {

    nSequence: number;
    scriptEncoding: HexBase64Latin1Encoding;
    timeUnit: BitcoinTimeUnits;
    requiredNValues: BitcoinNValues;
    seconds?: number;
    blocks?: number;

    constructor(inputValue, inputValuetype: TimeInputTypes) {
        
        let conversion;

        switch (inputValuetype) {
            case 'BLOCKS':
                conversion = toSequenceBlocks(inputValue);
                break;
            case 'PERIOD_OF_TIME':
                conversion = toSequenceTime(inputValue);
                break;
            case 'N_SEQUENCE':
                conversion = fromNSequence(inputValue);
                break;
            case 'SCRIPT_ENCODING':
                conversion = fromScriptEncoding(inputValue);
                break;
        }

        this.scriptEncoding = conversion.csvScript;
        this.timeUnit = conversion.type;

        if (conversion.type === BitcoinTimeUnits.seconds) {
            this.seconds = conversion.seconds;
        } else if (conversion.type === BitcoinTimeUnits.blocks) {
            this.blocks = conversion.blocks;
        }

        
        this.nSequence = conversion.nSequence;
        // to do - be replaced with:
        // this.requiredNValues = {
        //     nVersionMinimum: 2,
        //     nSequence: {
        //         dec: conversion.nSequence,
        //         hex: toPaddedHex(conversion.nSequence),
        //     },
        //     nLockTime: {
        //         dec: 0,
        //         hex: toPaddedHex(0),
        //     },
        // }
        ///////////////////////////////////

    }
}


function toSequenceTime(valueInSeconds) {
    if (valueInSeconds === void 0) { valueInSeconds = 1200; }
    const valueInMutlipleOf512 = Math.ceil(valueInSeconds / 512) * 512;

    const nSequence = bip68.encode({ seconds: valueInMutlipleOf512 });

    return {
        nSequence: nSequence,
        csvScript: bitcoin.script.number.encode(nSequence).toString('hex'),
        seconds: valueInMutlipleOf512,
        type: "seconds",
    }
}
function toSequenceBlocks(noOfblocks) {
    
    let nSequence = bip68.encode({ blocks: noOfblocks })

    return {
        nSequence: nSequence,
        csvScript: bitcoin.script.number.encode(nSequence).toString('hex'),
        blocks: noOfblocks,
        type: "blocks",
    }
}

function fromNSequence(nSequence) {
    let result;
    
    const integerValue = bip68.decode(nSequence);

    if (integerValue.hasOwnProperty('seconds')) {
        result = toSequenceTime(integerValue.seconds)
    } else {
        result = toSequenceBlocks(integerValue.blocks)
    }
    
    return result;
}

function fromScriptEncoding(csvScript) {

    const nSequence = bitcoin.script.number.decode(Buffer.from(csvScript, 'hex'))//.toString('hex');

    return fromNSequence(nSequence);
}