//Pong Translation Test

    let leftScore = 0;
    let rightScore = 0;

    let leftBar = new Bar(100, 300, 255,0);
    let rightBar = new Bar(700, 300,0,255);
    let ball = new Ball();


function setup() {
  createCanvas(800,600);
  //var canvas = createCanvas(800,600);
  //canvas.parent('sketch-div');
  background(0);
}


function draw() {
        background(0);
        fill(255);
        rect(400,0,2,600);
        noFill();
        stroke(255);
        ellipse(400,300,100,100);
        leftBar.drawBar();
        rightBar.drawBar();
        ball.drawBall();
        ball.move();
        ball.collideCheck(leftBar);
        ball.collideCheck(rightBar);

        if(keyIsPressed) { //Had to change keyPressed to keyIsPressed
            if (key == 'w' && leftBar.yPos > 0) {
                leftBar.yPos -= 5;
            } else if (key == 's' && leftBar.yPos < 525) {
                leftBar.yPos += 5;
            }
            if(key == 'i' && rightBar.yPos > 0){
                rightBar.yPos -=5;
            }
            else if(key == 'k' && rightBar.yPos < 525){
                rightBar.yPos +=5;
            }
        }

        scoreCheck();

        fill(255,0,0);
        text(leftScore, 50,50);
        fill(0,0,255);
        text(rightScore, 750,50);
        fill(255);
        text("w = up, s = down", 100,60);
        text("i = up, k = down", 500,60);
    }
    
    function scoreCheck(){ //fixed capitalization typo
        if(ball.xPos < 0 ){
            rightScore ++;
            ball.xSpeed = -5;
            ball.xPos = 400;
            ball.yPos = 300;
            ball.ySpeed = 0;
            ball.r = 255;
            ball.g = 255;
            ball.b = 255;
        }
        if(ball.xPos > 800){
            leftScore ++;
            ball.xSpeed = 5;
            ball.xPos = 400;
            ball.yPos = 300;
            ball.ySpeed = 0;
            ball.r = 255;
            ball.g = 255;
            ball.b = 255;
        }


    } 
