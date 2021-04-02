import { AbsoluteTime } from '../ts_src/absolute_time';

const march_31st_2021_1002 =  {
    timeUnit: 'seconds',
    humanDateTime: 'Wed, 31 Mar 2021 10:02:17 GMT',
    iso8601: new Date('2021-03-31T10:02:17.000Z'),
    unixMilliSeconds: 1617184937000,
    unixSeconds: 1617184937,
    scriptEncoding: 'a9486460',
    requiredNValues: {
      nSequence: { dec: 4294967294, hex: '0xfffffffe' },
      nLockTime: { dec: 1617184937, hex: '0x606448a9' }
    }
  }

const blockHeight_677142 = {
    timeUnit: 'blocks',
    blocks: 677142,
    scriptEncoding: '16550a',
    requiredNValues: {
      nSequence: { dec: 4294967294, hex: '0xfffffffe' },
      nLockTime: { dec: 677142, hex: '0x000a5516' }
    }
  }


test('1a. From isotimestamp representing 31st March 2021 10:02:17.000 UTC ', () => {
    expect(new AbsoluteTime(march_31st_2021_1002.iso8601, 'PERIOD_OF_TIME')).toEqual(march_31st_2021_1002);
});

// test('1b. From isotimestamp representing 31st March 2021 10:02 only UTC', () => {
//     expect(new AbsoluteTime('2021-03-31T10:02', 'PERIOD_OF_TIME')).toEqual(march_31st_2021_1002);
// });

test('2a. From unix milliseconds representing 31st March 2021 10:02:17.000 UTC', () => {
    expect(new AbsoluteTime(march_31st_2021_1002.unixMilliSeconds, 'PERIOD_OF_TIME')).toEqual(march_31st_2021_1002);
});

// test('2b. From unix seconds representing 31st March 2021 10:02:17.000 UTC', () => {
//     expect(new AbsoluteTime(march_31st_2021_1002.unixSeconds, 'PERIOD_OF_TIME')).toEqual(march_31st_2021_1002);
// });

test('3a. From nLockTime decimal number representing 31st March 2021 10:02:17.000 UTC', () => {
    expect(new AbsoluteTime(march_31st_2021_1002.requiredNValues.nLockTime.dec, 'N_LOCKTIME')).toEqual(march_31st_2021_1002);
});

test('3b. From nLockTime hex number representing 31st March 2021 10:02:17.000 UTC', () => {
    expect(new AbsoluteTime(march_31st_2021_1002.requiredNValues.nLockTime.dec.toString(16), 'N_LOCKTIME')).toEqual(march_31st_2021_1002);
});

test('3c. From nLockTime hex string representing 31st March 2021 10:02:17.000 UTC', () => {
    expect(new AbsoluteTime(march_31st_2021_1002.requiredNValues.nLockTime.hex, 'N_LOCKTIME')).toEqual(march_31st_2021_1002);
});


test('4. From script encoded hex representing 31st March 2021 10:02:17.000 UTC', () => {
    expect(new AbsoluteTime(march_31st_2021_1002.scriptEncoding, 'SCRIPT_ENCODING')).toEqual(march_31st_2021_1002);
});

test('5. From block integer representing block height 677142', () => {
    expect(new AbsoluteTime(blockHeight_677142.blocks, 'BLOCKS')).toEqual(blockHeight_677142);
});

test('6a. From nLockTime decimal number representing block height 677142', () => {
    expect(new AbsoluteTime(blockHeight_677142.requiredNValues.nLockTime.dec, 'N_LOCKTIME')).toEqual(blockHeight_677142);
});

test('6b. From nLockTime hex number representing block height 677142', () => {
    expect(new AbsoluteTime(blockHeight_677142.requiredNValues.nLockTime.dec.toString(16), 'N_LOCKTIME')).toEqual(blockHeight_677142);
});

test('6c. From nLockTime hex string representing block height 677142', () => {
    expect(new AbsoluteTime(blockHeight_677142.requiredNValues.nLockTime.hex, 'N_LOCKTIME')).toEqual(blockHeight_677142);
});

test('5. From script encoded hex representing block height 677142', () => {
    expect(new AbsoluteTime(blockHeight_677142.scriptEncoding, 'SCRIPT_ENCODING')).toEqual(blockHeight_677142);
});

