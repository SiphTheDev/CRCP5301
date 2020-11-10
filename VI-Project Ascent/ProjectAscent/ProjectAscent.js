//Project Ascent
//Thomas Park
//Fall 2020

/*TODO:  
 next: Add new tower types per written doc.
 then: menu with proper icons. - DON'T PUBLISH WITHOUT CITING MUSIC!!!
 after: add enemy, tower, and projectile graphics. 
 later: refactor some of this, needs help.
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this doc fundamentaly just a scene manager. Treat it as main. 
 */


//let gridSpriteSheet;
let gameState = 0;
let stageSong1;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
let score = 0;
let gold = 120;

let towerArray = [];
let enemyArray = [];
let projectileArray = [];


function preload() {
  gridSpriteSheet = loadImage('assets/dungeonTiles.png');
  stageSong1 = loadSound('assets/Abstraction/PixelWar1.wav');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadGridArray();

  frameRate(30);
}

function createTileMap() { //temp until put this data in a json or elsewhere. 
  let b = 10; //borders
  let e = 20; //enemies
  let p = 30; //players
  gridTileMap = [b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, p, p, p, p, p, p, p, p, p, p, e, e, 
    b, b, p, p, p, p, p, p, p, p, p, p, e, e, 
    b, b, p, p, e, e, e, e, e, e, p, p, e, e, 
    b, b, p, p, e, e, e, e, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    e, e, e, e, e, e, p, p, e, e, p, p, e, e, 
    e, e, e, e, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, p, p, e, e, 
    b, b, p, p, e, e, p, p, e, e, e, e, e, e, 
    b, b, p, p, e, e, e, e, e, e, e, e, e, e, 
    b, b, p, p, e, e, e, e, e, e, p, p, e, e, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b];//Determines what type of tile belongs in each space. Will move to JSON or XML later to allow level loading later.
}

function loadGridArray() { //Once you change the gridTileMap to a JSON, use typeNames instead of these arbitrary numbers? Or still avoid strings? WARNING: Make sure JSON presents it in column chunks, not row chunks.
  let i = 0;
  let type;
  let farbe;
  for (let c = 0; c < cols; c++) {
    gridArray[c] = [];
    for (let r = 0; r < rows; r++) {
      if (gridTileMap[i] == 10) {
        type = 1;
        farbe = color(123,202,137);
      } else if (gridTileMap[i] == 20) {
        type = 2;
        farbe = color(0, 255, 0);
      } else if (gridTileMap[i] == 30) {
        type = 3;
        farbe = color(0, 0, 255);
      }
      gridArray[c][r] = new GridSpace(c, r, c*(width/28), r*(height/14), type, farbe); //if you make the grid only half the screen & need to shift it over, do this here via addition. 
      i++;
    }
  }
}

function drawGridArray() { //Calls the render method within each gridSpace instance.
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      gridArray[i][j].render();
    }
  }
}

function draw() {
  if(gameState == 0){ //gs 0 is Main Menu
    drawMainMenu();
  } else if(gameState == 1){ //gs 1 is Stage 1 
    runStage();
  } else if (gameState == 2){ //gs 2 is Pause Menu
    drawPauseMenu();
  }
}

function drawMainMenu(){
  background(255);
  fill(63,224,208);
  rectMode(CENTER);
  rect(width/2, height/2, 200,100);
  fill(255);
  textAlign(CENTER);
  textSize(45);
  text("Play!", width/2 , height/2);
}

function drawPauseMenu(){
  //background(25,25,25,75);
  //stageSong1.pause();
}

//The bulk of the gameplay begins here: 
function runStage(){
  //stageSong1.play();
  drawGridArray();
  renderTowers();
  renderEnemies();
  //In future: these will be synced with the music.  //reset counter at 1600 for this song? Unsure. Also, can I reset frame count? //Long term, consider separate timers to creaate & to move enemies. 
  //Will pause menu break this? - because still rendering on menu, even as game doesn't move...
  if(frameCount%20 == 1){
    fireTowers();
  }
  if (frameCount%40 == 1) { //occurs once/sec)
    checkEnemyAtGoal(); //done first to catch foes from prev loop. Gives players one more second to catch stragglers.
    moveEnemies();
  }
  if (frameCount%120 == 1) { //occurs once/3 sec
    enemyArray[enemyArray.length] = new Enemy(gridArray[13][0], gridArray[13][13], 25, 0, gridArray);  //(start node, goal node, size, type, gridArray);
    enemyArray[enemyArray.length-1].enemySetUp(); //to do this dynamically, put elsewhere & load all enemy paths simultaneously.
    print("new enemy type: " + enemyArray[enemyArray.length-1].type);
  }
  
  updateProjectiles();
  
  
  fill(255);
  textSize(32);
  text("gold:", 25, 75);
  text(gold, 25,125);
}

function renderTowers() {
  for (let i = 0; i < towerArray.length; i++) {
    towerArray[i].render();
  }
}

function renderEnemies() {
  for (let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].render();
  }
}

function moveEnemies() {
  for (let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].move();
  }
}

