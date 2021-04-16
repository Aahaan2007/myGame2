var backgroundImg;
var spaceshipImg;
var alien;
var alienImg;
var shoot;
var flag = 0;
var alienGrp;
var shootGrp;
var score=0;
var lifeline=3;
var gameState=0;

function preload(){
  backgroundImg=loadImage("images/space.jpg");
  spaceshipImg=loadImage("images/spaceship.png");
  alienImg=loadImage("images/alien.png");
  bulletImg=loadImage("images/bullet.png");
}

function setup() {
  createCanvas(600, 600);
  spaceship=createSprite(300, 500, 50, 50);
  spaceship.addImage(spaceshipImg);
  spaceship.scale=0.1
  alienGrp=new Group();
  shootGrp=new Group();
}

function draw() {
  background(backgroundImg);  
  if(gameState===0){
  if(keyDown(LEFT_ARROW)){
    spaceship.x -= 5
  }
  if(keyDown(RIGHT_ARROW)){
    spaceship.x += 5
  }
  if(keyWentDown("space")&& flag===0){
    Shoot();
    flag = 1;
  }

  if(keyWentUp("space")){
   // flag=0;
   setInterval(call, 5000);
    
 function call(){
  flag = 0
}
  }

  spawnAliens();
  for(var i=0; i<alienGrp.length;i++){
  if(alienGrp.get(i).y>545){
    lifeline-=1;
  }
}

  //destroying bullet and alien
for(var i=0; i<alienGrp.length;i++){
  console.log(alienGrp.get(i).y);
  for(var j=0;j<shootGrp.length;j++){
    if(shootGrp.get(j).isTouching(alienGrp.get(i)) && alienGrp.get(i).contains){
      shootGrp.get(j).destroy();
      alienGrp.get(i).destroy();
      score+=1
    }
  }
}
if(lifeline===0){
  gameState=1;
}
  }
  drawSprites();
  if(gameState===1){
    alienGrp.setVelocityYEach(0);
    alienGrp.setLifetimeEach(-1);
    textSize(25);
    fill("white");
    text("Game Over!", 250, 300)
  }

  textSize(30);
  fill("white");
  text("Score: "+ score, 450, 50);
  text("Lifelines: " + lifeline, 50, 50);

}

function Shoot(){
  shoot=createSprite(spaceship.x, spaceship.y, 10, 10);
  shoot.addImage(bulletImg);
  //shoot.debug = true;
  shoot.scale=0.1
  shoot.velocityY=-5;
  shoot.lifetime=100;
  shootGrp.add(shoot);
}

function spawnAliens(){
  if(frameCount%100===0){
  alien=createSprite(random(50, 550), -50, 20, 20);
  alien.addImage(alienImg);
  //alien.debug=true; 
  alien.setCollider("circle", 0, 0, 340);
  alien.scale=0.1;
  alien.velocityY=3+score/15;
  alien.lifetime=200;
  alienGrp.add(alien);
  }
}