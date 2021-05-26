import {PaymentEndpoint, ScriptAddressDetail} from './payment_endpoint';
//import {SerializedTransaction} from "./serialized_tx";
//import {TaprootSighash} from "../taproot_sighash";
import {createTaggedHash} from "./_utility";
const segwit_addr = require('../tmp_modules/bech32m/segwit_addr');
const secp256k1 = require('secp256k1');
const bitcoin = require('bitcoinjs-lib');
const merkle = require('merkle-lib');
const TESTNET = bitcoin.networks.testnet;
const REGTEST = bitcoin.networks.regtest;

interface TweakedPubKey {
    untrimmed: string,
    trimmed: string,
    isEven: boolean
}

//this function modifies the utility function of createTaggedHash
//so as to work nicely as an input into the merkle-lib functions
function tapMerkle(joinedData) {
    return Buffer.from(createTaggedHash('TapBranch', joinedData), 'hex');
}

export class TaprootPaymentEndpoint {

    internalEndPoints: Array<PaymentEndpoint>;
    tapRoot: string;
    tapTree: Array<string>// temp, this could be made more explicit in regards to what is root, 
    //what are the branched and what are the leaves(nodes)
    tapTweak: string;
    internalPubkey: string;
    tapTweakedPubkey: TweakedPubKey;
    p2wsh_v1: ScriptAddressDetail;

    constructor(asmScript: string | Array<string>, internalPubkey?: string,  network=TESTNET) {
        
        //if provided just a string, we put that in an Array<string> for code reuse
        if (typeof asmScript === "string") {
            asmScript = [asmScript];
        }

        this.internalEndPoints = [];
        asmScript.forEach(scriptElement => {
            this.internalEndPoints.push(new PaymentEndpoint(scriptElement , network))
        });

        this.internalPubkey = internalPubkey;
        this.tapTree;
        this.tapTweak;
        this.tapRoot;

        //this.createTapBranch();
        this.createTapTree();
        this.createTapTweak();
        this.createTweakedPubKey();
        this.createAddress();

    }

    createTapTree() {
        const tapLeafs = [];
        this.internalEndPoints.forEach( (endPoint) => {
            tapLeafs.push(Buffer.from(endPoint.tapLeaf, 'hex'));
        })
        tapLeafs.sort();
        const tapTree = merkle(tapLeafs, tapMerkle);
        this.tapRoot = tapTree[tapTree.length - 1].toString('hex');
        //because we want to persist the tree as Array<string>
        this.tapTree = tapTree.map(element => element.toString('hex'));
    }

    createTapTweak() {
        this.tapTweak = createTaggedHash('TapTweak', this.internalPubkey + this.tapRoot) 
    }

    
    // because the node-secp256k1 doesnt support 32 byte pubkeys, we fake a 33 byte one by adding "02". This is fine as this first byte
    // is only used to state if the y coord in this compressed pubkey is even or odd. 02 being even
    createTweakedPubKey() {
        const prefix = "02"; // need to test if using 02 is ok all the time
        const prefixedPubKey = Buffer.from(prefix + this.internalPubkey, 'hex');
        const prefixedPubKeyUint = new Uint8Array(prefixedPubKey);
        const tweakUint = new Uint8Array(Buffer.from(this.tapTweak, 'hex'));
        const tweakedPubKeyUint = secp256k1.publicKeyTweakAdd(prefixedPubKeyUint, tweakUint, true); // true ensuring its compressed aka no y coordinate

        const untrimmedTweakedPubKey =  Buffer.from(tweakedPubKeyUint).toString('hex');
        const TrimmedTweakedPubKey =  untrimmedTweakedPubKey.substring(2);
        const tweakedPubKeyEvenness = this.isEvenKey(untrimmedTweakedPubKey);

        this.tapTweakedPubkey = {
            untrimmed: untrimmedTweakedPubKey,
            trimmed: TrimmedTweakedPubKey,
            isEven: tweakedPubKeyEvenness,
        }
    }

    isEvenKey(key): boolean {
        const indicator = key.substring(1, 2);
        if(indicator == 2) {
            return true;
        } else {
            return false;
        }
    }

