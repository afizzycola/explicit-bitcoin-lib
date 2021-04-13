const bip32 = require('bip32');
const bip39 = require('bip39');

interface PaymentEndpoint {
    
}

//source account, that shares the pubHarded key
export class Seed {
    network: string;
    mnemonic: string;
    //buffer: Buffer;
    privBase58: string;
    privWif: string;
    pubBase58: string;
    paymentEndpoints:privHardened: Array<string>;

    constructor(mnemonic, network=TESTNET) {
        this.network = network.bech32;
        this.mnemonic = mnemonic;

        const buffer = bip39.mnemonicToSeedSync(this.mnemonic);
        
        let node = bip32.fromSeed(buffer, network); //could make it a this.node

        this.privBase58 = node.toBase58();
        this.pubBase58 = node.neutered().toBase58();
        this.privHardened = node.deriveHardened(0).toBase58();
        this.pubHardened = [
            node.deriveHardened(0).neutered().toBase58(), //   [m/0']
            node.deriveHardened(1).neutered().toBase58(), //   [m/1']
        ];
        this.privWif = node.toWIF();
        this.addresses = [
            getAddress(node.deriveHardened(0).neutered().derive(0).derive(0)),
            getAddress(node.deriveHardened(0).neutered().derive(0).derive(1))
        ]
        
    }


}