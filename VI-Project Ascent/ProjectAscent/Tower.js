class Tower {

  constructor(node, type = 0) { //defaults to type 0? Or ALWAYS type 0. Will need to see if it can be overwritten. 
    this.node = node;
    this.type = type;
  }

  render() {
    if(this.type == 1){fill(150,150,20);}
    else{
      fill(255); //generic
    }
    rectMode(CORNERS);
    rect(this.node.x + 5, this.node.y + 5, this.node.x + 45, this.node.y + 45);
  }

}
