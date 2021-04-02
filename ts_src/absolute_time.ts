import { HexBase64Latin1Encoding } from "crypto";
import { PaymentEndpoint } from "./payment_endpoint";
import {BitcoinNValues, BitcoinTimeUnits, TimeInputTypes, toPaddedHex } from "./_utility";
const bitcoin = require('bitcoinjs-lib');

const LOCKTIME_THRESHOLD = 0x1dcd6500; // >= to this, then time else blocks
const LOCKTIME_MAX = 0xffffffff; // >= to this, then time else blocks
const BITCOIN_UNIX_MINIMUM = 1231006505000; // millisecond timestamp of genesis block

export class AbsoluteTime {

    timeUnit: BitcoinTimeUnits;
    scriptEncoding: HexBase64Latin1Encoding;
    requiredNValues: BitcoinNValues;

    //attributes for timeunit === seconds
    humanDateTime?: string;
    iso8601?: Date;
    unixSeconds?: number;
    unixMilliSeconds?: number;

    //attributes for timeunit === blocks
    blocks?: number;

  
    constructor (inputValue /*: string | number*/, inputValueType: TimeInputTypes) {
         
        switch (inputValueType) {
            case "N_LOCKTIME":
                if(typeof inputValue === "string") {
                    inputValue = parseInt(inputValue, 16);
                }
                this.fromNLockTime(inputValue);
                break;
            case "PERIOD_OF_TIME":
                this.setLockTimeSeconds(inputValue);
                break;
            case "BLOCKS":
                this.setLockTimeBlocks(inputValue);
                break;
            case "SCRIPT_ENCODING":
                this.fromScriptEncoding(inputValue);
                break;
            case "N_SEQUENCE":
            throw new TypeError ("Cannot get an AbsoluteTime from N_SEQUENCE. Maybe you intended to get a RelativeTime?");                
        }

        const nSequenceDecInteger = this.blocks | this.unixSeconds;

        this.scriptEncoding =  bitcoin.script.number.encode(nSequenceDecInteger).toString('hex');
     
        this.requiredNValues = {
            nSequence: {
                dec: LOCKTIME_MAX - 1,
                hex: toPaddedHex(LOCKTIME_MAX - 1),
            },
            nLockTime: {
                dec: nSequenceDecInteger,
                hex: toPaddedHex(nSequenceDecInteger),
            },
        }
    }

    private setLockTimeSeconds(inputValue):void {
        this.timeUnit = BitcoinTimeUnits.seconds;

        //if statement to check the inputValue is not less than the timestamp of the bitcoin mainnet genesis block
        //if so, assumes it is timestamp provided in seconds not milliseconds
        //to do update this check to dynamically alter the BITCOIN_UNIX_MINIMUM depending on what network you are coding for
        //should be ok for now considering it was the first network
        if(new Date(inputValue).getTime() < BITCOIN_UNIX_MINIMUM) {
            inputValue *= 1000
        }
      
        const dateObject = new Date(inputValue)
        
        this.humanDateTime = dateObject.toUTCString();
        this.iso8601 = dateObject;
        this.unixMilliSeconds = dateObject.getTime();
        this.unixSeconds = Math.floor(this.unixMilliSeconds / 1000);
    }

    private setLockTimeBlocks(inputValue):void {
        this.timeUnit = BitcoinTimeUnits.blocks;
        this.blocks = inputValue;
    }

    private fromNLockTime(inputValue):void {
        if (inputValue  >= LOCKTIME_THRESHOLD) {
            this.setLockTimeSeconds(inputValue);
        } else if (inputValue < LOCKTIME_THRESHOLD) {
            this.setLockTimeBlocks(inputValue);
        }
    }

    private fromScriptEncoding(inputValue):void {
        const nSequence = bitcoin.script.number.decode(Buffer.from(inputValue, 'hex'));
        this.fromNLockTime(nSequence);
    }
}