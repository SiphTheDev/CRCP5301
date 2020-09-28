//Enemy & World Grid Test

//Sprite Methods based on p5.play library's examples section.
var pyramid;
var tileSheet;

function preLoad(){
pyramid = loadAnimation('assets/Tp_TriWalk/Tri_Walk_Side_0000.png','assets/Tp_TriWalk/Tri_Walk_Side_0003.png');
}

function setup() {
  createCanvas(500,500);
  //frameRate(3); //So I can actually see what is happening.
  
 
}


function draw() {
  //clear(); //Clears the screen between draw calls.
  background(245); //an off-white
  

  animation(pyramid, 50,50);
}
    
  
    
