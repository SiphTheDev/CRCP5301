//Project Ascent
//Thomas Park
//Fall 2020

/*TODO:  
 
 next: menus (help, credits, pause, gameplay window details, game over screen [score, main menu, replay buttons.]) with proper icons. - DON'T PUBLISH WITHOUT CITING MUSIC!!! 
 then: add win condition: (once health/score displayed, have a check every loop if it <= 0. If yes, change gamestate to a game-over screen, and call a "reset arrays & score/hp/gold" method; Decrement it on enemy collision. 
 after: add enemy, tower, and projectile graphics. 
 ___________________
 beyond then: tweak timings to actually match music, and render smaller foes above larger ones?
 afterwards: adjust sounds to start/stop on menus & have more reasonable volumes, etc. 
 later: refactor some of this, needs help.  - coreCounter instead of frameCount.  - music separate from play button.
 even later:  - fix projectiles, so they don't all vanish when one hits target. - do over weekend?
 
 far beyond: put all this into a new class (lv 1 or gamePlay or the like) & make this doc fundamentaly just a scene manager. Treat it as main. 
 */

//Variables to store images and sounds to be loaded in preload()
  //Gameplay Sprites
let gridSpriteSheet;
let towerSprites = [];
let enemySprites = [];
  //Images for Menus
let menuFont;
let menuBoxGrn;
let menuBoxBrn;
let menuBoxBrdr;
let menuBoxX;
let emptyMenuBox;
let beigeBoard;
let underLine;
let backgroundImg;
  //Music
let stageSong1;

//Determines which screen is displayed
let gameState = 0;

//Store and determine size of gridSpace array
let gridTileMap = []; //placeholder
let gridArray = [];
let cols = 28;
let rows = 14;

//Game stats displayed to player
let towerType = 0;
let hitPoints = 3;
let gold = 120;

//Arrays to store game elements that can be generated and removed
let towerArray = [];
let enemyArray = [];
let projectileArray = [];

//Buttons //TODO - make these not global, somehow, if that's worth doing in this case.
//Main Menu
let titleButton;
let playButton;
let helpButton;
//Stage UI
let goldButton;
let hPButton;
let stgPauseButton;
let towerButton;
let towerAButton;
let towerBButton;
//Help & Credits
let returnMainBtn;
//PauseMenu
let returnPlayBtn;
let pauseToMainBtn;

function preload() {
  //SpriteSheets
  gridSpriteSheet = loadImage('assets/dungeonTiles.png');
  towerSprites[0] = loadImage('assets/CCG_Enemies/Archer/archers.gif'); //archer
  towerSprites[1] = loadImage('assets/CCG_Enemies/Mage/wizards.gif'); //mage
  enemySprites[0] = loadImage('assets/CCG_Enemies/Bandit/bandits.gif'); //basic bandit
  enemySprites[1] = loadImage('assets/CCG_Enemies/Hound/hounds.gif');//wolf
  enemySprites[2] = loadImage('assets/CCG_Enemies/Barbarian/barbs.gif');//barb
  
  backgroundImg = loadImage('assets/EderMuniz_Forest.png');
  menuBoxGrn = loadImage('assets/Karwisch_PXUI/panelGrn.png');
  menuBoxBrn = loadImage('assets/Karwisch_PXUI/panelBrn.png');
  menuBoxBrdr = loadImage('assets/Karwisch_PXUI/checkbox.png');
  menuBoxX = loadImage('assets/Karwisch_PXUI/checkbox_x.png');
  emptyMenuBox = loadImage('assets/Karwisch_PXUI/void.png');
  beigeBoard = loadImage('assets/Karwisch_PXUI/BeigeBoard.png');
  underLine = loadImage('assets/Karwisch_PXUI/UnderLine.png');

  //Fonts
  menuFont = loadFont('assets/Alkhemikal.ttf');

  //Music
  stageSong1 = loadSound('assets/Abstraction/PixelWar1.wav');
}

