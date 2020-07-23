//get elements
var resetButton = document.querySelector(".reset");
var two = document.querySelector("#tic2");	
var three = document.querySelector("#tic3");
var instwo = document.querySelector("#instruction2");
var insthree = document.querySelector("#instruction3");
var hintbox = document.querySelector("#hint");
var clock = document.querySelector("#clock");
var bomb = document.querySelector("#bomb")
//get stored inputs
var board = Number(sessionStorage.getItem("board")); // 3x3 or 4x4
var hint = Number(sessionStorage.getItem("hint"));     // with/without hint
var play = Number(sessionStorage.getItem("play"));    // ai/crew/timer

//displaying appropriate board and instructions for user choice of 2x2 or 3x3
if(board == 0){
	two.style.display = "block";
    instwo.style.display = "block";
    three.style.display = "none";
    insthree.style.display = "none";
}else if(board == 1){
	two.style.display = "none";
    instwo.style.display = "none";
    three.style.display = "block";
    insthree.style.display = "block";
}

//displaying hint button for user choice of with/without hint
if(hint == 0){
	hintbox.style.display = "none";
}else if(hint == 1){
	hintbox.style.display = "inline-block";
}

//displaying clock and clock-instructions for user choice of timer/not
if(play == 2){
	clock.style.display = "inline-block";
	bomb.style.display = "block";
}else{
	clock.style.display = "none";
	bomb.style.display = "none";
}

//listens for click on resetButton
resetButton.addEventListener("click",function(){
	reset();
})

//reset --> reloads the page
function reset(){
	document.location.reload();
}
