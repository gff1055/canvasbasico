(function(){
	// variavel que recebe a referencia ao elemento canvas
	var cnv = document.querySelector('canvas');
	// variavel que recebe o contexto bidirecional de renderizacaodo canvas
	var ctx = cnv.getContext('2d');
	
	//ESTADOS DO JOGO
	var 
	START = 1,									// O jogo esta pronto para ser iniciado
	PLAY = 2,									// O jogador esta jogando
	OVER = 3;									// O jogo acabou

	var gameState = START;

	// mensagens
	var messages = [];

	// Mensagem inicial que sera exibida ao iniciar o jogo
	var startMessage = {
		text: "TOUCH TO START",					// Mensagem a ser exibida
		y: cnv.height/2 - 100,					// Posicao da mensagem
		font: "bold 30px Sans-Serif",			// Comfiguracoes da fonte
		color: "#f00",							// Cor da fonte
		visible: true							// A mensagem estara visivel
	};
	
	messages.push(startMessage);


	//Eventos

	cnv.addEventListener('mousedown', function(e){

	}, false);


	//Funcoes

	function loop(){
		requestAnimationFrame(loop, cnv);

		// O jogo sera atualizado apenas quando o jogador estiver jogando
		if(gameState == PLAY){
			update();
		}
		render();
	}

	// Funcao onde é desenvoldida a logica do jogo
	function update(){}

	// Funcao responsavel por exibir na tela os elementos renderizados
	function render(){
		ctx.clearRect(0, 0, cnv.width, cnv.height);

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

	// Chamando funcao para iniciar o jogo
	loop();
}());