function setup() {
  createCanvas(1400, 700);
  //Preparing the grid in which the game occurs.
  createTileMap();
  loadGridArray();

  //creating menu buttons
  loadMainMenu();
  loadStageUI();
  loadOtherButtons();

  //setting framerate to keep music synced up with activity
  frameRate(30);
}

function createTileMap() { //temp until put this data in a json or elsewhere. 
  let b = 10; //borders
  let e = 20; //enemies
  let p = 30; //players
  gridTileMap = [ b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, b, b, b, b, b, b, b, b, b, b, b, b, b, 
    b, p, p, p, p, p, p, p, p, p, p, e, e, b, 
    b, p, p, p, p, p, p, p, p, p, p, e, e, b, 
    b, p, p, e, e, e, e, e, e, p, p, e, e, b, 
    b, p, p, e, e, e, e, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    e, e, e, e, e, p, p, e, e, p, p, e, e, b, 
    e, e, e, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, p, p, e, e, b, 
    b, p, p, e, e, p, p, e, e, e, e, e, e, b, 
    b, p, p, e, e, e, e, e, e, e, e, e, e, b, 
    b, p, p, e, e, e, e, e, e, p, p, e, e, b, 
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
        farbe = color(123, 202, 137);
      } else if (gridTileMap[i] == 20) {
        type = 2;
        farbe = color(0, 255, 0);
      } else if (gridTileMap[i] == 30) {
        type = 3;
        farbe = color(0, 0, 255);
      }
      gridArray[c][r] = new GridSpace(c, r, c*(width/28), r*(height/14), type, farbe, gridSpriteSheet); //if you make the grid only half the screen & need to shift it over, do this here via addition. 
      i++;
    }
  }
}

function loadMainMenu() {
  //x, y, sizeX, sizeY, img, font, [optional: text, textSize, textColor]);
  titleButton = new Button(width/2, height/5, 650, 150, menuBoxBrn, menuFont, 'PROJECT ASCENT', 75);
  playButton = new Button(width/2, 2*height/5, 300, 100, menuBoxGrn, menuFont, 'play', 50);
  helpButton = new Button(width/2, 3*(height/5), 300, 100, menuBoxBrn, menuFont, 'help', 50);
  creditsButton = new Button(width/2, 4*(height/5), 300, 100, menuBoxBrn, menuFont, 'credits', 50);
}

function loadStageUI() {
  goldButton = new Button(50, 250, 90, 30, underLine, menuFont, 'Gold', 20, color(165, 113, 78));
  hPButton = new Button(50, 50, 90, 30, underLine, menuFont, 'HP', 20, color(165, 113, 78));
  stgPauseButton = new Button(width-50, height - 50, 150, 150, menuBoxX);
  towerButton = new Button(width - 50, 50, 90, 30, underLine, menuFont, 'Towers', 20, color(165, 113, 78));
  towerAButton = new Button(width - 50, 115, 150, 150, menuBoxBrdr, menuFont, 'Archer', 20, color(165, 113, 78));
  towerBButton = new Button(width - 50, 200, 150, 150, menuBoxBrdr, menuFont, 'Mage', 20);
}

function loadOtherButtons() { //DON'T TEST UNTIL YOU TELL GAME TO RENDER & CHECK THESE!!!
  //Help & Credits Buttons
  returnMainBtn = new Button(width -50, height - 50, 75, 75, menuBoxX);
  //PauseMenu Buttons
  returnPlayBtn = new Button(width/2, 2*(height/5), 300, 100, menuBoxGrn, menuFont, 'Return', 20, color(165, 113, 78));
  pauseToMainBtn = new Button(width/2, 3*(height/5), 300, 100, menuBoxBrn, menuFont, 'Menu', 20, color(165, 113, 78));
}