    createAddress() {
        const segwit1Addy = segwit_addr.encode('bcrt', 1, Buffer.from(this.tapTweakedPubkey.trimmed, 'hex')); //to do, remove hardcoded prefix
        const compactSizePrefix = (this.tapTweakedPubkey.trimmed.length / 2).toString(16);
        this.p2wsh_v1 = {
            address: segwit1Addy,
            scriptHash: this.tapTweakedPubkey.trimmed,
            scriptPubKeyHex: `51${compactSizePrefix}${this.tapTweakedPubkey.trimmed}` //51 is the hex for OP_1
        }
    }

    removeEvennessByte (string: string) {
        //take first two chars of string which are usually something like 03
        return string.substring(2, string.length);
    }

    suggestIntenalPubKey() {
        //to do
    }

    suggestTapLeaves() {
        //to do
    }

    getTapTweakedSeckey(seckey) {
        const tweakedSeckeyBuffer = secp256k1.privateKeyTweakAdd(Buffer.from(seckey, 'hex'), Buffer.from(this.tapTweak, 'hex'), true);
        return tweakedSeckeyBuffer.toString('hex');
    }
    
}

const internalSecKey = "3bed2cb3a3acf7b6a8ef408420cc682d5520e26976d354254f528c965612054f";
const internalPubKey = "5bf08d58a430f8c222bffaf9127249c5cdff70a2d68b2b45637eb662b6b88eb5";
const script1 = `
    9000
    OP_CHECKSEQUENCEVERIFY
    OP_DROP
    9997a497d964fc1a62885b05a51166a65a90df00492c8d7cf61d6accf54803be
    OP_CHECKSIG
`

const script2 = `
    OP_SHA256 6c60f404f8167a38fc70eaf8aa17ac351023bef86bcb9d1086a19afe95bd5333 
    OP_EQUALVERIFY 
    4edfcf9dfe6c0b5c83d1ab3f78d1b39a46ebac6798e08e19761f5ed89ec83c10 
    OP_CHECKSIG
`
const dogeTest = new TaprootPaymentEndpoint([script1, script2], internalPubKey, REGTEST);
console.log(dogeTest);

// const txCommitId = "8db4c3838db0dfaff39e5d751f7f40f6c4aadaa9d7bcaab52fec399ce1906bb4";
// const txCommitRaw = "020000000001011cfad14618f050786e26e97f3cab74630c10d2ab6c72f5a692b3ce5b0df3489d0000000000feffffff02a2b41c00000000001600146e3ae234c613b84ec670c475f03c86a73911a3028096980000000000225120f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c02473044022070e156425728caa647efe910594c21b4f414f2f4a0ae8e6cb8a9780b589312580220264d13a6bd68ec39d93aa9202fbf55d305481907f0a592b9eea94011fd91c43c012103d37005d5ec7540bcfa0986fca3ea586b3190671d68eba19122e388792948f2bd00000000"
// const claimAddress = "bcrt1qysrj2avcxasl0v07089lduvcqhxych4d4hu600";

// const txCommitSerial = new SerialTransaction(txCommitRaw);

// console.log(txCommitSerial);

// const txSpendRaw = "02000000000101b46b90e19c39ec2fb5aabcd7a9daaac4f6407f1f755d9ef3afdfb08d83c3b48d0100000000ffffffff01706f98000000000016001424072575983761f7b1fe79cbf6f19805cc4c5ead0140ef89340063a6d0dcb42bed24bb5070bc4dc36e64fad68bd6035ba38da76cb9cde4910d893d74259647e4c066d1892a899ffdbcdf634ebe527e01c35cd1d88b0600000000"
// const txSpendRawSerial = new SerialTransaction(txSpendRaw);
// console.log(txSpendRawSerial);

// const tweakedSeckey = dogeTest.getTapTweakedSeckey(internalSecKey);
// console.log("tweaked sec key:", tweakedSeckey)

// const spendHash= new TaprootSighash(txSpendRaw, txCommitRaw, "00");

// console.log(spendHash);
// console.log(spendHash.taproot_sighash);

// spendHash.sign(tweakedSeckey);


