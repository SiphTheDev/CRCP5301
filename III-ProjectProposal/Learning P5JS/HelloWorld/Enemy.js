class Enemy {
    constructor (name, speed, farben, x){
    this.name = name;
    this.speed = speed;
    this.farben = farben;
    this.x = x;
  }
  
  move(speed){
    x += speed;
    if(speed > width || speed < 0){
      speed = -speed;
    }   
  }
  
  drawFoe(farben){
    fill(farben);
    ellipse(x, 250, 25,25);
  }
}
