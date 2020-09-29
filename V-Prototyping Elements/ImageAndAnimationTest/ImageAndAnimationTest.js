/*
PImage, Pixel, and Sprite Animaton Test
Sep 28,2020
Based on the example on Processing.org here: https://processing.org/examples/animatedsprite.html 
*/
let backGround;
let pyrWalk;

let xPos;
let xSpd;

function preload(){
  backGround = loadImage('assets/PixelArtInfiniteRunnerPack_EderMuniz/Forest_Background.png'); //A Background image of a forest.
  pyrWalk = loadImage('assets/Tri_Walk.gif'); //An animated gif of a Pyramid sort of crawling.
  
  xPos = 10;
  xSpd = 2;
}

function setup() {
createCanvas(950,382);
background(245);
}


function draw() {
  //Step 1: Draw the Background.

  //move pyrWalk at a set speed, bouncing roughly off edges of screen. 
  if(xPos>width || xPos < 0){
    xSpd = -xSpd;
  }
  xPos+= xSpd;
  
  image(backGround, 0, 0, 0, height); //myImage, xPos, yPos, width (zero = scale proportionally), height);
  image(backGround,[sx=50],[sy=50],[sWidth=100],[sHeight=100],[dx=200],[dy=200],[48],[48]); 
  
  //image(img,[sx=0],[sy=0],[sWidth=img.width],[sHeight=img.height],[dx=0],[dy=0],[dWidth],[dHeight]) - Example by Mutawa on p5 github. - https://github.com/processing/p5.js/issues/1567
    // Warning by ogrotten in same thread: s & d inverted now
  image(pyrWalk,xPos,50,100,100);
  
  
}

/*
ToDo in future:
- Practice play, delay, and pause methods with gifs. 
- Practice an array of images. 
- Use pixelArray, get, & set to shift the background image to be centered on the original. 
- Have game scale to window size, without losing its proportions. Neither width nor height should go offscreen. Use the windowWidth, windowHeight, and windowResized() elements.
- Do animated & layered background. Have each elem move up & down in a tiny range usisng similar method as with pyrWalk. 
    - Also add pauses at up & down points, practice music sync.  [delay method has option to delay only certain frames...] 
- On music, if just brute forcing rhythm alignment, then try to reset sync whenever song resets, so that they don't drift too far. 
  
*/
