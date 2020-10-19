class GridSpace {

  constructor(c, r, x, y, type, farbe, gridFrom = null, Gcost = null, Hcost = null, Fcost = null, searched = false, myText = ".") {
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
    this.myText = myText;
  } 
  render() {
    //noStroke();
    if (this.type == 0) { //Empty spaces
      noFill();
    } else if (this.type == 1) { //Borders & Walls
      fill(this.farbe);
    } else if (this.type == 2) { //Enemy Terrain
      fill(this.farbe);
    }
    rect(this.x, this.y, width/10, height/10);
    fill(63,224,208);
    //text(this.type.toString(), this.x + (width/20), this.y + (height/20));
    text(this.myText, this.x + (width/20), this.y + (height/20));
 }
}
