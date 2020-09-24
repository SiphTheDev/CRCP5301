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
        noStroke();
        fill(this.r,this.g,this.b);
        ellipse(this.xPos, this.yPos, 30,30);
    }

    move(){
        this.xPos = this.xPos + this.xSpeed;
        this.yPos += this.ySpeed;

        if(this.yPos > 585 || this.yPos < 15){
            this.ySpeed = -this.ySpeed;
        }

    }

    collideCheck(bar){
        if(this.yPos < bar.yPos + 35 && this.yPos > bar.yPos && this.xPos > bar.xPos && this.xPos < bar.xPos + 15){
            if(this.xSpeed > 0){
                this.xSpeed ++;
            }
            else{
                this.xSpeed --;
            }
            this.xSpeed = -this.xSpeed;
            this.ySpeed = -2;
            if(bar.xPos > 400){
                this.b = 255;
                this.r = 0;
                this.g = 0;
            }
            else if(bar.xPos < 400){
                this.r = 255;
                this.b = 0;
                this.g = 0;
            }
        }
        else if(this.yPos < bar.yPos + 75 && this.yPos > bar.yPos + 35 && this.xPos > bar.xPos && this.xPos < bar.xPos + 15){
            if(this.xSpeed > 0){
                this.xSpeed ++;
            }
            else{
                this.xSpeed --;
            }
            this.xSpeed = -this.xSpeed;
            this.ySpeed = 2;
            if(bar.xPos > 400){
                this.b = 255;
                this.r = 0;
                this.g = 0;
            }
            else if(bar.xPos < 400){
                this.r = 255;
                this.b = 0;
                this.g = 0;
            }
        }
    }
}
