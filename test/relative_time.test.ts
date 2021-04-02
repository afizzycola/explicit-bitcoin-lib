import {RelativeTime} from '../ts_src/relative_time';

test('1. Integer input (86528) representing 86528 seconds', () => {
    expect(new RelativeTime(86528, 'PERIOD_OF_TIME')).toEqual(
        {
            nSequence: 4194473,
            scriptEncoding: 'a90040',
            timeUnit: 'seconds',
            seconds: 86528
        }
    );
});

test('2. Integer input (169) representing 169 blocks', () => {
    expect(new RelativeTime(169, 'BLOCKS')).toEqual(
        {
            nSequence: 169,
            scriptEncoding: 'a900',
            timeUnit: 'blocks',
            blocks: 169
        }
    );
});

test('3. nSequence input (4194473) representing 86528 seconds', () => {
    expect(new RelativeTime(169, 'N_SEQUENCE')).toEqual(
        {
            nSequence: 169,
            scriptEncoding: 'a900',
            timeUnit: 'blocks',
            blocks: 169
        }

    );
});


test('4. nSequence input (169) representing 169 blocks', () => {
    expect(new RelativeTime(4194473, 'N_SEQUENCE')).toEqual(
        {
            nSequence: 4194473,
            scriptEncoding: 'a90040',
            timeUnit: 'seconds',
            seconds: 86528
        }
    );
});

test('5. scriptEncoded input (a900) representing 86528 seconds', () => {
    expect(new RelativeTime(86528, 'PERIOD_OF_TIME')).toEqual(
        {
            nSequence: 4194473,
            scriptEncoding: 'a90040',
            timeUnit: 'seconds',
            seconds: 86528
        }
    );
});

test('6. scriptEncoded input (a900) representing 169 blocks', () => {
    expect(new RelativeTime(169, 'BLOCKS')).toEqual(
        {
            nSequence: 169,
            scriptEncoding: 'a900',
            timeUnit: 'blocks',
            blocks: 169
        }
    );
});

// to do : see if all three of each pair (seconds and blocks) can be tested to equal one at other.