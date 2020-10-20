//Project Ascent
//Thomas Park

/*TODO: 
 now: URGENT: Fix the error in gridArray that inverts c & r
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
let tempColorAdj = 15;
//let tempFriendAr = [];

let toSearch = [];

let jim = new Enemy(700, 25, 25); //when spawning enemies properly, do it from a grid space, not a set coord. 

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadGridArray();
  //drawGridArray();
  print(gridArray[5][10].c);
  print(gridArray[5][10].r);
  pathFind(gridArray[13][0], gridArray[13][5]);
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
                b, b, b, b, b, b, b, b, b, b, b, b, b, b];
                
 
 
  /*gridTileMap = [b, b, b, b, b, b, b, b, b, b, b, b, b, e, e, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                 b, b, b, b, b, b, b, b, b, b, b, b, b, e, e, b, b, b, b, b, b, b, b, b, b, b, b, b, 
                 b, b, b, p, p, p, p, p, p, p, p, p, p, e, e, p, p, p, p, p, p, p, p, p, p, b, b, b, 
                 b, b, b, p, p, p, p, p, p, p, p, p, p, e, e, p, p, p, p, p, p, p, p, p, p, b, b, b, 
                 b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, p, e, e, e, e, e, e, e, e, e, b, b, b, 
                 b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, p, e, e, e, e, e, e, e, e, e, b, b, b, 
                 b, b, b, p, p, e, e, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, b, b, b, 
                 b, b, b, p, p, e, e, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, b, b, b, 
                 b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, b, b, b, 
                 b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, b, b, b, 
                 b, b, b, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, p, p, b, b, b, 
                 b, b, b, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, p, p, b, b, b, 
                 b, b, b, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, p, p, b, b, b, 
                 b, b, b, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, p, p, b, b, b, ]; //Determines what type of tile belongs in each space. Will move to JSON or XML later to allow level loading later.
*/}

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
      i++; //GRIDORG issue - r,c should be c,r.
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
  currentBest.farbe = (25, 25, 25);

  //part b: Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.  - all above this goes in a while loop. - make this a sep func.
  storePath(currentBest, startNode);
}

function findAdjacent(node) { //lator factor this out into a func that does the adding and accepts any r/c grid, and the overarching thing here that checks if it can add smthg and calls the first func only if so.
  print("NODE BEST: " + node.c + ", " + node.r);
  if (node.c < 13 && !gridArray[node.c+1][node.r].searched  && !inArray(gridArray[node.c+1][node.r])) { //if it is within the bounds of the grid && has not already been searched, add the tile below node to toSearch[].
    if (gridArray[node.c+1][node.r].type == 2) { //type 2 = enemy terrain.
      toSearch[toSearch.length] = gridArray[node.c+1][node.r];
      gridArray[node.c+1][node.r].gridFrom = node;
      gridArray[node.c+1][node.r].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj -= 5;
      print("ADDING R: " + node.c+1 + ", " + (node.r));
    }
  }
  if (node.r < 27 && !gridArray[node.c][node.r+1].searched && !inArray(gridArray[node.c][node.r+1])) {
    if (gridArray[node.c][node.r+1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c][node.r+1];
      gridArray[node.c][node.r+1].gridFrom = node;
      gridArray[node.c][node.r+1].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj -= 5;
      print("ADDING D: " + (node.c) + ", " + node.r+1);
    }
  }
  if (node.c > 1 && !gridArray[node.c-1][node.r].searched && !inArray(gridArray[node.c-1][node.r])) {
    if (gridArray[node.c-1][node.r].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c-1][node.r];
      gridArray[node.c-1][node.r].gridFrom = node;
      gridArray[node.c-1][node.r].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj -= 5;
      print("ADDING L: " + node.c-1 + ", " + (node.r));
    }
  }
  if (node.r > 1 && !gridArray[node.c][node.r-1].searched && !inArray(gridArray[node.c][node.r-1])) {
    if (gridArray[node.c][node.r-1].type == 2) {
      toSearch[toSearch.length] = gridArray[node.c][node.r-1];
      gridArray[node.c][node.c-1].gridFrom = node;
      gridArray[node.c][node.c-1].farbe = (0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj -= 5;
      print("ADDING U: " + (node.c) + ", " + node.r-1);
    }
  }  
  print("toSearchNowHas:");
  for (let i = 0; i < toSearch.length; i++) {
    print("In toSearch: (" + toSearch[i].c + ", " + toSearch[i].r + ")");
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
    index ++;
  }
}
