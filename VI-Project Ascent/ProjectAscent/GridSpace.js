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
    imageMode(CORNER);
    //noStroke();
    if (this.type == 0) { //Empty spaces
      noFill();
    }  else if (this.type == 1) { //Borders & Walls
      
      
      if(this.c == 2 && this.r == 0){ //top left corner
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 64, 128, 128);
      } else if(this.c == 25 && this.r == 0){ //top right corner
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 320, 64, 128, 128);
      } else if(this.c == 2 && this.r == 13){ //bottom left corner;
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 384, 128, 128);
      } else if(this.c == 25 && this.r == 13){ //bottom right corner;
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 320, 384, 128, 128);
      } else if (this.c == 2 && this.r > 0) { //left walls
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 0, 256, 128, 128);
      } else if (this.c == 25 && this.r > 0) {//right walls
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 320, 256, 128, 128);
      } else if(this.c > 1 && this.c < 25 && this.r == 0){//top walls
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 128, 64, 128, 128);
      } else if(this.c > 1 && this.c < 25 && this.r == 13){//bottom walls
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 128, 384, 128, 128);
      } else {
        noStroke();
        noFill();
        rectMode(CORNER);
        rect(this.x, this.y, width/28, height/14);
      }
      if(this.c == 2 && this.r == 12){ //exit
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 40, 192, 608, 128, 96);
        print("heyo");
      } else if (this.c == 2 && this.r == 11){
        image(gridSpriteSheet, this.c*50, this.r*50, 50, 50, 192, 512, 128, 96);
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
