import { TaprootPaymentEndpoint } from "../ts_src/taproot_payment_endpoint";
const bitcoin = require('bitcoinjs-lib');
const REGTEST = bitcoin.networks.regtest;



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

const internalEndPoint1 = {
    nValuesSuperset: [],
    asm: '9000 OP_CHECKSEQUENCEVERIFY OP_DROP 9997a497d964fc1a62885b05a51166a65a90df00492c8d7cf61d6accf54803be OP_CHECKSIG',
    hexEncoding: '029000b275209997a497d964fc1a62885b05a51166a65a90df00492c8d7cf61d6accf54803beac',
    stack: [
      '9000',
      'OP_CHECKSEQUENCEVERIFY',
      'OP_DROP',
      '9997a497d964fc1a62885b05a51166a65a90df00492c8d7cf61d6accf54803be',
      'OP_CHECKSIG'
    ],
    tapLeaf: 'c81451874bd9ebd4b6fd4bba1f84cdfb533c532365d22a0a702205ff658b17c9',
    p2sh: {
      address: '2NDnGnSs4BQUjJxe5deovgupe3bCB4EUozw',
      scriptHash: 'e141be90f0fdc512c0aace93a4b2c0550e9c81b4',
      scriptPubKeyHex: 'a914e141be90f0fdc512c0aace93a4b2c0550e9c81b487'
    },
    p2sh_p2wsh: {
      address: '2N4kNFe45WYG8wtAvagR6GP2UEd3CF331Wk',
      scriptHash: '7e2c5878157a118c907d4ea2d902285f1e2088f1',
      scriptPubKeyHex: 'a9147e2c5878157a118c907d4ea2d902285f1e2088f187'
    },
    p2wsh_v0: {
      address: 'bcrt1qx4upnayuq7pytghuk8jg4djmx74zp0zum4x4jezplgl4e4qey8ws7rumxr',
      scriptHash: '357819f49c078245a2fcb1e48ab65b37aa20bc5cdd4d596441fa3f5cd41921dd',
      scriptPubKeyHex: '0020357819f49c078245a2fcb1e48ab65b37aa20bc5cdd4d596441fa3f5cd41921dd'
    }
}

const internalEndPoint2 = {
    nValuesSuperset: [],
    asm: 'OP_SHA256 6c60f404f8167a38fc70eaf8aa17ac351023bef86bcb9d1086a19afe95bd5333 OP_EQUALVERIFY 4edfcf9dfe6c0b5c83d1ab3f78d1b39a46ebac6798e08e19761f5ed89ec83c10 OP_CHECKSIG',
    hexEncoding: 'a8206c60f404f8167a38fc70eaf8aa17ac351023bef86bcb9d1086a19afe95bd533388204edfcf9dfe6c0b5c83d1ab3f78d1b39a46ebac6798e08e19761f5ed89ec83c10ac',
    stack: [
    'OP_SHA256',
    '6c60f404f8167a38fc70eaf8aa17ac351023bef86bcb9d1086a19afe95bd5333',
    'OP_EQUALVERIFY',
    '4edfcf9dfe6c0b5c83d1ab3f78d1b39a46ebac6798e08e19761f5ed89ec83c10',
    'OP_CHECKSIG'
    ],
    p2sh: {
        address: '2NDCwxxNC4SyjDWJZ87BVSknAmKhHXvbkDw',
        scriptHash: 'daf44efa14cec58048c0f9182c86d7271e5235a5',
        scriptPubKeyHex: 'a914daf44efa14cec58048c0f9182c86d7271e5235a587'
    },
    p2sh_p2wsh: {
        address: '2N8eh7jV9kJyivgTSRSJH28YQvi5iThiy6Y',
        scriptHash: 'a8fa197c907404d6464b92fd132876d188b60d2e',
        scriptPubKeyHex: 'a914a8fa197c907404d6464b92fd132876d188b60d2e87'
    },
    p2wsh_v0: {
        address: 'bcrt1q6rr2qrgkfslcwl255m405003q24msrtav9x3rzskeead8ks294wsjyjtnp',
        scriptHash: 'd0c6a00d164c3f877d54a6eafa3df102abb80d7d614d118a16ce7ad3da0a2d5d',
        scriptPubKeyHex: '0020d0c6a00d164c3f877d54a6eafa3df102abb80d7d614d118a16ce7ad3da0a2d5d'
    },
    tapLeaf: '632c8632b4f29c6291416e23135cf78ecb82e525788ea5ed6483e3c6ce943b42'
}

const twoScriptResult1 = {
    internalEndPoints: [
        internalEndPoint1,
        internalEndPoint2
    ],
    internalPubkey: '5bf08d58a430f8c222bffaf9127249c5cdff70a2d68b2b45637eb662b6b88eb5',
    tapBranch: '41646f8c1fe2a96ddad7f5471bc4fee7da98794ef8c45a4f4fc6a559d60c9f6b',
    tapRoot: '41646f8c1fe2a96ddad7f5471bc4fee7da98794ef8c45a4f4fc6a559d60c9f6b',
    tapTweak: '0b0e6981ce6cac74d055d0e4c25e5b4455a083b3217761327867f26460e0a776',
    tapTweakedPubkey: {
      untrimmed: '03f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c',
      trimmed: 'f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c',
      isEven: false
    },
    p2wsh_v1: {
      address: 'bcrt1p7y52329xxmse7q9gq9542rldlsntdawaqnvntmz99z224kfcauxqag4w9y',
      scriptHash: 'f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c',
      scriptPubKeyHex: '5120f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c'
    }
}

const twoScriptResult2 = {
    internalEndPoints: [
        internalEndPoint2,
        internalEndPoint1
    ],
    internalPubkey: '5bf08d58a430f8c222bffaf9127249c5cdff70a2d68b2b45637eb662b6b88eb5',
    tapBranch: '41646f8c1fe2a96ddad7f5471bc4fee7da98794ef8c45a4f4fc6a559d60c9f6b',
    tapRoot: '41646f8c1fe2a96ddad7f5471bc4fee7da98794ef8c45a4f4fc6a559d60c9f6b',
    tapTweak: '0b0e6981ce6cac74d055d0e4c25e5b4455a083b3217761327867f26460e0a776',
    tapTweakedPubkey: {
      untrimmed: '03f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c',
      trimmed: 'f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c',
      isEven: false
    },
    p2wsh_v1: {
      address: 'bcrt1p7y52329xxmse7q9gq9542rldlsntdawaqnvntmz99z224kfcauxqag4w9y',
      scriptHash: 'f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c',
      scriptPubKeyHex: '5120f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c'
    }
}


test('1a. two scrip taproot end point script1 before 2', () => {
    expect(new TaprootPaymentEndpoint([script1, script2], internalPubKey, REGTEST)).toEqual(twoScriptResult1);
});
//scripts are flipped as while there position in the interalEndpoint array might differ, it should not be the case when making the tapbranch and root
test('1b. two scrip taproot end point script1 before 2', () => {
    expect(new TaprootPaymentEndpoint([script2, script1], internalPubKey, REGTEST)).toEqual(twoScriptResult2);
});