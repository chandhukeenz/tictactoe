    var two=document.querySelector("#tic2");	
    var three=document.querySelector("#tic3");
    var instwo=document.querySelector("#instruction2");
    var insthree=document.querySelector("#instruction3");
    var board = Number(sessionStorage.getItem("board"));
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
    
    var resetButton = document.querySelector(".reset");
	resetButton.addEventListener("click",function(){
    reset();
    })
    function reset(){
		document.location.reload();
	}
