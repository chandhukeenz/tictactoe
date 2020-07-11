window.onload=function(){
	var modeButtons = document.querySelectorAll(".mode");
	var playwithButtons = document.querySelectorAll(".playwith");
	sessionStorage.setItem("level", 3);
	sessionStorage.setItem("play", 0);
	for(var i=0;i<modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
	var level=0;
    modeButtons[0].classList.remove("active");
    modeButtons[1].classList.remove("active");
	modeButtons[2].classList.remove("active");
	modeButtons[3].classList.remove("active");
    this.classList.add("active")
		x=this.textContent;
		x===" EARTH" ? level=0:x===" ISS" ? level=1:x===" MOON"?level=2:level=3;
		sessionStorage.setItem("level", level);
	//findlevel(this.textContent);
	})
		
	}
	for(var i=0;i<playwithButtons.length;i++){
	playwithButtons[i].addEventListener("click",function(){
	var play=0;
    playwithButtons[0].classList.remove("active");
    playwithButtons[1].classList.remove("active");
	playwithButtons[2].classList.remove("active");
    this.classList.add("active")
	y=this.textContent;
	y===" AN AI!" ? play=0:y===" YOUR CREW MEMBERS!" ? play=1:play=2;	
    sessionStorage.setItem("play", play);
	})
    }
	
}