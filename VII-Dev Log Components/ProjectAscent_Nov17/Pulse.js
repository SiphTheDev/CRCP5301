class Pulse {
  constructor(x, y, sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.timer = 0;// will only need timer for animation placed over it, not actual hitbox. Even then, maybe just use a non-looping gif.
    this.size = 200;
    this.type = 1;
    this.phase = 0;
    this.isSpreading = true;
  }

  //move() { //always calling move, but only does something if the pulse isSpreading.
    
  //}

  render(){if(this.isSpreading){
      this.phase ++;
      imageMode(CENTER, CENTER);
      image(this.sprite[this.phase], this.x, this.y, this.size, this.size);
       if(this.phase > 3){
         this.phase = 0;
         this.isSpreading = false;
       }
    }
    //fill(255);
    //ellipseMode(CENTER);
    //ellipse(this.x, this.y, this.size);
    //noLoop();
    //image(this.sprite, );
    //image(); - use a gif [noLoop]
    print("rendering Pulse");
  }
}
