const {getMinisciptFragment} = require('./bml_to_miniscript');

export enum BmlTypes {
    PublicKey = "bml:PublicKey",
    Start = "bml:Start",
    End = "bml:End",
    PreImage = "bml:PreImage",
    AndGateway = "bml:AndGateway",
    OrGateway = "bml:OrGateway",
    ThresholdGateway = "bml:ThesholdGateway",
    RelativeGateway = "bml:RelativeTimeLock",
    AbsoluteGateway = "bml:AbsoluteTimeLock",
}


export class PCS {
    elements: Array< PCSShape | PCSEdge >;
    paths: Array<Set<string>> = [new Set()];
    stack: Array<any> = [];
    copyOfstack: Array<any>;
    orphanedPaths: any;
    counter: number = 0;

    constructor(elementsArray: Array< PCSShape | PCSEdge > ) {
        this.elements = elementsArray;
        //this.generateStack(this.getStartShape());
        //this.generatePaths3();
    }

    getElement(id:string): PCSShape | PCSEdge {
        return this.elements.find(x => x.id === id);
    }

    getElementType(id:string): BmlTypes {
        return this.getElement(id).type;
        
    }

    getStartShape(): PCSElement {
        return this.elements.find(x => x.type === BmlTypes.Start);
    }

    //experimental
    getStartShapes(): Array<PCSElement> {
        return this.elements.filter(x => x.type === BmlTypes.Start);
    }

    getAndShapes(): Array<PCSElement>{
        return this.elements.filter(x => x.type === BmlTypes.AndGateway);
    }

    getOrShapes(): Array<PCSElement>{
        return this.elements.filter(x => x.type === BmlTypes.OrGateway);
    }

    getEndShape(): PCSElement {
        return this.elements.find(x => x.type === BmlTypes.End);
    }
    //experimental
    getEndShapes(): Array<PCSElement> {
        return this.elements.filter(x => x.type === BmlTypes.End);
    }

    checkIfAndsAreAnOr(ands, or) {
        let andIds;
        ands.forEach(and => {
            andIds.push(and.id);
        });
        or.outgoing.forEach(outgoingElement => {
            andIds.forEach(andId => {
                if(andId == outgoingElement) {
                    const index = this.elements.findIndex(element => element.id === andId);
                    this.elements.splice
                }
            });
        });
    }

    flattenAnds() {
        let ands = this.getAndShapes();
        
        ands.forEach(and => {
            
            and.outgoing.forEach( outgoingId=> {
                if(this.getElementType(outgoingId) !== BmlTypes.AndGateway || this.getElementType(outgoingId) !== BmlTypes.OrGateway) {
                    
                }
            })
        });


    }

    generatePaths() {
        let ands = this.getAndShapes();
        let ors = this.getOrShapes();
    }

    getNextShapesinSequence(sourceShapeId: string): Array<PCSShape> {
        // console.log(sourceShapeId);
        // console.log(this.paths);
        const sourceShape = this.getElement(sourceShapeId);
        let responseArray = [];
        if(sourceShape.type === BmlTypes.End) {
            return responseArray;
        }
        sourceShape.outgoing.forEach( outgoingId => {
            const {target} = this.getElement(outgoingId);
            responseArray.push(this.getElement(target));
        })
        return responseArray;
    }

    getPreviousShapesinSequence(sourceShapeId: string): Array<PCSShape> {
        // console.log(sourceShapeId);
        // console.log(this.paths);
        const sourceShape = this.getElement(sourceShapeId);
        this.counter += 1;
        console.log(this.counter);
        let responseArray = [];
        if(sourceShape.type === BmlTypes.Start) {
            return responseArray;
        }
        sourceShape.incoming.forEach( incomingId => {
            const {source} = this.getElement(incomingId);
            responseArray.push(this.getElement(source));
        })
        return responseArray;
    }

