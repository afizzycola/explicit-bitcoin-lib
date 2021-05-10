import { PaymentEndpoint } from './payment_endpoint';
const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;
class TaprootPaymentEndpoint extends PaymentEndpoint {
    constructor(asmScript, network = TESTNET) {
        super(asmScript, network);
        this.internalPubKey;
        this.tapBranch;
        this.tapTweak;
        this.createTapBranch();
        this.createTapTweak();
    }
    createTapBranch() {
        const tapLeafs = [];
        this.internalEndPoints.forEach((endPoint) => {
            tapLeafs.push(endPoint.tapLeaf);
        });
        const tapLeafsArgsOrdered = tapLeafs.sort();
        this.tapBranch = `btcdeb> tf tagged-hash TapBranch ${tapLeafs.join(' ')}`;
    }
    createTapTweak() {
        this.tapTweakedPubkey = `btcdeb> tf tagged-hash TapTweak ${this.internalPubKey} ${this.tapBranch}`;
    }
    createAddress() {
        const trimedPubKey = this.removeEvennessByte(this.tapTweakedPubkey);
        this.address = `btcdeb> tf bech32-encode ${trimedPubKey}`;
    }
    removeEvennessByte(string) {
        //take first two chars of string which are usually something like 03
        return string.substring(2, string.length);
    }
}
function orderAscending(array) {
}
