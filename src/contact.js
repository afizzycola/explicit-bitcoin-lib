class Contact {
    constructor(custodian, extendedPubKey, network = TESTNET) {
        this.fromId = "0001";
        this.fromName = "Alice";
        this.forUseByName = custodian;
        this.extendedPubKey = extendedPubKey;
        this.node = bip32.fromBase58(extendedPubKey, network);
        this.addresses = [
            getAddress(this.node.derive(0).derive(0)),
            getAddress(this.node.derive(0).derive(1)) // [m/X']/0/1
        ];
        //this.descriptorAddresses - would be useful to have descriptiors instead of addresses
    }
    getNextAddress() {
        let requiredAddressIndex = this.node.derive(0).derive(this.addresses.length + 1);
        let newAddress = getAddress(requiredAddressIndex);
        this.addresses.push(newAddress);
        return newAddress;
    }
}
function getAddress(node, network = TESTNET) {
    return bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;
}
