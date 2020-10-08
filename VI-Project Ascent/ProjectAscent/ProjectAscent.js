//Project Ascent
//Thomas Park

/*TODO: 
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
  pathFind(gridArray[5][5], gridArray[5][10]);
  //print(toSearch);
}


function draw() {
  drawGridArray();
  jim.move();
  jim.render();
}

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
      gridArray[node.c][node.r+1].farbe = color(0, 200, 100); // for testing
    }
  }
  if (node.c < 6 && !gridArray[node.c+1][node.r].searched) {
    if (gridArray[node.c+1][node.r].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c+1][node.r];
      gridArray[node.c+1][node.r].gridFrom = node;
      gridArray[node.c+1][node.r].farbe = color(0, 200, 100); // for testing
    }
  }
  if (node.r > 0 && !gridArray[node.c][node.r-1].searched) {
    if (gridArray[node.c][node.r-1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c][node.r-1];
      gridArray[node.c][node.r-1].gridFrom = node;
      gridArray[node.c][node.r-1].farbe = color(0, 200, 100); //for testing
    }
  }
  if (node.c > 0 && !gridArray[node.c-1][node.r].searched) {
    if (gridArray[node.c-1][node.r].type == 2) {
      toSearch[toSearch.length] = gridArray[node.c-1][node.r];
      gridArray[node.c-1][node.r].gridFrom = node;
      gridArray[node.c-1][node.r].farbe = color(0, 200, 100); //for testing
    }
  }
}

function pathFind(startNode, endNode) {
  let endFound = false;

  //Step 0: find all the tiles/nodes adjacent to the starting node. 
  findAdjacent(startNode);

  //while (!endFound) {
  //Step a: loop through the elems in toSearch, calcing g & h in separate funcs, and f afterwards. 
  calcGHF(startNode, endNode);

  //Steb b: search through toSearch to see which tile/node has the lowest F value. Then find all nodes adjacent to that tile.
  findAdjacent(findBestTile());
  //print("BestTile: " + findBestTile());
  cleanSearchArray();
  calcGHF(startNode, endNode);
  findAdjacent(findBestTile());
  //print("BestTile: " + findBestTile());
  cleanSearchArray();
  calcGHF(startNode, endNode);
  findAdjacent(findBestTile());  
  //print("BestTile: " + findBestTile());
  cleanSearchArray();


  //if (toSearch[i].h == 0) { //checks if we've reached our destination. 
  //  endFound = true;
  //  print("endFound");
  //}
  //}

  //Once end found, loop through the nodes backwards checking where they came from and putting them into a global "path" array.  - all above this goes in a while loop.
}

function calcGHF(startNode, endNode) {
  for (let i = 0; i < toSearch.length; i++) { //learn how to remove stuff from toSearch between sweeps later.
  if(toSearch[i] != null){
    toSearch[i].g = calcG(toSearch[i], startNode);
    toSearch[i].h = calcH(toSearch[i], endNode);
    //print(i + "'s h is: " + toSearch[i].h);
    toSearch[i].f = toSearch[i].g + toSearch[i].h;
    toSearch[i].searched = true;
    //print("searched = true");
  }
  }
}

function calcG(node, startNode) {
    print("madeIt");
  return(abs(startNode.c - node.c)+abs(startNode.r - node.r));

} 

function calcH(node, endNode) {
  return(abs(endNode.c - node.c)+abs(endNode.r - node.r));
}

function cleanSearchArray() {
  let tempArray = [];
  let j = 0;

  for(let i = 0; i<toSearch.length; i++){
    if(toSearch[i] != null){
    if(toSearch[i].searched){
      toSearch[i] = null;
    }
    else{
      tempArray.push(toSearch[i]);
      toSearch[i] = null;
    }
    }
    print("Temp Array: " + tempArray);
    
    for(let i = 0; i < tempArray.length; i++){
      toSearch[i] = tempArray[i];
    }
    print("toSearch: " + toSearch);
  }
/*
  for (let i = toSearch.length-1; i > 1; i--) {
    //print(toSearch[i].x);
    if(toSearch[i].searched == false) {
      tempArray.push(toSearch[i]);
      j++;
      print("TempArrayJ: " + tempArray[0]);
    }
    toSearch[i] = null;
  }
  for (let i = 0; i < tempArray.length; i++) {
    toSearch[i] = tempArray[i];
  }
  //print(tempArray);
  //print(toSearch);
  */
}

function findBestTile() {  //loop to find lowest F from the list, then check it's adj nodes/tiles. 
  let lowestF = 10000;
  let bestTile;
  for (let i = 0; i < toSearch.length; i++) {
    if(toSearch[i] != null){
    if (toSearch[i].f < lowestF) {
      //print("F " + toSearch[i].f);
      lowestF = toSearch[i].f;
      bestTile = toSearch[i];
    }
    }
  }
  return bestTile;
}
