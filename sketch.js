
var track,bg;
var bgTrack;
var player;
var spr;


var score,scoreHtml;

function preload()
{
    track = loadImage("./assets/track.jpg");
    playerImg = loadAnimation("./assets/player1.png","./assets/player2.png");
    enemy1Img = loadImage("./assets/enemy1.png");
    enemy2Img = loadImage("./assets/enemy2.png");
    enemy3Img = loadImage("./assets/enemy3.png");
    enemy4Img = loadImage("./assets/enemy4.png");
    enemy5Img = loadImage("./assets/enemy5.png");

    gold_coin = loadImage("./assets/gold.png");
    silver_coin = loadImage("./assets/silver.png");
    bronze_coin =loadImage("./assets/bronze.png");      
}

function setup()
{
  createCanvas(windowWidth,windowHeight);
  
  bgTrack = createSprite(width/2,-height*3,width,-height*4);
  bgTrack.addImage(track);
  //bgTrack.velocityY =5; 
  bgTrack.scale =1; 

  score = 0;
  scoreHtml = createElement("h1");
  scoreHtml.position(width/4-400,100);
  scoreHtml.html("Score: "+score);
 

  finishLine= createSprite(width/3, -height*7.8, width, 100);
  finishLine.visible = false;

  bgTrackLeft= createSprite(width/2, -height*7.8, width/3-50, 100);
  bgTrackLeft.visible = false;

  bgTrackRight= createSprite(width/2, -height*7.8, width/2+300, 100);
  bgTrackRight.visible = false;

  player = createSprite(width/2,height-100,20,20);
  player.addAnimation("playerRun",playerImg);
  player.scale = 0.5; 

  goldcoins = new Group();
  silvercoins = new Group();
  bronzecoins = new Group();

  enemies = new Group();

  var coinPosition = [
    { x: width / 2 + 250, y: height - 700 },
    { x: width / 2 - 250, y: height - 1300 },
    { x: width / 2 , y: height - 1600 },
    { x: width / 2 - 250, y: height - 1900 },
    { x: width / 2, y: height - 2200 },
    { x: width / 2 + 250, y: height - 2400 },
    { x: width / 2 + 200, y: height - 2800  },
    { x: width / 2 + 250, y: height - 3100 },
    { x: width / 2 - 250, y: height - 3400 },
    { x: width / 2 + 250, y: height - 3700 },
    { x: width / 2 , y: height - 3900 },
    { x: width / 2 + 200, y: height - 4300  },
    { x: width / 2 + 250, y: height - 4600 },
    { x: width / 2 - 200, y: height - 4900 },
    { x: width / 2 + 250, y: height - 5200 },
    { x: width / 2 , y: height - 5400 },
    { x: width / 2 + 250, y: height - 5700 },
    { x: width / 2 + 200, y: height - 6200 },
    { x: width / 2 , y: height - 6400 },
    { x: width / 2 + 50, y: height - 6700 },
    { x: width / 2 - 50, y: height - 7000 }
    
  ];

 /* var enemyPosition = [

    { x: width / 2 + 150, y: height -500 },
    { x: width / 2 - 80, y: height - 1000 },
    { x: width / 2 + 150, y: height - 1500 },
    { x: width / 2 - 100, y: height - 2000 },
    { x: width / 2 + 150, y: height - 2500 },
    { x: width / 2 - 100, y: height - 3000 },
    { x: width / 2 + 150, y: height - 3500  },
    { x: width / 2 + 150, y: height - 4000 },
    { x: width / 2 - 100, y: height - 4500 },
    { x: width / 2 + 150, y: height - 5000 },
    { x: width / 2 - 100, y: height - 5500 },
    { x: width / 2 + 100, y: height - 6000  },
    { x: width / 2 - 100, y: height - 6500 },
    { x: width / 2 + 150, y: height - 7000 }
    
  ]
  addSprites(
    enemies,
    14, 
    enemy1Img,   
    0.5,enemyPosition, true);
*/
    addSprites(goldcoins,21,bronze_coin,0.5,coinPosition);

}


function draw()
{
  background(0);
 // image(track, 0, -height*5, width, -height*6);


  //camera.position.x = player.x;

 if(!player.isTouching(finishLine)){
  player.y =player.y -10;
  camera.position.y = player.y;
 }

 if(player.isTouching(goldcoins))
 {
   gold_Coin.remove();
   score=score+20;
 }

 if(player.isTouching(silvercoins))
 {
   silver_Coin.remove();
   score=score+10;
 }

 if(player.isTouching(bronzecoins))
 {
   bronze_Coin.remove();
   score=score+5;
 }
 
  if(bgTrack.y > height)
  {
    console.log(bgTrack.y);
     //bgTrack.velocityY=0;
  }

  if(keyIsDown(LEFT_ARROW) && player.x > width/3-50)
  {
    player.x = player.x-10;
  }
  if(keyIsDown(RIGHT_ARROW) && player.x < width/2+300)
  {
    player.x = player.x+10;
  }


    drawSprites();
}

function addSprites(spriteGroup,numberOfSprites,spriteImage,scale,positions = [], enemyFlag=false)
{
  
    for(var i=0;i<numberOfSprites;i++)
    {
      if(positions.length>0)
      {
        var x = positions[i].x;
        var y = positions[i].y;

        spriteImage = random([gold_coin,silver_coin,bronze_coin]); 
      }
      else
      {
        var x = random(width/2-300,width/2+150);
        var y = random((-height*3)+100,height-400);
      } 

      if(enemyFlag){
        var numberOfEnemies= [4,8,10,15];
        addEnemies(spriteGroup,random(numberOfEnemies),x,y, scale);
      }
      else{
        var sprite = createSprite(x,y,20,20);
        sprite.addImage(spriteImage);
        sprite.scale = scale;
        spriteGroup.add(sprite);
      }
     
        
      
    }
 
}

function addEnemies(spriteGroup,numberOfSprites, x,y, scale){

    var enemy = [enemy1Img,enemy2Img,enemy3Img,enemy4Img,enemy5Img];   
    enemySprImg = random(enemy);
    var itemNumber =0;
    var newY =y;
    //var newX = x;
    var columnIndex =0;
    
    var rowCount= 0;

    if(numberOfSprites>10){
      rowCount = round(numberOfSprites/3);
    }
    else if (numberOfSprites>5){
      rowCount = round(numberOfSprites/2);
    }
    else if(numberOfSprites<5){
      rowCount = numberOfSprites;
    }

    for(var j=0; j<numberOfSprites; j++)
    {       
      
      if(itemNumber < rowCount){
        var sprite = createSprite(x+(itemNumber*40),newY,20,20);
        itemNumber =itemNumber+1;
      }
      else{
        if(j > 0){
          columnIndex= columnIndex+40;
          newY = y-columnIndex;  
        } else{
          newY = y;
        }
        var sprite = createSprite(x,y-columnIndex,20,20);
        itemNumber = 1;
      }
      
      sprite.addImage(enemySprImg);
      sprite.scale = scale;
      spriteGroup.add(sprite);
    }

  
}