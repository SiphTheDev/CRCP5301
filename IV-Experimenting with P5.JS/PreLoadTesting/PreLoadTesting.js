let song;
let img;

function preload(){
song = loadSound('assets/GDM_Stinger7.mp3');
img = loadImage('assets/7Souls_Crab1.png');
}

function setup() {
song.loop();
createCanvas(500,500);
background(0,150,150);
img.loadPixels();
}


function draw() {
image(img,50,50,50,50);
//song.play();
}

function mousePressed(){
song.play();
background(0);
}
