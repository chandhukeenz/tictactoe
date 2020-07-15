//window.onload = function(){
	
    var resetButton = document.querySelector(".reset");

	/*sessionStorage.setItem("player", 1);
	sessionStorage.setItem("algo", 0);
	for(var i=0;i<playerButtons.length;i++){
	playerButtons[i].addEventListener("click",function(){
	var player;
    playerButtons[0].classList.remove("active");
    playerButtons[1].classList.remove("active");
	//reset();
    this.classList.add("active")
		x=this.textContent;
		x==="AI" ? player=0:player=1;
		//sessionStorage.setItem("playername",x);
		sessionStorage.setItem("player", player);
		//location.reload("/minimax.js");
	    //ctx.clearRect(0, 0, canvasWidth, canvasHeight);
		//setup();
	//findlevel(this.textContent);
	})
		
	}
	for(var i=0;i<algoButtons.length;i++){
	algoButtons[i].addEventListener("click",function(){
	var algo;
    algoButtons[0].classList.remove("active");
    algoButtons[1].classList.remove("active");
	algoButtons[2].classList.remove("active");
	//reset();
    this.classList.add("active")
	y=this.textContent;
	y==="MINIMAX" ? algo=0:y==="NEGAMAX" ? algo=1:algo=2;	
    sessionStorage.setItem("algo", algo);
		//location.reload("/minimax.js");
	//setup();
	})
    }
	*/
	resetButton.addEventListener("click",function(){
    reset();
    })
    function reset(){
		document.location.reload();
	}
	
//}