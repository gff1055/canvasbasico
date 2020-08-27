function Sprite(img){
	//Atributos
	this.mvRight = this.mvLeft = this.mvUp = this.mvDown = false;
	this.srcX = this.srcY = 0;
	this.width = 24;
	this.height = 32;
	this.posX = this.posY = 0;
	this.img = img;
	this.speed = 1;
	this.countAnim = 0;

	//Metodos
	this.draw = function(ctx){
		ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX, this.posY, this.width, this.height);
		this.animation();
	};

	// Metodo para mover o personagem
	this.move = function(){

		// Moveu para a esquerda
		if(this.mvRight){
			this.posX += this.speed;
			this.srcY = this.height * 3;
		}

		// Moveu para a direita
		else if(this.mvLeft){
			this.posX -= this.speed;
			this.srcY = this.height * 2;
		}

		// Moveu para cima
		else if(this.mvUp){
			this.posY -= this.speed;
			this.srcY = this.height * 1;
		}

		// moveu para baixo
		else if(this.mvDown){
			this.posY += this.speed;
			this.srcY = this.height * 0;
		}
	};

	// metodo para gerenciar as animacoes
	this.animation = function(){
		if(this.mvLeft || this.mvRight || this.mvUp || this.mvDown){
			this.countAnim++;

			if(this.countAnim >= 40){
				this.countAnim = 0;
			}
			this.srcX = Math.floor(this.countAnim/5) * this.width;
		}
	};

}