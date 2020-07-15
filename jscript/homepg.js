window.onload=function(){
	var ai=document.querySelectorAll(".ai");
	var crew=document.querySelector("#whencrew");
	ai[0].style.display="block";
	ai[1].style.display="block";
	crew.style.display="none";
	var modeButtons = document.querySelectorAll(".mode");
	var playwithButtons = document.querySelectorAll(".playwith");
	var playerButtons = document.querySelectorAll(".player");
	var algoButtons = document.querySelectorAll(".algo");
	var boardButtons = document.querySelectorAll(".board");
	sessionStorage.setItem("player",0);
	sessionStorage.setItem("algo", 0);
	sessionStorage.setItem("level", 3);
	sessionStorage.setItem("play", 0);
	sessionStorage.setItem("board", 0);
	
	for(var i=0;i<modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
	var level=0;
    modeButtons[0].classList.remove("active");
    modeButtons[1].classList.remove("active");
	modeButtons[2].classList.remove("active");
	modeButtons[3].classList.remove("active");
    this.classList.add("active")
		x=this.textContent;
		x===" EARTH" ? level=0:x===" ISS" ? level=1:x===" MOON"?level=2:level=3;
		sessionStorage.setItem("level", level);
	//findlevel(this.textContent);
	})
		
	}
	for(var i=0;i<playwithButtons.length;i++){
	playwithButtons[i].addEventListener("click",function(){
	var play=0;
    playwithButtons[0].classList.remove("active");
    playwithButtons[1].classList.remove("active");
	playwithButtons[2].classList.remove("active");
    this.classList.add("active")
	y=this.textContent;
	y===" AN AI!" ? play=0:y===" YOUR CREW MEMBERS!" ? play=1:play=2;	
    sessionStorage.setItem("play", play);
	display(play);
	})
    }
	
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
	for(var i=0;i<boardButtons.length;i++){
	boardButtons[i].addEventListener("click",function(){
	var board=0;
    boardButtons[0].classList.remove("active");
    boardButtons[1].classList.remove("active");
    this.classList.add("active")
	y=this.textContent;
	y==="2 PLAYERS" ? board=0:board=1;	
    sessionStorage.setItem("board", board);
	})
    }
	function display(player){
	if(player==1){
		ai[0].style.display="none";
		ai[1].style.display="none";
		crew.style.display="block";
	}else if(player==0){
		ai[0].style.display="block";
		ai[1].style.display="block";
		crew.style.display="none";
	}else if(player==2){
		ai[0].style.display="none";
		ai[1].style.display="none";
		crew.style.display="none";
	}
	}
	
}