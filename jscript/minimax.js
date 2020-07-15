window.onload= function(){
	var difficulty=[20,8,4,0];
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
	//all winning positions
	winner=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	var firstplayer = Number(sessionStorage.getItem("player"));
	var algo = Number(sessionStorage.getItem("algo"));
	//alert(firstplayer);
	//alert(algo);	
		//initialising all positions as blank
	for(var i=0;i<9;i++){
		filled[i]=false;
		symbol[i]='';
	}
	if(firstplayer==0){
		playAI();
	}

	//listens for click
	
	document.getElementById("tic").addEventListener("click",function(e){
		//alert(turn);
		//alert(firstplayer);
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
		//alert(level +" inside boxclick");
		var play = Number(sessionStorage.getItem("play"));
		box= document.getElementById(numId);
		ctx = box.getContext("2d");
		 
		//get the box num from the id and store in num
		num = numId.slice(-1);
		
		if(filled[num-1]=== false){
			if(gameover===false){
				if((firstplayer==0 && turn%2==0)||(firstplayer==1 && turn%2!==0)){
					turn++;
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
					
					if((firstplayer==0 && turn%2!==0)||(firstplayer==1 && turn%2==0) && play==0){
						playAI();
					}
					
				}
				else if(turn%2==0 && play==1){
					turn++;
					drawO(num-1);
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
		//alert("inside playai");
		var nextMove= minimax(symbol,ai);
		var nextId = "canvas"+(nextMove.id +1);
		box = document.getElementById(nextId);
		ctx=box.getContext("2d");
		if(gameover===false){
			if((firstplayer==0 && turn%2!==0)||(firstplayer==1 && turn%2==0) ){
				turn++;
				drawO(nextMove.id);
				filled[nextMove.id]=true;
				if(turn>=5){
					if(winnerCheck(symbol,symbol[nextMove.id])===true){
						document.getElementById("result").innerText="Player "+symbol[nextMove.id]+" won";
					    gameover=true;
					}	
				}
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
			//level=findlevel();
			//alert(level +"inside minimax");
			var level = Number(sessionStorage.getItem("level"));
			//alert(level);
			//alert(typeof(level));
			if(player===ai){
				result = minimax(newSymbol,human);
				curMove.score =result.score+ Math.random()*(2* Number(difficulty[level])) +(-1* Number(difficulty[level]));
			}
			else{
				result = minimax(newSymbol,ai);
				curMove.score = result.score+ Math.random()*(2* Number(difficulty[level])) +(-1* Number(difficulty[level]));
			}
			newSymbol[empty[i]]='';
			posMoves.push(curMove);	
		}
		var bestMove;
		if(player===ai){
			var highestScore =-1000;
			//alert(posMoves);
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