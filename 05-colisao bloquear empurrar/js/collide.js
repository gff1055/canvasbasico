
function blockRect(r1, r2){
	// r1 -> bloqueado
	// r2 -> parede

	// catetos
	var catX = r1.centerX() - r2.centerX();
	var catY = r1.centerY() - r2.centerY();
	
	// soma das metades
	var sumHalfWidth = r1.halfWidth() + r2.halfWidth();
	var sumHalfHeight = r1.halfHeight() + r2.halfHeight();

	if(Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight){
		/*r2.visible = false;
		setTimeout(function(){
			r2.visible = true;
		}, 1000)*/

		// Diferenca na ivasao de territorio (colisao)
		var overlapX = sumHalfWidth - Math.abs(catX);
		var overlapY = sumHalfHeight - Math.abs(catY);

		// Em que posicao ocorreu a colisao?
		if(overlapX > overlapY){	// colisao por cima ou baixo
			// Colisao por cima
			if(catY > 0){
				r1.posY += overlapY;
			}
			else{	// Colisao por baixo
				r1.posY -= overlapY;
			}
		}
		else{
			// colisao pela esquerda
			if(catX >0){
				r1.posX += overlapX;
			}
			else{
				r1.posX -= overlapX;
			}
		}
	}
}