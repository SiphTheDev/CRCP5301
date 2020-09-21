class Enemy{
    constructor (name, speed, farben, x, y){
    this.name = name;
    this.speed = speed;
    this.farben = farben;
    this.x = x;
    this.y = y;
  }
  
  update(){
    this.move();
    this.trackMouse();
    this.drawFoe();
  }
  move(){
    this.x += this.speed;
    if(this.x > width || this.x < 0){
      this.speed = -this.speed;
      this.x += (2 * this.speed);
    }   
  }
  
  trackMouse(){
    if(this.y > mouseY){
      this.y--;
    }
    else if(this.y < mouseY){
      this.y++;
    }
  }
  
  drawFoe(){
    fill(this.farben);
    ellipse(this.x, this.y, 25,25);
  }
}
