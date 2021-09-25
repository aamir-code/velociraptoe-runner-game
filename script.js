var dino,dinoImg;
var Ground,InvisibleGround;
var END = 0;
var PLAY = 1;
var gameState = PLAY;
var backgrounds,bgImg;
var cactus1Img,cactus2Img;
var obstacleGroup;
var dino1,dino2,dinoGroup;
var fireBall1,fireBall2,fireGroup;
var time = 0;
var skinButton;
var dinoImg2;

function preload() {
    ground = loadImage("ground.png");
    bgImg = loadImage("bg.png");
    dinoImg = loadImage("dinoR2.gif");
    cactus1Img = loadImage("cactus.png");
    cactus2Img = loadImage("cactus2.png");
    dino2 = loadImage("dinosaur3.png");
    dino1 = loadImage("dinosaur2.gif");
    fireBall1 = loadImage("fireball.png");
    fireBall2 = loadImage("fireball.png");
    dinoImg2 = loadImage("dinoR.gif");
}

function setup() {
    createCanvas(windowWidth,windowHeight);

    backgrounds = createSprite(windowWidth-700,windowHeight-200,10,10);
    backgrounds.addImage(bgImg);
    backgrounds.scale = 2.8;

    dino = createSprite(windowWidth-1320,windowHeight-283,10,10);
    dino.addImage(dinoImg);
    dino.scale = 0.8/3;
    dino.setCollider("circle",0,0,100);
    dino.debug = false;

    Ground = createSprite(windowWidth-900,windowHeight,10,10);
    Ground.addImage(ground);
    Ground.scale = 0.6;
    
    InvisibleGround = createSprite(windowWidth-1320,windowHeight-245,55,30);
    InvisibleGround.visible = false;

    obstacleGroup = createGroup();
    dinoGroup = createGroup();
    fireGroup = createGroup();

    console.log("control the game using the up arrow key");
    console.log("Be aware of fireballs");
    console.log("you can do triple jumps when the fireball comes");

}
function draw() {
    background("lightBlue");

    if(gameState === PLAY) {
    //dino.velocityX = 5;
    Ground.velocityX = -4;

    if(Ground.x === Ground.x) {
        Ground.velocityX = -4;

       
        }
        
        if(Ground.x-150 < 0) {

            Ground.x = Ground.width/4;

        }
        if(keyDown("up")) {
            dino.velocityY = -16;

        }
        if(dino.y < windowHeight) {
            dino.velocityY = dino.velocityY+0.8;

        }

        if(obstacleGroup.isTouching(dino)) {
            gameState = END;
            console.log("you lost at "+time);

        }
        if(dinoGroup.isTouching(dino)) {
            gameState = END;
            console.log("you lost at "+time);

        }
        if(fireGroup.isTouching(dino)) {
            gameState = END;
            console.log("you lost at "+time);
        }
        
        dino.collide(InvisibleGround);
        cactus();
        flyingDino();
        fireThrower();

        if(frameCount%32 === 0) {
            time += 1; 

        }

        console.log("CountDown : "+time);
        
    }else if(gameState === END) {
        dino.velocityX = 0;
        dino.visible = false;
        Ground.velocityX = 0;
        obstacleGroup.setLifetimeEach(-1);
        obstacleGroup.setVelocityXEach(0);

        console.log("you lose");

    }
    
    
    drawSprites();
}
function cactus() {
    if (frameCount % 60 === 0){
        var obstacle = createSprite(windowWidth-800,windowHeight-290);
        obstacle.velocityX = -6;
        
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: obstacle.addImage(cactus1Img);
           break;
           case 2: obstacle.addImage(cactus2Img);
           break;
          default: break;
         }
        
                 
         obstacle.scale = 0.2;
        
         obstacleGroup.add(obstacle);
      }
    
}
function flyingDino() {
    if (frameCount % 150 === 0){
        var dino = createSprite(windowWidth-200,windowHeight-515);
        dino.velocityX = -10;
        
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: dino.addImage(dino2);
           break;
           case 2: dino.addImage(dino1);
           break;
          default: break;
         }
        
                 
         dino.scale = 0.2;
        
         dinoGroup.add(dino);
      }

}
function fireThrower() {
    if (frameCount % 400 === 0){
        var fire = createSprite(windowWidth-110,windowHeight-283);
        fire.velocityX = -15;
        
         var rand = Math.round(random(1,2));
         switch(rand) {
           case 1: fire.addImage(fireBall1);
           break;
           case 2: fire.addImage(fireBall2);
           break;
          default: break;
         }
        
                 
         fire.scale = 0.3;
        
         fireGroup.add(fire);
      }

}
