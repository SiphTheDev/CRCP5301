class Button {
  constructor( x, y, sizeX, sizeY, img, text = '', textSize = 25) { //setting default text, textSize & textColor if not specified elsewhere.
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.img = img;
    this.text = text;
  }

  clicked() { //returns true if button clicked.    
    let isClicked = false;
    if (mouseX > this.x - this.sizeX/2 && mouseX < this.x + this.sizeX/2 && mouseY > this.y - this.sizeY/2 && mouseY < this.y + this.sizeY/2) {
      isClicked = true;
    }
    return isClicked;
  }

  render() { //draw the button with the image in it & text
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.sizeX, this.sizeY);
    
    textAlign(CENTER, CENTER); //aligns vertically & horizontally.
    textSize(this.textSize);
    fill(255);
    textSize(45);
    textFont(menuFont);
    text("tesstText", this.x, this.y);
    //print(text);
  }
}
