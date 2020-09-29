//September 29, 2020
//Code is based on the guide here: https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Static_maps 
let tileSheet;
let worldTileMap;

function preload(){
tileSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
createCanvas(500,500);
worldTileMap = [ 0, 1, 2, 1, 3,
                -1,-1, 2, 2, 3,
                 0, 0, 1, 2, 3,
                -1, 0, 0, 1, 3,
                 0, 0, 1, 2, 3];
                 console.log(worldTileMap);
}


function draw() {
background(255);
image(tileSheet,0,0,50,50,0,0,64,64); 
  // file, screenX,screenY,width on screen, height on screen, file x, file y, file width, file height
}

function drawTileMap(){
  for(let i = 0; i < worldTileMap.length(); i ++){
    //if(
  }
}
