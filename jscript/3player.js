var x,y;                         //stores row and coloumn number of symbol array
var box;                         //stores element by id
var ctx;                         //stores 2d context of box
var turn = 1;                    //game all players turn count
var filled;                      //array tells true/false based on if the canvas is filled/not
var symbol;                      //array stores players symbol (x,o,t) of all canvas
var gameover = false;            //true/false based on game on/off
var h1 = 'X';                    //player 1 symbol
var h2 = 'O';                    //player 2 symbol
var h3 = 't';                    //player 3 symbol              
var h1turn = [1,4,7,10,13,16];   //turns of player 1
var h2turn = [2,5,8,11,14];      //turns of player 2
var h3turn = [3,6,9,12,15];      //turns of player 3

//initialising all initial empty boxes with filled as false & symbol as ''
filled = [[],[],[],[]];
symbol = [[],[],[],[]];
for(var i = 0;i < 4;i++){
	for(var j = 0;j < 4;j++){
		filled[i][j] = false;
		symbol[i][j] = '';
	}
}

//checking for a click on the tic3 
document.getElementById("tic3").addEventListener("click",function(e){
	//calls blockClick function and sends the id of the clicked box 
	blockClick(e.target.id);
});

//draws x on the box that ctx holds
function drawX(){
		ctx.beginPath();
		ctx.moveTo(15,15);                     //top left of box
		ctx.lineTo(85,85);                     //bottom right of box
		ctx.moveTo(85,15);                     //top right of box
		ctx.lineTo(15,85);                     //bottom left of box
		ctx.lineWidth = 21;
		ctx.lineCap = "round";
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.closePath();
		symbol[x][y] = h1;	                   //stores the symbol as h1 ie player 1 -> 'x'
}

//draws o on the box that ctx holds
function drawO(){
	ctx.beginPath();
    ctx.arc(50,50,35,0,2*Math.PI);             //circle 
	ctx.lineWidth = 20;
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();
	symbol[x][y] = h2;                         //stores the symbol as h2 ie player 2 -> 'o'
}

//draws \ on the box that ctx holds
function drawslash(){
	ctx.beginPath();
	ctx.moveTo(15,15);                         //top left of box
	ctx.lineTo(85,85);                         //bottom right of box
	ctx.lineWidth = 21;
	ctx.lineCap = "round";
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();
	symbol[x][y] = h3;                         //stores the symbol as h3 ie player 3 -> 't'
}

//winnercheck --> argument:all boxes symbol & player ; return: true/false (won/not)
function winnercheck(symbol,player){
	var count1,count2,count3,count4;  
	//initialising count3 & count4 as zero (counts for diagonals)
	count3 = 0;
	count4 = 0;
	for(var i=0;i<4;i++){
		//initialising count1 & count2 as zero (counts for horizontal and vertical)
		count1 = 0;
		count2 = 0;
		for(var j = 0;j < 4;j++){
			if(symbol[i][j] == player){
				count1++;
			}
			if(symbol[j][i] == player){
				count2++;
			}
			if((i+j == 3) && symbol[i][j] == player){
				count3++;
			}
			if((i == j) && symbol[i][j] == player){
				count4++;
			}
		}
		//for horizontal and vertical 3 same symbols -> win
		if(count1 === 3 || count2 === 3){
				return true;
		}
	}
	//for diagonals 4 same symbols -> win
	if(count3 === 4 || count4 === 4){
		return true;
	}
	return false;
}//winnercheck

//whoseturn -->argument: turn count of game ; return:which player's turn (play=1 -->h1 2-->h2 3-->h3)
function whoseturn(giventurn){
	var play = 0;
	for(var i = 0;i < h1turn.length;i++){ 
		if(giventurn == h1turn[i]){
			play = 1;
			return play;
		}
	}
	for(var i = 0;i < h2turn.length;i++){
		if(giventurn == h2turn[i]){
			play = 2;
			return play;
		}
		if(giventurn == h3turn[i]){
			play = 3;
			return play;
		}
	}
} //whoseturn

//blockClick -->argument:id of the box
function blockClick(numId){
	//selecting clicked box element
	box = document.getElementById(numId);
	//getting 2d context
    ctx = box.getContext("2d");	 
    //get the box num from numid and store in x,y
    x = Number(numId[5]);
	y = Number(numId[6]);
	//calls whoseturn
	var whoturn = whoseturn(turn);                             //stores which player's turn
	if(filled[x][y] === false){                                //check box is empty
		if(gameover === false){                                //check gameover
			if(whoturn == 1){                                  //player 1
				turn++;                                        //increment turn
				drawX();                                       //calls drawX
				filled[x][y] = true;                           //fills the box
				if(winnercheck(symbol,symbol[x][y]) === true){ //check if the player won
					document.getElementById("result").innerText = "PLAYER '"+symbol[x][y]+"' WON!";
					gameover = true;
				}
				if(turn>16 && gameover !== true){              //check if game tied
					document.getElementById("result").innerText = "MATCH TIED!";
					gameover = true;
				}
			}else if(whoturn == 2){
				turn++;
				drawO();
				filled[x][y] = true;
				if(winnercheck(symbol,symbol[x][y]) === true){
					document.getElementById("result").innerText = "PLAYER '"+symbol[x][y]+"' WON!";
					gameover = true;
				}
				if(turn > 16 && gameover !== true){
					document.getElementById("result").innerText = "MATCH TIED!";
					gameover = true;
				}
			}else if(whoturn == 3){
				turn++;
				drawslash();
				filled[x][y] = true;
				if(winnercheck(symbol,symbol[x][y]) === true){
					document.getElementById("result").innerText = "PLAYER '"+symbol[x][y]+"' WON!";
					gameover = true;
				}
				if(turn > 16 && gameover !== true){
					document.getElementById("result").innerText = "MATCH TIED!";
					gameover = true;
				}	
			}
		}else{
			alert("GAME OVER. TRY NEW GAME!");
		}
	}else{
		alert("THIS BOX IS ALREADY FILLED");
	}
}//blockClick