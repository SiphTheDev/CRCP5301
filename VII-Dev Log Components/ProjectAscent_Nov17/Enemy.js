class Enemy {

  constructor(node, goal, type, gridArray, spriteAr) {
    this.node = node;
    this.goal = goal;
    this.type = type;
    this.path = []; //stores the current path this enemy is following.
    this.pathFinder = new Pathfinder(gridArray);
    this.spriteAr = spriteAr;
    this.sprite = 0;
    this.hP = 1;
    this.speed = 0;
    this.size = 0;
    //In future: this.type = type. Will determine what sort of enemy will be generated: small & fast, average, slow and higher toughness. - may be better to do this in main, when deciding foeType to spawn.
  }
  
  enemySetUp(){
    if(this.type == 0){ //Basic Unit
      this.hP = 3;
      this.speed = 20; //moves every 2 beats.
      this.sprite = 0;
      this.size = 40;
    }else if(this.type == 1){ //speedy wolf
      this.hP = 2;
      this.speed = 10;
      this.sprite = 1;
      this.size = 30;
    } else if(this.type == 2){ //slow behemoth
      this.hP = 10;
      this.speed = 40;
      this.sprite = 2;
      this.size = 50;
    } //probably also want an "else" with a generic enemy here for future error handling. 
    this.loadPath(); //occurs regardless of type;
  }

  render() {
    imageMode(CORNER);
    image(this.spriteAr[this.sprite], this.node.x, this.node.y, this.size, this.size);
    //fill(0, 0, 0);
    //ellipse(this.node.x + 25, this.node.y + 25, this.r);
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
