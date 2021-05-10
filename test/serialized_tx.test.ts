import {SerializedTransaction} from "../ts_src/serialized_tx"
import {test_data} from "./instance_data/serialized_tx.data";


test('1. segwit 1 input 2 outputs', () => {
    expect(new SerializedTransaction(test_data.btcdeb_prev_input)).toEqual(test_data.btcdeb_prev_output);
});

test('2. segwit 1 input 2 outputs', () => {
    expect(new SerializedTransaction(test_data.btcdeb_new_input)).toEqual(test_data.btcdeb_new_output);
});