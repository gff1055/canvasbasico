window.onload = function(){
	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");

	var spriteSheet = new Image();				// Cria objeto do tipo imagem
	spriteSheet.src = "img/img.png";			// Determinando a origem

	var zezim = new Sprite(spriteSheet);

	window.addEventListener("keydown", keydownHandler, false);

	window.addEventListener("keyup", keyupHandler, false);

	function keydownHandler(e){
		switch(e.keyCode){
			case RIGHT:
				zezim.mvRight = true;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = false;
				break;
			
			case LEFT:
				zezim.mvRight = false;
				zezim.mvLeft = true;
				zezim.mvUp = false;
				zezim.mvDown = false;
				break;
			
			case UP:
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = true;
				zezim.mvDown = false;
				break;
			
			case DOWN:
				zezim.mvRight = false;
				zezim.mvLeft = false;
				zezim.mvUp = false;
				zezim.mvDown = true;
				break;
		}
	}

	function keyupHandler(e){
		switch(e.keyCode){
			case RIGHT:
				zezim.mvRight = false;
				break;
			case LEFT:
				zezim.mvLeft = false;
				break;
			case UP:
				zezim.mvUp = false;
				break;
			case DOWN:
				zezim.mvDown = false;
				break;
		}
	}

	spriteSheet.onload = function(){			// Quando a imagem for carregada...
		init(); 
	}

	function init(){
		loop();									// chama loop pela primeira vez
	}

	function update(){
		zezim.move();
	}

	function draw(){
		ctx.clearRect(0,0, cnv.width, cnv.height);
		zezim.draw(ctx);
	}

	function loop(){
		window.requestAnimationFrame(loop, cnv);
		update();
		draw();
	}
}
