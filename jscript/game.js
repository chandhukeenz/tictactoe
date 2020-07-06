window.onload= function(){
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
	winner=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
	for(var i=0;i<9;i++){
		filled[i]=false;
		symbol[i]='';
	}
	document.getElementById("tic").addEventListener("click",function(e){
		boxClick(e.target.id);
	});
	
	function drawX(){
		box.style.backgroundcolor="#fb5181";
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
		box.style.backgroundcolor="#93f273";
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
		switch(numId){
			case "canvas1": num =1;
				            break;
			case "canvas2": num =2;
				            break;
			case "canvas3": num =3;
				            break;
			case "canvas4": num =4;
				            break;
			case "canvas5": num =5;
				            break;
			case "canvas6": num =6;
				            break;
			case "canvas7": num =7;
				            break;
			case "canvas8": num =8;
				            break;
			case "canvas9": num =9;
				            break;
		}
		if(filled[num-1]=== false){
			if(gameover===false){
				if(turn%2 !==0){
					drawX();
					turn++;
					filled[num-1]=true;
					
					if(winnerCheck(symbol,symbol[num-1])===true){
						document.getElementById("result").innerText = "player "+symbol[num-1]+" won!";
						gameover=true;
					}
					if(turn>9 && gameover!==true){
						document.getElementById("result").innerText = "DRAW";
						return;
					}
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
	
}