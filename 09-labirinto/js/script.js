/** Funcao a ser executada automaticamente assim que o documento HTNL for carregado,
 * e mantem todas as variaveis locais*/
(function(){

	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");

	var WIDTH = cnv.width, HEIGHT = cnv.height;

	var
		LEFT = 37,
		UP = 38,
		RIGHT =	39,
		DOWN = 40;
		
	var mvLeft = mvUp = mvRight = mvDown = false;

	var tileSize = 64;		// armazena as dimensoes de desenho do tile
	var tileSrcSize = 96;	// armazena as dimensoes de captura (tamanho do tile no arquivo de imagem)


	var img = new Image();	// Nova instancia de objeto do tipo imagem
	img.src = "img/img.png";

	// Evento quando a imagem for carregada. A instrucao de inicio de jogo será disparada
	img.addEventListener("load", function(){
		requestAnimationFrame(loop, cnv);
	},false);


	var walls = [];

	var player = {
		x: tileSize + 2,
		y: tileSize + 2,
		width: 24,
		height: 32,
		speed: 2,
		srcX: 0,				// Origem em x
		scrY: tileSrcSize,		// Origem em Y
		countAnim: 0,			// Contador: mudar o sprite da animação
	};

	var maze = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1],
		[1,1,1,0,1,1,1,0,0,1,0,0,0,1,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,1,1,1,1,1,1,0,1,1,1,1,1],
		[1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,0,1],
		[1,0,0,0,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,1,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
	];

	for(var row in maze){
			
		for(var column in maze[row]){
	
			var tile = maze[row][column];
			if(tile === 1){
				
				var wall = {
					x: tileSize * column,
					y: tileSize * row,
					width: tileSize,
					height: tileSize
				};
				walls.push(wall);

			}

		}

	}

	var	T_WIDTH = maze[0].length * tileSize, T_HEIGHT = maze.length * tileSize;



	var cam = {
		x: 0,
		y: 0,
		width: WIDTH,
		height: HEIGHT,
		
		innerLeftBoundary: function(){
			return this.x + (this.width * 0.25);
		},

		innerTopBoundary: function(){
			return this.y + (this.height * 0.25);
		},

		innerRightBoundary: function(){
			return this.x + (this.width * 0.75);
		},

		innerBottomBoundary: function(){
			return this.y + (this.height * 0.75);
		},

	}




	function blockRectangle(objA, objB){

		var distX = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
		var distY = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);

		var sumWidth = (objA.width + objB.width) / 2;
		var sumHeight = (objA.height + objB.height) / 2;

		// verificacao de colisao
		if(Math.abs(distX) < sumWidth && Math.abs(distY) < sumHeight){
			
			var overlapX = sumWidth - Math.abs(distX);
			var overlapY = sumHeight - Math.abs(distY);

			if(overlapX > overlapY){
				objA.y = distY > 0 ? objA.y + overlapY : objA.y - overlapY;
			}
			else{
				objA.x = distX > 0 ? objA.x + overlapX : objA.x - overlapX;
			}

		}

	}




	window.addEventListener("keydown", keydownHandler,false);
	window.addEventListener("keyup", keyupHandler,false);




	function keydownHandler(e){
		
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

	}




	function keyupHandler(e){
		
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
		
	}
	
	
	
	
	function update(){

		if(mvLeft && !mvRight){
			player.x = player.x - player.speed;
			player.scrY = tileSrcSize + player.height * 2;
		}
		else if(mvRight && !mvLeft){
			player.x = player.x + player.speed;
			player.scrY = tileSrcSize + player.height * 3;			
		}

		if(mvUp && !mvDown){
			player.y = player.y - player.speed;
			player.scrY = tileSrcSize + player.height * 1;
		}
		else if(mvDown && !mvUp){
			player.y = player.y + player.speed;
			player.scrY = tileSrcSize + player.height * 0;
		}

		// Houve algum comando de movimento do boneco?
		if(mvLeft || mvRight || mvUp || mvDown){
			player.countAnim++;

			if(player.countAnim >=8){
				player.countAnim = 0;
			}

			player.srcX = Math.floor(player.countAnim/1) * player.width;
		}
		// O boneco nao esta se movendo
		else{
			player.srcX = 0;
			player.countAnim = 0;
		}

		for(var i in walls){

			var wall = walls[i];
			blockRectangle(player, wall);

		}

		if(player.x < cam.innerLeftBoundary()){
			cam.x = player.x - (cam.width * 0.25);
		}
		if(player.y < cam.innerTopBoundary()){
			cam.y = player.y - (cam.height * 0.25);
		}
		if(player.x + player.width > cam.innerRightBoundary()){
			cam.x = player.x + player.width - (cam.width * 0.75);
		}
		if(player.y + player.height > cam.innerBottomBoundary()){
			cam.y = player.y + player.height - (cam.height * 0.75);
		}

		// Ajusta o labirinto
		cam.x = Math.max(0, Math.min(T_WIDTH - cam.width, cam.x));	//0 = menor valor possivel
		cam.y = Math.max(0, Math.min(T_HEIGHT - cam.height, cam.y));	//0 = menor valor possivel

	}




	function render(){

		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.save();
		ctx.translate(-cam.x, -cam.y);

		// Percorre as linhas e colunas do labirinto
		for(var row in maze){
			for(var column in maze[row]){
		
				var tile = maze[row][column];

					
				var x = column * tileSize;
				var y = row * tileSize;

				// Desenha uma imagem
				ctx.drawImage(
					img,						// imagem a ser exibida
					tile * tileSrcSize, 0,		// dados de captura da imagem: cordenadas x e y
					tileSrcSize, tileSrcSize,	// dados de captura da imagem: dimensao do pedaco da imagem	

					// informacoes sobre a renderizacao na tela
					x,y,						// coordenada de renderizacao
					tileSize,tileSize			// dimensao do desenho na tela
				);

			}
		}
		
		ctx.drawImage(
			img,
			player.srcX, player.scrY,
			player.width, player.height,

			player.x, player.y,
			player.width, player.height,
		)
		ctx.restore();

	}




	function loop(){
		update();
		render();
		requestAnimationFrame(loop, cnv);
	}



	
}());