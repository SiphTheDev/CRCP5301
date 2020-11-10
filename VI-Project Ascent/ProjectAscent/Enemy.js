class Enemy {

  constructor(node, goal, r, type, gridArray) {
    this.node = node;
    this.goal = goal;
    this.r = r;
    this.type = type;
    this.path = []; //stores the current path this enemy is following.
    this.pathFinder = new Pathfinder(gridArray);
    this.hP = 1;
    this.speed = 0;
    //In future: this.type = type. Will determine what sort of enemy will be generated: small & fast, average, slow and higher toughness. - may be better to do this in main, when deciding foeType to spawn.
  }
  
  enemySetUp(){
    if(this.type == 0){ //Basic Unit
      this.hP = 3;
      this.speed = 2; //moves every 2 beats.
      this.loadPath();
    }
  }

  render() {
    fill(0, 0, 0);
    ellipse(this.node.x + 25, this.node.y + 25, this.r);
    //print("X: " + this.node.c + " Y: " + this.node.r);
    //print("rendered foe");
  }

  loadPath() {
    this.path = this.pathFinder.pathFind(this.node, this.goal); 
  }

  move() { //put pathfind here later.
    let tempLength = this.path.length;
    if (this.path.length > 0) {
      this.node = this.path[this.path.length-1]; //so this, when set to path.length, hit an empty spot one past the end. 
      this.path.length = tempLength -1;
    }
  }
}
