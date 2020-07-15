var x,y;
var box;
var ctx;
var turn = 1;
var filled;
var symbol;
//var winner;
var gameover =false;
var h1='X';
var h2='O';
var h3='t';
var result={};	
var h1turn=[1,4,7,10,13,16];
var h2turn=[2,5,8,11,14];
var h3turn=[3,6,9,12,15];
filled = [[],[],[],[]];
symbol = [[],[],[],[]];
for(var i=0;i<4;i++){
	for(var j=0;j<4;j++){
		filled[i][j]=false;
		symbol[i][j]='';	
	}
	}
//all winning positions
//winner=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
document.getElementById("tic3").addEventListener("click",function(e){
			blockClick(e.target.id);
	       // alert("inside eventlistener");
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
		symbol[x][y] = h1;	
	}
	function drawO(){
		ctx.beginPath();
	    ctx.arc(50,50,35,0,2*Math.PI);
		ctx.lineWidth=20;
		ctx.strokeStyle="white";
		ctx.stroke();
		ctx.closePath();
		symbol[x][y]= h2;
	}
    function drawslash(){
		ctx.beginPath();
		ctx.moveTo(15,15);
		ctx.lineTo(85,85);
		ctx.lineWidth=21;
		ctx.lineCap="round";
		ctx.strokeStyle ="white";
		ctx.stroke();
		ctx.closePath();
		symbol[x][y]= h3;
	}

function winnercheck(symbol,player){
	var count1,count2,count3,count4;
	count3=0;
	count4=0;
	for(var i=0;i<4;i++){
		count1=0;
		count2=0;
		for(var j=0;j<4;j++){
			if(symbol[i][j]==player){
				count1++;
			}
			if(symbol[j][i]==player){
				count2++;
			}
			if((i+j==3) && symbol[i][j]==player){
				count3++;
			}
			if((i==j)&&symbol[i][j]==player){
				count4++;
			}
		}
		if(count1===3 || count2===3){
				return true;
		}
	}
	if(count3===4 || count4===4){
		return true;
	}
	return false;
}

function whoseturn(giventurn){
	play=0;
	//alert(giventurn);
	//alert(h1turn);
	for(var i=0;i<h1turn.length;i++){
		if(giventurn==h1turn[i]){
			//alert("ho");
			play=1;
			return play;
		}
	}
	for(var i=0;i<h2turn.length;i++){
		if(giventurn==h2turn[i]){
			play=2;
			return play;
		}
		if(giventurn==h3turn[i]){
			play=3;
			return play;
		}
	}
	
}

function blockClick(numId){
	//alert("inside blockClick");
	box= document.getElementById(numId);
    ctx = box.getContext("2d");	 
    //get the box num from the id and store in num
    x =Number(numId[5]);
	y=Number(numId[6]);
	//alert(x + y);
	var whoturn;
	whoturn=whoseturn(turn);
	//alert(whoturn);
	if(filled[x][y]===false){
		if(gameover===false){
			if(whoturn==1){
				//alert("inside player1");
				turn++;
				drawX();
				filled[x][y]=true;
				if(winnercheck(symbol,symbol[x][y])===true){
					document.getElementById("result").innerText = "player "+symbol[x][y]+" won!";
					gameover=true;
				}
				if(turn>16 && gameover!==true){
					document.getElementById("result").innerText = "DRAW";
					gameover=true;
				}
			}else if(whoturn==2){
				turn++;
				drawO();
				filled[x][y]=true;
				if(winnercheck(symbol,symbol[x][y])===true){
					document.getElementById("result").innerText = "player "+symbol[x][y]+" won!";
					gameover=true;
				}
				if(turn>16 && gameover!==true){
					document.getElementById("result").innerText = "DRAW";
					gameover=true;
				}
			}else if(whoturn==3){
				turn++;
				drawslash();
				filled[x][y]=true;
				if(winnercheck(symbol,symbol[x][y])===true){
					document.getElementById("result").innerText = "player "+symbol[x][y]+" won!";
					gameover=true;
				}
				if(turn>16 && gameover!==true){
					document.getElementById("result").innerText = "DRAW";
					gameover=true;
				}	
			}
		}else{
			alert("game over try new game");
		}
	}else{
		alert("this box already filled");
	}
}