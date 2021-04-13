export const simpleAnd = `[
    {
        "$type": "bpmn:StartEvent",
        "id": "StartEvent_1",
        "eventDefinitions": []
    },
    {
        "$type": "bpmn:ParallelGateway",
        "id": "Gateway_02rgzux"
    },
    {
        "$type": "bpmn:SequenceFlow",
        "id": "Flow_1aezxv4"
    },
    {
        "$type": "bpmn:ManualTask",
        "id": "Activity_10ttrdj",
        "name": "Alice"
    },
    {
        "$type": "bpmn:SequenceFlow",
        "id": "Flow_1srru2s"
    },
    {
        "$type": "bpmn:ManualTask",
        "id": "Activity_0nyqi0b",
        "name": "Bob"
    },
    {
        "$type": "bpmn:SequenceFlow",
        "id": "Flow_08qjvk7"
    },
    {
        "$type": "bpmn:EndEvent",
        "id": "Event_11mwpx5",
        "eventDefinitions": []
    },
    {
        "$type": "bpmn:SequenceFlow",
        "id": "Flow_1w1iauk"
    },
    {
        "$type": "bpmn:SequenceFlow",
        "id": "Flow_1ww6lb8"
    }
]`