class Arrow {
  constructor(x, y, target, sprite) {
    this.x = x;
    this.y = y;
    this.target = target;
    this.type = 0; //Arrow
    this.sprite = sprite;
  }

  move() {
    for (let i = 0; i < 5; i++) {
      if (this.target.node.x+25 > this.x) {
        this.x++;
      }
      if (this.target.node.x+25 < this.x) {
        this.x --;
      }
      if (this.target.node.y+25 > this.y) {
        this.y++;
      } 
      if (this.target.node.y +25 < this.y) {
        this.y--;
      }
    }
  }

  render() {
    image(this.sprite, this.x, this.y, 15, 15);
    //fill(255);
    //ellipseMode(CENTER);
    //ellipse(this.x, this.y, 15);
    //image();
  }
}
