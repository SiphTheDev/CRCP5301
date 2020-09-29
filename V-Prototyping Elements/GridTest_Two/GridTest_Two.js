//Enemy & World Grid Test

let backgroundImg;
let tileSheet;


function preload(){
  backgroundImg = loadImage('assets/LavaCavesPackv1/Background/BG_full.png');
  //tileSheet = loadImage('assets/LavaCavesPackv1/Tileset/Lava_tileset.png');
  lavaTile = loadSpriteSheet('assets/LavaCavesPackv1/Tileset/Lava_tileset.png', 16, 16, 4);


}

function setup() {
  createCanvas(1000,750);
  //frameRate(3); //So I can actually see what is happening.

 
}


function draw() {
  //clear(); //Clears the screen between draw calls.
  background(200);
  
  image(backgroundImg, 0, 0, 1000, 750); //myImage, xPos, yPos, width (zero = scale proportionally), height); //To Scale proport, then grow, scale first, then draw the new grown one. 
  lavaTile.drawFrame(0,0);
 
  
//Don't rescale automatically. Either do it in another program before loading, or else copy stuff over pixel by pixel, 1 to 4 or something (do the first one, not the second).
}    
  
    
