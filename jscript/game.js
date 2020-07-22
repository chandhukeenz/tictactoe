    var two=document.querySelector("#tic2");	
    var three=document.querySelector("#tic3");
    var instwo=document.querySelector("#instruction2");
    var insthree=document.querySelector("#instruction3");
    var hintbox=document.querySelector("#hint");
    var clock=document.querySelector("#clock");
    var board = Number(sessionStorage.getItem("board"));
    var hint=Number(sessionStorage.getItem("hint"));
    var play= Number(sessionStorage.getItem("play"));
    if(board==0){
		two.style.display="block";
        instwo.style.display="block";
        three.style.display="none";
        insthree.style.display="none";
		
	}else if(board==1){
		two.style.display="none";
        instwo.style.display="none";
        three.style.display="block";
        insthree.style.display="block";
	}
    if(hint==0){
		hintbox.style.display="none";
	}else if(hint==1){
		hintbox.style.display="inline-block";
	}
    if(play==2){
		clock.style.display="inline-block";
	}else{
		clock.style.display="none";
	}
    var resetButton = document.querySelector(".reset");
	resetButton.addEventListener("click",function(){
    reset();
    })
    function reset(){
		document.location.reload();
	}