function draw() {
  if (gameState == 0) { //gs 0 is Main Menu
    drawMainMenu();
  } else if (gameState == 1) { //gs 1 Credits Screen
    drawCreditsMenu();
  } else if (gameState == 2) { //gs 2 is Help Screen
    drawHelpMenu();
  } else if (gameState == 3) { //gs 3 is Pause Screen
    drawPauseMenu();
  } else if (gameState == 4) { //gs 4 is Stage One
    runStage();
  }
}

function drawMainMenu() {
  imageMode(CORNERS);
  background(backgroundImg);
  titleButton.render();
  playButton.render();
  helpButton.render();
  creditsButton.render();
}

function drawCreditsMenu() {
  imageMode(CENTER);
  image(beigeBoard, width/2, height/2, width-200, height);
  returnMainBtn.render();

  fill(255);
  textFont(menuFont);
  rectMode(CENTER);
  textAlign(CENTER, TOP);
  textSize(60);
  text("Credits & Assets", width/2, height/2, width-200, height);

  fill(240);
  textAlign(LEFT, TOP);
  textSize(30);
  text("Game design by Thomas Park at https://povingames.com/blog/category/siphthedev/project-ascent/\nAlkhemikal Font by Jeti at https://fontenddev.com/fonts/alkhemikal/\nBackground Tiles by Daniel Thomas Art at DanielThomasArt@gmail.com\nForest Scene by Eder Muniz at https://www.gamedevmarket.net/member/edermuniz14/\nMusic by Abstraction at http://abstractionmusic.bandcamp.com\nUI Elements by Karwisch at https://karwisch.itch.io/pxui-basic & Kenny Assets at https://kenney.nl\nCharacter Sprites by CleanCutGames at https://cleancutgames.itch.io ", width/2, height/2, width-240, height-140);
}

function drawHelpMenu() {
  imageMode(CENTER);
  image(beigeBoard, width/2, height/2, width-200, height); 

  fill(255);
  textFont(menuFont);
  rectMode(CENTER);
  textAlign(CENTER, TOP);
  textSize(60);
  text("How To Play", width/2, height/2, width-200, height);
  
  fill(240);
  textAlign(LEFT, TOP);
  textSize(20);
  text("Your goal is to prevent any of the enemies from reaching your basecamp.\nTo do this, you can spend gold to place towers along the path that will attack them.\nYou can select different types of towers in the side menu:\nBut watch out! You only have so much gold. If you run out, kill some enemies to get more.\nIf you need a break, press the pause button in the lower right\n\nGood luck out there!", width/2, height/2, width-240, height-140);


  returnMainBtn.render();
}

function drawPauseMenu() { 
  imageMode(CENTER);
  image(beigeBoard, width/2, height/2, width-300, height-100); 



  fill(color(165, 113, 78)); //consider making a "menu text settings" function, with a few presets for diff text types (1 for title, 2 for body, etc).
  textFont(menuFont);
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  textSize(60);
  text("Paused", width/2, (height/5), width, height); 

  returnPlayBtn.render();
  pauseToMainBtn.render();
}

//The bulk of the gameplay begins here: 
function runStage() {
  imageMode(CORNERS);
  background(backgroundImg);
  //stageSong1.play();
  drawGridArray();
  renderTowers();
  renderEnemies();
  //In future: these will be synced with the music.  //reset counter at 1600 for this song? Unsure. Also, can I reset frame count? //Long term, consider separate timers to creaate & to move enemies. 
  //Will pause menu break this? - because still rendering on menu, even as game doesn't move...
  //To solve pause menu timing errors, just set an inc, that updates each frame the game is paused. Also make the base frameCount a sep variable, that just increments every frame. Then Either:
  //a) subtract the number of frames of pause menu from the core counter, or...
  //b) Just don't increment your new custom frame count val during pause, or ...
  //c) have different music on pause screen, and somehow have the in-game song pick up where it left off when play begins again. 

  moveEnemies();
  if (frameCount%20 == 1) {
    fireTowers();
  }
  if (frameCount%40 == 1) { //occurs once/sec)
    checkEnemyAtGoal(); //done first to catch foes from prev loop. Gives players one more second to catch stragglers.
  }
  if (frameCount%120 == 1) { //occurs once/3 sec
    enemyArray[enemyArray.length] = new Enemy(gridArray[13][0], gridArray[3][12], int(random(0, 3)), gridArray, enemySprites);  //(start node, goal node, size, type, gridArray);
    enemyArray[enemyArray.length-1].enemySetUp(); //to do this dynamically, put elsewhere & load all enemy paths simultaneously.
    print("new enemy type: " + enemyArray[enemyArray.length-1].type);
  }

  updateProjectiles();

  updateLvUI();
}

