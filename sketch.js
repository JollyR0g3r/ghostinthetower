var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghostImg, ghost;

var gameState = "PLAY";

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  doorsGroup = new Group();
  climbersGroup = new Group();
  ghostImg = loadAnimation("ghost-jumping.png","ghost-standing.png");
}

function setup() {
  createCanvas(600, 600);

  tower = createSprite(300, 300);
  tower.addImage("tower", towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addAnimation("ghost1",ghostImg);
}

function draw() {
  background(0);

  if(gameState === "PLAY"){
    
  if (tower.y > 400) {
    tower.y = 300;
  }

  if(keyDown("left_arrow")){
    ghost.x = ghost.x-3;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+3;
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }

  ghost.velocityY = ghost.velocityY+0.8;
  
  spawnDoors();
    
    if(ghost.y > 600){
      ghost.destroy();
      gameState = "END";
    }
    
    drawSprites();
  }
  
  if(gameState === "END"){
    fill("yellow");
    textSize(30);
    text("GAME OVER",230,250);
  }
}

function spawnDoors() {
  //escribe aquí el código para aparecer las puertas en la torre
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    door.addImage(doorImg);
    door.velocityY = 1;
    door.x = Math.round(random(120, 400));
    door.lifetime = 800;
    doorsGroup.add(door);

    var climber = createSprite(200, 10);
    climber.addImage(climberImg);
    climber.velocityY = 1;
    climber.x = door.x;
    climber.lifetime = 800;
    climbersGroup.add(climber);
    
    ghost.depth = door.depth;
    
    ghost.depth += 1;
  }
}
