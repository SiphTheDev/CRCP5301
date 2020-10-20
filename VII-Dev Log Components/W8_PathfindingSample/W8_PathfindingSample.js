//Week 8 Pathfinding Example
//Thomas Park
//October 15, 2020

//Next: find out why pathfind (on repeat runs) is leaving bestTile blank at some points. 
//Then: prevent the path from being fully blocked. 
//Later: in other code, fix the dang grid array inversion issue (has to do with the nested array structure, swap the nesting (c then r vs r then c), then figure out how to make the assignments still good.
//Afterwards: transfer changes to pathfind and the new mouseClicked function to the main program.

//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 10;
let rows = 10;
let finalPath = [];
let tempColorAdj = 5;
let valText = 0;
let startingGrid;
let goalGrid;

let toSearch = [];


function preload() {
}

function setup() {
  createCanvas(500, 500);
  createTileMap();
  loadGridArray();
  startingGrid = gridArray[9][0];
  goalGrid = gridArray[0][9];
  pathFind(startingGrid, goalGrid);
}


function draw() {
  background (0);
  //pathFind(startingGrid, goalGrid);
  goalGrid.farbe = color(63,224,208);
  startingGrid.farbe = color(63,224,208);
  drawGridArray();
}

function mouseClicked(){
  print("clicked at: " + mouseX + ", " + mouseY);
  
  //If within bounds of "test" button, then run it.
  //If not within test button, change the grid space you're currently on. 
  for(let i = 0; i< gridArray.length; i++){
    for(let j = 0; j < gridArray[i].length; j++){
      if(mouseX > gridArray[j][i].x && mouseX < (gridArray[j][i].x+(width/10)) && mouseY > gridArray[j][i].y && mouseY < (gridArray[j][i].y+(height/10))){
        if(gridArray[j][i] == startingGrid){
          //Make this a resetSearch function later.
          tempColorAdj = 5;
          toSearch.length = 0;
          finalPath.length = 0;
          valText = 0;
          for(let i = 0; i < gridArray.length; i++){
            for(let j = 0; j < gridArray[i].length; j++){
              gridArray[i][j].searched = false;
              if(gridArray[i][j].type == 2){
                gridArray[i][j].farbe = color(255);
                gridArray[i][j].myText = ".";
              }
              else if (gridArray[i][j].type == 1){
                gridArray[i][j].myText = ".";
              }
            }
          }
          pathFind(startingGrid, goalGrid);
        }
        else if(gridArray[j][i].type == 2){
          gridArray[j][i].type = 1;
          gridArray[j][i].farbe = color(143,0,255);
          print(i + ", " + j + "closed");
        }
        else if(gridArray[j][i].type == 1){
          gridArray[j][i].type = 2;
          gridArray[j][i].farbe = color(255);
          print(i + ", " + j + "opened");
        }        
        else{
          print("whereAmI?");
        }
      }
    }
  }
  
}

function createTileMap() { 
  let d = 10; //closed
  let o = 20; //open
  gridTileMap = [o,o,o,o,o,d,o,o,o,o,
                 o,o,o,o,o,d,o,o,o,o,
                 o,o,o,o,o,d,o,o,o,o,
                 o,o,o,o,o,d,o,o,o,o,
                 o,o,d,o,o,d,o,d,d,d,
                 o,o,d,o,o,d,o,d,o,o,
                 o,o,d,o,d,d,o,d,o,o,
                 o,o,d,o,o,o,o,d,o,o,
                 o,o,d,d,d,d,d,d,o,o,
                 o,o,o,o,o,o,o,o,o,o,];
}

function loadGridArray() { //Once you change the gridTileMap to a JSON, use typeNames instead of these arbitrary numbers? Or still avoid strings?
  let i = 0;
  let type;
  let farbe;
  for (let r = 0; r < rows; r++) { //TODO FIX THIS! R & C appear to be swapped, but load as if they are not. Nevertheless, bound to cause issues later. - can confirm, it's later & it's causing issues.
    gridArray[r] = [];
    for (let c = 0; c < cols; c++) {
      if (gridTileMap[i] == 10) {
        type = 1;
        farbe = color(143,0,255); //sets barrier tiles to violet. 
      } else if (gridTileMap[i] == 20) {
        type = 2;
        farbe = color(255);
      } 
      gridArray[r][c] = new GridSpace(c, r, c*(width/10), r*(height/10), type, farbe); //if you make the grid only half the screen & need to shift it over, do this here via addition. 
      i++;
    }
  }
}

function drawGridArray() {
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      gridArray[i][j].render();
    }
  }
}

