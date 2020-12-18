/** Funcao a ser executada automaticamente assim que o documento HTNL for carregado,
 * e mantem todas as variaveis locais*/
(function(){

	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");

	var WIDTH = cnv.width, HEIGHT = cnv.height;

	var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;
	var mvLeft = mvUp = mvRight = mvDown = false;

	var tileSize = 32;

	var walls = [];

	var player = {
		x: tileSize + 2,
		y: tileSize + 2,
		width: 28,
		height: 28,
		speed: 2
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




	function blockRectangle(objA, objB){

		var distX = (objA.x + objA.width / 2) - (objB.x + objB.width / 2);
		var distY = (objA.y + objA.height / 2) - (objB.y + objB.height / 2);

		var sumWidth = (objA.width + objB.width) / 2;
		var sumHeight = (objA.height + objB.height) / 2;

		

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
		}

		else if(mvRight && !mvLeft){
			player.x = player.x + player.speed;
		}

		if(mvUp && !mvDown){
			player.y = player.y - player.speed;
		}

		else if(mvDown && !mvUp){
			player.y = player.y + player.speed;
		}

		for(var i in walls){

			var wall = walls[i];
			blockRectangle(player, wall);

		}

	}




	function render(){

		ctx.clearRect(0, 0, WIDTH, HEIGHT);
		ctx.save();

		for(var row in maze){
			
			for(var column in maze[row]){
		
				var tile = maze[row][column];

				if(tile === 1){
					
					var x = column * tileSize;
					var y = row * tileSize;
					ctx.fillRect(x, y, tileSize, tileSize);
					
				}

			}

		}
		
		ctx.fillStyle = "#00f";
		ctx.fillRect(player.x, player.y, player.width, player.height);

		ctx.restore();

	}




	function loop(){
		update();
		render();
		requestAnimationFrame(loop, cnv);
	}



	requestAnimationFrame(loop, cnv);
}());