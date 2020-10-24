//Project Ascent
//Thomas Park

/*TODO: 
 next: Make pathfind it's own file
 then: set it up to be called & stored in each enemy, rather than globally
 after: check the enemy class for what remain to complete it's next phase. There are more notes there. Move them here at some point. 
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this doc fundamentaly just a scene manager. Treat it as main. 
 */


//let gridSpriteSheet;
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;
//let finalPath = [];
//let tempColorAdj = 5;
//let tempFriendAr = [];

//let toSearch = [];

let testJim;

function preload() {
  //gridSpriteSheet = loadImage('assets/dungeonTiles.png');
}

function setup() {
  createCanvas(1400, 700);
  createTileMap();
  loadGridArray();
  testJim = new Enemy(gridArray[5][5], gridArray[7][8], 25, gridArray); 
  drawGridArray();
  testJim.loadPath();

  //pathFind(gridArray[13][0], gridArray[13][13]);
}


function draw() {
  //drawGridArray();
  //testJim.move(); 
  //testJim.render();
  //drawTowerArray();
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