    // generatePaths():void {
    //     let responseArray = [];
    //     const start = this.getStartShape();
    //     responseArray.push(this.createPathFromElement(start.id));
    //     this.paths = responseArray;
    // }

    // createPathFromElement (startingElementId) {
    //     const outgoingFromStart: Array<PCSShape> = this.getNextShapesinSequence(startingElementId);
    //     let pathArray = [];
    //     outgoingFromStart.forEach (outgoingShape => {
    //         let path;
    //         if(outgoingShape.type === BmlTypes.AndGateway) {
    //             path = this.createAnd(outgoingShape);
    //         }
    //         if(outgoingShape.type === BmlTypes.OrGateway) {
    //             path = this.createPathFromElement(outgoingShape.id);
    //         }
    //         if(outgoingShape.type === BmlTypes.PublicKey) {
    //             path = this.createPk(outgoingShape);
    //         }
    //         pathArray.push(path);
    //     })
    //     return pathArray;
    // }

    

    generatePaths2():void {
        const start = this.getStartShape();
        this.paths = [];
        this.createPathFromElement4(start);
    }

    generatePaths3():void {
        const end = this.getEndShape();
        this.paths = [];
        for (let i = 0; i< end.incoming.length; i++) {
            this.paths.push(new Set());
            let edge = this.getElement(end.incoming[i]);
            console.log("Im an edge", edge);
            let previousShape = this.getElement(edge.source);
            console.log(edge.source);
            this.createPathFromElement3(previousShape, i);
        }
    }


    addNewPath():void {
        if(this.paths.length == 0) {
            this.paths = [[]];
            return
        }
        // if(this.paths.length > 0) {
        //     this.paths = this.paths.concat(this.paths);
        // };
    }

    doublePaths():void {
        this.paths = this.paths.concat(this.paths);
    }


    createPathFromElement2 (startingElement, pathNo) {
        this.counter += 1;
        console.error(this.counter.toString())
        console.log("incoming & path", startingElement.type, pathNo);
        

        if (startingElement.type === BmlTypes.End) {
            console.log("end!");
            return
        }


        const outgoingFromStart: Array<PCSShape> = this.getNextShapesinSequence(startingElement.id);

        if(startingElement.type === BmlTypes.OrGateway) {
            let maxi = outgoingFromStart.length;
            console.log(outgoingFromStart);
            this.doublePaths();
            for (let i = 0; i < maxi; i++) {
                this.createPathFromElement2(outgoingFromStart[i], i);
            }
            console.log("or!");
            console.log("or->paths ", JSON.stringify(this.paths));
            return
        }

        if (startingElement.type === BmlTypes.PublicKey || startingElement.type === BmlTypes.PreImage) {
            this.paths[pathNo].add(startingElement.id);
            console.log("pubKey!");
            console.log("key->paths ", JSON.stringify(this.paths));
        }
        
        outgoingFromStart.forEach (outgoingShape => {
            console.log("outgoing ", outgoingShape);
            if(outgoingShape.type !== BmlTypes.End) {
                this.createPathFromElement2(outgoingShape, pathNo);
                console.log("default->paths ", JSON.stringify(this.paths));
            }

        })
    }

    createPathFromElement3(shape: PCSElement, pathNo: number) {
        
        if(shape.type === BmlTypes.Start) {
            return;
        }

        if (shape.type === BmlTypes.AndGateway) {
            const andOutputs = this.getNextShapesinSequence(shape.id);
            console.log("andOutput: ", andOutputs);
            andOutputs.forEach ( andOutput => {
                if (andOutput.type === BmlTypes.PublicKey || andOutput.type === BmlTypes.PreImage) {
                    this.paths[pathNo].add(andOutput.id);
                }
            })
        }
        
        if (shape.type === BmlTypes.PublicKey || shape.type === BmlTypes.PreImage) {
            this.paths[pathNo].add(shape.id);
        }
        const previousShapes = this.getPreviousShapesinSequence(shape.id);
        previousShapes.forEach( previousShape => {
            this.createPathFromElement3(previousShape, pathNo);
        })
    }

