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
      if (this.c == 2 && this.r > 1) {
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 256, 128, 128);
      } else if (this.c == 25 && this.r > 1) {
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 320, 256, 128, 128);
      } else if(this.c > 2 && this.c < 25 && this.r > 0){
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 128, 64, 128, 128);
      } else if(this.c == 2 && this.r == 1){
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 64, 128, 128);
      } else if(this.c == 25 && this.r == 1){
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 320, 64, 128, 128);
      }else{
        noStroke();
        noFill();
        //fill(this.farbe);
        rectMode(CORNER);
        rect(this.x, this.y, width/28, height/14);
      }
    } else if (this.type == 2) { //Enemy Terrain
      image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 128, 0, 64, 64);
      //fill(this.farbe);
    } else if (this.type == 3) { //Player Terrain
      //fill(this.farbe);
      image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 0, 64, 64); //Use r & c to adjust first two vals, leave the 50s alone, the next two 0s will hard code for each 0,1,2,3, then leave the 64s alone
    }
 
  }
}
