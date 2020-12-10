/** Funcao a ser executada automaticamente assim que o documento HTNL for carregado,
 * e mantem todas as variaveis locais*/
(function(){
	var cnv = document.querySelector("canvas");
	var ctx = cnv.getContext("2d");




	function update(){

	}




	function render(){

	}




	function loop(){
		update();
		render();
		requestAnimationFrame(loop, cnv);
	}



	requestAnimationFrame(loop, cnv);
}());