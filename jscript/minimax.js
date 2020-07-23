window.onload= function(){
	var difficulty = [20,8,4,0];         //measure of randomness in minimax output acc. to user difficulty mode
	var num;                             //box number
	var box;                             //stores element by id
	var ctx;                             //stores 2d context of box
	var turn = 1;                        //game all players turn count
	var filled;                          //array tells true/false based on if the canvas is filled/not
	var symbol;                          //array stores players symbol (x,o,t) of all canvas
	var winner;                          //stores winning positions
	var gameover = false;                //true/false based on game on/off
	var human = 'X';                     //symbol of human player
	var ai = 'O';                        //symbol of ai player
	var result = {};
	
	//initialising all initial empty boxes with filled as false & symbol as ''
	filled = new Array();
	symbol = new Array();
	for(var i = 0;i < 9;i++){
		filled[i] = false;
		symbol[i] = '';
	}
	
	//stores all winning positions
	winner = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	
	//get stored choices
	var firstplayer = Number(sessionStorage.getItem("player"));
	var hint = Number(sessionStorage.getItem("hint"));
	var play = Number(sessionStorage.getItem("play"));
	var hintButton = document.querySelector(".tichint");
	
	//starttime -->COUNTDOWN FROM 10 TO 0
	function starttime(){
		clearInterval(countdown);
	    var seconds = 10;
	    document.getElementById("countdown").textContent = 10;
        var countdown = setInterval(function() {
			seconds=document.getElementById("countdown").textContent;
			if(seconds >= 1){
	    		seconds = seconds-1;
	    	}
            document.getElementById("countdown").textContent = seconds;   //displaying in the gamePage
	    	if(document.getElementById("result").innerText != ''){        //checking gameover
	    		clearInterval(countdown);
	    	    return;
	    	}
            if (seconds <= 0 ){                                           //checks for less than zero 
				clearInterval(countdown);
	    	    if(document.getElementById("result").innerText == ''){    //checking not gameover
	    	    	document.getElementById("result").innerText = "BOMB BLASTED!";
	    	    	gameover = true;                                      //gameover
	    	    }
				clearInterval(countdown);
				return;
			}
		}, 2000);
	}//STARTTIME
	
	//IF FIRSTPLAYER IS AI CALL PLAYAI FUNCTION
	if(firstplayer == 0 && (play == 0||play == 2)){
		//calls playAI
		playAI();
	}
	
	//listens for box click on tic2
	document.getElementById("tic2").addEventListener("click",function(e){
		//calls boxClick function and sends the id of the clicked box
		boxClick(e.target.id);
	});
	
	//listens for hint button click
	hintButton.addEventListener("click",function(){
		this.classList.remove("active");	
		//calls showhint
		showhint();
	});
	
	//draws x on the box that ctx holds
	function drawX(){
		ctx.beginPath();
		ctx.moveTo(15,15);                      //top left of box
		ctx.lineTo(85,85);                      //bottom right of box
		ctx.moveTo(85,15);                      //top right of box
		ctx.lineTo(15,85);                      //bottom left of box
		ctx.lineWidth = 21;
		ctx.lineCap = "round";
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.closePath();
		symbol[num-1] = human;                  //stores the symbol as human ie player 1 -> 'x'
	}//drawX
	
	//draws o on the box that ctx holds
	function drawO(next){
		ctx.beginPath();
	    ctx.arc(50,50,35,0,2*Math.PI);          //circle
		ctx.lineWidth = 20;
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.closePath();
		symbol[next] = ai;                      //stores the symbol as ai ie player2 -> 'o'
	}//drawO
	
	//winnerCheck --> argument:all boxes symbol & player ; return: true/false (won/not)
	function winnerCheck(symbol,player){
		for(j = 0;j < winner.length;j++){
			if((symbol[winner[j][0]] == player)&&(symbol[winner[j][1]] == player)&&(symbol[winner[j][2]] == player)){
				return true;
			}
		}
		return false;
	}//winnerCheck
	
	//blockClick -->argument:id of the box
	function boxClick(numId){
		//selecting clicked box element
		box = document.getElementById(numId);
		//getting 2d context
		ctx = box.getContext("2d");
		//get the box num from the id and store in num
		num = numId.slice(-1);
		if(filled[num-1] === false){                                        //check box is empty
			if(gameover === false){                                         //check gameover
				if((firstplayer === 0 && turn%2 == 0 && (play === 0||play == 2))||(firstplayer === 1 && turn%2 !== 0 && (play===0||play === 2))||(play === 1 && turn%2 !== 0)){                     //check for x player turn 
					turn++;                                                 //increment turn
					drawX();                                                //calls drawX
					filled[num-1] = true;                                   //fills the box
					if(turn >= 5){
						if(winnerCheck(symbol,symbol[num-1]) === true){     //check if the player won
							document.getElementById("result").innerText = "PLAYER '"+symbol[num-1]+"' WON!";
						    gameover = true;
					    }
					}
					if(turn > 9 && gameover !== true){                      //check if game tied
						document.getElementById("result").innerText = "MATCH TIED!";
						return;
					}
					if(((firstplayer == 0 && turn%2 !== 0)||(firstplayer == 1 && turn%2 == 0)) && (play == 0||play == 2)){ //check for ai o turn
						//calls playAI
						playAI();
					}	
				}
				else if(turn%2 == 0 && play == 1){                           //check for player o turn
					turn++;
					drawO(num-1);
					filled[num-1] = true;
					if(turn >= 5){
						if(winnerCheck(symbol,symbol[num-1]) === true){
							document.getElementById("result").innerText = "PLAYER '"+symbol[num-1]+"' WON!";
						    gameover = true;
					    }
					}
					if(turn > 9 && gameover !== true){
						document.getElementById("result").innerText = "MATCH TIED!";
						return;
					}	
				}
			}
			else{
				alert("GAME OVER. TRY NEW GAME!");
			}
		}
		else{
			alert("THIS BOX IS ALREADY FILLED");
		}
	}//boxClick
	
	//emptyBoxes -->argument:symbol of all boxes ; return: empty boxes index
	function emptyBoxes(newSymbol){
		var j = 0;
		var empty = [];
		for (var i = 0;i < newSymbol.length;i++){
			if(newSymbol[i] == ''){
				empty[j] = i;
				j++;
			}
		}
		return empty;
	}//emptyBoxes
	
	
	//showhint -->calls minimax to find the opt move for the player
	function showhint(){
		var hintsymbol = [];
		//changing all x to o and vice-versa and storing in hintsymbol
		for(var i = 0;i < symbol.length;i++){
			if(symbol[i] == ai){
				hintsymbol.push(human);
			}else if(symbol[i] == human){
				hintsymbol.push(ai);
			}else{
				hintsymbol.push('');
			}
		}
		//calls minimax with hintsymbol and last argument 1 to convey minimax that call is from showhint
		var hintMove= minimax(hintsymbol,ai,0,-Infinity,+Infinity,1);
		//get element of hint move
		var hintId = "canvas"+(hintMove.id +1);
		//animate the box to hint the user
		$("#"+hintId).fadeOut(200).fadeIn(200).fadeOut(200).fadeIn(200);
	}//showhint
	
	
	//playAI --> calling minimax and making ai move
	function playAI(){
		//call minimax with symbol and alpha -infinity ,beta +infinity,last argument 0 to convey minimax that the call is from playAI
		var nextMove= minimax(symbol,ai,0,-Infinity,+Infinity,0);	
		//get element of next move
		var nextId = "canvas"+(nextMove.id +1);
		box = document.getElementById(nextId);
		ctx=box.getContext("2d");
		if(gameover === false){
			if((firstplayer == 0 && turn%2 !== 0)||(firstplayer == 1 && turn%2 == 0) ){
				turn++;
				drawO(nextMove.id);
				filled[nextMove.id] = true;
				if(turn >= 5){
					if(winnerCheck(symbol,symbol[nextMove.id]) === true){
						document.getElementById("result").innerText="PLAYER '"+symbol[nextMove.id]+"' WON";
					    gameover = true;
					}	
				}
				if(turn > 9 && gameover!== true){
						document.getElementById("result").innerText = "MATCH TIED!";
						return;
				}
			}
		}
		if(play == 2){          //check for timer choice
			//calls starttime
			starttime();
		}
	}//playAI
	
	//minimax -->argument: symbol of all boxes,player,depth,alpha,beta,whether the call fromhint/not
	function minimax(newSymbol,player,depth,alpha,beta,fromhint){
		var empty = [];
		//calls emptyBoxes
		empty = emptyBoxes(newSymbol);
		
		//checks for all terminal conditions
		if(winnerCheck(newSymbol,human)){
			return {score:-10,depth};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10,depth};
		}
		else if(empty.length === 0){
			if(winnerCheck(newSymbol,human)){
			return {score:-10,depth};	
		}
		else if(winnerCheck(newSymbol,ai)){
			return {score:10,depth};
		}
			return {score:0,depth};
		}
		
		var posMoves = [];                                   //stores index,score,depth of all empty boxes 
		for(var i = 0;i < empty.length;i++){
			var curMove = {};                                //stores index,score,depth empty box 
			var level;                                       //difficulty mode of the gameover
			//stores index of empty box in curMove.id
			curMove.id = empty[i];
			//placing player symbol in the empty box
			newSymbol[empty[i]] = player;
			//find level
			if(fromhint == 0){                               //if not fromhint level is user choice
				level = Number(sessionStorage.getItem("level"));
			}else if(fromhint == 1){                         //if fromhint level is 3 as we want correct next move without randomness
				level = Number(3);
			}
			if(player === ai){
				//calls minimax with opposite player, depth incremented
				result = minimax(newSymbol,human,depth+1,alpha,beta,fromhint);
				//store the score of the move along with randomness added to it based on level
				curMove.score = result.score+ Math.random()*(2* Number(difficulty[level])) +(-1* Number(difficulty[level]));
				//store depth
				curMove.depth = result.depth;
			}
			else{
				result = minimax(newSymbol,ai,depth+1,alpha,beta,fromhint);
				curMove.score = result.score+ Math.random()*(2* Number(difficulty[level])) +(-1* Number(difficulty[level]));
				curMove.depth = result.depth;
			}
			//undo changes on newSymbol
			newSymbol[empty[i]] = '';
			//push the curMove to posMoves
			posMoves.push(curMove);	
		}
		
		var bestMove; //optimal move
		if(player === ai){
			//initialising undesired extremes
			var highestScore = -1000;
			var lowestdepth = 1000;
			//loop to find maximum score for max player
			for(var j = 0;j < posMoves.length;j++){
				if(posMoves[j].score > highestScore || (posMoves[j].score == highestScore && posMoves[j].depth<lowestdepth)){ //check for highestScore and least depth
					highestScore = posMoves[j].score;
					bestMove = j;
					alpha = highestScore;
					lowestdepth = posMoves[j].depth;
				}
				if(alpha >= beta){                   //prune the branch
					break;
				}
			}
		}
		else{
			//initialising undesired extremes
			var lowestScore = 1000;
			//loop to find minimum score for min player
			for(var j = 0;j < posMoves.length;j++){
				if(posMoves[j].score < lowestScore){
					lowestScore = posMoves[j].score;
					bestMove = j;
					beta = lowestScore;
				}
				if(alpha >= beta){                  //prune the branch
					break;
				}
			}
		}
		return posMoves[bestMove];                  //return bestmove
	}//minimax
	 
};//end



