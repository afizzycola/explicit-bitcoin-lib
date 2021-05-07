import { AbsoluteTime } from "../ts_src/absolute_time";
import { RelativeTime } from "../ts_src/relative_time";
import { PaymentEndpoint } from "../ts_src/payment_endpoint";
import {createTaggedHash} from "../ts_src/_utility";
const bitcoin = require('bitcoinjs-lib');
const TESTNET = bitcoin.networks.testnet;

const privKeyString = 'cSZ3Hy9MVFJqBTEaJggce4iWQCVreaLxJYLs1CUfToBZDyeBSXfo';
const privKeyString2 = 'cNKAjuxTJQ3K6ZAWkzn3cHNA6jCycSdvparGxQ8QewsZEwGTBvg7';
const privKeyString3 = 'cTF6whX245WYGrafHBw6Sc4vYZ9eF6byLQQm9kcFEQg24AgJxF88';

const keyPair = bitcoin.ECPair.fromWIF(privKeyString, TESTNET);
const keyPair2 = bitcoin.ECPair.fromWIF(privKeyString2, TESTNET );
const keyPair3 = bitcoin.ECPair.fromWIF(privKeyString3, TESTNET );

function createTapLeafHash(scriptHex: string, leafVersion:string = 'c0'): string { 
  //leaf version might be int in future and mapped to hex
  const buffer = Buffer.from(scriptHex, 'hex');
  const compactSizePrefix = buffer.length.toString(16);
  const message = leafVersion + compactSizePrefix + scriptHex;
  return createTaggedHash('TapLeaf', message)
}

/// Test 1

const simpleANDInput = `
    ${keyPair2.publicKey.toString('hex')}
    OP_CHECKSIGVERIFY
    ${keyPair.publicKey.toString('hex')}
    OP_CHECKSIG
`

const simpleANDOutput = {
    nValuesSuperset: [],
    asm: '033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b OP_CHECKSIGVERIFY 03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 OP_CHECKSIG',
    hexEncoding: '21033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580bad2103b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032ac',
    stack: [
      '033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b',
      'OP_CHECKSIGVERIFY',
      '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032',
      'OP_CHECKSIG'
    ],
    p2sh: {
      address: '2N7MRJW4h6R2RuZTEtHvCmPk3FwwaYTuwFt',
      scriptHash: '9abdb38726e6dccd2afca2d143f13438923b6fda',
      scriptPubKeyHex: 'a9149abdb38726e6dccd2afca2d143f13438923b6fda87'
    },
    p2sh_p2wsh: {
      address: '2N5xpZVwoqzgMy2GHv46H5prRHKUvVsvAvb',
      scriptHash: '8b7f6c755661e489a4b51cef363f0903b27cd79f',
      scriptPubKeyHex: 'a9148b7f6c755661e489a4b51cef363f0903b27cd79f87'
    },
    p2wsh_v0: {
      address: 'tb1q280rxr76fjtp0kuhslryvfajax5fycwcj7dcnemm8hdkawukr84qhtn0s2',
      scriptHash: '51de330fda4c9617db9787c64627b2e9a89261d8979b89e77b3ddb6ebb9619ea',
      scriptPubKeyHex: '002051de330fda4c9617db9787c64627b2e9a89261d8979b89e77b3ddb6ebb9619ea'
    },
    tapLeaf: "8567eb7d28b94c0d0f0ca6dcd37d324f543d3758aadc9fe8d56198ee3b03df8a"
}

test('1. AND(<bob>, <alice>)', () => {
    expect(new PaymentEndpoint(simpleANDInput, TESTNET)).toEqual(simpleANDOutput);
});


/// Test 2