    addToAllPaths(thingToAdd) {
        console.log("thing to AND add...", thingToAdd );
        this.paths.forEach ( path => {
            path.add(thingToAdd);
        })
    }

    generateStack(element) {
        const nextShapes = this.getNextShapesinSequence(element.id);
        nextShapes.forEach (shape => {
            this.createNextStackElement(shape);
        })
    }



    createNextStackElement(shape) {
        if (shape.type === BmlTypes.PublicKey || shape.type === BmlTypes.PreImage) {
            this.stack.push(shape.id);
        }

        if(shape.type === BmlTypes.AndGateway) {
            this.stack.push("AND");
            this.stack.push(shape.outgoing.length);
            
        }

        if(shape.type === BmlTypes.OrGateway) {
            this.stack.push("OR");
            this.stack.push(shape.outgoing.length);

        }
        this.generateStack(shape);
    }

    generatePathsFromStack() {
        const topElement = this.stack.shift();
        this.analysePopedElement(topElement);
    }

    analysePopedElement(popedElement, pathNo?: number) {
        this.counter += 1;
        console.log(this.counter, popedElement, this.paths[0], this.paths[1]);
        console.log(JSON.stringify(this.stack));
        if(popedElement  === "AND" || popedElement  === "OR" ) {
            const noToPop: number = this.stack.shift();
            let pushArray = [];
            for (let i=0; i < noToPop; i++) {
                if(this.stack[0] === "AND" || this.stack[0]  === "OR" ) {
                    const popy = this.stack.shift()
                    this.analysePopedElement(popy);
                    break;
                } else {
                    const toPush = this.stack.shift();
                    pushArray.push(toPush);
                }

            }

            this.analysePopedGateway(popedElement, pushArray);
            return;
        }

        if(pathNo >= 0) {
            console.log("thing to OR add...", popedElement, "on path ", pathNo);
            console.log("before", this.paths[0]), this.paths[1]);
            this.paths[pathNo].add(popedElement);
            console.error("after", this.paths[0], this.paths[1]);
        } else {
            this.addToAllPaths(popedElement);
        }
        if (this.stack.length > 0) {
            const nextElement = this.stack.shift();
            //this.analysePopedElement(nextElement);
        } else {
            console.log("end");
        }
    }

    async analysePopedGateway (type, pushArray) {
        if(type === "OR") {
            console.log("parrot");
            await this.doublePaths();
            for (let i = 0; i < pushArray.length; i++) {
                this.analysePopedElement(pushArray[i], i);
            }
        }
        
        if(type === "AND") {
            pushArray.forEach(element => {
                this.analysePopedElement(element);
            });
        }
    }


    createPathFromElement4(shape: PCSElement) {
        
        if(shape.type === BmlTypes.End) {
            return;
        }

        if (shape.type === BmlTypes.PublicKey || shape.type === BmlTypes.PreImage) {
            
        }

        if (shape.type === BmlTypes.AndGateway) {
            const andOutputs = this.getNextShapesinSequence(shape.id);
            console.log("andOutput: ", andOutputs);
            andOutputs.forEach ( andOutput => {
                if (andOutput.type === BmlTypes.PublicKey || andOutput.type === BmlTypes.PreImage) {
                    this.paths[pathNo].add(andOutput.id);
                }
            })
        }
        
        
        const previousShapes = this.getPreviousShapesinSequence(shape.id);
        previousShapes.forEach( previousShape => {
            this.createPathFromElement3(previousShape, pathNo);
        })
    }

    createGatewayArguments(gatewayShape: PCSShape) {
        const policies: Array<PCSShape>  = this.getNextShapesinSequence(gatewayShape.id);
        const idArray = [];
        policies.forEach(policy => {
            // if(policy.type === BmlTypes.OrGateway) {
            //     let outOfOrPolicies = this.getNextShapesinSequence(policy.id);
            //     console.log("outofOR ", outOfOrPolicies);
            //     outOfOrPolicies.forEach(outOfOrPolicy => {
            //         console.log(this.createAnd(outOfOrPolicy));
            //         idArray.push(this.createAnd(outOfOrPolicy));
            //     });
            // } else {
                idArray.push(this.createBestPossibleArgument(policy));
            //}
        })
        return idArray.join(',');
    }

    createBestPossibleArgument(shape: PCSShape): string {
        if(shape.detail?.key) {
            return shape.detail.key;
        }
        if(shape.label) {
            return `<${shape.label}>`
        }
        return `<${shape.id}>`
    }

    createPk({id}) {
        return `pk(${id})`;
    }

    createAnd(andShape: PCSShape) {
        return `and(${this.createGatewayArguments(andShape)})`;
    }

    createOr(orShape: PCSShape) {
        return `or(${this.createGatewayArguments(orShape)})`;
    }

    //to do: implment thresholdShape.detail.threshold first
    // createThreshold(thresholdShape: PCSShape) {
    //     return `thresh(${thresholdShape.detail.threshold}${this.createGatewayAurguments(thresholdShape)})`;
    // }

    gen(shape) {
        if (shape.type === BmlTypes.AndGateway) {
            const outGens = this.getNextShapesinSequence(shape);
            outGens.forEach( outGen => {
                this.prePaths.push( this.gen(outGen));
            })
        }
        if(shape.type === BmlTypes.OrGateway) {
            this.prePaths = this.prePaths.concat(this.prePaths);
        }
    }


}

