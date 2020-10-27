class GridSpace {

  constructor(c, r, x, y, type, farbe, gridFrom = null, Gcost = null, Hcost = null, Fcost = null, searched = false, hasTower = false) {
    this.c = c;
    this.r = r;  
    this.x = x;
    this.y = y;
    this.type = type;
    this.farbe = farbe;
    this.gridFrom = gridFrom;
    this.Gcost = Gcost;
    this.Hcost = Hcost;
    this.Fcost = Fcost;
    this.searched = searched;
    this.hasTower = hasTower;
  } 

  render() {
    //noStroke();
    if (this.type == 0) { //Empty spaces
      noFill();
    } else if (this.type == 1) { //Borders & Walls
      fill(this.farbe);
    } else if (this.type == 2) { //Enemy Terrain
      fill(this.farbe);
    } else if (this.type == 3) { //Player Terrain
      fill(this.farbe);
    }
    rectMode(CORNER);
    rect(this.x, this.y, width/28, height/14);

    image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 0, 64, 64); //Use r & c to adjust first two vals, leave the 100s alone, the next two 0s will hard code for each 0,1,2,3, then leave the 64s alone
  }
}
