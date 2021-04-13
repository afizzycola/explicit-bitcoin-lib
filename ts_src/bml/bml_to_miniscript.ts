import {PCSElement, PCS} from './partially_crafted_script';

const BmlTypeToMiniscript = {
    "bml:PublicKey": 'pk',
    "bml:PreImage": 'something',
    "bml:AndGateway": 'and',
    "bml:OrGateway": 'or',
    "bml:ThesholdGateway": 'thresh',
    "bml:RelativeTimeLock": 'older',
    "bml:AbsoluteTimeLock": 'after',
}

export function getMinisciptFragment (bmlType: string) {
    return BmlTypeToMiniscript[bmlType];
}

export function generateOneHopMinisciptFragments (bmlArray: PCS) {
    
    let resultantArray = [];

    for (let i = 0; i < bmlArray.elements.length; i++) {
        
        const { miniscriptFragment } = bmlArray[i];

        
        
        if(miniscriptFragment === "and" || miniscriptFragment === "or") {
            
            if(bmlArray[i].outgoing.length > 0) {
            
                let gatewayArray = [];

                bmlArray[i].outgoing.forEach( targetId  => {
                    const targetObject = bmlArray.find(x => x.id === targetId);
                    gatewayArray.push(targetObject);
                    
                })

                if (miniscriptFragment === "and") {
                    resultantArray.push(createAnd(gatewayArray));
                }

                if (miniscriptFragment === "or") {
                    resultantArray.push(createOr(gatewayArray));
                }

            }


        }

    }

    return resultantArray;
}


function getNextInSequence (elementsArray:Array<PCSElement>, fromElementId: string) {
    elementsArray.find(x => x.id === fromElementId);
}

function createAnd(gatewayArray) {
    return `and(${gatewayArray.join(",")})`;
}

function createOr(gatewayArray) {
    return `or(${gatewayArray.join(",")})`;
}