function pathFind(startNode, endNode) {
  let endFound = false;
  let currentBest = startNode;

  //part a:
  while (!endFound) {
    //Step 1: find all tiles adjacent to the currentBest node, and add them to toSearch[].
    print("CURRENT BEST: " + currentBest.c + ", " + currentBest.r);
    findAdjacent(currentBest); 
    //Step 2: calculate the G,H, & F values of all tiles in toSearch[].
    print("Step 1: find adj");
    calcGHF(startNode, endNode);
    //Step 3: set currentBest to be the tile with the lowest F value in toSerach[].
    print("Step 2: calcGHF");
    currentBest = findBestTile();
    print("Step 3: findBest");
    //Step 4: Check if currentBest is the endNode (ie currentBest.h = 0); Break if it does.
    if (atEnd(currentBest)) {
      endFound = true;
    }
      print("Step 4: atEnd?");
    //Step 5: remove all searched tiles from toSearch    
    removePrevSearched();//Clean Search Array
     print("Step 5: removeSearchedFromArray");
    //Step 6: repeat until end reached.
  }
  toSearch.length = 0;

  //part b: Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.  - all above this goes in a while loop. - make this a sep func.
  storePath(currentBest, startNode);
  
}

function findAdjacent(node) { //lator factor this out into a func that does the adding and accepts any r/c grid, and the overarching thing here that checks if it can add smthg and calls the first func only if so.
  if (node.r < 9 && !gridArray[node.r+1][node.c].searched && !inArray(gridArray[node.r+1][node.c])) { //if it is within the bounds of the grid && has not already been searched && it's not already in toSearch, add the tile below node to toSearch[].
    if (gridArray[node.r+1][node.c].type == 2) { //type 2 = enemy terrain.
      toSearch[toSearch.length] = gridArray[node.r+1][node.c];
      gridArray[node.r+1][node.c].gridFrom = node;
      gridArray[node.r+1][node.c].farbe = color(245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r+1][node.c].myText = valText.toString();
      valText++;
      print("below");
    }
  }
  if (node.c < 9 && !gridArray[node.r][node.c+1].searched && !inArray(gridArray[node.r][node.c+1])) {
    if (gridArray[node.r][node.c+1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.r][node.c+1];
      gridArray[node.r][node.c+1].gridFrom = node;
      gridArray[node.r][node.c+1].farbe = color(245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r][node.c+1].myText = valText.toString();
      valText++;
      print("right");
    }
  }
  if (node.r > 0 && !gridArray[node.r-1][node.c].searched && !inArray(gridArray[node.r-1][node.c])) {
    if (gridArray[node.r-1][node.c].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.r-1][node.c];
      gridArray[node.r-1][node.c].gridFrom = node;
      gridArray[node.r-1][node.c].farbe = color(245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r-1][node.c].myText = valText.toString();
      valText++;
      print("above");
    }
  }
  if (node.c > 0 && !gridArray[node.r][node.c-1].searched && !inArray(gridArray[node.r][node.c-1])) {
    if (gridArray[node.r][node.c-1].type == 2) {
      toSearch[toSearch.length] = gridArray[node.r][node.c-1];
      gridArray[node.r][node.c-1].gridFrom = node;
      gridArray[node.r][node.c-1].farbe = (245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r][node.c-1].myText = valText.toString();
      valText++;
      print("left");
    }
  }  
}

function inArray(node){
  for(let i = 0; i < toSearch.length; i++){
    if(toSearch[i] == node){return true;}
  }
  return false;
  
}

function calcGHF(startNode, endNode) {
  for (let i = 0; i < toSearch.length; i++) { 
    toSearch[i].g = calcG(toSearch[i], startNode); //distance from startNode
    toSearch[i].h = calcH(toSearch[i], endNode); //distance from endNode
    toSearch[i].f = toSearch[i].g + toSearch[i].h;
  }
}

function calcG(node, startNode) {
  return(abs(startNode.c - node.c)+abs(startNode.r - node.r));
} 

function calcH(node, endNode) {
  return(abs(endNode.c - node.c)+abs(endNode.r - node.r));
}

function findBestTile() {  //loop to find lowest F from the list, then check it's adj nodes/tiles. 
  let lowestF = 10000; //placeholder for infinitely large
  let bestTile;
  for (let i = 0; i < toSearch.length; i++) {
    if (toSearch[i].f < lowestF) {
      lowestF = toSearch[i].f;
      bestTile = toSearch[i];
    }
  }
  
  bestTile.searched = true;//set tile as searched? // Why is best tile turning up empty on repreat runs?
  return bestTile;
}

function atEnd(bestNode) {
  if (bestNode.h == 0) {
    return true;
  } else {
    return false;
  }
}

function removePrevSearched() { 
  let tempArray = [];

  for (let i= 0; i < toSearch.length; i++) {
    tempArray[i] = toSearch[i];
  }

  toSearch.length = 0; //empties the array.

  for (let i = 0; i < tempArray.length; i++) {
    if (!tempArray[i].searched) {
      toSearch.push(tempArray[i]);
    }
  }
}

function storePath(currentBest, startNode) {
  let backtrackNode = currentBest; 
  let index = 0;

  while (backtrackNode.gridFrom != startNode) {
    finalPath[index] = backtrackNode;
    backtrackNode = backtrackNode.gridFrom;
  }
  
  for (let i = 0; i > finalPath.length; i++){
    finalPath[i].myText = "X";
  }
}
