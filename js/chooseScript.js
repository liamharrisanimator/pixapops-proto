var islandData = [
                {title: 'Adventure Island', img: 'islAdventure.png', x: 8, y: 8 }, 
                {title: 'Playtime Island', img: 'islPlay.png', x: 2, y: 4 }, 
                {title: 'Sleeptime Island', img: 'islSleep.png', x: 4, y: 2 }, 
];
var characterL, characterR, characterU, characterD, currentCharacter;
var standL, standR, standU, standD;
var stage;
var data;
var background;
var score = 0;
var islands = [];
var text = new createjs.Text("Score: " + score, "20px Arial", "#ff7700");
var backImg = new Image();
backImg.src = "img/choose/ocean.jpg";
var scaleContainer = new createjs.Container();
var stageWidth;
var stageHeight;




function init() {
    stage = new createjs.Stage("demoCanvas");
    background = new createjs.Bitmap(backImg);
    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
    setSprites();
    createIslands();
    createAvatar();
    scaleContainer.addChild(background);
    for(var i = 0; i < islands.length; i++) {
        scaleContainer.addChild(islands[i]);
    }
    scaleContainer.addChild(currentCharacter);
    stage.addChild(scaleContainer);
    resize();
    
    ///Event Listeners///
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.addEventListener("tick", stage);
    createjs.Ticker.addEventListener("tick", move);
    createjs.Ticker.addEventListener("tick", islandActions);
    stage.addEventListener("click", function(event) { clickIsland(event) });
    window.addEventListener('resize', resize, false);
    window.addEventListener("click", function(event) {clickIsland(event)});
}
  
 /*-------- SpriteSheet params --------*/
function setSprites () {
    data = {
    character: {
      framerate: 10,
      images: ["img/choose/cam_sprite.png"],
      frames: { width: 136.5, height: 160 },
      animations: {
        standL: 5,
        standR: 9,
        standU: 3,
        standD: 0,
        runL: {
          frames: [1, 5],
        },
        runR: {
          frames: [10, 9],
        },
        runU: {
          frames: [2, 6],
        },
        runD: {
          frames: [4, 8],
        }
      }
    }
  }
}

/* -------- Character Creation -------- */
function createAvatar () { 
    var spriteSheet = new createjs.SpriteSheet(data.character);

    characterL = new createjs.Sprite(spriteSheet, "runL");
    characterR = new createjs.Sprite(spriteSheet, "runR");
    characterU = new createjs.Sprite(spriteSheet, "runU");
    characterD = new createjs.Sprite(spriteSheet, "runD");

    standL = new createjs.Sprite(spriteSheet, "standL");
    standR = new createjs.Sprite(spriteSheet, "standR");
    standU = new createjs.Sprite(spriteSheet, "standU");
    standD = new createjs.Sprite(spriteSheet, "standD");

    currentCharacter = characterD;
    currentCharacter.x = 800;
    currentCharacter.y = 250;
}



/* -------- Island Activity -------- */
function nearIsland() {
  for(var i = 0; i < islands.length; i++) {
    var island = islands[i];
     
    if (island) {
      var distance = Math.sqrt(Math.pow((currentCharacter.x - (island.x + 40)), 2) + Math.pow((currentCharacter.y - island.y), 2));

      if (distance < stageWidth/8) {
        return i;
        console.log(i);
      }
    }
  }
  return 'none';
}

var curTitle;
var activeIsland = null; 

function islandActions() {
    var near = nearIsland()
    if (near != 'none') {
        var curIsland = islands[near];
        curTitle = curIsland.getChildAt(1); 
        curTitle.alpha = 1;
        activeIsland = near;
    }
    else if (nearIsland() == 'none' && curTitle != null){ 
        curTitle.alpha = 0;
        activeIsland = null;
    }
}

function clickIsland (event) { 
    console.log('Clicked', activeIsland);
    if(activeIsland != null) { 
        var testIsland = islandData[activeIsland];
        console.log('trying', testIsland);
        //if
        //window.location.replace("view.html");
    }
}



/* -------- Animation Helpers -------- */
function move(event) {
  if (key.isPressed('left') && currentCharacter.x > -10) {
    changeAnimation(characterL);
    currentCharacter.x -= event.delta/2;

  } else if (key.isPressed('right') && currentCharacter.x < stageWidth) {
    changeAnimation(characterR);
    currentCharacter.x += event.delta/2;

  } else if (key.isPressed('up') && currentCharacter.y > 10) {
    changeAnimation(characterU);
    currentCharacter.y -= event.delta/2;

  } else if (key.isPressed('down') && currentCharacter.y < stageHeight) {
    changeAnimation(characterD);
    currentCharacter.y += event.delta/2;

  } else {
    changeToStanding(currentCharacter);
  }
}

function changeAnimation(character) {
    character.x = currentCharacter.x;
    character.y = currentCharacter.y;
    var curIndex = scaleContainer.getChildIndex(currentCharacter);
    scaleContainer.removeChild(currentCharacter);
    currentCharacter = character;
    currentCharacter.scaleX = 0.6; 
    currentCharacter.scaleY = 0.6; 
    scaleContainer.addChildAt(currentCharacter, curIndex);
}

function changeToStanding(character) {
  switch(character) {
    case characterL:
      changeAnimation(standL);
      break;
    case characterR:
      changeAnimation(standR);
      break;
    case characterU:
      changeAnimation(standU);
      break;
    case characterD:
      changeAnimation(standD);
      break;
  }
}

/* -------- Island Creation -------- */
function createIslands(){
    console.log('creating islands');
    
    for(var i = 0; i < islandData.length; i++) {
        
        var iData = islandData[i];
        var islBitmap = new createjs.Bitmap('img/choose/' + iData.img);
        var title = new createjs.Text(iData.title, "60px Patrick Hand SC", "#ffffff");
        title.textAlign = "center";
        title.alpha = 0;
        island = new createjs.Container(); 
        island.addChild(islBitmap, title);
        island.scaleX = 0.4; 
        island.scaleY = 0.4;
        island.x = stageWidth/iData.x; 
        island.y = stageHeight/iData.y;
        island.regX = 200; 
        island.regY = 100;
        islands.push(island);
    }

    
}



  /* ----------Responsiveness ----------- */ 
function resize() { 
    stage.canvas.width = window.innerWidth;
    stage.canvas.height = window.innerHeight;   
    stageWidth = stage.canvas.width;
    stageHeight = stage.canvas.height;
    var backWidth = background.image.width;  
    var backHeight = background.image.height;  
    var scaleWidth = stageWidth/backWidth;
    var scaleHeight = stageHeight/backHeight;
    if (scaleWidth > scaleHeight) {
        var scaleMaster = scaleWidth;
    }
    else { 
        var scaleMaster = scaleHeight;
    }
    scaleContainer.scaleX = scaleMaster;
    scaleContainer.scaleY = scaleMaster;
}
