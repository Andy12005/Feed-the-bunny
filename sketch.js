var garden,rabbit;
var gardenImg,rabbitImg;
var apple, apple_png;
var leaf, leaf1_png, leaf2_png;

var gameState = "PLAY";

var invisibleGround;
var puntaje = 0;
var vidas = 3;

function preload(){
  gardenImg = loadImage("garden.png");
 
  rabbitImg = loadImage("rabbit.png");
  
  apple_png = loadImage("apple.png");
  
  leaf1_png = loadImage("leaf.png");
  leaf2_png = loadImage("orangeLeaf.png");
  
}

function setup() {
  
  createCanvas(400,400);

//creating boy running
rabbit = createSprite(180,340,30,30);
rabbit.scale =0.09;
rabbit.addImage(rabbitImg);
  
invisibleGround = createSprite(200, 410, 400, 10);
  

  
applesGroup = new Group();
leafGroup = new Group();
}


function draw() {
  background(gardenImg);
  fill(0);
  text("Puntaje: " + puntaje, 180, 80);
  text("vidas: " + vidas, 180, 95);
  
  edges = createEdgeSprites();
  rabbit.collide(edges);
  rabbit.x = mouseX;
  
  rabbit.setCollider("rectangle", 0, 0, 600, 1200);
  rabbit.debug = true;
  
  if(gameState=== "PLAY") {
    spawnApples();
    spawnLeafs();
  }
  
  if(vidas=== 0) {
    gameState = "gameOver";
  }
  
  if(gameState=== "gameOver") {
    apple.velocityY = 0;
    apple.lifetime = -1;
    leaf.velocityY = 0;
    leaf.lifetime = -1;
    fill(255, 0, 0);
    text("You lose", 180, 190);
    text("Press SPACE to play again", 140, 180);
  }

  if(keyDown("space")) {
    applesGroup.destroyEach();
    leafGroup.destroyEach();
    score = 0;
    vidas = 3;
    gameState = "PLAY";
  }
  

  drawSprites();
}

function spawnApples() {
  if(frameCount % 100 === 0) {
    apple = createSprite(Math.round(random(1,400)), 0, 20, 20);
    apple.addImage("manzana", apple_png);
    apple.scale = 0.07;
    apple.velocityY = 4;
    
    apple.depth = rabbit.depth
    rabbit.depth = rabbit.depth + 1;
    
    applesGroup.add(apple);
  }
  if(rabbit.isTouching(applesGroup)) {
    apple.destroy();
    puntaje = puntaje + 1;
  }
  if(applesGroup.isTouching(invisibleGround)) {
    apple.destroy();
    vidas = vidas - 1;
  }
}




function spawnLeafs() {
  if(frameCount % 120 === 0) {
    leaf = createSprite(Math.round(random(1,400)), 0, 20, 20);
    leaf.scale = 0.1;
    leaf.velocityY = 4;
    
    var leafs = Math.round(random(1,2));
    switch(leafs) {
      case 1: leaf.addImage(leaf1_png);
              break;
      case 2: leaf.addImage(leaf2_png);
              break;
      default: break;
    }
    leaf.depth = rabbit.depth
    rabbit.depth = rabbit.depth + 1;
    
    leafGroup.add(leaf);
  }
  if(rabbit.isTouching(leafGroup)) {
    leaf.destroy();
    vidas = vidas - 1;
  }
  if(leafGroup.collide(invisibleGround)) {
    leaf.destroy();
  }
}
