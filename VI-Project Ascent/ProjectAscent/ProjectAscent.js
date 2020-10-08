//Project Ascent
//Thomas Park

/*TODO: 
 next: Work on enemy motion - pathfinding
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
  drawGridArray();
  findAdjacent(gridArray[5][5]); //c,r
  print(toSearch);
}


function draw() {
  //drawGridArray();
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
  for (let r = 0; r < rows; r++) {
    gridArray[r] = [];
    for (let c = 0; c < cols; c++) {
      if (gridTileMap[i] == 10) {
        type = 1;
      } else if (gridTileMap[i] == 20) {
        type = 2;
      } else if (gridTileMap[i] == 30) {
        type = 3;
      }
      gridArray[r][c] = new GridSpace(r, c, c*(width/28), r*(height/14), type); //if you make the grid only half the screen & need to shift it over, do this here via addition. 
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
  if (node.r < 13){
    if (gridArray[node.c][node.r+1].type == 2) { //type 2 = enemy terrain.
      toSearch[toSearch.length] = gridArray[node.c][node.r+1];
      fill(255, 255, 255);
      ellipse(gridArray[node.c][node.r+1].x, gridArray[node.c][node.r+1].y, 25);
    }
  }
  if (node.c < 6) {
    if (gridArray[node.c+1][node.r].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c+1][node.r];
      fill(255, 255, 255);
      ellipse(gridArray[node.c+1][node.r].x, gridArray[node.c+1][node.r].y, 25);
    }
  }
  if (node.r > 0) {
    if (gridArray[node.c][node.r-1].type == 2) { 
      toSearch[toSearch.length] = gridArray[node.c][node.r-1];
      fill(255, 255, 255);
      ellipse(gridArray[node.c][node.r-1].x, gridArray[node.c][node.r-1].y, 25);
    }
  }
  if (node.c > 0) {
    if (gridArray[node.c-1][node.r].type == 2) {
      toSearch[toSearch.length] = gridArray[node.c-1][node.r];
      fill(255, 255, 255);
      ellipse(gridArray[node.c-1][node.r].x, gridArray[node.c-1][node.r].y, 25);
    }
  }
}
