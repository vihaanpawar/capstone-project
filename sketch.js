var tower,towerImg;
var door,doorImg,doorsGroup;
var climber,climberImg,climbersGroup;
var ghost,ghostImg;
var invisible,invisibleGroup;
var gameState="play";




function preload(){
  towerImg=loadImage("tower.png");
  doorImg=loadImage("door.png");
  climberImg=loadImage("climber.png");
  ghostImg=loadImage("ghost-standing.png");

  climbersGroup=new Group();
  doorsGroup=new Group();
  invisibleGroup=new Group();
}

function setup(){
  createCanvas(600,600);

  tower=createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY=2;

  ghost=createSprite(200,200,50,50);
  ghost.addImage("ghost",ghostImg);
  ghost.scale=0.3;

}

function draw(){
  background(0);
 if (gameState==="play"){

 

  if(tower.y>400){
    tower.y=300;
  }

  if(keyDown("left_arrow")){
    ghost.x=ghost.x-3;
  }

  if(keyDown("right_arrow")){
    ghost.x=ghost.x+3;
  }

  if(keyDown("space")){
    ghost.velocityY=-5;
  }

  ghost.velocityY=ghost.velocityY+0.8;

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }

  if(invisibleGroup.isTouching(ghost)|| ghost.y>600){
    ghost.destroy();
    gameState="end";

  }

  spawnDoor();
  drawSprites();
}
if(gameState==="end"){
  stroke("yellow");
  fill("yellow");
  textSize(30);
  text("gameOver",230,250);
}
}

function spawnDoor(){
  if(frameCount%240===0){
    door=createSprite(200,-50);
    door.addImage("door",doorImg);
    
    climber=createSprite(200,-10);
    climber.addImage("climber",climberImg);

    invisible=createSprite(200,15);
    invisible.width=climber.width;
    invisible.height=2;

    door.x=Math.round(random(120,400));
    climber.x=door.x;
    invisible.x=door.x;

    door.velocityY=2;
    climber.velocityY=2;
    invisible.velocityY=2;

    door.lifetime=800;
    climber.lifetime=800;
    invisible.lifetime=800;

    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleGroup.add(invisible);

    invisible.debug=true;

    ghost.depth=door.depth;
    ghost.depth=ghost.depth+1;
  }

}