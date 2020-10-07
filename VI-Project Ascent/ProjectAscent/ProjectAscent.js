//Project Ascent
//Thomas Park

/*TODO: next: Make a file with classes for player, enemy, and background grid squares. Then adjust loadTileMap to load the classes. (Do a loop that reads the letters & loads the classes?)
 then: Draw the graphics (still rects, for now) through class methods. 
 afterwards: Work on enemy motion - stay within the bounds of their grid-type. - bounce off interior borders for now, as a test?
 later: create a player class & a projectile class similarly. 
 much later: do actual pathfinding &/or projectile tracking. 
 
 */
//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
let jim = new Enemy(200, 200, 25);

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadTileMap();
  drawTileMap();
}


function draw() {
  //background(235);
  //drawTileMap();
  jim.move();
  jim.render();
}

function createTileMap() { //temp until put this data in a json or elsewhere.
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

function loadTileMap() { //Once you change the gridTileMap to a JSON, use typeNames instead of these arbitrary numbers? Or still avoid strings?
  let i = 0;
  let type;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (gridTileMap[i] == 10) {
        type = 1;
      } else if (gridTileMap[i] == 20) {
        type = 2;
      } else if (gridTileMap[i] == 30) {
        type = 3;
      }
      //print("Assigning gridSpace " + i + " of type " + type);
      gridArray[i] = new GridSpace(c*50, r*50, type); //Will this work? Is .i better?
      i++;
    }
  }


}

function drawTileMap() {
     print("Rendering");
  for (let i = 0; i < gridArray.length; i++) {
    gridArray[i].render();
 
  }
     print("Rendered!");
}
