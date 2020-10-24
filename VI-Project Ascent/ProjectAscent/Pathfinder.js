class Pathfinder {

  constructor( gridArray) {
    this.gridArray = gridArray;
   }


 pathFind(startNode, endNode) { //Finds a path between two given grid nodes.
  let endFound = false;
  let currentBest = startNode;
  let finalPath = [];

  //part a: Finding the Path
  while (!endFound) {
    //Step 1: find all tiles adjacent to the currentBest node, and add them to toSearch[].
    findAdjacent(currentBest); 
    //Step 2: calculate the G,H, & F values of all tiles in toSearch[].
    calcGHF(startNode, endNode);
    //Step 3: set currentBest to be the tile with the lowest F value in toSerach[].
    currentBest = findBestTile();
    //Step 4: Check if currentBest is the endNode (ie currentBest.h = 0); Break if it does.
    if (atEnd(currentBest)) {
      endFound = true;
    }
    
    //Step 5: remove all searched tiles from toSearch    
    removePrevSearched();
    //Step 6: repeat until end reached.
  }

  //part b: Storing the Path
  storePath(currentBest, startNode);
  return finalPath;
}

 findAdjacent(node) { //Checks all nodes adjacent to a given node, and if they are viable, adds them to toSearch[].
  //print("NODE BEST: " + node.c + ", " + node.r);
  if (node.c < 27 && !gridArray[node.c+1][node.r].searched  && !inArray(gridArray[node.c+1][node.r])) { //if it is within the bounds of the grid && has not already been searched, && it's not already in the array, add the tile below node to toSearch[].
    if (gridArray[node.c+1][node.r].type == 2) { //type 2 = enemy terrain.
      addNode(gridArray[node.c+1][node.r], node);      
    }
  }
  if (node.r < 13 && !gridArray[node.c][node.r+1].searched && !inArray(gridArray[node.c][node.r+1])) {
    if (gridArray[node.c][node.r+1].type == 2) { 
      addNode(gridArray[node.c][node.r+1], node);
    }
  }
  if (node.c > 1 && !gridArray[node.c-1][node.r].searched && !inArray(gridArray[node.c-1][node.r])) {
    if (gridArray[node.c-1][node.r].type == 2) { 
      addNode(gridArray[node.c-1][node.r], node);
    }
  }
  if (node.r > 1 && !gridArray[node.c][node.r-1].searched && !inArray(gridArray[node.c][node.r-1])) {
    if (gridArray[node.c][node.r-1].type == 2) {
      addNode(gridArray[node.c][node.r-1], node);
    }
  }  
  //print("toSearchNowHas:");
  //for (let i = 0; i < toSearch.length; i++) {
  //  print("In toSearch: (" + toSearch[i].c + ", " + toSearch[i].r + ")");
  //}
}


 inArray(node){
  for(let i = 0; i < toSearch.length; i++){
    if(toSearch[i] == node){return true;}
  }
  return false; 
}

 addNode(newNode, fromNode){
  toSearch[toSearch.length] = newNode;
  newNode.gridFrom = fromNode;
      //newNode.farbe = color(0, 200 + tempColorAdj, 100); // for testing
      //tempColorAdj -= 2;
      //print("ADDING R: " + newNode.c + ", " + newNode.r);
}

 calcGHF(startNode, endNode) {
  for (let i = 0; i < toSearch.length; i++) { 
    toSearch[i].g = calcG(toSearch[i], startNode); //distance from startNode
    toSearch[i].h = calcH(toSearch[i], endNode); //distance from endNode
    toSearch[i].f = toSearch[i].g + toSearch[i].h; //total of the two distances
  }
}

 calcG(node, startNode) {
  return(abs(startNode.c - node.c)+abs(startNode.r - node.r));
} 

 calcH(node, endNode) {
  return(abs(endNode.c - node.c)+abs(endNode.r - node.r));
}

 findBestTile() {  //loop to find the node with the lowest F value in the toSearch[], then check it's adj nodes/tiles and add them to toSearch[].
  let lowestF = 10000; //placeholder for infinitely large. Sufficient for current max grid sizes.
  let bestTile;
  for (let i = 0; i < toSearch.length; i++) {
    //print("grid " + toSearch[i].c + "," + toSearch[i].r + " has F: " + toSearch[i].f); //column, row, f-val
    if (toSearch[i].f < lowestF) {
      lowestF = toSearch[i].f;
      bestTile = toSearch[i];
      //print("Lowest F now is: " + lowestF);
    }
  }

  //print("best tile found: " + bestTile.c + ", " + bestTile.r);
  bestTile.searched = true; //set tile as searched, so it will be skipped in subsequent searches.
  return bestTile;
}

 atEnd(bestNode) { //Determines if the end of the path has been found. 
  if (bestNode.h == 0) {
    return true;
  } else {
    return false;
  }
}

 removePrevSearched() { //Removes all tiles that have already been searched from toSearch[], so that they are not checked again in this pathfind loop.
  let tempArray = [];

  for (let i = 0; i < toSearch.length; i++) {
    tempArray[i] = toSearch[i];
  }
  //print("tempArr: " + tempArray);

  toSearch.length = 0; //empties the array.
  //print("toSearchEmpty?: " + toSearch);

  for (let i = 0; i < tempArray.length; i++) {
    if (!tempArray[i].searched) {
      toSearch.push(tempArray[i]);
    }
  }
}

//Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.
 storePath(currentBest, startNode) {
  let index = 0;

  while (currentBest != startNode) {
    finalPath[index] = currentBest;
    currentBest = currentBest.gridFrom;
    index ++;
  }
}
}
