//Week 8 Pathfinding Example
//Thomas Park
//October 15, 2020

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
  startingGrid = gridArray[6][0];
  goalGrid = gridArray[5][9];
  pathFind(startingGrid, goalGrid);
  //drawGridArray();
}


function draw() {
  background (0);
  //pathFind(startingGrid, goalGrid);
  goalGrid.farbe = color(63,224,208);
  startingGrid.farbe = color(63,224,208);
  drawGridArray();
}

function mouseClicked(){
  print("clicked!");
  //If within bounds of "test" button, then run it.
  //If not within test button, change the grid space you're currently on. 
  for(let i = 0; i< gridArray.length; i++){
    for(let j = 0; j < gridArray[i].length; j++){
      if(mouseX > gridArray[j][i].x && mouseX < (gridArray[j][i].x+(width/20)) && mouseY > gridArray[j][i].y && mouseY < (gridArray[j][i].y+(height/20))){
        if(gridArray[j][i].type == 2){
          gridArray[j][i].type = 1;
          gridArray[j][i].farbe = color(143,0,255);
          print(i + ", " + j + "closed");
        }
        else if(gridArray[j][i].type == 1){
          gridArray[j][i] = 2;
          print("open");
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
  gridTileMap = [o,o,o,o,d,o,o,o,o,o,
                 o,o,o,o,o,d,o,o,o,o,
                 o,o,o,o,o,d,o,o,o,o,
                 o,o,o,o,o,d,o,o,o,o,
                 o,o,d,o,o,d,o,d,o,o,
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
    print("Step 1: find adj");
    //Step 2: calculate the G,H, & F values of all tiles in toSearch[].
    calcGHF(startNode, endNode);
    print("Step 2: calcGHF");
    //Step 3: set currentBest to be the tile with the lowest F value in toSerach[].
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
  print("We found the end! " + currentBest.c + ", " + currentBest.r);  
  toSearch.length = 0;

  //part b: Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.  - all above this goes in a while loop. - make this a sep func.
  storePath(currentBest, startNode);
  
}

function findAdjacent(node) { //lator factor this out into a func that does the adding and accepts any r/c grid, and the overarching thing here that checks if it can add smthg and calls the first func only if so.
  print("NODE BEST: " + node.c + ", " + node.r);
  if (node.r < 9 && !gridArray[node.r+1][node.c].searched) { //if it is within the bounds of the grid && has not already been searched, add the tile below node to toSearch[].
    if (gridArray[node.r+1][node.c].type == 2) { //type 2 = enemy terrain.
      toSearch[toSearch.length] = gridArray[node.r+1][node.c];
      gridArray[node.r+1][node.c].gridFrom = node;
      gridArray[node.r+1][node.c].farbe = color(245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r+1][node.c].myText = valText.toString();
      valText++;
      print("ADDING: " + node.c + ", " + (node.r+1));
    }
  }
  if (node.c < 9 && !gridArray[node.r][node.c+1].searched) {
    if (gridArray[node.r][node.c+1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.r][node.c+1];
      gridArray[node.r][node.c+1].gridFrom = node;
      gridArray[node.r][node.c+1].farbe = color(245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r][node.c+1].myText = valText.toString();
      valText++;
      print("ADDING: " + (node.c+1) + ", " + node.r);
    }
  }
  if (node.r > 0 && !gridArray[node.r-1][node.c].searched) {
    if (gridArray[node.r-1][node.c].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.r-1][node.c];
      gridArray[node.r-1][node.c].gridFrom = node;
      gridArray[node.r-1][node.c].farbe = color(245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r-1][node.c].myText = valText.toString();
      valText++;
      print("ADDING: " + node.c + ", " + (node.r-1));
    }
  }
  if (node.c > 0 && !gridArray[node.r][node.c-1].searched) {
    if (gridArray[node.r][node.c-1].type == 2) {
      toSearch[toSearch.length] = gridArray[node.r][node.c-1];
      gridArray[node.r][node.c-1].gridFrom = node;
      gridArray[node.r][node.c-1].farbe = (245 + tempColorAdj); // for testing
      tempColorAdj -= 3;
      gridArray[node.r][node.c-1].myText = valText.toString();
      valText++;
      print("ADDING: " + (node.c-1) + ", " + node.r);
    }
  }  
  print("toSearchNowHas:");
  for (let i = 0; i < toSearch.length; i++) {
    print("In toSearch: (" + toSearch[i].c + ", " + toSearch[i].r + ")");
  }
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
    print("grid " + toSearch[i].c + "," + toSearch[i].r + " has F: " + toSearch[i].f); //column, row, f-val
    if (toSearch[i].f < lowestF) {
      lowestF = toSearch[i].f;
      bestTile = toSearch[i];
      print("Lowest F now is: " + lowestF);
    }
  }

  print("best tile found: " + bestTile.c + ", " + bestTile.r);
  bestTile.searched = true;//set tile as searched?
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
  print("tempArr: " + tempArray);

  toSearch.length = 0; //empties the array.
  print("toSearchEmpty?: " + toSearch);

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
    print("FinalPath: " + finalPath[index].r + ", " + finalPath[index].c);
  }
}
