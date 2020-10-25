//Project Ascent
//Thomas Park

/*TODO:  
 next:B) Only then, once all that is in place, begin to add player towers. 
 - I don't think any of this is too bad with messy solutions, but a smidge o' research may be necessary to do it nicely.
 - Use @8 pathfinding sample for mousePressed options.
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

let testJim; //obviously temp.

let towerArray = [];

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadGridArray();
  testJim = new Enemy(gridArray[13][0], gridArray[13][13], 25, gridArray); 

  testJim.loadPath();
  //print(testJim.path);
  frameRate(30);
}


function draw() {
  drawGridArray();
  testJim.render();
  renderTowers();


  if (frameCount%30 == 1) {
    testJim.move(); 
    if (testJim.node == gridArray[13][13]) {//should consider making the goal a global (or at least level-wide) in scope.
      print("same.");
      score -= 10;
      //later on, you can remove the enemy from the array here.
    }
  }
  //drawGridArray();
}

function renderTowers() {
  for (let i = 0; i < towerArray.length; i++) {
    towerArray[i].render();
    //print("towers rendered!");
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
            print(towerArray);
          }
        }
      }
    }
  }
}

function removeTower(towerToDrop) { //This can NOT be the best way to do this. Ask prof? //USE SPLICE!
  print("trying to remove: " + towerToDrop.c + ", " + towerToDrop.r);
  let startLength = towerArray.length;
  

    
    for (let i = 0; i < startLength; i++) { 
      print("TA.c: " + towerArray[i].c + "TTD.c: " + towerToDrop.c);
      //if(towerArray[i].c == towerToDrop.c)
        print("dropping!");
         //towerArray.splice(i, 1);
        //i--;
      //}
      print("current length: " + towerArray.length);
    }
}
