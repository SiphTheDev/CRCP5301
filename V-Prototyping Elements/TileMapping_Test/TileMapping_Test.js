//September 29, 2020
//Code is based loosely on the guide here: https://developer.mozilla.org/en-US/docs/Games/Techniques/Tilemaps/Square_tilemaps_implementation:_Static_maps 
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
//image(tileSheet,0,0,100,100,0,0,64,64); 

/* - These test that tiles are loading the correct files.
image(tileSheet,0,0,100,100,0,0,64,64);
image(tileSheet,100,0,100,100,64,0,64,64);
image(tileSheet,200,0,100,100,128,0,64,64);
image(tileSheet,300,0,100,100,192,0,64,64);
*/

drawTileMap();
  // file, screenX,screenY,width on screen, height on screen, file x, file y, file width, file height
}

function drawTileMap(){
  let i = 0;
  for(let r = 0; r < 5; r++){
    for(let c = 0; c < 5; c++){
      i++;
      if(worldTileMap[i] == 0){
        image(tileSheet,c*100,r*100,100,100,0,0,64,64); //Use r & c to adjust first two vals, leave the 100s alone, the next two 0s will hard code for each 0,1,2,3, then leave the 64s alone
      }
      else if(worldTileMap[i] == 1){
        image(tileSheet,c*100,r*100,100,100,64,0,64,64); 
      }
      else if(worldTileMap[i] == 2){
        image(tileSheet,c*100,r*100,100,100,128,0,64,64); 
      }
      else if(worldTileMap[i] == 3){
        image(tileSheet,c*100,r*100,100,100,192,0,64,64); 
      }
      else{}//In future, set this to a default missing texture file. 
    }
  }
}
