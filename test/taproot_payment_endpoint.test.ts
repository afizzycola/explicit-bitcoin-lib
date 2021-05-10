import { TaprootPaymentEndpoint } from "../ts_src/taproot_payment_endpoint";
import {test_data} from "./instance_data/taproot.test.data";
const bitcoin = require('bitcoinjs-lib');
const REGTEST = bitcoin.networks.regtest;



test('1a. two scrip taproot end point script1 before 2', () => {
    expect(new TaprootPaymentEndpoint([test_data.script1, test_data.script2], test_data.internalPubKey, REGTEST)).toEqual(test_data.twoScriptResult1);
});
//scripts are flipped as while there position in the interalEndpoint array might differ, it should not be the case when making the tapbranch and root
test('1b. two scrip taproot end point script1 before 2', () => {
    expect(new TaprootPaymentEndpoint([test_data.script2, test_data.script1], test_data.internalPubKey, REGTEST)).toEqual(test_data.twoScriptResult2);
});