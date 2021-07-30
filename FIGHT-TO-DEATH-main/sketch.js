var shield_Img,shark_Img,rock_Img,princebullet_Img,firetorch_Img,enemy_Img
var coin_Img,bullet_Img,air_Img,water_Img,sword_Img,surfboard_Img,spaceCraft_Img,land_Img
var shield,shark,rock,princeBullet,fireTorch,enemy2,enemy1,coin,bullet,sword,surfBoard
var spaceCraft,ground,prince,spaceBullet
var bg,coinGroup,score =0
var gameState="serve"
var themeSound,coinSound,bulletSound,explodeSound
var prince_Img,fireGroup,enemyGroup,rockGroup,bulletGroup
function preload (){
shield_Img=loadImage("shield.png")
shark_Img=loadImage("shark.png")
rock_Img=loadImage("rock.png")
princebullet_Img=loadImage("princebullet.png")
firetorch_Img=loadImage("firetorch.png")
enemy_Img=loadAnimation("enemy2.png","enemy1.png")
coin_Img=loadImage("coin.png")
bullet_Img=loadImage("bullet.png")
air_Img=loadImage("air.jpg")
water_Img=loadImage("water.jpg")
sword_Img=loadImage("sword.png")
surfboard_Img=loadImage("surfboard.png")
spaceCraft_Img=loadImage("spaceCraft.png")
land_Img=loadImage("bg.jpg")
prince_Img=loadImage("princeImg.png")
themeSound=loadSound("ss.mp3")
coinSound=loadSound("s3.wav")
bulletSound=loadSound("s2.wav")
explodeSound=loadSound("s1.wav")
}

function setup(){
createCanvas(1500,600)
bg=createSprite(800,300,100,100)
bg.addImage(land_Img)
bg.scale=2.5
coinGroup=createGroup()
fireGroup=createGroup()
rockGroup=createGroup()
bulletGroup=createGroup()
enemyGroup=createGroup()
ground=createSprite(width/2,580,2000,20)
ground.visible=false
prince=createSprite(100,550,20,20)
prince.addImage(prince_Img)
prince.scale=0.5

}

function draw(){
background(225)
//themeSound.play()
prince.collide(ground)
bg.velocityX=-6
if(bg.x<0){
    bg.x=bg.width/2
}
if(keyDown(DOWN_ARROW)){

    prince.y=prince.y+10
}
if(keyDown(UP_ARROW)){
    
    prince.y=prince.y-10
}
/*if(keyDown(RIGHT_ARROW)){

    prince.x=prince.x+10
}
if(keyDown(LEFT_ARROW)){
    
    prince.x=prince.x-10
}*/


if(gameState==="serve"){
    spawnLobstacles()
}
if(prince.isTouching(coinGroup)){
    score=score+1
    coinSound.play()
    coinGroup.destroyEach()
}
if(prince.isTouching(fireGroup)){
    fireGroup.destroyEach()
    explodeSound.play()
    gameState="end"

}
if(prince.isTouching(rockGroup)){
    rockGroup.destroyEach()
    explodeSound.play()
    gameState="end"
}
if(prince.isTouching(enemyGroup)){
enemyGroup.destroyEach()
explodeSound.play()
gameState="end"
}

if(bulletGroup.isTouching(enemyGroup)){
    explodeSound.play()
    bulletGroup.destroyEach()
    enemyGroup.destroyEach()
}


spawnCoins()
spawnBullets()
drawSprites()
textSize(25)
fill("red")

text("Score:"+score,100,100)
if(gameState==="end"){
    prince.visible=false 
    coinGroup.destroyEach()
    fireGroup.destroyEach()
    rockGroup.destroyEach()
    enemyGroup.destroyEach()
    fill("red")
    textSize(70)
    text("GAME OVER !!",400,200)
}

}

function spawnLobstacles(){
    if(frameCount%350===0){
        rock=createSprite(1500,585,30,30)
        rock.addImage(rock_Img)
        rock.scale=0.3
        rock.velocityX=-4
        rockGroup.add(rock)
    }
    if(frameCount%200==0){
        fireTorch=createSprite(1500,random(100,500),40,40)
        fireTorch.addImage(firetorch_Img)
        fireTorch.scale=0.1
        fireTorch.velocityX=-7
        fireGroup.add(fireTorch)
    }
    if(frameCount%550==0){
        enemy1=createSprite(1500,520,50,50)
        enemy1.addAnimation("enemy",enemy_Img)
        enemy1.scale=0.4
        enemy1.velocityX=-5
        enemyGroup.add(enemy1)
    }
}
function spawnCoins(){
    if(frameCount%150==0){
        coin=createSprite(1500,random(50,550),20,20)
        coin.addImage(coin_Img)
        coin.scale=0.1
        coin.velocityX=-5
        coinGroup.add(coin)
    }
    
}

function air(){
    spaceCraft=createSprite(width/2,100,50,50)
    spaceCraft.addImage(spaceCraft_Img)
    if(frameCount%2===0){
        spaceBullet=createSprite(random(100,1400),130,20,20)
        spaceBullet.shapeColor="red"
        spaceBullet.velocityX=1
        spaceBullet.velocityY=9
    }
}

function spawnBullets(){
    if(keyDown("s")){
        bulletSound.play()
        princeBullet=createSprite(prince.x+3,prince.y-2,10,10)
        princeBullet.addImage(princebullet_Img)
        princeBullet.scale=0.2
        princeBullet.velocityX=2
        bulletGroup.add(princeBullet)
    }
}