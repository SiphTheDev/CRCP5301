class Bar {

    constructor(xPos, yPos, r, b){
        this.xPos = xPos;
        this.yPos = yPos;
        this.r = r;
        this.b = b;
    }

    drawBar(){
        fill(this.r,0,this.b);
        rect(this.xPos, this.yPos, 15,75);
    }
}
