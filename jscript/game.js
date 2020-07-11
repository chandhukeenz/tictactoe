window.onload= function(){
	var modeButtons = document.querySelectorAll(".mode");
	var playwithButtons = document.querySelectorAll(".playwith");
	var difficulty;
	var level;
	var num;
	var box;
	var ctx;
	var turn = 1;
	var filled;
	var symbol;
	var winner;
	var gameover =false;
	var human='X';
	var ai='O';
	var result={};	
	filled = new Array();
	symbol = new Array();
	
	for(var i=0;i<modeButtons.length;i++){
		if(modeButtons){
	modeButtons[i].addEventListener("click",function(){
    modeButtons[0].classList.remove("active");
    modeButtons[1].classList.remove("active");
	modeButtons[2].classList.remove("active");
	modeButtons[3].classList.remove("active");
    this.classList.add("active")
    this.textContent===" EARTH" ? level=1:this.textContent===" ISS" ? level=2:this.textContent===" MOON"?level=3:level=4;
    //reset();
	})
		}
	
    }
	
	for(var i=0;i<playwithButtons.length;i++){
	playwithButtons[i].addEventListener("click",function(){
    playwithButtons[0].classList.remove("active");
    playwithButtons[1].classList.remove("active");
	playwithButtons[2].classList.remove("active");
    this.classList.add("active")
    //this.textContent==="Easy" ? nosquares=3: nosquares=6;
    //reset();
	})
    }
	
	
	
	//all winning positions
	winner=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	
	//initialising all positions as blank
	for(var i=0;i<9;i++){
		filled[i]=false;
		symbol[i]='';
	}
	
	//listens for click
	document.getElementById("tic").addEventListener("click",function(e){
		boxClick(e.target.id);
	});
	
	function drawX(){
		ctx.beginPath();
		ctx.moveTo(15,15);
		ctx.lineTo(85,85);
		ctx.moveTo(85,15);
		ctx.lineTo(15,85);
		ctx.lineWidth=21;
		ctx.lineCap="round";
		ctx.strokeStyle ="white";
		ctx.stroke();
		ctx.closePath();
		symbol[num-1] = human;	
	}
	function drawO(next){
		ctx.beginPath();
	    ctx.arc(50,50,35,0,2*Math.PI);
		ctx.lineWidth=20;
		ctx.strokeStyle="white";
		ctx.stroke();
		ctx.closePath();
		symbol[next]= ai;
	}
	function winnerCheck(symbol,player){
		for(j=0;j<winner.length;j++){
			if((symbol[winner[j][0]] == player)&&(symbol[winner[j][1]] == player)&&(symbol[winner[j][2]] == player)){
				return true;
			}
		}
		return false;
	}
	function boxClick(numId){
		box= document.getElementById(numId);
		ctx = box.getContext("2d");
		
		//get the box num from the id and store in num
		num = numId.slice(-1);
		
		if(filled[num-1]=== false){
			if(gameover===false){
				if(turn%2 !==0){
					drawX();
					filled[num-1]=true;
					if(turn>=5){
						if(winnerCheck(symbol,symbol[num-1])===true){
							document.getElementById("result").innerText = "player "+symbol[num-1]+" won!";
						    gameover=true;
					    }
					}
					if(turn>9 && gameover!==true){
						document.getElementById("result").innerText = "DRAW";
						return;
					}
					turn++;
					if(turn%2==0){
						playAI();
					}
				}
			}
			else{
				alert("game over try new game");
			}
		}
		else{
			alert("this box already filled");
		}
	}
	function emptyBoxes(newSymbol){
		var j =0;
		var empty =[];
		for (var i=0;i<newSymbol.length;i++){
			if(newSymbol[i]==''){
				empty[j]=i;
				j++
			}
		}
		return empty;
	}
	function playAI(){
		var nextMove= minimax(symbol,ai);
		var nextId = "canvas"+(nextMove.id +1);
		box = document.getElementById(nextId);
		ctx=box.getContext("2d");
		if(gameover===false){
			if(turn%2===0){
				drawO(nextMove.id);
				filled[nextMove.id]=true;
				if(turn>=5){
					if(winnerCheck(symbol,symbol[nextMove.id])===true){
						document.getElementById("result").innerText="Player "+symbol[nextMove.id]+" won";
					    gameover=true;
					}	
				}
				turn++;
				if(turn>9 && gameover!==true){
						document.getElementById("result").innerText = "DRAW";
						return;
				}
			}
		}
	}
	function minimax(newSymbol,player){
		var empty =[];
		empty= emptyBoxes(newSymbol);
		if(winnerCheck(newSymbol,human)){
			return {score:-10};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10};
		}
		else if(empty.length===0){
			if(winnerCheck(newSymbol,human)){
			return {score:-10};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10};
		}
			return {score:0};
		}
		
		var posMoves =[];
		for(var i=0;i<empty.length;i++){
			var curMove={};
			curMove.id=empty[i];
			newSymbol[empty[i]]=player;
			if(player===ai){
				result = minimax(newSymbol,human);
				curMove.score = result.score;
			}
			else{
				result = minimax(newSymbol,ai);
				curMove.score = result.score; 
			}
			newSymbol[empty[i]]='';
			posMoves.push(curMove);	
		}
		var bestMove;
		if(player===ai){
			var highestScore =-1000;
			for(var j=0;j<posMoves.length;j++){
				if(posMoves[j].score > highestScore){
					highestScore = posMoves[j].score;
					bestMove = j;
				}
			}
		}
		else{
			var lowestScore = 1000;
			for(var j=0;j<posMoves.length;j++){
				if(posMoves[j].score<lowestScore){
					lowestScore=posMoves[j].score;
					bestMove=j;
				}
			}
		}
		return posMoves[bestMove];
	}
	
	
	
};