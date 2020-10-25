//Project Ascent
//Thomas Park
//Fall 2020

/*TODO:  
 next:
 then: C) projectiles (based on enemies actual xy, so that may have to be an attribute of the enemies. 
 -  Maybe have a getter, which calcs the univ x/y coords of the foe based on the node vals and sends that result.) //could also have getter & x/y calc be diff funcs for cleanliness' sake. 
 after: D) Add music & graphics, and sync the wait/timer schedule to the music (manually or otherwise. Will require research. 
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this doc fundamentaly just a scene manager. Treat it as main. 
 */


//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
let score = 0;
let currency = 120;

let towerArray = [];
let enemyArray = [];

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadGridArray();
  
  frameRate(30);
}


function draw() {
  drawGridArray();
  renderTowers();
  renderEnemies();

  if (frameCount%30 == 1) { //occurs once/sec)
    checkEnemyAtGoal(); //done first to catch foes from prev loop. Gives players one more second to catch stragglers.
    moveEnemies();
  }
  if (frameCount%90 == 1){ //occurs once/3 sec
      enemyArray[enemyArray.length] = new Enemy(gridArray[13][0], gridArray[13][5], 25, gridArray); 
      enemyArray[enemyArray.length-1].loadPath(); //to do this dynamically, put elsewhere & load all enemy paths simultaneously.
  }
  //drawGridArray(); - for the future.
}

function renderTowers() {
  for (let i = 0; i < towerArray.length; i++) {
    towerArray[i].render();
  }
}

function renderEnemies(){
    for (let i = 0; i < enemyArray.length; i++) {
    enemyArray[i].render();
  }
}

function moveEnemies(){
  for(let i = 0; i < enemyArray.length; i++){
    enemyArray[i].move();
  }
}

function checkEnemyAtGoal(){
    for (let i = 0; i < enemyArray.length; i++) {
      if (enemyArray[i].node == gridArray[13][5]) {//should consider making the goal a global (or at least level-wide) in scope.
      //print("An enemy has reached the end.");
      //print("About to toss: " + enemyArray[i].node.c + ", " + enemyArray[i].node.r);
      removeEnemy(enemyArray[i]);
      score -= 10;
    }
  }
}

function removeEnemy(enemyToDrop) { //uses splice to take one space and replace it with nothing as a means of removing a specified item from the array.  
    //print("tossing: " + enemyToDrop.node.c + ", " + enemyToDrop.node.r);
    for (let i = 0; i < enemyArray.length; i++) { 
      if(enemyArray[i].node.c == enemyToDrop.node.c && enemyArray[i].node.r == enemyToDrop.node.r){
        enemyArray.splice(i, 1);
        i--;      
      }
    }
}



function createTileMap() { //temp until put this data in a json or elsewhere. //maybe make this a 2d array in future?
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
        farbe = color(255, 0, 0);
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

function mouseClicked() {
  //print("clicked at: " + mouseX + ", " + mouseY);

  for (let i = 0; i< gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      if (mouseX > gridArray[i][j].x && mouseX < (gridArray[i][j].x+(width/28)) && mouseY > gridArray[i][j].y && mouseY < (gridArray[i][j].y+(height/14))) {
        //print("You clicked " + i + ", " + j + " !"); 
        if (gridArray[i][j].type == 3) {
          if (!gridArray[i][j].hasTower) {
            //print("Placing Tower!");
            towerArray[towerArray.length] = new Tower(gridArray[i][j]);
            gridArray[i][j].hasTower = true;
            //print("new tower is at: " + i + ", " + j);
          } else if (gridArray[i][j].hasTower) {
            //print("Removing Tower!");
            removeTower(gridArray[i][j]);//A loop to search tower array, and remove only the tower at said coords - maybe make that its own func.
            gridArray[i][j].hasTower = false;
            //print(towerArray);
          }
        }
      }
    }
  }
}

function removeTower(towerToDrop) { //uses splice to take one space and replace it with nothing as a means of removing a specified item from the array.  
    for (let i = 0; i < towerArray.length; i++) { 
      if(towerArray[i].node.c == towerToDrop.c && towerArray[i].node.r == towerToDrop.r){
        towerArray.splice(i, 1);
        i--;      
      }
    }
}