const simpleORInput = `
    ${keyPair2.publicKey.toString('hex')}
    OP_CHECKSIG
    OP_SWAP
    ${keyPair.publicKey.toString('hex')}
    OP_CHECKSIG
    OP_BOOLOR
`
const simpleOrOutput = {
    nValuesSuperset: [],
    asm: '033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b OP_CHECKSIG OP_SWAP 03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 OP_CHECKSIG OP_BOOLOR',
    hexEncoding: '21033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580bac7c2103b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032ac9b',
    stack: [
      '033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b',
      'OP_CHECKSIG',
      'OP_SWAP',
      '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032',
      'OP_CHECKSIG',
      'OP_BOOLOR'
    ],
    p2sh: {
      address: '2N8Xtd8gEbNLpNaBhgVDEqKHuPSGR1CG5PR',
      scriptHash: 'a7b0cb156dca6bc8d8920ad0deec88bdcbb5e062',
      scriptPubKeyHex: 'a914a7b0cb156dca6bc8d8920ad0deec88bdcbb5e06287'
    },
    p2sh_p2wsh: {
      address: '2N23CHFTJcLAfy1ZvKhxHkNkCrrTtuKMVNp',
      scriptHash: '6072b715f1ea50267a1514869ca9a47061ee4f02',
      scriptPubKeyHex: 'a9146072b715f1ea50267a1514869ca9a47061ee4f0287'
    },
    p2wsh_v0: {
      address: 'tb1qkqnsqmzruvmvajkulpmqur77urgvwxfjalxrxm54rnmn59jdrq6srl0sre',
      scriptHash: 'b027006c43e336cecadcf8760e0fdee0d0c71932efcc336e951cf73a164d1835',
      scriptPubKeyHex: '0020b027006c43e336cecadcf8760e0fdee0d0c71932efcc336e951cf73a164d1835'
    },
    tapLeaf: "92996256c5b29d6f1ef174032ca274c97e572bc1c6c643f735b0e02067fb8f8a"
}


test('2. OR(<bob>, <alice>)', () => {
    expect(new PaymentEndpoint(simpleORInput, TESTNET)).toEqual(simpleOrOutput);
});

/// Test 3

const simpleRelativeBlockHeightInput = `
  03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 
  OP_CHECKSIGVERIFY 
  a900 
  OP_CHECKSEQUENCEVERIFY
`
const simpleRelativeBlockHeightOutput = {
  nValuesSuperset: [],
  asm: '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 OP_CHECKSIGVERIFY a900 OP_CHECKSEQUENCEVERIFY',
  hexEncoding: '2103b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032ad02a900b2',
  stack: [
    '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032',
    'OP_CHECKSIGVERIFY',
    'a900',
    'OP_CHECKSEQUENCEVERIFY'
  ],
  p2sh: {
    address: '2N3ZGuShvcLojQPoJsWgWn1367CtPBhAyki',
    scriptHash: '711b2e051fa5195220dba1f3a965356a558f8b32',
    scriptPubKeyHex: 'a914711b2e051fa5195220dba1f3a965356a558f8b3287'
  },
  p2sh_p2wsh: {
    address: '2MxzKx76xPUeWRBMK1TyMGvgJAHXqSjAz8R',
    scriptHash: '3eff7e130cf5c2f8c1fa91b33f06628957c49340',
    scriptPubKeyHex: 'a9143eff7e130cf5c2f8c1fa91b33f06628957c4934087'
  },
  p2wsh_v0: {
    address: 'tb1qz66t44knjjqgh9uv0p5axw6dd5rvykz96nd0s2el5p30ngw7x5ds7uh4dl',
    scriptHash: '16b4bad6d394808b978c7869d33b4d6d06c25845d4daf82b3fa062f9a1de351b',
    scriptPubKeyHex: '002016b4bad6d394808b978c7869d33b4d6d06c25845d4daf82b3fa062f9a1de351b'
  },
  tapLeaf: "1c2578e2adf6fa101aecfd72c03bd615ffd30a8c88a4889e25f043abd30f0839"
}

test('3. AND(<alice>, OLDER(<169 blocks> ) )', () => {
  expect(new PaymentEndpoint(simpleRelativeBlockHeightInput, TESTNET)).toEqual(simpleRelativeBlockHeightOutput);
});

// Test 4 
const simpleAbsoluteTimeLockInput = `
  03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032
  OP_CHECKSIGVERIFY
  a0245360
  OP_CHECKLOCKTIMEVERIFY
`

