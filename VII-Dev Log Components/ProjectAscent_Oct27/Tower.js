class Tower {

  constructor(node, type = 0) { //defaults to type 0? Or ALWAYS type 0. Will need to see if it can be overwritten. 
    this.node = node;
    this.type = type;
    //In future: this.type = type. Will determine what sort of tower will be placed: short range and fast, or long range but slow & strong, or a laser that doesn't aim, but goes long range. 
  }

  render() {
    if (this.type == 1) {
      fill(150, 150, 20);
    } else {
      fill(255); //generic
    }
    rectMode(CORNERS);
    rect(this.node.x + 5, this.node.y + 5, this.node.x + 45, this.node.y + 45);
    //in future: image(vals to get image from sprite sheet, scale it, and place it here.).
  }
  
  /*attack{ //will be called from main draw loop (or indirectly. Draw may call a fireTowers() method that loops through all these and checks). If frame is correct, will fire.
    if(checkForEnemyNearby){
      projectileArray.add new Projectile(yadda yadda);
    }
  
  }*/
  
  /*
    checkForEnemyNearby{
      uses dist() to check own coords vs the coords of all enemy units. 
    }
  */
}
