//Enemy & World Grid Test

let backgroundImg;
let tileSheet;

let tile_frames = [
  {'name':'tile_01', 'frame':{'x':0, 'y': 0, 'width': 48, 'height': 48}},
  {'name':'tile_02', 'frame':{'x':49, 'y': 0, 'width': 16, 'height': 16}},
  
];


function preload(){
  backgroundImg = loadImage('assets/LavaCavesPackv1/Background/BG_full.png');
  //tileSheet = loadImage('assets/LavaCavesPackv1/Tileset/Lava_tileset.png');
  lavaTile = loadSpriteSheet('assets/LavaCavesPackv1/Tileset/Lava_tileset.png', tile_frames);


}

function setup() {
  createCanvas(1000,750);
  //frameRate(3); //So I can actually see what is happening.

 
}


function draw() {
  //clear(); //Clears the screen between draw calls.
  background(200);
  
  image(backgroundImg, 0, 0, 1000, 750); //myImage, xPos, yPos, width (zero = scale proportionally), height); //To Scale proport, then grow, scale first, then draw the new grown one. 
  lavaTile.drawFrame('tile_01',25,25,48,48);
 
  
//Don't rescale automatically. Either do it in another program before loading, or else copy stuff over pixel by pixel, 1 to 4 or something (do the first one, not the second).
}    
  
    
