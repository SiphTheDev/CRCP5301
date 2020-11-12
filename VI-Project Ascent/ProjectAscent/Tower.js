class Tower {

  constructor(type, node) { //defaults to type 0? Or ALWAYS type 0? Will need to see if it can be overwritten. 
    this.type = type;
    this.node = node;

    //In future: this.type = type. Will determine what sort of tower will be placed: short range and fast, or long range but slow & strong, or a laser that doesn't aim, but goes long range.
  }

  render() {
    let size = 0;
    if (this.type == 0) {
      fill(100, 0, 20);
      size = 45;
    } else {
      fill(255); //generic
      size = 25;
    }
    rectMode(CENTER);
    rect(this.node.x + 25, this.node.y + 25, size, size);
    //in future: image(vals to get image from sprite sheet, scale it, and place it here.).
  }

  findTarget(enemyArray) { //will be called from main draw loop (or indirectly. Draw may call a fireTowers() method that loops through all these and checks). If frame is correct, will fire.
    let target = null;        //note: bias the check towards greatest Y. //long term could make this player controlled.
    if (enemyArray.length != 0) {
      for (let i = enemyArray.length-1; i > -1; i--) {   
        if (dist(this.node.x, this.node.y, enemyArray[i].node.x + 25, enemyArray[i].node.y + 25)<=150) {
          target = enemyArray[i]; //this *should* target the first enemy in the array that is within range, which will generally be in the lead untill paths can be blocked & rerouted.
        }
      }
    }
    return target;
  }
} 

//Update: To adjust tower firing settings (& you should seriously refactor this later, btw):
//1) Look at Tower.render. It determines shape, size, & color of towers. 
//2) Look at Main_fireTowers. It determines projectile types & checks for foes within [a currently static]range using the findTarget method above (in Tower). 

//Tower type ideas: a) hit all adj squares. b) fire a straight line in all 4 directions. c) in some way block path. d) Fire a projectile in a random cardinal direction - but very high dmg. 


//Ok, to add tower modularity is going to be a bit of work. 1) Change how calling attacks works in main, as that one assume basic arrow projectile. Should probably be determining projectile
//  type in here, and having the only thing main does be adding whatever the given projectile type is, if that's the type of tower it is. May need diff fire funcs? If(tower.type == x, do x, if y, do y, etc). 
//Then, need to adjust attack here to do more than ident enemy as target, and rename this as findTarget or something. 
