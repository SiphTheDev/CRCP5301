//Thomas Park
//Sep 20, 2020
//This is just silliness as I get the hang of P5.JS
function setup() {
createCanvas(1200,600);
miniFoe = new Enemy("Jiom", 5, 180, 500, 500); //initilizes miniFor with a name, speed, color, x pos, and y pos.
//Look into: right auto, bottom auto for screen formatting?
}


function draw() {
background(250,150,12);
//print("Howdy World!");
fill(255); 
ellipse(mouseX,mouseY, 50,50);
miniFoe.update();
}
