window.onload=function(){
	var modeButtons = document.querySelectorAll(".mode");
	var playwithButtons = document.querySelectorAll(".playwith");
	sessionStorage.setItem("level", 3);
	
	for(var i=0;i<modeButtons.length;i++){
	modeButtons[i].addEventListener("click",function(){
	var level=0;
    modeButtons[0].classList.remove("active");
    modeButtons[1].classList.remove("active");
	modeButtons[2].classList.remove("active");
	modeButtons[3].classList.remove("active");
    this.classList.add("active")
		x=this.textContent;
		//alert(x);
		x===" EARTH" ? level=0:x===" ISS" ? level=1:x===" MOON"?level=2:level=3;
		sessionStorage.setItem("level", level);
	//findlevel(this.textContent);
	})
		
	}
	for(var i=0;i<playwithButtons.length;i++){
	playwithButtons[i].addEventListener("click",function(){
    playwithButtons[0].classList.remove("active");
    playwithButtons[1].classList.remove("active");
	playwithButtons[2].classList.remove("active");
    this.classList.add("active")

	})
    }
	
}