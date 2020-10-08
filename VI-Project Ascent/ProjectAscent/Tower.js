class Tower {

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
  }

  render() {
    fill(255);
    ellipse(this.x, this.y, this.r, this.r);
  }

}
