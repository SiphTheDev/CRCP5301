class Pulse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 0;// will only need timer for animation placed over it, not actual hitbox. Even then, maybe just use a non-looping gif.
    this.size = 175;
    this.type = 1;
    //this.isSpreading = false;
  }

  //move() { //always calling move, but only does something if the pulse isSpreading.
  //  if(this.isSpreading){
  //  if(this.timer < 60){
  //    this.size += 3;
  //        this.timer++;    
  //  } else{
  //    this.timer = 0;
  //    this.isGoing = false;
  //  }
  //}
  //}

  render(){
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, this.size);
    //image(); - use a gif [noLoop]
  }
}
