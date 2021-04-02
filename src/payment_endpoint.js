import { RelativeTime } from './relative_time';
import { AbsoluteTime } from "./absolute_time";
const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;
export class PaymentEndpoint {
    constructor(asmScript, network = TESTNET) {
        this.nValuesSuperset = []; //to change type in <>
        //this.network
        this.miniscript; //to do
        this.asm = asmScript.trim().replace(/\s+/g, ' ');
        this.buffer = bitcoin.script.fromASM(this.asm);
        this.hexEncoding = this.buffer.toString('hex');
        this.stack = this.asm.split(" ");
        const p2shObject = bitcoin.payments.p2sh({
            redeem: { output: this.buffer, network: network },
            network: network,
        });
        const p2wsh_v0Object = bitcoin.payments.p2wsh({
            script: this.buffer,
            redeem: { output: this.buffer, network: network },
            network: network,
        });
        const p2sh_p2wshObject = bitcoin.payments.p2sh({
            redeem: { output: p2wsh_v0Object.output, network: network },
            network: network,
        });
        this.p2sh = {
            address: p2shObject.address,
            scriptHash: p2shObject.hash.toString('hex'),
            scriptPubKeyHex: p2shObject.output.toString('hex'),
        };
        this.p2sh_p2wsh = {
            address: p2sh_p2wshObject.address,
            scriptHash: p2sh_p2wshObject.hash.toString('hex'),
            scriptPubKeyHex: p2sh_p2wshObject.output.toString('hex'),
        };
        this.p2wsh_v0 = {
            address: p2wsh_v0Object.address,
            scriptHash: p2wsh_v0Object.hash.toString('hex'),
            scriptPubKeyHex: p2wsh_v0Object.output.toString('hex'),
        };
        this.getTimeValuesFromStack();
    }
    getTimeValuesFromStack() {
        let CSVCount;
        let CLTVCount;
        for (let i = 0; i < this.stack.length; i++) {
            if (this.stack[i].includes("OP_CHECKSEQUENCEVERIFY")) {
                CSVCount += 1;
                this.nValuesSuperset.push(new RelativeTime(this.stack[i - 1], "SCRIPT_ENCODING").requiredNValues);
            }
            if (this.stack[i].includes("OP_CHECKLOCKTIMEVERIFY")) {
                CLTVCount += 1;
                this.nValuesSuperset.push(new AbsoluteTime(this.stack[i - 1], "SCRIPT_ENCODING").requiredNValues);
            }
        }
    }
}
