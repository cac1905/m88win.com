var canvas=document.createElement("canvas");
canvas.innerHTML="请使用支持canvas的浏览器查看";
canvas.id="gameCanvas";
var wrap=document.getElementById("wrap");
wrap.appendChild(canvas);
/* 图片src对象 */
var srcObj={
	backgroundSrc:"images/background.png",
    playerSrc:"images/player.png",
    casinoSrc:"images/casino.png",
    stoneSrc:"images/stone.png",
    chipSrc:"images/chip.png",
    raffleSrc:"images/raffle.png",
    rouletteSrc:"images/roulette.png",
    pokerSrc:"images/poker.png"
}

/* 初始化 */
//cnGame.init('gameCanvas',{width:1920,height:400});
cnGame.init('gameCanvas',{width:document.body.clientWidth,height:239});
var gameStart=function(){
	cnGame.loader.start([
	srcObj.backgroundSrc,
    srcObj.playerSrc,
    srcObj.casinoSrc,
    srcObj.stoneSrc,
    srcObj.chipSrc,
    srcObj.raffleSrc,
    srcObj.rouletteSrc,
    srcObj.pokerSrc
	],maryGame);
	//cnGame.input.clearDownCallbacks("enter");//保证只执行一次
}

/* 游戏开始界面对象 */
var menuObj={
	initialize:function(){		
		gameStart();
	}
}

	
/* 游戏对象 */
var maryGame=(function(){
	var spriteList=[];//所有sprite的数组
	var floorY=cnGame.height-30;//地面Y坐标

	/* 玩家对象 */
	var player=function(options){
		this.init(options);	
		this.speedX=0;
		this.preSpeedX=0;
		this.moveSpeed=10;
		this.jumpSpeed=-10;
		this.speedY=0;
		this.moveDir;
		this.isJump=false;
	}
	cnGame.core.inherit(player,cnGame.Sprite);
	player.prototype.initialize=function(){
		/*this.addAnimation(new cnGame.SpriteSheet("playerRight",srcObj.playerSrc,{frameSize:[53,53],loop:true,width:212,height:53}));*/
		this.addAnimation(new cnGame.SpriteSheet("playerRight",srcObj.playerSrc,{frameSize:[53,53],loop:true,width:530,height:53}));
		//this.addAnimation(new cnGame.SpriteSheet("playerRight",srcObj.playerSrc,{frameSize:[50,60],loop:true,width:150,height:60}));
		//this.addAnimation(new cnGame.SpriteSheet("playerLeft",srcObj.playerSrc,{frameSize:[50,60],loop:true,width:150,height:120,beginY:60}));
	}
	player.prototype.moveRight=function(){
		if(cnGame.core.isUndefined(this.moveDir)||this.moveDir!="right"){
			this.moveDir="right";
			this.speedX<0&&(this.speedX=0);
			this.setMovement({aX:10,maxSpeedX:15});
			this.setCurrentAnimation("playerRight");
		}
	}
	player.prototype.moveLeft=function(){
		if(cnGame.core.isUndefined(this.moveDir)||this.moveDir!="left"){		
			this.moveDir="left";
			this.speedX>0&&(this.speedX=0);
			this.setMovement({aX:-10,maxSpeedX:15});
			this.setCurrentAnimation("playerLeft");
		}
	}
	player.prototype.jump=function(){
	if(!this.isJump){
			this.isJump=true;
			this.setMovement({aY:50,speedY:-18});
			if(this.speedX<0){
				this.setCurrentImage(srcObj.playerSrc,100,60);
			}
			else{
				this.setCurrentImage(srcObj.playerSrc,100);
			}
		
		}
		else{
			var speedY=this.speedY;
			if(speedY<0){
				speedY-=1;
			}
			this.setMovement({speedY:speedY});
			
		}
	
		
	}
	player.prototype.stopMove=function(){
		if(!this.isJump){
			if(this.speedX<0){
				this.setCurrentImage(srcObj.playerSrc,0,60);
			}
			else if(this.speedX>0){
				this.setCurrentImage(srcObj.playerSrc);
			}	
			this.moveDir=undefined;
			this.resetMovement();
		}
	}
	player.prototype.update=function(){
		player.prototype.parent.prototype.update.call(this);//调用父类update
		
		if(this.isJump){//如果在跳跃中则X加速度为0
			this.setMovement({aX:0});
		}
		if(this.y>=floorY-this.height&&this.speedY>0){
			this.isJump=false;
			this.moveDir=undefined;
			this.y=floorY-this.height
			this.setCurrentImage(srcObj.playerSrc);
			this.speedY=0;
		}
		if(cnGame.input.isPressed("up")){
			this.jump();			
		}
		else if(cnGame.input.isPressed("right")){
			this.moveRight();	
		}
		else if(cnGame.input.isPressed("left")){
			this.moveLeft();
		}
		else{
			this.stopMove();
		}		
	}
	/* 玩家死亡 */
	player.prototype.die=function(){
		alert("U lost!");
		cnGame.loop.end();
	};	
	

	/* 敌人对象 */
	var enemy=function(options){
		this.init(options);
		this.speedX=options.speedX;
	}
	cnGame.core.inherit(enemy,cnGame.Sprite);

	/* 敌人死亡 */
	enemy.prototype.die=function(){
		this.setCurrentAnimation("enemyDie");
		this.hasDie=true;
		this.speedX=0;
	};
	/* 飞弹对象 */
	var bullet=function(options){
		this.init(options);
		this.speedX=options.speedX;
	}
	cnGame.core.inherit(bullet,cnGame.Sprite);	
	
	/* 敌人对象管理器 */
	var enemyManager=(function(){	
		return{
			createEnemy:function(){			
				//alert(spriteList.length);				
				/*var newEnemy=new enemy({src:srcObj.enemySrc,width:50,height:48,x:cnGame.width,y:floorY-48,speedX:-3});
				newEnemy.addAnimation(new cnGame.SpriteSheet("enemyDie",srcObj.enemySrc,{frameSize:[50,48],width:150,height:48}));
				spriteList.push(newEnemy);
				*/
				//alert(spriteList.length);			
			},
			createBullet:function(){
				var randomArr=[45,130,180];
				var ranNum=randomArr[Math.floor(Math.random()*3)];
				var newBullet=new bullet({src:srcObj.bulletSrc,width:56,height:35,x:cnGame.width,y:floorY-ranNum,speedX:-15});
				spriteList.push(newBullet);
				alert(spriteList.length);
			}
			//alert(spriteList.length);
		}
	})();
	
	/* 物体 */
	var stone=function(options){
		this.init(options);
	}
	cnGame.core.inherit(stone,cnGame.Sprite);
	
	/* 玩家与其他游戏元素的碰撞检测 */
	var coliDetect=function(player,spriteList){
			var playerRect=player.getRect();
			var enemyRect;
			
			for(var i=0,len=spriteList.length;i<len;i++){//检测player和物体的碰撞
					if(spriteList[i]!==player&&!spriteList[i].hasDie){
						spriteRect=spriteList[i].getRect();
						if(cnGame.collision.col_Between_Rects(playerRect,spriteRect)){//player和物体发生碰撞
							
							player.isJump=true;
							if(spriteList[i] instanceof stone){
								if(playerRect.bottom>spriteRect.y&&playerRect.y+playerRect.height/2<spriteRect.y){
							//alert('1');
									player.y=spriteRect.y-player.height;	//修正y，使player在物体上，并且不再和物体产生collision	
									spriteList[i].state="on";
									//player.setMovement({speedY:0,aY:0});踩上石头后速度和Y加速度为0
									//player.isJump=false;
									player.moveDir=undefined;												
								}
								else if(playerRect.y<spriteRect.bottom&&playerRect.bottom-playerRect.height/2>spriteRect.bottom){
							//alert('2');
									var speed=player.speedY;//从下往上撞石头则速度取反，弹回
									speed*=-1;
									player.setMovement({speedY:speed});
									player.y=spriteRect.y+spriteRect.height;//修正y
								}								
								else if(player.speedX<0){
							//alert('3');
									player.setMovement({speedX:0,aX:0});
									player.x=spriteList[i].x+spriteList[i].width;			
								}
								else if(player.speedX>0){
							//alert('4');									
									//start jump 遇到障碍物先跳，然后停止跳									
									player.isJump=true;
										//player.setMovement({aY:50,speedY:-18});									
									player.setMovement({speedY:-18,aY:50});	
									//player.jump();
									//spriteList[i].state="on";
									//player.setMovement({speedY:0,aY:0});踩上物体后速度和Y加速度为0
									//player.isJump=false;
									//player.moveDir=undefined;	
									//end jump
								}	
							}						
								
						}
					}		
				}
				for(var i=0,len=spriteList.length;i<len;i++){
					if(spriteList[i] instanceof stone){
						var spriteRect=spriteList[i].getRect();
						//当player离开石头，则恢复向下的重力加速度					
						//if((spriteList[i].state=="on"&&(playerRect.x+playerRect.width<spriteRect.x||playerRect.x>spriteRect.right))&&player.y==spriteRect.y-player.height){
						if((spriteList[i].state=="on"&&(playerRect.x+playerRect.width<spriteRect.x||playerRect.x>spriteRect.right))){
							spriteList[i].state=undefined;
							//player.isJump=true;
							player.setMovement({speedY:-3,aY:5});
							//player.setMovement({speedY:-8,aY:11});
						}
					}						
					spriteList[i].update();				
				}	
	}

	return {
		initialize:function(){
			cnGame.input.preventDefault(["left","right","up","down"]);		
			this.player=new player({src:srcObj.playerSrc,width:53,height:53,x:0,y:floorY-53});
			this.player.initialize();
			spriteList.push(this.player);
			
			var newStone;	
			newStone=new stone({src:srcObj.casinoSrc,width:130,height:105,x:150,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.stoneSrc,width:70,height:43,x:800,y:floorY-47});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.pokerSrc,width:106,height:123,x:1400,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.chipSrc,width:146,height:98,x:2100,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.raffleSrc,width:91,height:98,x:2800,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.rouletteSrc,width:103,height:105,x:3500,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.casinoSrc,width:130,height:105,x:4200,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.stoneSrc,width:70,height:43,x:4900,y:floorY-47});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.pokerSrc,width:106,height:123,x:5400,y:floorY-117});
            spriteList.push(newStone);
            newStone=new stone({src:srcObj.chipSrc,width:146,height:98,x:5900,y:floorY-117});
            spriteList.push(newStone);
			
			//this.background=new cnGame.View({src:srcObj.backgroundSrc,player:this.player,imgWidth:2301});
			this.background=new cnGame.View({src:srcObj.backgroundSrc,player:this.player,imgWidth:6311});
			this.background.centerPlayer(true);
			this.background.insideView(this.player,"x");
			this.times=0;
			this.times2=0;
			//enemyManager.createEnemy();
	
		},
		update:function(){			
			coliDetect(this.player,spriteList);
			this.background.update(spriteList);
			
			//start player自动向右移动
			if(cnGame.core.isUndefined(this.player.moveDir)||this.player.moveDir!="right"){
				this.player.moveDir="right";
				this.player.speedX<0&&(this.speedX=0);
				this.player.speedX=5;
				this.player.setMovement({aX:5,maxSpeedX:15});
				//if(this.player.isJump)//{
					this.player.setCurrentAnimation("playerRight");
				//}
			}
			//end
		},
		draw:function(){
			this.background.draw();
			for(var i=0,len=spriteList.length;i<len;i++){
				spriteList[i].draw();
			}
		}	
	}
})();

cnGame.loader.start([srcObj.backgroundSrc],menuObj);
//cnGame.loader.start([srcObj.startSrc],menuObj);
