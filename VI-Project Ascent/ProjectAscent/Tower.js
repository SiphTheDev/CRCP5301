class Tower {

  constructor(node, type = 0) { //defaults to type 0? Or ALWAYS type 0. Will need to see if it can be overwritten. 
    this.node = node;
    this.type = type;
    //In future: this.type = type. Will determine what sort of tower will be placed: short range and fast, or long range but slow & strong, or a laser that doesn't aim, but goes long range. 
  }

  render() {
    if (this.type == 1) {
      fill(150, 150, 20);
    } else {
      fill(255); //generic
    }
    rectMode(CORNERS);
    rect(this.node.x + 5, this.node.y + 5, this.node.x + 45, this.node.y + 45);
    //in future: image(vals to get image from sprite sheet, scale it, and place it here.).
  }
  
  attack(enemyArray){ //will be called from main draw loop (or indirectly. Draw may call a fireTowers() method that loops through all these and checks). If frame is correct, will fire.
    let target = null;        //note: bias the check towards greatest Y. //long term could make this player controlled.
    if(enemyArray.length != 0){
    for(let i = enemyArray.length-1; i > -1; i--){
      print("Checking enemy Array: " + dist(this.x, this.y, enemyArray[i].node.x + 25, enemyArray[i].node.y + 25));
      if(dist(this.x, this.y, enemyArray[i].node.x + 25, enemyArray[i].node.y + 25)<=150){
        target = enemyArray[i]; //this *should* target the first enemy in the array, which will generally be in the lead untill paths can be blocked & rerouted. 
        print("target aquired");
      }
    }
  }
    return target;
   
  }
  
}
