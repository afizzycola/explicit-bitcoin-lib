const { PCSShape, PCSEdge, PCS } = require('../partially_crafted_script');
//const {testObject} = require('../../../test/bml/bpmnio_to_bml_mapper.test');
const bpmnToBmlTypeMap = {
    "bpmn:ManualTask": 'bml:PublicKey',
    "bpmn:ScriptTask": 'bml:PreImage',
    "bpmn:StartEvent": 'bml:Start',
    "bpmn:EndEvent": 'bml:End',
    "bpmn:SequenceFlow": 'bml:SequenceFlow',
    "bpmn:ParallelGateway": 'bml:AndGateway',
    "bpmn:ExclusiveGateway": 'bml:OrGateway',
    "bpmn:ComplexGateway": 'bml:ThesholdGateway',
    "bpmn:IntermediateCatchEvent": 'bml:TimeLock',
};
function bpmnioToBmlMap(flowElementsArray = []) {
    let pcsArray = [];
    flowElementsArray.forEach(flowElement => {
        var _a, _b, _c, _d;
        let pcsElement;
        if (((_a = flowElement.di) === null || _a === void 0 ? void 0 : _a.bounds) !== undefined) {
            const { x, y, width, height } = flowElement.di.bounds;
            pcsElement = new PCSShape(flowElement.id);
            pcsElement.setShapeDefinitions(x, y, height, width);
        }
        else if (((_b = flowElement.di) === null || _b === void 0 ? void 0 : _b.waypoint) !== undefined) {
            pcsElement = new PCSEdge(flowElement.id, flowElement.sourceRef.id, flowElement.targetRef.id);
            pcsElement.setEdgeDefinitions(flowElement.di.waypoint);
        }
        else {
            pcsElement = new PCSShape(flowElement.id);
        }
        if (flowElement.name !== undefined) {
            pcsElement.setLabel(flowElement.name);
        }
        if (flowElement.attrs !== undefined || flowElement.$attrs) {
            const elementAttrs = flowElement.attrs || flowElement.$attrs;
            pcsElement.setDetail(elementAttrs);
        }
        if (flowElement.incoming !== undefined || ((_c = flowElement.incoming) === null || _c === void 0 ? void 0 : _c.length) > 0) {
            flowElement.incoming.forEach(incomingElement => {
                pcsElement.addIncoming(incomingElement.id);
            });
        }
        if (flowElement.outgoing !== undefined || ((_d = flowElement.outgoing) === null || _d === void 0 ? void 0 : _d.length) > 0) {
            flowElement.outgoing.forEach(outgoingElement => {
                pcsElement.addOutgoing(outgoingElement.id);
            });
        }
        const elementType = flowElement.type || flowElement.$type;
        const bmlType = bpmnToBmlTypeMap[elementType];
        pcsElement.setType(bmlType);
        //pcsElement.setMiniscriptFragment();
        pcsArray.push(pcsElement);
    });
    return new PCS(pcsArray);
    //return JSON.stringify(pcsArray);
}
//console.log(bpmnioToBmlMap(testObject));
module.exports = { bpmnioToBmlMap };
