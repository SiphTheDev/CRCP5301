class GridSpace {

  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
  }

  render() {
    noStroke();
    if (this.type == 0) { //Empty spaces
      noFill();
    } else if (this.type == 1) { //Borders & Walls
      fill(0, 0, 255);
      //print("A wall");
    } else if (this.type == 2) { //Enemy Terrain
      fill(0, 255, 0);
      //print("FoeSpace");
    } else if (this.type == 3) { //Player Terrain
      fill(255, 0, 0);
      //print("mySpace");
    }
    rect(this.x, this.y, width/28, height/14);

    //For the future: image(gridSpriteSheet, c*100, r*100, 100, 100, 0, 0, 64, 64); //Use r & c to adjust first two vals, leave the 100s alone, the next two 0s will hard code for each 0,1,2,3, then leave the 64s alone
  }
}
