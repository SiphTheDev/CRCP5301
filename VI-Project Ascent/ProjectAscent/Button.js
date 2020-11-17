class Button {
  constructor( x, y, sizeX, sizeY, img, text = "", textSize = 25) { //setting default text, textSize & textColor if not specified elsewhere.
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.img = img;
    this.text = text;
  }

  clicked() { //returns true if button clicked.    
    let isClicked = false;
    if (mouseX > this.x && mouseX < this.x + this.sizeX && mouseY > this.y && mouseY < this.y + this.sizeY) {
      isClicked = true;
    }
    return isClicked;
  }

  render() { //draw the button with the image in it & text
    image(this.img, this.x, this.y);
    rectMode(CORNERS);
    rect(this.x, this.y, this.sizeX, this.sizeY);
    
    textAlign(CENTER); 
    textSize(this.textSize);
    fill(255);
    text(text, (this.x + this.xSize/2), (this.y + this.ySize/2));
  }
}
