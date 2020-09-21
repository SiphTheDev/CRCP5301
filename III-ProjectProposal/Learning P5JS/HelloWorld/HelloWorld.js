function setup() {
createCanvas(1200,600);
miniFoe = new Enemy("Jiom", 1, 125, 500);
//right auti, bottom auto
}


function draw() {
background(250,150,12);
//print("Howdy World!");
//fill(55,250,250);
fill(255);
ellipse(mouseX,mouseY, 50,50);
miniFoe.move();
miniFoe.drawFoe();
}
