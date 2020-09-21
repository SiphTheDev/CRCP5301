class Enemy{
    constructor (name, speed, farben, x){
    this.name = name;
    this.speed = speed;
    this.farben = farben;
    this.x = x;
  }
  
  move(){
    this.x += this.speed;
    if(this.speed > width || this.speed < 0){
      this.speed = -this.speed;
    }   
  }
  
  drawFoe(){
    fill(this.farben);
    ellipse(this.x, 250, 25,25);
  }
}
