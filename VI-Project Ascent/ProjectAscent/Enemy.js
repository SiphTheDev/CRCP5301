class Enemy{

  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r; 
  }
  
  render(){
    fill(0);
    ellipse(this.x,this.y,this.r);
  }
  
  move(){
    this.x++;
    this.y++;
  }
  
  
}
