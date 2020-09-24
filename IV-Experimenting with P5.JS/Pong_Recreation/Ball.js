class Ball{

    constructor(){
    this.xPos = 400;
    this.yPos = 300;
    this.xSpeed = 5;
    this.ySpeed = 0;
    this.r = 255;
    this.g = 255;
    this.b = 255;
    }

    drawBall(){
        p.noStroke();
        p.fill(r,g,b);
        p.ellipse(xPos, yPos, 30,30);
    }

    move(){
        xPos = xPos + xSpeed;
        yPos += ySpeed;

        if(yPos > 585 || yPos < 15){
            ySpeed = -ySpeed;
        }

    }

    collideCheck(bar bar){
        if(yPos < bar.yPos + 35 && yPos > bar.yPos && xPos > bar.xPos && xPos < bar.xPos + 15){
            if(xSpeed > 0){
                xSpeed ++;
            }
            else{
                xSpeed --;
            }
            xSpeed = -xSpeed;
            ySpeed = -2;
            if(bar.xPos > 400){
                b = 255;
                r = 0;
                g = 0;
            }
            else if(bar.xPos < 400){
                r = 255;
                b = 0;
                g = 0;
            }
        }
        else if(yPos < bar.yPos + 75 && yPos > bar.yPos + 35 && xPos > bar.xPos && xPos < bar.xPos + 15){
            if(xSpeed > 0){
                xSpeed ++;
            }
            else{
                xSpeed --;
            }
            xSpeed = -xSpeed;
            ySpeed = 2;
            if(bar.xPos > 400){
                b = 255;
                r = 0;
                g = 0;
            }
            else if(bar.xPos < 400){
                r = 255;
                b = 0;
                g = 0;
            }
        }
    }
}
