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
	var resultnega={};
	var max;
	filled = new Array();
	symbol = new Array();
	//all winning positions
	winner=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	var firstplayer = Number(sessionStorage.getItem("player"));
	var algo = Number(sessionStorage.getItem("algo"));
	var play = Number(sessionStorage.getItem("play"));
	//alert(firstplayer);
	//alert(algo);	
		//initialising all positions as blank
	for(var i=0;i<9;i++){
		filled[i]=false;
		symbol[i]='';
	}
	if(firstplayer==0 && play==0){
		playAI();
	}
alert(play);
	//listens for click
	
	document.getElementById("tic2").addEventListener("click",function(e){
			boxClick(e.target.id);
		//alert("inside event");
		
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
	   //alert(play +" inside boxclick");
		
		box= document.getElementById(numId);
		ctx = box.getContext("2d");
		 
		//get the box num from the id and store in num
		num = numId.slice(-1);
		
		if(filled[num-1]=== false){
			if(gameover===false){
				if((firstplayer===0 && turn%2==0 && play===0)||(firstplayer===1 && turn%2!==0 && play===0)||(play===1 && turn%2!==0)){
					//alert(firstplayer);
					//alert(turn);
					//alert(play);
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
					
					if(((firstplayer==0 && turn%2!==0)||(firstplayer==1 && turn%2==0)) && play==0){
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
		if(algo==0){
		var nextMove= minimax(symbol,ai,0,-Infinity,+Infinity);	
		}else if(algo==1){
			var nextMove=negamax(symbol, ai,0,-Infinity,+Infinity,1);
		}
		
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
	function minimax(newSymbol,player,depth,alpha,beta){
		//alert(typeof(alpha));
		var empty =[];
		empty= emptyBoxes(newSymbol);
		if(winnerCheck(newSymbol,human)){
			return {score:-10,depth};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10,depth};
		}
		else if(empty.length===0){
			if(winnerCheck(newSymbol,human)){
			return {score:-10,depth};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10,depth};
		}
			return {score:0,depth};
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
				result = minimax(newSymbol,human,depth+1,alpha,beta);
				curMove.score =result.score+ Math.random()*(2* Number(difficulty[level])) +(-1* Number(difficulty[level]));
				curMove.depth=result.depth;
			}
			else{
				result = minimax(newSymbol,ai,depth+1,alpha,beta);
				curMove.score = result.score+ Math.random()*(2* Number(difficulty[level])) +(-1* Number(difficulty[level]));
				curMove.depth=result.depth;
			}
			newSymbol[empty[i]]='';
			posMoves.push(curMove);	
			//console.log(posMoves.score +" posmoves");
		}
		
		var bestMove;
		if(player===ai){
			//console.log(posMoves[1].score);
			var highestScore =-1000;
			var lowestdepth= 1000;
			//alert(posMoves);
			for(var j=0;j<posMoves.length;j++){
				if(posMoves[j].score > highestScore || (posMoves[j].score==highestScore && posMoves[j].depth<lowestdepth)){
					//console.log(posMoves[j].score + " 1");
					//console.log(highestScore + " 2");
					highestScore = posMoves[j].score;
					//console.log(highestScore + " 3");
					bestMove = j;
					alpha=highestScore;
					lowestdepth=posMoves[j].depth;
				}
				if(alpha>=beta){
					break;
				}
			}
		}
		else{
			var lowestScore = 1000;
			for(var j=0;j<posMoves.length;j++){
				if(posMoves[j].score<lowestScore){
					lowestScore=posMoves[j].score;
					bestMove=j;
					beta=lowestScore;
				}
				if(alpha>=beta){
					break;
				}
			}
		}
		return posMoves[bestMove];
	}
	
	function negamax(newSymbol,player,depth,alpha,beta,color){
		var emptynega =[];
		emptynega= emptyBoxes(newSymbol);
		if(winnerCheck(newSymbol,human)){
			return {score:-10,depth};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10,depth};
		}
		else if(emptynega.length===0){
			if(winnerCheck(newSymbol,human)){
			return {score:-10,depth};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10,depth};
		}
			return {score:0,depth};
		}
		
		var posMovesnega =[];
		for(var i=0;i<emptynega.length;i++){
			var curMovenega={};
			curMovenega.id=emptynega[i];
			newSymbol[emptynega[i]]=player;
			//level=findlevel();
			//alert(level +"inside minimax");
			var levelnega = Number(sessionStorage.getItem("level"));
			//alert(level);
			//alert(typeof(level));
			if(player===ai){
				resultnega = negamax(newSymbol,human,depth+1,-1*beta,-1*alpha,-1*color);
				curMovenega.score =(-1*resultnega.score)*color;
				curMovenega.depth=resultnega.depth;
			}
			else{
				resultnega = negamax(newSymbol,ai,depth+1,-1*beta,-1*alpha,-1*color);
				curMovenega.score = (-1*resultnega.score)*color;
				curMovenega.depth=resultnega.depth;
			}
			newSymbol[emptynega[i]]='';
			posMovesnega.push(curMovenega);	
			//console.log(posMoves.score +" posmoves");
		}
		
		var bestMovenega;
		if(player===ai){
			//console.log(posMoves[1].score);
			var highestScorenega =-1000;
			var lowestdepthnega= 1000;
			//alert(posMoves);
			for(var j=0;j<posMovesnega.length;j++){
				if(posMovesnega[j].score > highestScorenega){
					//console.log(posMoves[j].score + " 1");
					//console.log(highestScore + " 2");
					highestScorenega = posMovesnega[j].score;
					//console.log(highestScore + " 3");
					bestMovenega = j;
					alpha=highestScorenega;
					lowestdepthnega=posMovesnega[j].depth;
				}
				if(alpha>=beta){
					break;
				}
			}
		}
		else{
			var lowestScorenega = 1000;
			for(var j=0;j<posMovesnega.length;j++){
				if(posMovesnega[j].score<lowestScorenega){
					lowestScorenega=posMovesnega[j].score;
					bestMovenega=j;
					beta=lowestScorenega;
				}
				if(alpha>=beta){
					break;
				}
			}
		}
		console.log(posMovesnega[bestMovenega]);
		return posMovesnega[bestMovenega];
		
	}
	       
	
   
};