export abstract class PCSElement {
    id: string;
    type?: BmlTypes;
    label?: string;
    detail?: VariableDetail;
    miniscriptFragment?: string;
    incoming?: Array<string> = [];
    outgoing?: Array<string> = [];
    edgeDefinitions?: Array<PCSBounds>;

    constructor(providedId) {
        this.id = providedId;
    }

    setType(typeToSet:BmlTypes):void {
        this.type = typeToSet;
    }

    setLabel(labelToSet: string):void {
        this.label = labelToSet;
    }

    setDetail(detailsToSet: object): void {
        this.detail = detailsToSet;
    }

    addIncoming(sourceID: string): void {
        this.incoming.push(sourceID);
    }

    addOutgoing(targetID: string): void {
        this.outgoing.push(targetID);
    }


    setMiniscriptFragment(): void {
        if (this.type) {
            this.miniscriptFragment = getMinisciptFragment(this.type);
        } else {
            throw Error("type not set. Type required to get miniscript fragment");
        }
    }
}

export class PCSShape extends PCSElement {
    shapeDefinitions?: PCSBounds;

    constructor(providedId) {
        super(providedId);
        this.shapeDefinitions = {
            x: null,
            y: null,
            w: null,
            h: null,
        }
    }

    setShapeDefinitions(x?:number, y?:number, w?:number, h?:number):void {
        this.shapeDefinitions.x = (x) ? x : this.shapeDefinitions.x;
        this.shapeDefinitions.y = (y) ? y : this.shapeDefinitions.y;
        this.shapeDefinitions.w = (w) ? w : this.shapeDefinitions.w;
        this.shapeDefinitions.h = (h) ? h : this.shapeDefinitions.h;
    }
    

}

export class PCSEdge extends PCSElement {
    source: string;
    target: string;
    edgeDefinitions?: Array<PCSBounds>;

    constructor(providedId: string, providedSource: string, providedTarget: string) {
        super(providedId);

        this.source = providedSource;
        this.incoming.push(providedSource);

        this.target = providedTarget;
        this.outgoing.push(providedTarget);
    }

    setEdgeDefinitions(edgeArray: Array<PCSBounds>):void {
        this.edgeDefinitions = edgeArray;
    }
}


interface PCSBounds {
    x: number;
    y: number;
    w?: number;
    h?: number;
}

interface VariableDetail {
    //might make key and hex the same
    key?: string;
    hex?: string;
}