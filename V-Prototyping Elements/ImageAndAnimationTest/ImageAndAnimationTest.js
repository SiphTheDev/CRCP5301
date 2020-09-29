/*
PImage, Pixel, and Sprite Animaton Test
Sep 28,2020
Based on the example on Processing.org here: https://processing.org/examples/animatedsprite.html 
*/
let backGround;

function preload(){
  backGround = loadImage('assets/PixelArtInfiniteRunnerPack_EderMuniz/Forest_Background.png');
}

function setup() {
createCanvas(950,382);
background(245);
//backGround.loadPixels();
}


function draw() {
  //Step 1: Draw the Background.
  image(backGround, 0, 0, 0, height); //myImage, xPos, yPos, width (zero = scale proportionally), height);
  
  
}

/*
ToDo in future:
- Use pixelArray, get, & set to shift the background image to be centered on the original. 
  
*/
