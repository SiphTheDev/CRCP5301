class Pathfinder {

  constructor(gridArray){//, toSearch = null, finalPath = null) {
    this.gridArray = gridArray;
    this.toSearch = [];
    this.finalPath = [];
   }


  pathFind(startNode, endNode) { //Finds a path between two given grid nodes.
  let endFound = false;
  let currentBest = startNode;

  //part a: Finding the Path
  while (!endFound) {
    //Step 1: find all tiles adjacent to the currentBest node, and add them to toSearch[].
    this.findAdjacent(currentBest); 
    //print("found adj");
    //Step 2: calculate the G,H, & F values of all tiles in toSearch[].
    this.calcGHF(startNode, endNode);
    //print("calc'd GHF");
    //Step 3: set currentBest to be the tile with the lowest F value in toSerach[].
    currentBest = this.findBestTile();
    //print("set currentBest as: " + currentBest);
    //Step 4: Check if currentBest is the endNode (ie currentBest.h = 0); Break if it does.
    if (this.atEnd(currentBest)) {
      endFound = true;
      //print("We think we're at the end");
    }    
    //Step 5: remove all searched tiles from toSearch    
    this.removePrevSearched();
    //print("cleaning out toSerach[]");
    //Step 6: repeat until end reached.
  }

  //part b: Storing the Path
  this.storePath(currentBest, startNode);
  //print("storing Path");
  return this.finalPath;
}

 findAdjacent(node) { //Checks all nodes adjacent to a given node, and if they are viable, adds them to toSearch[].
  //print("NODE BEST: " + node.c + ", " + node.r);
  if (node.c < 27 && !this.gridArray[node.c+1][node.r].searched  && !this.inArray(this.gridArray[node.c+1][node.r])) { //if it is within the bounds of the grid && has not already been searched, && it's not already in the array, add the tile below node to toSearch[].
    if (this.gridArray[node.c+1][node.r].type == 2) { //type 2 = enemy terrain.
      this.addNode(this.gridArray[node.c+1][node.r], node);      
    }
  }
  if (node.r < 13 && !this.gridArray[node.c][node.r+1].searched && !this.inArray(this.gridArray[node.c][node.r+1])) {
    if (this.gridArray[node.c][node.r+1].type == 2) { 
      this.addNode(this.gridArray[node.c][node.r+1], node);
    }
  }
  if (node.c > 1 && !this.gridArray[node.c-1][node.r].searched && !this.inArray(this.gridArray[node.c-1][node.r])) {
    if (this.gridArray[node.c-1][node.r].type == 2) { 
      this.addNode(this.gridArray[node.c-1][node.r], node);
    }
  }
  if (node.r > 1 && !this.gridArray[node.c][node.r-1].searched && !this.inArray(this.gridArray[node.c][node.r-1])) {
    if (this.gridArray[node.c][node.r-1].type == 2) {
      this.addNode(this.gridArray[node.c][node.r-1], node);
    }
  }  
}


 inArray(node){
  for(let i = 0; i < this.toSearch.length; i++){
    if(this.toSearch[i] == node){return true;}
  }
  return false; 
}

 addNode(newNode, fromNode){
  this.toSearch[this.toSearch.length] = newNode;
  newNode.gridFrom = fromNode;
      newNode.text = "Heyo!";
      //newNode.farbe = color(0, 200 + tempColorAdj, 100); // for testing
      //tempColorAdj -= 2;
      //print("ADDING R: " + newNode.c + ", " + newNode.r);
}

 calcGHF(startNode, endNode) {
  for (let i = 0; i < this.toSearch.length; i++) { 
    this.toSearch[i].g = this.calcG(this.toSearch[i], startNode); //distance from startNode
    this.toSearch[i].h = this.calcH(this.toSearch[i], endNode); //distance from endNode
    this.toSearch[i].f = this.toSearch[i].g + this.toSearch[i].h; //total of the two distances
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
  for (let i = 0; i < this.toSearch.length; i++) {
    //print("grid " + this.toSearch[i].c + "," + this.toSearch[i].r + " has F: " + this.toSearch[i].f); //column, row, f-val
    if (this.toSearch[i].f < lowestF) {
      lowestF = this.toSearch[i].f;
      bestTile = this.toSearch[i];
      //print("Lowest F now is: " + lowestF);
    }
  }

  //print("best tile found: " + bestTile.c + ", " + bestTile.r);
  bestTile.searched = true; //set tile as searched, so it will be skipped in subsequent searches.
  return bestTile;
}

 atEnd(bestNode) { //Determines if the end of the path has been found. 
 //print("endCheck.h = " + bestNode.h);
  if (bestNode.h == 0) {
    return true;
  } else {
    return false;
  }
}

 removePrevSearched() { //Removes all tiles that have already been searched from toSearch[], so that they are not checked again in this pathfind loop.
  let tempArray = [];

  for (let i = 0; i < this.toSearch.length; i++) {
    tempArray[i] = this.toSearch[i];
  }
  //print("tempArr: " + tempArray);

  this.toSearch.length = 0; //empties the array.
  //print("toSearchEmpty?: " + this.toSearch);

  for (let i = 0; i < tempArray.length; i++) {
    if (!tempArray[i].searched) {
      this.toSearch.push(tempArray[i]);
    }
  }
}

//Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.
 storePath(currentBest, startNode) {
  let index = 0;

  while (currentBest != startNode) {
    this.finalPath[index] = currentBest;
    currentBest = currentBest.gridFrom;
    index ++;
  }
}
}
