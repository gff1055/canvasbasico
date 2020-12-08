(function(){

	// variavel que recebe a referencia ao elemento canvas
	var cnv = document.querySelector('canvas');
	
	// variavel que recebe o contexto bidirecional de renderizacaodo canvas
	var ctx = cnv.getContext('2d');
	
	// variavel responsavel pela gravidade no jogo
	var gravity = 0.1;
	var catX = catY = hyp = 0;
	
	//ESTADOS DO JOGO
	var 
	START = 1,	// O jogo esta pronto para ser iniciado
	PLAY = 2,	// O jogador esta jogando
	OVER = 3;	// O jogo acabou

	var gameState = START;

	// pontuacao
	var score = 0;

	// recorde
	var record = 0;
	
	if(localStorage.getItem("record") != null){
		record = localStorage.getItem("record");
	}

	// Objeto bola
	var ball = {
		radius: 20,				// Raio da bola
		vx: 0,					// Vetor de deslocamento em X
		vy: 0,					// Vetor de deslocamento em Y
		x: cnv.width/2 - 10,	// Posicao X inicial
		y: 50,					// Posicao Y inicial
		color: "#00f",			// Vor da bola
		touched: false,			// Flag que indica se a bola foi clicada
		visible: false			// Flag que indica se a bolinha deve ser exibida.
	}

	// mensagens
	var messages = [];

	// Mensagem inicial que sera exibida ao iniciar o jogo
	var startMessage = {
		text: "TOUCH TO START",			// Mensagem a ser exibida
		y: cnv.height/2 - 100,			// Posicao da mensagem
		font: "bold 30px Sans-Serif",	// Comfiguracoes da fonte
		color: "#f00",					// Cor da fonte
		visible: true					// A mensagem estara visivel
	};
	
	messages.push(startMessage);

	// Placar final
	var scoreText = Object.create(startMessage);
	scoreText.visible = false;
	scoreText.y = (cnv.height/2 + 50);

	messages.push(scoreText);

	// recorde
	var recordMessage = Object.create(startMessage);
	recordMessage.visible = false;
	recordMessage.y = (cnv.height / 2 + 100);
	messages.push(recordMessage);

	//Eventos
	cnv.addEventListener('mousedown', function(e){
		catX = ball.x - e.offsetX;
		catY = ball.y - e.offsetY;
		hyp = Math.sqrt(catX * catX + catY * catY)-ball.radius*2;

		// Selecionando o estado do jogo
		switch(gameState){

			/*O jogo esta no estado START.
			Aqui a mensagem inicial desaparece e o jogo muda para o estado PLAY*/
			case START:
				gameState = PLAY;
				startMessage.visible = false;
				startGame();
				break;

			case PLAY:

				if(hyp < ball.radius && !ball.touched){
					ball.vx = Math.floor(Math.random() * 21) - 10;
					ball.vy = -(Math.floor(Math.random() * 6) + 5);
					ball.touched = true;
					score++;
				}

				break;

			}

	}, false);


	cnv.addEventListener('mouseup', function(){

		if(gameState === PLAY){
			ball.touched = false;
		}

	});


	//Funcoes
	function loop(){
		requestAnimationFrame(loop, cnv);

		// O jogo sera atualizado apenas quando o jogador estiver jogando(PLAY)
		if(gameState == PLAY){
			update();
		}

		render();
	}

	// Funcao onde é desenvoldida a logica do jogo
	function update(){
		// acao da gravidade e deslocamento da bolinha
		ball.vy += gravity;
		ball.y += ball.vy;
		ball.x += ball.vx;

		// Quicar nas paredes
		if(ball.x + ball.radius > cnv.width || ball.x < ball.radius){
			
			if(ball.x < ball.radius){
				ball.x = ball.radius;
			}
			
			else{
				ball.x = cnv.width - ball.radius;
			}

			ball.vx *= -0.8;
		}

		// Quicar no teto
		if(ball.y < ball.radius && ball.vy < 0){
			ball.y = ball.radius;
			ball.vy *= -1;
		}

		// game over - (Se abola atingir o fim do canvas)
		if(ball.y - ball.radius > cnv.height){
			gamestate = OVER;
			ball.visible = false;

			window.setTimeout(function(){
				startMessage.visible = true;
				gameState = START;
			},2000);

			scoreText.text = "YOUR SCORE: " + score;
			scoreText.visible = true;

			if(score > record){
				record = score;
				localStorage.setItem("record", record);
			}
			
			recordMessage.text = "BEST SCORE: " + record;
			recordMessage.visible = true;
		}
	}

	// Funcao responsavel por exibir na tela os elementos renderizados
	function render(){
		ctx.clearRect(0, 0, cnv.width, cnv.height);

		// renderizacao da bola
		if(ball.visible){
			ctx.fillStyle = ball.color;
			ctx.beginPath();
			ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI*2);
			ctx.closePath();
			ctx.fill();
			
			// desenhar o placar
			ctx.font = "bold 15px Arial";
			ctx.fillStyle = "#000";
			ctx.fillText("SCORE: " + score, 10, 20);
		}

		// renderizacao das mensagens de texto
		for(var i in messages){
			var msg = messages[i];

			// Se o elemento for visivel...
			if(msg.visible){
				ctx.font = msg.font;
				ctx.fillStyle = msg.color;
				ctx.fillText(msg.text, (cnv.width - ctx.measureText(msg.text).width) / 2, msg.y);
			}

		}

	}

	// funcao de inicializacao do jogo
	function startGame(){
		ball.vy = 0;
		ball.y = 50;
		ball.vx = Math.floor(Math.random() * 21) - 10;
		ball.x = Math.floor(Math.random() * 261) + 10;
		ball.visible = true;
		
		score = 0;
		scoreText.visible = false;

		recordMessage.visible = false;
	}

	// Chamando funcao para iniciar o jogo
	loop();
}());