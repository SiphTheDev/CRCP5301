//Project Ascent
//Thomas Park

/*TODO: 
 now: Either get tower placement & drawing working or comment it out & go back to pathfinding.
 next: Work on enemy motion - pathfinding
 then: Fix array so rather than filling with nulls, it actually pushes & pops properly. 
 later: create a player class & a projectile class similarly. 
 much later: do actual pathfinding &/or projectile tracking. 
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this fundamentally just a scene manager. - maybe leave the preload stuff. Can you have diff draw loops in diff files for proc?
 */


//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
let tempColorAdj = 5;
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
  pathFind(gridArray[5][7], gridArray[5][10]);
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
  for (let r = 0; r < rows; r++) {
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

function findAdjacent(node) {
  if (node.r < 13 && !gridArray[node.c][node.r+1].searched) {
    if (gridArray[node.c][node.r+1].type == 2) { //type 2 = enemy terrain.
      toSearch[toSearch.length] = gridArray[node.c][node.r+1];
      gridArray[node.c][node.r+1].gridFrom = node;
      gridArray[node.c][node.r+1].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
    }
  }
  if (node.c < 6 && !gridArray[node.c+1][node.r].searched) {
    if (gridArray[node.c+1][node.r].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c+1][node.r];
      gridArray[node.c+1][node.r].gridFrom = node;
      gridArray[node.c+1][node.r].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
    }
  }
  if (node.r > 0 && !gridArray[node.c][node.r-1].searched) {
    if (gridArray[node.c][node.r-1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c][node.r-1];
      gridArray[node.c][node.r-1].gridFrom = node;
      gridArray[node.c][node.r-1].farbe = color(0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
    }
  }
  if (node.c > 0 && !gridArray[node.c-1][node.r].searched) {
    if (gridArray[node.c-1][node.r].type == 2) {
      toSearch[toSearch.length] = gridArray[node.c-1][node.r];
      gridArray[node.c-1][node.r].gridFrom = node;
      gridArray[node.c-1][node.r].farbe = (0, 200 + tempColorAdj, 100); // for testing
      tempColorAdj += 10;
    }
  }
}

function pathFind(startNode, endNode) {
  let endFound = false;
  let currentBest = startNode;

  //part a:
  while (!endFound) {
    //Step 1: find all tiles adjacent to the currentBest node, and add them to toSearch[].
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


  //Step 0: find all the tiles/nodes adjacent to the starting node, then calculate their GHF values. 
  //findAdjacent(startNode);
  //calcGHF(startNode, endNode);


  //while (!endFound) {
  //Step a: loop through the elems in toSearch, calcing g & h in separate funcs, and f afterwards.
  //currentBest = findBestTile(); //get the best tile of all those in the toSearch array.
  //check if at the end(h=0) if yes, set it's foundFrom val, and breakLoop. - do in findBest? No. 
  //                         if no, clean the search array


  //
  //clean search array, then repeat



  //calcGHF(startNode, endNode);

  //Step b: search through toSearch[] to see which tile/node has the lowest F value. Then find all nodes adjacent to that tile.
  /*
  cleanSearchArray();
  findAdjacent(findBestTile());
  cleanSearchArray();
  findAdjacent(findBestTile());
  cleanSearchArray();
  findAdjacent(findBestTile());
  */
  //clear toSearch of the searched tiles between each iteration.

  //calcGHF(startNode, endNode);
  //findAdjacent(findBestTile());

  //calcGHF(startNode, endNode);
  //findAdjacent(findBestTile());  



  //if (toSearch[i].h == 0) { //checks if we've reached our destination. 
  //  endFound = true;
  //  print("endFound");
  //}
  //}

  //part b: Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.  - all above this goes in a while loop.
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

function removePrevSearched() { //Splice doesn't seem to be working (still leaves and array of undefs. Can you change array.length? Try new approach - needs research: array.slice or just set array.length.)
  let tempArray = [];

  for (let i= 0; i < toSearch.length; i++) {
    tempArray[i] = toSearch[i];
  }
  print("tempArr: " + tempArray);

  toSearch.length = 0; 
  print("toSearchEmpty?: " + toSearch);

  for (let i = 0; i < tempArray.length; i++) {
    if (!tempArray[i].searched) {
      toSearch.push(tempArray[i]);
    }
  }
  print("toSearchRefill? " + toSearch);
}
/*
  
 let j = 0;
 for(let i = 0; i<toSearch.length; i++){
 //if(toSearch[i] != null){
 if(toSearch[i].searched){
 toSearch[i] = null;
 }
 else{
 tempArray.push(toSearch[i]);
 toSearch[i] = null;
 print("Temp Array: " + tempArray[i].c);
 }
 //}
 
 
 for(let i = 0; i < tempArray.length; i++){
 toSearch[i] = tempArray[i];
 print("toSearch: " + toSearch[i].c);
 }
 
 }
 }
 */