function updateLvUI() {  
  stgPauseButton.render();

  imageMode(CENTER);
  image(beigeBoard, width - 50, 200, 90, 300);  
  towerButton.render();
  towerAButton.render();
  towerBButton.render();

  //DisplayGold
  imageMode(CENTER);
  image(beigeBoard, 50, 300, 90, 100);  
  textSize(30);
  fill(205, 127, 50);
  text(gold, 50, 300);
  goldButton.render();

  //Display HP
  imageMode(CENTER);
  image(beigeBoard, 50, 100, 90, 100);
  textSize(50);
  fill(150, 0, 0);
  text(hitPoints, 50, 100);
  hPButton.render();
}

function drawGridArray() { //Calls the render method within each gridSpace instance.
  for (let i = 0; i < gridArray.length; i++) {
    for (let j = 0; j < gridArray[i].length; j++) {
      gridArray[i][j].render();
    }
  }
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

function moveEnemies() { //moves each enemy based on its speed 
  for (let i = 0; i < enemyArray.length; i++) {
    if (frameCount%enemyArray[i].speed == 1) {
      enemyArray[i].move();
    }
  }
}

function checkEnemyAtGoal() {
  for (let i = 0; i < enemyArray.length; i++) {
    if (enemyArray[i].node == gridArray[3][12]) {//should consider making the goal a global (or at least level-wide) in scope.
      removeEnemy(enemyArray[i]);
      hitPoints -= 1;
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

function fireTowers() {//Call all tower's Attacks. If != null, create a new arrow with the given enemy, and the x & y of the tower. 
  for (let i = 0; i < towerArray.length; i++) {
    let target = towerArray[i].findTarget(enemyArray); //a) Check if an enemy is within range
    if (target != null) {
      if (towerArray[i].type == 0) { //for basic towers.
        projectileArray[projectileArray.length] = new Arrow(towerArray[i].node.x + 25, towerArray[i].node.y + 25, target); //basic arrow
      } else if (towerArray[i].type == 1 && frameCount%80 == 1) { //later pass fireTowers the coreCounter, and just use that here.
        projectileArray[projectileArray.length] = new Pulse(towerArray[i].node.x + 25, towerArray[i].node.y + 25); //pulse
      }
    }
  }
}

function updateProjectiles() { //need to work on this for different projectile types - refactor bigtime so don't have to check type before runing - ie consitant method names or sep projecType arrays.
  if (projectileArray.length != 0) { //avoids crash if no projectiles on screen
    for (let i = 0; i < projectileArray.length; i++) {
      // 0) Render all projectiles.
      projectileArray[i].render();
      // 1) Move all projectiles.
      if (projectileArray[i].type == 0) { //arrow
        projectileArray[i].move();
        // 2) Check if a projectile has collided with an enemy 
        if (dist(projectileArray[i].x, projectileArray[i].y, projectileArray[i].target.node.x+25, projectileArray[i].target.node.y+25) <= 5) {
          //removeProjectile(projectileArray[i], projectileArray[i].target);
          //damageFoe(projectileArray[i].target, 1);

          targetHit(projectileArray[i].target, projectileArray[i]);
          //print("TargetDown!");
        }
      } else if (projectileArray[i].type == 1) { //pulse
        for (let j = 0; j < enemyArray.length; j++) {
          print("Pulsed!");
          if (dist(projectileArray[i].x, projectileArray[i].y, enemyArray[j].node.x+25, enemyArray[j].node.y+25) <= 75) {
            damageFoe(enemyArray[j], 1);
          }
        }
        projectileArray.splice(i, 1); //removes pulse.
        i--;
        print("Pulse Done!");
      }
    }
  }
}

function removeProjectile(target, projectile) {
  for (let i = 0; i < projectileArray.length; i++) { 
    if (projectileArray.target == target.x) { //if an arrow's target is gone, the arrow also vanishess.//TODO Why does this work? It absoultely seems like it shouldn't. //Second issue, it shouldn't
      //...remove other projectiles targeting the enemy unless the enemy dies. oh-no. 
      projectileArray.splice(i, 1);
      i--;
    }
  } 
  //damageFoe(target,1);
}

function targetHit(target, arrow) {//This func will damage the enemy & remove the arrow, and adjust gold & score. Maybe also play a sound effect later.  
  removeProjectile(target, arrow);
  damageFoe(target, 1);
}

function damageFoe(target, dmg) {
  target.hP -= dmg;
  //print(target.hP);
  if (target.hP <= 0) {
    print("hp: " + target.hp);
    removeEnemy(target);
    gold += 7;
    //score += 25;
  }
}

function mouseClicked() {
  print("GS: " + gameState);
  if (gameState == 0) { //  gs 0 is Main Menu
    if (playButton.clicked()) {
      gameState = 4; 
      stageSong1.loop();
      //if(!stageSong1.isPlaying()){}
    }
    if (helpButton.clicked()) {
      gameState = 2;
    }
    if (creditsButton.clicked()) {
      gameState = 1;
    }
  } else if (gameState == 1) { //gs 1 is Credits Menu
    drawCreditsMenu();
    if (returnMainBtn.clicked()) {
      gameState = 0;
    }
  } else if (gameState == 2) { //gs 2 is Help Menu
    drawHelpMenu();
    if (returnMainBtn.clicked()) {
      gameState = 0;
    }
  } else if (gameState == 3) { //gs 3 is Pause Menu
    drawPauseMenu();
    if (returnPlayBtn.clicked()) {
      gameState = 4; //will have to make more flexible upon adding more levels.
    }
    if (pauseToMainBtn.clicked()) {
      gameState = 0;
    }
  } else if (gameState == 4) { //  gs 4 is level 1
    //Checks each tile to see if the mouse has been clicked within its bounds.
    if (stgPauseButton.clicked()) {
      gameState = 3;
      print("Paused!");
    }
    for (let i = 0; i< gridArray.length; i++) { 
      for (let j = 0; j < gridArray[i].length; j++) {
        if (mouseX > gridArray[i][j].x && mouseX < (gridArray[i][j].x+(width/28)) && mouseY > gridArray[i][j].y && mouseY < (gridArray[i][j].y+(height/14))) {
          //If the tile is type 3 (open to towers), places a tower if space is open and player has enough money.
          if (gridArray[i][j].type == 3) {
            if (!gridArray[i][j].hasTower && gold >= 20) { //Adds a new tower if there isn't one there.
              towerArray[towerArray.length] = new Tower(towerType, gridArray[i][j], towerSprites);
              gridArray[i][j].hasTower = true;
              gold -= 20;
            } else if (gridArray[i][j].hasTower) { //removes a tower if there is one there
              //print("Removing Tower!");
              removeTower(gridArray[i][j]);//A loop to search tower array, and remove only the tower at said coords - maybe make that its own func.
              gridArray[i][j].hasTower = false;
              gold += 10;
            }
          }
        }
      }
    }
    if (towerAButton.clicked()) { //if user selects an archer tower,
      towerType = 0;
      towerAButton.textColor = color(165, 113, 78);
      towerBButton.textColor = 255;
    }
    if (towerBButton.clicked()) {
      towerType = 1;
      towerBButton.textColor = color(165, 113, 78);
      towerAButton.textColor = 255;
    }
    if (stgPauseButton.clicked()) {
      gameState = 3;
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
