class Arrow{
 constructor(x, y, target){
   this.x = x;
   this.y = y;
   this.target = target;
 }
 
 move(){
   if(this.target.node.x > this.x){
     this.x++;
   }
   if(this.target.node.x < this.x){
     this.x --;
   }
   
   
   if(this.target.node.y > this.x){
     this.y++;
   } 
   if(this.target.node.y < this.y){
     this.y--;
   }
   print("moving");
 }
 
 render(){
   fill(255);
   //ellipseMode(CENTER);
   ellipse(this.x, this.y, 15);
   //image();
   print("rendering!");
 }
}
