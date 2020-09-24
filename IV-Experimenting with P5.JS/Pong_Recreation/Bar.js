class Bar {

    constructor(){
        this.xPos = xPos;
        this.yPos = yPos;
        this.r =r;
        this.b = b;
    }

    drawBar(){
        fill(r,0,b);
        rect(xPos, yPos, 15,75);
    }
}
