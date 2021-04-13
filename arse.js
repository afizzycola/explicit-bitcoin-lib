const testStack = ["AND", 2, "Activity_10ttrdj", "OR", 2, "Activity_17ymcwz", "Activity_0nyqi0b"];
const testStack2 = ["AND", 2, "Activity_10ttrdj", "OR", 2, "Activity_17ymcwz", "AND", 2, "doge1", "doge2"];

function generatePathsFromStack2(stack = []) {
    let paths = [];
    let stacky = stack;
    //flaten the ANDs
    //flatenAnds(stacky)
    //console.log(stacky);


    //resolve the ORs
    resolveOrs(stacky, paths);
    //console.log("paths:", paths);
    //console.log("stack:", stacky);


    //apend ANDs to paths
    //appendAnds(stacky, paths);
    //console.log(paths);
    //console.log(stacky);

}

function flatenAnds(stack) {

    const andI = stack.indexOf("AND");
    if(andI >= 0) {
        //const numOfAndAugs = stack[andI + 1];
        stack.splice(andI, 2);
        flatenAnds(stack);
    }

}
function resolveOrs(stack, paths) {
    flatenAnds(stack);
    const orI = stack.indexOf("OR");
    if (orI >= 0) {
        //flatenAnds(stack);
        console.log(stack);
        const numOfOrAugs = stack[orI + 1];
        // //console.log(orI);
        orSet = stack.splice(orI, stack.length -orI);
        console.log(orSet, numOfOrAugs );

        orArray = orSet.slice(2, 2 + numOfOrAugs);
        console.log(orArray);
        //flatenAnds(orArray);
        // if(orArray.indexOf("AND") >= 0 ) {
        //     flatenAnds(orArray);
        // }

        

        // for (let i = 0; i < numOfOrAugs; i++) {
        //     paths.push(new Set().add(orArray[i]));
        // }
        //console.log(stack);
        resolveOrs(stack);
    }
}

function appendAnds(stack, paths) {
    const postorI = stack.indexOf("POSTOR");
    if(postorI > 0) {
        let beforePostOr = stack.splice(0, postorI - 1);
        beforePostOr.forEach(beforeElement => {
            paths.forEach( path => {
                path.add(beforeElement);
            })
        })
        let afterPostOr = stack.splice(postorI + 1, stack.length);
        afterPostOr.forEach(aftereElement => {
            paths.forEach( path => {
                path.add(beforeElement);
            })
        })

    }
    const finalThingToAdd = stack.shift();
    

}

//generatePathsFromStack2(testStack);
//console.log("////////////////");
generatePathsFromStack2(testStack2);