var playerlookforward
var playerlookright
var playerlookleft
var groundimg
var evil
var win
var gamestate
var lives
var lifes
var score
var block
var a
var reset
var gamecountry
var song
function preload() {
  playerlookforward= loadImage("sprites/playermid.png")
  playerlookright= loadImage("sprites/playerright.png")
  playerlookleft= loadImage("sprites/playerleft.png")
  groundimg = loadImage("sprites/ground.png")
  evil = loadImage("sprites/evil.png")
  lazer = loadImage("sprites/lazer.png")
  lose = loadImage("sprites/loose.png")
  win = loadImage("sprites/win.png")
  block = loadImage("sprites/block.png")
  reset = loadImage("sprites/restart.png")
  song = loadSound("music/song1.mp3")
}
function setup() {
  createCanvas(400,400);
  groundsprite = createSprite(100,200,200,200)
  groundsprite.addImage(groundimg)
  player=createSprite(50, 200, 50, 50);
  player.addImage(playerlookforward)
  blockDisplay = createSprite(200,-2000,400, 400)
  blockDisplay.addImage(block)
  evilman = createSprite(300,150, 50, 50)
  evilman.addImage(evil)
  laser = createSprite(300,player.y,10,10)
  laser.addImage(lazer)
  winDisplay = createSprite(200,2000,400, 400)
  winDisplay.addImage(win)
  loseDisplay = createSprite(200,2000,400, 400)
  loseDisplay.addImage(lose)
  restartDisplay = createSprite(358,376,96,48)
  restartDisplay.addImage(reset)
  gamestate=0
  gamecountry=0
  lives=5
  lifes=1
  score=0
  a=0
  song.play()
}

function draw() {
  background(55,55,55);
  if(gamecountry===0){
  if(gamestate===-2){
    lives=10
    gamestate=-3
  }  
  if(keyDown(RIGHT_ARROW)){
    player.x=player.x+4
  }
  if(keyDown(DOWN_ARROW)){
    laser.x=player.x+200
    laser.y=player.y
  }else{
    laser.y=-500
  }
  blockDisplay.velocityY=blockDisplay.velocityY+0.5
  if(frameCount % 100===0 && frameCount>0){
    if(gamestate===1){
      console.log("gamstat1")
    }else{
      blockDisplay.x = player.x
    blockDisplay.velocityY=0
    blockDisplay.x = player.x
    blockDisplay.y=-40
    }
  }
  if(blockDisplay.velocityY>25){
    blockDisplay.velocityY=0
  }
  if(blockDisplay.y>225){
    blockDisplay.x = player.x
    blockDisplay.y=-10000
  }
  if(keyDown(LEFT_ARROW)){
    player.x=player.x-4
  }
  if(keyDown(UP_ARROW) && player.y>199){
  player.velocityY=-10
  }
  player.velocityY=player.velocityY+0.5
  if(player.y>205){
    player.y=205
  }
  if(laser.y>205){
    laser.y=205
  }
  if(laser.y>evilman.y-3 && laser.y<evilman.y+3){
    lives=lives-1
    lifes=lifes-1
    evilman.y=150
    evilman.x=300
  }
  if(lives<0.5 && lifes<10 && gamestate>-0.5){
    gamestate=1
    lifes=lifes+0.1
  }
  console.log(gamestate)
  if(lifes>10){
    gamestate=-5
  }
  if(gamestate===-5){
    winDisplay.y=-200
  }
  if(lifes<0.5 && gamestate===-5){
    gamestate=10
    score=score+1
  }
  if(  player.y>evilman.y-3 && player.y<evilman.y+3 && player.x>evilman.x-3 && player.x<evilman.x+3){
    gamestate=-1
  }
  if(blockDisplay.y>player.y && player.y>200){
    blockDisplay.y=player.y-0.1
  }
  if(blockDisplay.y>player.y-1){
    console.log("ded")
    if(blockDisplay.x+5>player.x){
      console.log("not ded")
      if(blockDisplay.x-5<player.x){
        console.log("foot")
        if(gamestate===1){
          console.log("you won so you cant lose")
        }else{
        gamestate=-1
        }
      }
    }
  }
  if(player.x>400){
    player.x=0
    groundsprite.x=groundsprite.x+40
    evilman.x=evilman.x-400
    blockDisplay.x=blockDisplay-400
  }
  if(player.x<0){
    player.x=400
    groundsprite.x=groundsprite.x-40
    evilman.x=evilman.x+400
    blockDisplay.x=blockDisplay+400
  }
  if(groundsprite.x>450){
    groundsprite.x=400
  }
  if(groundsprite.x<350){
    groundsprite.x=400
  }
  
  if(lifes>10){
    lifes=10
  }
  ai()
  drawSprites();
  textSize(24)
  if(gamestate===0){
    text("health: " + lives,10,25)
  }
  if(gamestate===0){
    text("score: " + score,250,25)
  }
  if(gamestate===-5){
      text("health: " + lifes,10,25)
      text("score: " + score,250,25)
      }
  if(gamestate===1){
        drawSprites()
        winDisplay.y=200
      }
  if(gamestate===10){
        drawSprites()
        winDisplay.y=200
      }
}
  if(gamestate===-1){
    loseDisplay.y=200
    gamecountry=1
    drawSprites()
  }
    a=a+1
    if(mousePressedOver(restartDisplay)){
      gamecountry=0
      gamestate=0
      loseDisplay.y=2999999
      lives=5
      lifes=0
      score=0
      player.x=100
      player.y=100
      evilman.x=350
      evilman.y=100
      console.log("hi")
    }
}
function ai(){
  evilman.y=evilman.y+1
  if(evilman.y>205){
    evilman.y=205
  }
  if(player.x>evilman.x && evilman.y>204 && gamestate<0.5){
    evilman.x=evilman.x+3
  }
  if(player.x<evilman.x && evilman.y>204 && gamestate<0.5){
    evilman.x=evilman.x-3
  }
  if(player.x>evilman.x-20 && player.y>evilman.y+20 && player.x<evilman.x+20 && player.y<evilman.y-20){
    textSize(100)
    text("HI",200,200)
  }
}
