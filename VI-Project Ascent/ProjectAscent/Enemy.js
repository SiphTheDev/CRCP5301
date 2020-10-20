class Enemy {

  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    //Add a path[] attribute which stores the current path this enemy is following.
  }

  render() {
    fill(0, 0, 0);
    ellipse(this.x, this.y, this.r);
  }

  move() { //put pathfind here later.
    this.x ++;
    this.y ++;
  }
}
