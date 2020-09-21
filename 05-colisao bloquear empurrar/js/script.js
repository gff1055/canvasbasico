
(function(){
	
	//variaveis
	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");
	
	//teclas
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

	// movimentos
	var mvLeft = mvUp = mvRight = mvDown = false;

	// arrays
	var sprites = [];
	var blocks = [];

	// objetos
	var character = new Sprite(50,175,50,50,"#00f");
	character.speed = 4;
	sprites.push(character);


	// blocos

	var block1 = new Sprite(500,100,50,50,"#f00");
	sprites.push(block1);
	blocks.push(block1);

	var block2 = new Sprite(200,300,100,50,"#8b6914");
	sprites.push(block2);
	blocks.push(block2);

	var block3 = new Sprite(50,100,20,150,"7f7f7f");
	sprites.push(block3);
	blocks.push(block3);

	
	//entradas
	
	window.addEventListener("keydown", function(e){
		var key = e.keyCode;
		
		switch(key){

			case LEFT:
				mvLeft = true;
				break;
			
			case UP:
				mvUp = true;
				break;
			
			case RIGHT:
				mvRight = true;
				break;
			
			case DOWN:
				mvDown = true;
				break;
		}

	}, false);


	window.addEventListener("keyup", function(e){
		var key = e.keyCode;
		
		switch(key){

			case LEFT:
				mvLeft = false;
				break;
			
			case UP:
				mvUp = false;
				break;
			
			case RIGHT:
				mvRight = false;
				break;
			
			case DOWN:
				mvDown = false;
				break;
		}

	}, false);

	// funcoes
	function loop(){
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}

	function update(){
		if(mvLeft && !mvRight){
			character.posX -= character.speed;
		}

		if(mvRight && !mvLeft){
			character.posX += character.speed;
		}

		if(mvUp && !mvDown){
			character.posY -= character.speed;
		}

		if(mvDown && !mvUp){
			character.posY += character.speed;
		}

		// Limites da tela
		character.posX = Math.max(0, Math.min(cnv.width - character.width, character.posX));
		character.posY = Math.max(0, Math.min(cnv.height - character.height, character.posY));

		//Colisoes
		for(var i in blocks){
			var blk = blocks[i];
			if(blk.visible){
				blockRect(blk, character);
			}
		}

	}

	function render(){
		ctx.clearRect(0,0,cnv.width,cnv.height);
		for(var i in sprites){
			var spr = sprites[i];
			if(spr.visible){
				ctx.fillStyle = spr.color;
				ctx.fillRect(spr.posX, spr.posY, spr.width, spr.height);
			}
		}
	}

	loop();


}())