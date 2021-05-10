export class SerializedTransaction {
    version_LE: string;
    segwit_marker_BE: string;
    segwit_flag_BE: string;
    no_of_inputs_BE: string;
    inputs: Array<any>;
    no_of_outputs_BE: string;
    outputs: Array<any>;
    witness: Array<any>;
    locktime_LE: string; // to do check that it is LE
    constructor(serialStr: string) {
        //to do -ensure there is no whitespace and is continous hex string
        serialStr = serialStr.trim().replace(/\s/g,'');
        this.version_LE = serialStr.substring(0, 8);
        this.segwit_marker_BE = serialStr.substring(8, 10);
        this.segwit_flag_BE = serialStr.substring(10, 12);
        this.no_of_inputs_BE = serialStr.substring(12, 14);
        this.inputs = [
            {
                previous_tx_hash_BE: serialStr.substring(14, 78),
                previous_utxo_index_LE: serialStr.substring(78, 86),
                previous_utxo_script_sig_BE: serialStr.substring(86, 88),
                previous_utxo_sequence_LE: serialStr.substring(88, 96), 
                
            }
        ]
        this.no_of_outputs_BE = serialStr.substring(96, 98);

        const numberOfOutputs = parseInt(serialStr.substring(96, 98));

        //we work out the compact size of the script_pubbkey
        //so we know how big and therefore how much to slice out of the string
        this.outputs = [];
        let outputStartIndex = 98;
        for (let i = 0; i < numberOfOutputs; i++) {
            const compact_size:string = serialStr.substring(outputStartIndex + 16, outputStartIndex + 16 + 2);
            const output = {
                output_satoshis_LE: serialStr.substring(outputStartIndex, outputStartIndex + 16),
                output_script_pubkey_size_prefix_BE: compact_size,
                output_script_pubkey_BE: serialStr.substring(outputStartIndex + 16 + 2, outputStartIndex + 16 + 2 + parseInt(compact_size, 16)*2),
            }
            this.outputs.push(output);
            outputStartIndex += + 16 + 2 + parseInt(compact_size, 16)*2;
        }
        this.witness = [
            serialStr.slice(outputStartIndex, serialStr.length - 8) //this bit looks a bit wrong, to do
        ]
        this.locktime_LE = serialStr.slice(serialStr.length - 8)

    }

    getOutpoint(inputIndex):string {
        const required_input = this.inputs[inputIndex];
        return required_input.previous_tx_hash_BE + required_input.previous_utxo_index_LE;
    }

    addWitness(witness:string) {
        
    }
    
}