function checkEnemyAtGoal() {
  for (let i = 0; i < enemyArray.length; i++) {
    if (enemyArray[i].node == gridArray[13][13]) {//should consider making the goal a global (or at least level-wide) in scope.
      removeEnemy(enemyArray[i]);
      score -= 10;
    }
  }
}

function removeEnemy(enemyToDrop) { //uses splice to take one space and replace it with nothing as a means of removing a specified item from the array.  
  //print("tossing: " + enemyToDrop.node.c + ", " + enemyToDrop.node.r);
  for (let i = 0; i < enemyArray.length; i++) { 
    if (enemyArray[i].node.c == enemyToDrop.node.c && enemyArray[i].node.r == enemyToDrop.node.r) {
      enemyArray.splice(i, 1);
      i--;
    }
  }
}

function fireTowers(){//Call all tower's Attacks. If != null, create a new arrow with the given enemy, and the x & y of the tower. 
  for(let i = 0; i < towerArray.length; i++){
    //print("checkingForTargets");
    let findTarget = towerArray[i].attack(enemyArray); //a) Check if an enemy is within range
    //print(towerArray[i].attack(enemyArray));
    //print("target: " + findTarget);
    if(findTarget != null){
      //print("FoundATarget");
      projectileArray[projectileArray.length] = new Arrow(towerArray[i].node.x + 25, towerArray[i].node.y + 25,  findTarget);
    }
  }  
}

function updateProjectiles(){
  if(projectileArray.length != 0){
    //print("Updating Projectiles!");
    for(let i = 0; i < projectileArray.length; i++){
      // 0) Render all projectiles.
      projectileArray[i].render();
      // 1) Move all projectiles. - Be wary of array being empty - don't check if first elem is null. 
      projectileArray[i].move();
      // 2) Check if a projectile has collided with an enemy 
      if(dist(projectileArray[i].x, projectileArray[i].y, projectileArray[i].target.node.x+25, projectileArray[i].target.node.y+25) <= 25){
        targetHit(projectileArray[i].target, projectileArray[i]);
        //print("TargetDown!");
      }      
    }
  }   
}

function targetHit(target, arrow){//This func will damage the enemy & remove the arrow, and adjust gold & score. Maybe also play a sound effect later.  
  //print("SoonRemovingArrow");
    //Make this a separate function:
    for (let i = 0; i < projectileArray.length; i++) { 
    if (projectileArray.target == target.x) { //if an arrow's target is gone, the arrow also vanishess.
      projectileArray.splice(i, 1);
      i--;
    }
  }
  target.hP --;
  //print(target.hP);
  if(target.hP <= 0){
    print("hp: " + target.hp);
    removeEnemy(target);
    gold += 7;
    score += 25;
  }
}

function mouseClicked() {
if(gameState == 0){ //  gs 0 is main  menu
    if(mouseX < (width/2 + 100) && mouseX > (width/2 - 100) && mouseY < (height/2 + 50) && mouseY > (height/2 - 50)){
      gameState = 1; 
      stageSong1.loop();
      //if(!stageSong1.isPlaying()){}
    }
}else if (gameState == 1){ //  gs 1 is level 1
  //Checks each tile to see if the mouse has been clicked within its bounds.
    
  for (let i = 0; i< gridArray.length; i++) { 
    for (let j = 0; j < gridArray[i].length; j++) {
      if (mouseX > gridArray[i][j].x && mouseX < (gridArray[i][j].x+(width/28)) && mouseY > gridArray[i][j].y && mouseY < (gridArray[i][j].y+(height/14))) {
        //If the tile is type 3 (open to towers), places a tower if space is open and player has enough money.
        if (gridArray[i][j].type == 3) {
          if (!gridArray[i][j].hasTower && gold >= 20) { //Adds a new tower if there isn't one there.
            towerArray[towerArray.length] = new Tower(gridArray[i][j]);
            gridArray[i][j].hasTower = true;
            gold -= 20;
          } else if (gridArray[i][j].hasTower) { //removes a tower if there is one there
            //print("Removing Tower!");
            removeTower(gridArray[i][j]);//A loop to search tower array, and remove only the tower at said coords - maybe make that its own func.
            gridArray[i][j].hasTower = false;
            gold += 10;
          }
        }  else if(gridArray[i][j].c == 0  && gridArray[i][j].r == 0){ //If top left clicked, pauses the game. 
            //put elsewhere in future, doesn't really belong in this else-if nest.       
            //fill(35,35,35, 45);
            //rect(0,0,width, height);
            gameState = 2; //ie paused.                    
        }
      }
    }
  }
}
}

/* In future: function pauseScreen(){
  -hanges game state, so mousePressed will detected buttons on this screen rather than the game grid.
  - renders said buttons:
      - exit to main menu
      - return to game
      - mute sound effects (if they are later implemented). Not sure why you'd do this in a music based game, but who knows. 
}

*/

function removeTower(towerToDrop) { //uses splice to take one space and replace it with nothing as a means of removing a specified item from the array.  
  for (let i = 0; i < towerArray.length; i++) { 
    if (towerArray[i].node.c == towerToDrop.c && towerArray[i].node.r == towerToDrop.r) {
      towerArray.splice(i, 1);
      i--;
    }
  }
}
