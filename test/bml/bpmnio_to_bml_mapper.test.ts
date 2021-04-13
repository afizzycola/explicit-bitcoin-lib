const {bpmnioToBmlMap} = require("../../src/bml/bpmnio_interface/bpmnio_to_bml_mapper");
const simpleAnd = require("./simple_and");
//const parsedSimpleAnd = JSON.parse(simpleAnd);

const testJSONArray = `[
    {
        "type": "bpmn:StartEvent",
        "id": "StartEvent_1",
        "eventDefinitions": [],
        "incoming": [],
        "outgoing":   [
            {
             "id" : "Flow_0glt7dw"
            }
        ]
    },
    {
        "type": "bpmn:ManualTask",
        "id": "Activity_17550a3",
        "attrs": {
            "key": "03b9570eda05ea4f5a9bad930e0a826ba0eb1df680145f6a39550f7d281c7a0032"
        },
        "di": {
            "type": "bpmndi:BPMNShape",
            "bounds": {
                "type": "dc:Bounds",
                "x": 500,
                "y": 218,
                "width": 100,
                "height": 80
            },
            "id": "Activity_17550a3_di"
        },
        "name": "Alice",
        "incoming":  [
                {
                 "id" : "Flow_0glt7dw"
                }
            ],
        "outgoing":  [
            {
                "id" : "Flow_15wthl3"
            }
        ]
    },
    {
        "type": "bpmn:SequenceFlow",
        "id": "Flow_0glt7dw",
        "di": {
            "type": "bpmndi:BPMNEdge",
            "id": "Flow_0glt7dw_di",
            "waypoint": [
                {
                    "type": "dc:Point",
                    "x": 448,
                    "y": 258
                },
                {
                    "type": "dc:Point",
                    "x": 500,
                    "y": 258
                }
            ]
        },
        "sourceRef": {
            "type": "bpmn:StartEvent",
            "id": "StartEvent_1",
            "eventDefinitions": []
        },
        "targetRef": {
            "type": "bpmn:ManualTask",
            "id": "Activity_17550a3",
            "di": {
                "type": "bpmndi:BPMNShape",
                "bounds": {
                    "type": "dc:Bounds",
                    "x": 500,
                    "y": 218,
                    "width": 100,
                    "height": 80
                },
                "id": "Activity_17550a3_di"
            },
            "name": "Alice"
        }
    },
    {
        "type": "bpmn:EndEvent",
        "id": "Event_19upign",
        "di": {
            "type": "bpmndi:BPMNShape",
            "bounds": {
                "type": "dc:Bounds",
                "x": 652,
                "y": 240,
                "width": 36,
                "height": 36
            },
            "id": "Event_19upign_di"
        },
        "eventDefinitions": [],
        "incoming":   [
            {
             "id" : "Flow_15wthl3"
            }
        ],
        "outgoing": []
    },
    {
        "type": "bpmn:SequenceFlow",
        "id": "Flow_15wthl3",
        "di": {
            "type": "bpmndi:BPMNEdge",
            "id": "Flow_15wthl3_di",
            "waypoint": [
                {
                    "type": "dc:Point",
                    "x": 600,
                    "y": 258
                },
                {
                    "type": "dc:Point",
                    "x": 652,
                    "y": 258
                }
            ]
        },
        "sourceRef": {
            "type": "bpmn:ManualTask",
            "id": "Activity_17550a3",
            "di": {
                "type": "bpmndi:BPMNShape",
                "bounds": {
                    "type": "dc:Bounds",
                    "x": 500,
                    "y": 218,
                    "width": 100,
                    "height": 80
                },
                "id": "Activity_17550a3_di"
            },
            "name": "Alice"
        },
        "targetRef": {
            "type": "bpmn:EndEvent",
            "id": "Event_19upign",
            "di": {
                "type": "bpmndi:BPMNShape",
                "bounds": {
                    "type": "dc:Bounds",
                    "x": 652,
                    "y": 240,
                    "width": 36,
                    "height": 36
                },
                "id": "Event_19upign_di"
            },
            "eventDefinitions": []
        }
    }
]`;

export const testObject = JSON.parse(testJSONArray);

//console.log(testObject);
const pcsObject = simpleAnd;//bpmnioToBmlMap(testObject);
console.log(pcsObject);
console.log(pcsObject.getStartShape());
//console.log(pcsObject.getNextShapeinSequence("Activity_17550a3"));