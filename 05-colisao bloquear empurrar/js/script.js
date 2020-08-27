
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
	
	sprites.push(character);

	// funcoes
	function loop(){
		window.requestAnimationFrame(loop, cnv);
		update();
		render();
	}

	function update(){
		
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