class Arrow{
 constructor(x, y, target){
   this.x = x;
   this.y = y;
   this.target = target;
 }
 
 move(){
   if(this.target.node.x+25 > this.x){
     this.x++;
   }else if(this.target.node.x+25 < this.x){
     this.x --;
   }
   
   if(this.target.node.y+25 > this.x){
     this.y++;
   } else if(this.target.node.y+25 < this.y){
     this.y--;
   }
 }
 
 render(){
   ellipse(this.x, this.y, 20);
   //image();
 }
}