const simpleAbsoluteTimeLockOutput = {
  nValuesSuperset: [],
  asm: '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 OP_CHECKSIGVERIFY a0245360 OP_CHECKLOCKTIMEVERIFY',
  hexEncoding: '2103b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032ad04a0245360b1',
  stack: [
    '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032',
    'OP_CHECKSIGVERIFY',
    'a0245360',
    'OP_CHECKLOCKTIMEVERIFY'
  ],
  p2sh: {
    address: '2N1NyUJYJwxHSxkVD9pDusm1c2UxSpuZQtC',
    scriptHash: '593837428b1f44b5c71b4e7b86640ceefbb07905',
    scriptPubKeyHex: 'a914593837428b1f44b5c71b4e7b86640ceefbb0790587'
  },
  p2sh_p2wsh: {
    address: '2N5gNecM2Yz1vywMrLvF89Tzg8pifafp4AJ',
    scriptHash: '8863235bd3374fcba4dd1ccc331dd481b4578460',
    scriptPubKeyHex: 'a9148863235bd3374fcba4dd1ccc331dd481b457846087'
  },
  p2wsh_v0: {
    address: 'tb1qqvh2ecd6zp9y3v58msndlste64mku2zy2mvpxyhr4e2v0k64kyzqh5ghpj',
    scriptHash: '032eace1ba104a48b287dc26dfc179d5776e284456d81312e3ae54c7db55b104',
    scriptPubKeyHex: '0020032eace1ba104a48b287dc26dfc179d5776e284456d81312e3ae54c7db55b104'
  },
  tapLeaf: "bd6b248827c972be0cceb00a417f84c45de57882b7ac39b12d7401bf13a011a2"
}

test('4. AND(<alice>, AFTER(<2020-03-18T10:00>) )', () => {
  expect(new PaymentEndpoint(simpleAbsoluteTimeLockInput, TESTNET)).toEqual(simpleAbsoluteTimeLockOutput);
});

/// Test 5


const AndOrRelBlockheightInput = `
  03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 
  OP_CHECKSIGVERIFY 
  033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b 
  OP_CHECKSIG 
  OP_IFDUP 
  OP_NOTIF 
  a900 
  OP_CHECKSEQUENCEVERIFY 
  OP_ENDIF
`

const AndOrRelBlockheightOutput =  {
  nValuesSuperset: [],
  asm: '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032 OP_CHECKSIGVERIFY 033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b OP_CHECKSIG OP_IFDUP OP_NOTIF a900 OP_CHECKSEQUENCEVERIFY OP_ENDIF',
  hexEncoding: '2103b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032ad21033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580bac736402a900b268',
  stack: [
    '03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032',
    'OP_CHECKSIGVERIFY',
    '033ca691be4282be4edd9856330f8046c296f7339649f64c4d2c3b115d5fd5580b',
    'OP_CHECKSIG',
    'OP_IFDUP',
    'OP_NOTIF',
    'a900',
    'OP_CHECKSEQUENCEVERIFY',
    'OP_ENDIF'
  ],
  p2sh: {
    address: '2NDE3MFJ8He96AkcsEt1SDCeT2yjPmkdo1x',
    scriptHash: 'db2938162decb48c0182980a1dac9f619da98ef6',
    scriptPubKeyHex: 'a914db2938162decb48c0182980a1dac9f619da98ef687'
  },
  p2sh_p2wsh: {
    address: '2N6NU5VnjzwM84R6cqyWjjyBNYLFxxxeQVM',
    scriptHash: '8ff84efe08873d54e87d43f4e375165106bc8be4',
    scriptPubKeyHex: 'a9148ff84efe08873d54e87d43f4e375165106bc8be487'
  },
  p2wsh_v0: {
    address: 'tb1qc6gpm568xglhd4qg80g79d7ram68tt0z9xzhkrq5rc26570qz8vsn3wjjv',
    scriptHash: 'c6901dd347323f76d4083bd1e2b7c3eef475ade229857b0c141e15aa79e011d9',
    scriptPubKeyHex: '0020c6901dd347323f76d4083bd1e2b7c3eef475ade229857b0c141e15aa79e011d9'
  },
  tapLeaf: "f39763586bfa2fcf836425d4297a96bd08c3759a30a87bf3403d213ef1fedb93"  
}

test('5.  and(pk(<Alice>),or(pk(<Bob>),older(<169 blocks>)))', () => {
  expect(new PaymentEndpoint(AndOrRelBlockheightInput, TESTNET)).toEqual(AndOrRelBlockheightOutput);
});