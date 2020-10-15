//Project Ascent
//Thomas Park

/*TODO: 
 now: Either get tower placement & drawing working or comment it out & go back to pathfinding.
 next: Work on enemy motion - pathfinding 
 later: create a player class & a projectile class similarly. 
 much later: projectile tracking. 
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this doc fundamentally just a scene manager. - maybe leave the preload stuff. Can you have diff draw loops in diff files for proc?
 */


//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
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
  //findAdjacent(gridArray[5][5]); //c,r //A test for findAdjacent
  pathFind(gridArray[0][12], gridArray[5][20]); //inverted TEMP because gridArray
  //gridArray[1][13].farbe = 0;
  //gridArray[12][13].farbe = 50;
  /*gridArray[7][7].farbe = 100;
  gridArray[8][7].farbe = 150;
  gridArray[8][3].farbe = 200;
  gridArray[8][4].farbe = 250;*/
  //print(toSearch);
}


function draw() {
  drawGridArray();
  //jim.move();
  jim.render();
  //drawTowerArray();
}

/*function mousePressed(){
 print("pressed");
 let n = 0;
 for(let i = 0; i < gridArray.length; i++){ 
 for(let j = 0; j < gridArray[i].length; j++){
 if(mouseX > gridArray[i][j].x && mouseX < gridArray[i][j].x + 50 && mouseY > gridArray[i][j].y && mouseY < gridArray[i][j].y + 50){
 tempFriendAr[n] = (new Tower(mouseX, mouseY, 50));
 print("new Tower buddy!");
 print(tempFriendAr[n]);
 }
 n++;
 }
 }
 //drawTowerArray();
 }
 
 function drawTowerArray(){
 for(let i = 0; i < tempFriendAr.length; i++){
 tempFriendAr[i].render();
 }
 }*/
function createTileMap() { //temp until put this data in a json or elsewhere. //maybe make this a 2d array in future?
  let b = 10; //borders
  let e = 20; //enemies
  let p = 30; //players
  gridTileMap = [b, b, b, b, b, b, b, b, b, b, b, b, b, e, e, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, e, e, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, p, p, p, p, p, p, p, p, p, p, e, e, p, p, p, p, p, p, p, p, p, p, b, b, b, 
    b, b, b, p, p, p, p, p, p, p, p, p, p, e, e, p, p, p, p, p, p, p, p, p, p, b, b, b, 
    b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, b, b, b, 
    b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, b, b, b, 
    b, b, b, p, p, e, e, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, b, b, b, 
    b, b, b, p, p, e, e, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, b, b, b, 
    b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, b, b, b, 
    b, b, b, p, p, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, b, b, b, 
    b, b, b, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, p, p, b, b, b, 
    b, b, b, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, p, e, e, p, p, b, b, b, 
    b, b, b, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, p, p, b, b, b, 
    b, b, b, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, p, p, b, b, b, ]; //Determines what type of tile belongs in each space. Will move to JSON or XML later to allow level loading later.
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
        farbe = color(255, 0, 0);
      } else if (gridTileMap[i] == 20) {
        type = 2;
        farbe = color(0, 255, 0);
      } else if (gridTileMap[i] == 30) {
        type = 3;
        farbe = color(0, 0, 255);
      }
      gridArray[r][c] = new GridSpace(c, r, c*(width/28), r*(height/14), type, farbe); //if you make the grid only half the screen & need to shift it over, do this here via addition. 
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
    if(atEnd(currentBest)){endFound = true;}
    print("Step 4: atEnd?");
    //Step 5: remove all searched tiles from toSearch    
    removePrevSearched();//Clean Search Array
    print("Step 5: removeSearchedFromArray");
    //Step 6: repeat until end reached. 
  }
  print("We found the end! " + currentBest.c + ", " + currentBest.r);
  currentBest.farbe = (25,25,25);

  //part b: Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.  - all above this goes in a while loop.
  //while (current node.searched != startNode){add this spot to an array.}
}

function findAdjacent(node) { //lator factor this out into a func that does the adding and accepts any r/c grid, and the overarching thing here that checks if it can add smthg and calls the first func only if so.
  print("NODE BEST: " + node.c + ", " + node.r);
  if (node.r < 13 && !gridArray[node.r+1][node.c].searched) { //if it is within the bounds of the grid && has not already been searched, add the tile below node to toSearch[].
    if (gridArray[node.r+1][node.c].type == 2) { //type 2 = enemy terrain.
      toSearch[toSearch.length] = gridArray[node.r+1][node.c];
      gridArray[node.r+1][node.c].gridFrom = node;
      gridArray[node.r+1][node.c].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
      print("ADDING: " + node.c + ", " + (node.r+1));
    }
  }
  if (node.c < 27 && !gridArray[node.r][node.c+1].searched) {
    if (gridArray[node.r][node.c+1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.r][node.c+1];
      gridArray[node.r][node.c+1].gridFrom = node;
      gridArray[node.r][node.c+1].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
      print("ADDING: " + (node.c+1) + ", " + node.r);
    }
  }
  if (node.r > 0 && !gridArray[node.r-1][node.c].searched) {
    if (gridArray[node.r-1][node.c].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.r-1][node.c];
      gridArray[node.r-1][node.c].gridFrom = node;
      gridArray[node.r-1][node.c].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
      print("ADDING: " + node.c + ", " + (node.r-1));
    }
  }
  if (node.c > 0 && !gridArray[node.r][node.c-1].searched) {
    if (gridArray[node.r][node.c-1].type == 2) {
      toSearch[toSearch.length] = gridArray[node.r][node.c-1];
      gridArray[node.r][node.c-1].gridFrom = node;
      gridArray[node.r][node.c-1].farbe = (0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
      print("ADDING: " + (node.c-1) + ", " + node.r);
    }
  }  
  print("toSearchNowHas:");
  for(let i = 0; i < toSearch.length; i++){
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

function atEnd(bestNode){
  if(bestNode.h == 0){
    return true;
  }
  else{
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
