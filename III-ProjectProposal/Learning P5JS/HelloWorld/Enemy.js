class Enemy {
    constructor (name, speed){
    this.name = name;
    this.speed = speed;
  }
  
  movement(speed){
    if(speed > width || speed < 0){
      speed = -speed;
    }
  }
}
