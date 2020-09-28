//Enemy & World Grid Test

//Sprite Methods based on p5.play library's examples section.
var testSprites;
var spriteCycleAnim;
var spriteSheetFull;

function preLoad(){

}

function setup() {
  createCanvas(500,500);
  
  
   testSprites = loadSpriteSheet('assets/TP_SampleSprites.png',16,16,9); //loads the units on the sheet into a sprite sheet object
   spriteSheetFull = loadImage('assets/TP_SampleSprites.png'); //To see the sheet in its entirety
   spriteCycleAnim = loadAnimation(testSprites);
}


function draw() {
  clear(); //I think this resets the screen, rather than drawing over it repeatedly. Allows for animations.
  background(245);
  //image(spriteSheetFull, 20,20,48,48);
  
  //testSprites.drawFrame(0,25,25);
  testSprites.drawFrame(0,25,25); //The Coordinates are on the spritesheet, not the overworld, because it can't identify an index 0. Not how it names things in the loaded spritesheets. Look into a JSON?
  testSprites.drawFrame(2,75,25);
  testSprites.drawFrame(3,100,25);
  testSprites.drawFrame(4,125,25);
  testSprites.drawFrame(5,150,25);
  testSprites.drawFrame(6,175,25);
  testSprites.drawFrame(7,200,25);
  testSprites.drawFrame(8,225,25);
  
  /*for(var i = 0; i < 9;i++){
    testSprites.drawFrame(,i,20);
  }*/
}
    
  
    
