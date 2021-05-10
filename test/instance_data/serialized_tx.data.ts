export const test_data = {
    btcdeb_prev_input: `020000000001015036a4e1e299b37e0555d1490aa8cb6de379709349088159a5280e13892c74e90000000000feffffff028096980000000000225120f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0ce75a6d2901000000160014cfb604b3feadf3367e96c701abd4912d0c99877f0247304402206c4c1c9e2fa82d087e5c1a6256f2bcd7cab3b915bf2f6b782a80045f9dc7a9b2022034c720cbbab2e75cbd8a35bc99d148f408b16205592e80200bf2f491bb0fa88b012102077c102914911f57b8c1881e207ea09297024803e1c10ce3f20453c2c3f735c60d000000`,
    btcdeb_new_input: `020000000001 0162ba7ef7f4ed7e7e1f2fbca227459e1246b565f6c262fdc3f720415d7d1a46d40000000000ffffffff0128230000000000001600140d8c371e13b8c463a2d69d5b4746ab1bc59edff6 01 40 000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f 00000000`,
    btcdeb_prev_output: {
        version_LE: '02000000',
        segwit_marker_BE: '00',
        segwit_flag_BE: '01',
        no_of_inputs_BE: '01',
        inputs: [
          {
            previous_tx_hash_BE: '5036a4e1e299b37e0555d1490aa8cb6de379709349088159a5280e13892c74e9',
            previous_utxo_index_LE: '00000000',
            previous_utxo_script_sig_BE: '00',
            previous_utxo_sequence_LE: 'feffffff'
          }
        ],
        no_of_outputs_BE: '02',
        outputs: [
          {
            output_satoshis_LE: '8096980000000000',
            output_script_pubkey_size_prefix_BE: '22',
            output_script_pubkey_BE: '5120f128a8a8a636e19f00a80169550fedfc26b6f5dd04d935ec452894aad938ef0c'
          },
          {
            output_satoshis_LE: 'e75a6d2901000000',
            output_script_pubkey_size_prefix_BE: '16',
            output_script_pubkey_BE: '0014cfb604b3feadf3367e96c701abd4912d0c99877f'
          }
        ],
        witness: [
          '0247304402206c4c1c9e2fa82d087e5c1a6256f2bcd7cab3b915bf2f6b782a80045f9dc7a9b2022034c720cbbab2e75cbd8a35bc99d148f408b16205592e80200bf2f491bb0fa88b012102077c102914911f57b8c1881e207ea09297024803e1c10ce3f20453c2c3f735c6'
        ],
        locktime_LE: '0d000000'
    },
    btcdeb_new_output: {
        version_LE: '02000000',
        segwit_marker_BE: '00',
        segwit_flag_BE: '01',
        no_of_inputs_BE: '01',
        inputs: [
          {
            previous_tx_hash_BE: '62ba7ef7f4ed7e7e1f2fbca227459e1246b565f6c262fdc3f720415d7d1a46d4',
            previous_utxo_index_LE: '00000000',
            previous_utxo_script_sig_BE: '00',
            previous_utxo_sequence_LE: 'ffffffff'
          }
        ],
        no_of_outputs_BE: '01',
        outputs: [
          {
            output_satoshis_LE: '2823000000000000',
            output_script_pubkey_size_prefix_BE: '16',
            output_script_pubkey_BE: '00140d8c371e13b8c463a2d69d5b4746ab1bc59edff6'
          }
        ],
        witness: [
          '0140000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f000102030405060708090a0b0c0d0e0f'
        ],
        locktime_LE: '00000000'
    }
}

