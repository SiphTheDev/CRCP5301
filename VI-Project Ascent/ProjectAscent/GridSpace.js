class Grid{

  constructor(x,y, type){
    this.x = x;
    this.y = y;
    this.type = type;
  }
  
  render(){
    noStroke();
    if(type == 0){ //Empty spaces
        noFill();
    }
    else if(type == 1){ //Borders & Walls
      fill(0, 0, 255);
    }
     else if(type == 2){ //Enemy Terrain
      fill(0, 255, 0);
    }
     else if(type == 2){ //Player Terrain
      fill(255, 0, 0);
    }

    rect(this.x,this.y,50);
  }
}
