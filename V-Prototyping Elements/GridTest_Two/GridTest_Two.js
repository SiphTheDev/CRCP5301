//Enemy & World Grid Test

let backgroundImg;
let tileSheet;


function preload(){
  backgroundImg = loadImage('./assets/LavaCavesPackv1/Background/BG_full.png');
  tileSheet = loadImage('./assets/LavaCavesPackv1/Tileset/Lava_tileset.png');

}

function setup() {
  createCanvas(1000,500);
  //frameRate(3); //So I can actually see what is happening.
  
 
}


function draw() {
  //clear(); //Clears the screen between draw calls.
  background(200);
  
  image(backgroundImg, 0, 0, 150, 150); //myImage, xPos, yPos, width (zero = scale proportionally), height);
  

}
    
  
    
