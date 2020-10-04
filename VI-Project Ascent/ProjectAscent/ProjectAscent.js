//Project Ascent
//Thomas Park

//Remember: Try to have as little code in this file as is reasonable by the end. But refactor later. Functionality 1st


//let gridSpriteSheet;
let gridTileMap = [];
let cols = 28;
let rows = 14;
let jim = new Enemy(200,200, 25);

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  loadTileMap();
}


function draw() {
  background(235);
  drawTileMap();
  jim.move();
  jim.render();
}

function loadTileMap() {
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
                 b, b, b, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, e, p, p, b, b, b,]; //Determines what type of tile belongs in each space. Will move to JSON or XML later to allow level loading later.
}

function drawTileMap() {
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (gridTileMap[i] == 10) { //Borders
        fill(0, 0, 255);
        rect(c*50, r*50, 50, 50);
      } else if (gridTileMap[i] == 20) { // Enemy Terrain
        fill(0, 255, 0);
        rect(c*50, r*50, 50, 50);
      } else if (gridTileMap[i] == 30) { //Player Terrain
        fill(255, 0, 0);
        rect(c*50, r*50, 50, 50);
      } else {
      } //Visible background
      i++;
    }
  }

  /*let i = 0;
   for (let r = 0; r < 15; r++) {
   for (let c = 0; c < 20; c++) {
   
   if (gridTileMap[i] == 0) {
   image(gridSpriteSheet, c*100, r*100, 100, 100, 0, 0, 64, 64); //Use r & c to adjust first two vals, leave the 100s alone, the next two 0s will hard code for each 0,1,2,3, then leave the 64s alone
   } else if (gridTileMap[i] == 1) {
   image(gridSpriteSheet, c*100, r*100, 100, 100, 64, 0, 64, 64);
   } else if (gridTileMap[i] == 2) {
   image(gridSpriteSheet, c*100, r*100, 100, 100, 128, 0, 64, 64);
   } else if (gridTileMap[i] == 3) {
   image(gridSpriteSheet, c*100, r*100, 100, 100, 192, 0, 64, 64);
   } else {
   }//In future, set this to a default missing texture file.
   i++;
   }
   }*/
}
