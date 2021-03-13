window.onload=function(){
	//initial display and storage conditions for homepage
	var ai = document.querySelectorAll(".ai");
	var crew = document.querySelector("#whencrew");
	var hintcrew = document.querySelector("#when2");
	hintcrew.style.display = "none";
	ai[0].style.display = "block";
	ai[1].style.display = "block";
	crew.style.display = "none";
	var modeButtons = document.querySelectorAll(".mode");
	var playwithButtons = document.querySelectorAll(".playwith");
	var playerButtons = document.querySelectorAll(".player");
	var crewhintButtons = document.querySelectorAll("#when2 .hint");
	var aihintButtons = document.querySelectorAll("#al .hint");
	var boardButtons = document.querySelectorAll(".board");
	sessionStorage.setItem("player",0);
	sessionStorage.setItem("hint", 0);
	sessionStorage.setItem("level", 3);
	sessionStorage.setItem("play", 0);
	sessionStorage.setItem("board", 0);
	 
	//restart --> setting initial conditions whenever play button changed
	function restart(){
	sessionStorage.setItem("player",0);
	sessionStorage.setItem("hint", 0);
	sessionStorage.setItem("level", 3);
	sessionStorage.setItem("board", 0);
	modeButtons[0].classList.remove("active");
    modeButtons[1].classList.remove("active");
	modeButtons[2].classList.remove("active");
	modeButtons[3].classList.remove("active");
	modeButtons[3].classList.add("active");
	playerButtons[0].classList.remove("active");
    playerButtons[1].classList.remove("active");
	playerButtons[0].classList.add("active");	
	crewhintButtons[0].classList.remove("active");
    crewhintButtons[1].classList.remove("active");
	crewhintButtons[0].classList.add("active");
	aihintButtons[0].classList.remove("active");
    aihintButtons[1].classList.remove("active");
	aihintButtons[0].classList.add("active");
	boardButtons[0].classList.remove("active");
    boardButtons[1].classList.remove("active");
	boardButtons[0].classList.add("active");
	}
	
	//DIFFICULTY MODE BUTTONS INTERACTIVE OUTLOOK
	for(var i = 0;i < modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
	var level=0;
    modeButtons[0].classList.remove("active");
    modeButtons[1].classList.remove("active");
	modeButtons[2].classList.remove("active");
	modeButtons[3].classList.remove("active");
    this.classList.add("active")
	x = this.textContent;
	//level stores the difficulty mode of the game
	x === " EARTH" ? level = 0:x === " ISS" ? level = 1:x === " MOON"?level = 2:level = 3;
	sessionStorage.setItem("level", level);
	})	
	}//MODE
	
	//PLAYWITH BUTTONS INTERACTIVE OUTLOOK
	for(var i = 0;i < playwithButtons.length;i++){
	playwithButtons[i].addEventListener("click",function(){
	var play = 0;
    playwithButtons[0].classList.remove("active");
    playwithButtons[1].classList.remove("active");
	playwithButtons[2].classList.remove("active");
    this.classList.add("active")
	y = this.textContent;
	//play stores the choice of player ai/crew/timer
	y === " AN AI!" ? play = 0:y === " YOUR CREW!" ? play = 1:play = 2;	
    sessionStorage.setItem("play", play);
	//calls display
	display(play);
	})
    }//PLAYWITH
	
	//FIRST PLAYER BUTTONS INTERACTIVE OUTLOOK
	for(var i = 0;i < playerButtons.length;i++){
	playerButtons[i].addEventListener("click",function(){
	var player;
    playerButtons[0].classList.remove("active");
    playerButtons[1].classList.remove("active");
    this.classList.add("active")
	x = this.textContent;
	//player stores first player is ai/human choice
	x === "AI" ? player = 0:player = 1;
	sessionStorage.setItem("player", player);
	})
	}//FIRST PLAYER
	
	//CREW HINT BUTTONS INTERACTIVE OUTLOOK
	for(var i = 0;i < crewhintButtons.length;i++){
	crewhintButtons[i].addEventListener("click",function(){
	var hint;
	//alert("hi");
    crewhintButtons[0].classList.remove("active");
    crewhintButtons[1].classList.remove("active");
    this.classList.add("active")
	y = this.textContent;
	//HINT stores without/with hint choice
	y === " WITHOUT HINT" ? hint = 0:hint = 1;	
    sessionStorage.setItem("hint", hint);
	})
    }//CREW HINT
	
	//AI HINT BUTTONS INTERACTIVE OUTLOOK
	for(var i = 0;i < aihintButtons.length;i++){
	aihintButtons[i].addEventListener("click",function(){
	var hint;
    aihintButtons[0].classList.remove("active");crew
    aihintButtons[1].classList.remove("active");
    this.classList.add("active")
	y = this.textContent;
	//HINT stores without/with hint choice
	y === " WITHOUT HINT" ? hint = 0:hint = 1;	
    sessionStorage.setItem("hint", hint);
	})
    }//AI HINT
	
	//BOARD BUTTONS INTERACTIVE OUTLOOK
	for(var i = 0;i < boardButtons.length;i++){
	boardButtons[i].addEventListener("click",function(){
	var board = 0;
    boardButtons[0].classList.remove("active");
    boardButtons[1].classList.remove("active");
    this.classList.add("active")
	y = this.textContent;
	//board stores 2x2 or 3x3 choice
	y === "2 PLAYERS" ? board = 0:board = 1;	
    sessionStorage.setItem("board", board);
	//calls offerhint
	offerhint();
	})
    }//BOARD
	
	//display -->argument:play (ai/crew/timer) ; display corresponding subdivision choices
	function display(player){
	if(player == 1){
		ai[0].style.display = "none";
		ai[1].style.display = "none";
		crew.style.display = "block";
		hintcrew.style.display = "block";
	}else if(player==0){
		ai[0].style.display = "block";
		ai[1].style.display = "block";
		crew.style.display = "none";
		hintcrew.style.display = "none";
	}else if(player==2){
		ai[0].style.display = "none";
		ai[1].style.display = "block";
		crew.style.display = "none";
		hintcrew.style.display = "none";
	}
		//calls restart
	    restart();
	}//DISPLAY
	
	//offerhint -->display hint only for 2 player option
	function offerhint(){
		var b = Number(sessionStorage.getItem("board"));
		if(b == 0){
			hintcrew.style.display = "block";
		}else if(b == 1){
			hintcrew.style.display = "none";
		}
	}//OFFERHINT
	
}//END