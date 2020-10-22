//Project Ascent
//Thomas Park

/*TODO: 
 next: Either get tower placement & drawing working or comment it out & go back to pathfinding.
 then: Work on enemy motion along the path - with pauses( in sync with music in future)
 later: create a player class & a projectile class similarly. 
 much later: projectile tracking. 
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this doc fundament ally just a scene manager. - maybe leave the preload stuff. Can you have diff draw loops in diff files for proc?
 */


//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
let finalPath = [];
let tempColorAdj = 5;
//let tempFriendAr = [];

let toSearch = [];

//let jim = new Enemy(700, 25, 25); //when spawning enemies properly, do it from a grid space, not a set coord. 

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadGridArray();
  //drawGridArray();

  pathFind(gridArray[13][0], gridArray[13][13]);
}


function draw() {
  drawGridArray();
  //jim.move();
  //jim.render();
  //drawTowerArray();
}


function createTileMap() { //temp until put this data in a json or elsewhere. //maybe make this a 2d array in future?
  let b = 10; //borders
  let e = 20; //enemies
  let p = 30; //players
 gridTileMap = [b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                b, b, p, p, p, p, p, p, p, p, p, p, e, e, 
                b, b, p, p, p, p, p, p, p, p, p, p, e, e,
                b, b, p, p, e, e, e, e, e, e, p, p, e, e,
                b, b, p, p, e, e, e, e, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e,
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e,
                e, e, e, e, e, e, p, p, e, e, p, p, e, e,
                e, e, e, e, e, e, p, p, e, e, p, p, e, e,
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e,
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, p, p, e, e,
                b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
                b, b, p, p, e, e, p, p, e, e, e, e, e, e,
                b, b, p, p, e, e, e, e, e, e, e, e, e, e,
                b, b, p, p, e, e, e, e, e, e, p, p, e, e,
                b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                b, b, b, b, b, b, b, b, b, b, b, b, b, b];//Determines what type of tile belongs in each space. Will move to JSON or XML later to allow level loading later.
}

function loadGridArray() { //Once you change the gridTileMap to a JSON, use typeNames instead of these arbitrary numbers? Or still avoid strings? WARNING: Make sure JSON presents it in column chunks, not row chunks.
  let i = 0;
  let type;
  let farbe;
  for (let c = 0; c < cols; c++) {
    gridArray[c] = [];
    for (let r = 0; r < rows; r++) {
      if (gridTileMap[i] == 10) {
        type = 1;
        farbe = color(255, 0, 0);
      } else if (gridTileMap[i] == 20) {
        type = 2;
        farbe = color(0, 255, 0);
      } else if (gridTileMap[i] == 30) {
        type = 3;
        farbe = color(0, 0, 255);
      }
      gridArray[c][r] = new GridSpace(c, r, c*(width/28), r*(height/14), type, farbe); //if you make the grid only half the screen & need to shift it over, do this here via addition. 
      i++; 
    }
  }
}

function drawGridArray() { //Calls the render method within each gridSpace instance.
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      gridArray[i][j].render();
    }
  }
}

function pathFind(startNode, endNode) { //Finds a path between two given grid nodes.
  let endFound = false;
  let currentBest = startNode;

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
}

function findAdjacent(node) { //Checks all nodes adjacent to a given node, and if they are viable, adds them to toSearch[].
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


function inArray(node){
  for(let i = 0; i < toSearch.length; i++){
    if(toSearch[i] == node){return true;}
  }
  return false; 
}

function addNode(newNode, fromNode){
  toSearch[toSearch.length] = newNode;
  newNode.gridFrom = fromNode;
      newNode.farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj -= 2;
      //print("ADDING R: " + newNode.c + ", " + newNode.r);
}

function calcGHF(startNode, endNode) {
  for (let i = 0; i < toSearch.length; i++) { 
    toSearch[i].g = calcG(toSearch[i], startNode); //distance from startNode
    toSearch[i].h = calcH(toSearch[i], endNode); //distance from endNode
    toSearch[i].f = toSearch[i].g + toSearch[i].h; //total of the two distances
  }
}

function calcG(node, startNode) {
  return(abs(startNode.c - node.c)+abs(startNode.r - node.r));
} 

function calcH(node, endNode) {
  return(abs(endNode.c - node.c)+abs(endNode.r - node.r));
}

function findBestTile() {  //loop to find the node with the lowest F value in the toSearch[], then check it's adj nodes/tiles and add them to toSearch[].
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

function atEnd(bestNode) { //Determines if the end of the path has been found. 
  if (bestNode.h == 0) {
    return true;
  } else {
    return false;
  }
}

function removePrevSearched() { //Removes all tiles that have already been searched from toSearch[], so that they are not checked again in this pathfind loop.
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
function storePath(currentBest, startNode) {
  let index = 0;

  while (currentBest != startNode) {
    finalPath[index] = currentBest;
    currentBest = currentBest.gridFrom;
    index ++;
  }
}
