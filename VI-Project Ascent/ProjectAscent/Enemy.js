class Enemy {

  constructor(node, goal, r, gridArray){//, pathFinder = new Pathfinder(gridArray)) {
    this.node = node;
    this.goal = goal;
    this.r = r;
    this.path = []; //stores the current path this enemy is following.
    this.pathFinder = new Pathfinder(gridArray);
  }

  render() {
    fill(0, 0, 0);
    ellipse(this.node.x + 25, this.node.y + 25, this.r);
    //print("X: " + this.node.c + " Y: " + this.node.r);
    //print("rendered foe");
  }
  
  loadPath(){
    this.path = this.pathFinder.pathFind(this.node,this.goal);
    //print(this.path);
    //print("loaded foe path");
  }

  move() { //put pathfind here later.
  let tempLength = this.path.length;
    if(this.path.length > 0){
      this.node = this.path[this.path.length-1]; //so this, when set to path.length, hit an empty spot one past the end. 
      this.path.length = tempLength -1;

    }
     //print("moved foe");
  }
}
