//Project Ascent
//Thomas Park

//Remember: Try to have as little code in this file as is reasonable by the end. But refactor later. Functionality 1st


//let gridSpriteSheet;
let gridTileMap = [];

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
}

function loadTileMap(){

  let i = 0;
  for(let r = 0; r < 14; r++){
    for (let c = 0; c < 28; c++){
      gridTileMap[i] = floor(random(0,4));
      i++;
    }
  }
 
  console.log(gridTileMap);
}

function drawTileMap() {
  let i = 0;
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 28; c++) {
      if(gridTileMap[i] == 0){      
        fill(0,0,255);
        rect(c*50, r*50, 50,50);
      } else if (gridTileMap[i] == 1){
        fill(0,255,0);
        rect(c*50, r*50, 50,50);
      } else if (gridTileMap[i] == 2){
        fill(255,0,0);
        rect(c*50, r*50, 50,50);
      } else if (gridTileMap[i] == 3){
        fill(0,0,0);
        rect(c*50, r*50, 50,50);
      } else {}

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
