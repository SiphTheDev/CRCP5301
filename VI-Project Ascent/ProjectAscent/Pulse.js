class Pulse {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.timer = 0;
    this.size = 0;
    this.isSpreading = false;
  }

  move() { //always calling move, but only does something if the pulse isSpreading.
    if(this.isSpreading){
    if(this.timer < 60){
          this.timer++;
    
    } else{
      this.timer = 0;
      this.isGoing = false;
    }
  }
  }

  render(){
    fill(255);
    ellipseMode(CENTER);
    ellipse(this.x, this.y, size);
    //image();
  }
}
