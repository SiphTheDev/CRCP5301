class Enemy {

  constructor(node, goal, r, gridArray, path = null, pathFinder = new Pathfinder(gridArray)) {
    this.node = node;
    this.goal = goal;
    this.r = r;
    this.path = path; //stores the current path this enemy is following.
    this.pathFinder = pathFinder;
  }

  render() {
    fill(0, 0, 0);
    ellipse(this.node.x + 25, this.node.y + 25, this.r);
  }
  
  loadPath(){
    this.path = this.pathFinder.pathFind(this.node,this.goal);
  }

  move() { //put pathfind here later.
    //this.node.x ++;
    //this.node.y ++;
  }
}

/*Notes on what to do next: 
A)
 1) Make Pathfind a separate object. (Check video on how to do this. Can you do it in separate file. If not, just make it a class).
 2) Call it here, rather than in the main file, using something like the tentatibe loadPath method above. 
     //Note, you may need to pass the whole gridArray[] through this to do it. See if you can pull it right from the main file into pathfind without passing it through several layers. 
           Maybe a gridArray.get? that would have to be in an obj, though.
 3) Once that works, have move  call it in setup or on a mousePress to test!
 4) Then, make something in main that controls the pace of gameplay using wait or some other time metric (see what p5 has to offer). Set move to trigger once this occurs. 
 5) Later, create a score val in main, and have it tic if an enemy reaches the end space. 
 
B)
 i) Only then, once all that is in place, begin to add player towers. 
   - I don't think any of this is too bad with messy solutions, but a smidge o' research may be necessary to do it nicely.
   - Use @8 pathfinding sample for mousePressed options.
C)  
 i) After player towers, projectiles (based on enemies actual xy, so that may have to be an attribute of these. 
     Maybe have a getter, which calcs the univ x/y coords based on the node vals and sends that result.) //could also have getter & x/y calc be diff funcs for cleanliness' sake.     
D)
 i) Add music & graphics, and sync the wait/timer schedule to the music (manually or otherwise. Will require research. 
 
*/
