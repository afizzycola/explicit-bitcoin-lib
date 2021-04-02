import { HexBase64Latin1Encoding } from "crypto";
import { BitcoinNValues } from "./_utility";
import { RelativeTime } from './relative_time';
import { AbsoluteTime } from "./absolute_time";

const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;


interface ScriptAddressDetail {
    address: string;
    scriptHash: HexBase64Latin1Encoding;
    scriptPubKeyHex: HexBase64Latin1Encoding;
}

export class PaymentEndpoint {

    miniscript: string;
    asm: string;
    //buffer: Buffer;
    hexEncoding: string;
    stack: Array<string>;
    p2sh: ScriptAddressDetail;
    p2sh_p2wsh: ScriptAddressDetail;
    p2wsh_v0: ScriptAddressDetail;
    //p2wsh_v1: ScriptAddressDetail; to do
    requiredNValues: BitcoinNValues;
    nValuesSuperset: Array<any> = []; //to change type in <>

    constructor(asmScript, network=TESTNET) {
        //this.network
        this.miniscript; //to do
        this.asm = asmScript.trim().replace(/\s+/g, ' ');

        const buffer = bitcoin.script.fromASM(this.asm);

        this.hexEncoding = buffer.toString('hex');
        this.stack = this.asm.split(" ");
        
        const p2shObject = bitcoin.payments.p2sh({
            redeem: { output: buffer, network: network },
            network: network,
        });
        const p2wsh_v0Object = bitcoin.payments.p2wsh({
            script: buffer,
            redeem: { output: buffer, network: network },
            network: network,
        });
        const p2sh_p2wshObject = bitcoin.payments.p2sh({
            redeem: {output: p2wsh_v0Object.output, network: network},
            network: network,
        })

        this.p2sh = {
            address: p2shObject.address,
            scriptHash: p2shObject.hash.toString('hex'),
            scriptPubKeyHex: p2shObject.output.toString('hex'),
        }
        this.p2sh_p2wsh = {
            address: p2sh_p2wshObject.address,
            scriptHash: p2sh_p2wshObject.hash.toString('hex'),
            scriptPubKeyHex: p2sh_p2wshObject.output.toString('hex'),
        }
        this.p2wsh_v0 = {
            address: p2wsh_v0Object.address,
            scriptHash: p2wsh_v0Object.hash.toString('hex'),
            scriptPubKeyHex: p2wsh_v0Object.output.toString('hex'),
        }

        //this.getTimeValuesFromStack(); commented out until nValue work on Time classes complete

    }

    private getTimeValuesFromStack():void {

        let CSVCount;
        let CLTVCount;

        // First, populate this.nValuesSuperset
        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i].includes("OP_CHECKSEQUENCEVERIFY")) {
                CSVCount += 1;
                this.nValuesSuperset.push(new RelativeTime(this.stack[i-1], "SCRIPT_ENCODING").requiredNValues);
            }
            if (this.stack[i].includes("OP_CHECKLOCKTIMEVERIFY")) {
                CLTVCount += 1;
                this.nValuesSuperset.push(new AbsoluteTime(this.stack[i-1], "SCRIPT_ENCODING").requiredNValues);
            }
        }

        //Second, analyse this.nValuesSuperset
    
    }

    private getOverallNValues():void {
        
    }
    
}