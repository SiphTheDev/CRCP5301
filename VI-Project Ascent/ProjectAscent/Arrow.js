class Arrow {
  constructor(x, y, target) {
    this.x = x;
    this.y = y;
    this.target = target;
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
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, 15);
    //image();
  }
}
