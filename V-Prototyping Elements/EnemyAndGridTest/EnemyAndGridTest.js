//Enemy & World Grid Test

//Sprite sheet loading based on example "Animations - Sprite Sheet" from p5.play library resources:
//Link to example: http://molleindustria.github.io/p5.play/examples/index.html?fileName=animation_sprite_sheet.js

var testSprites;
var spriteSheetFull;

function setup() {
  createCanvas(160,160);
  background(0);
  
   testSprites = loadSpriteSheet('assets/TP_SampleSprites.png',16,16,9); //loads the units on the sheet into a sprite sheet object
   spriteSheetFull = loadImage('assets/TP_SampleSprites.png'); //To see the sheet in its entirety
}


function draw() {
  clear(); //I think this resets the screen, rather than drawing over it repeatedly. Allows for animations.
  image(spriteSheetFull, 20,20,48,48);
}
    
  
    
