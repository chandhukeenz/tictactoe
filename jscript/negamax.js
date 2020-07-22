
$(document).ready(function() {
  
  // Tic tac toe globals
  
  var xoField = [ "", "", "", "", "", "", "", "", "" ], 
    
  winning = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ],
  
  baseAlpha = -Infinity,
  baseBeta = Infinity,
  maximumDepth = 6,
	autoMove = "",
  playerMove = "",
  computerMove = "",
  initialDepth = 0;
  
    
  function reset(){
    
    $(".centspan").each(function(evt){
      $(this).text("");
    });
    
    for(var i = 0; i < 9; i++){
      xoField[i] = "";
    }
    
    autoMove = "";
    playerMove = "";
    computerMove = "";
    initialDepth = 0;
    
    $("#x, #o").css("pointer-events", "auto");
   
    document.getElementById("animation").classList.remove("moonNoBkg");
    document.getElementById("animation").className = "moon";
    document.getElementById("animation").classList.remove("moon");
    $("#game-box").css("-webkit-animation", "");
    
   // $("#animation").removeClass("moon");
    $("#myModal").modal("show", true);
  }
  
  // Initializes the game and starts additional new games
  reset();
  
  function ticTacToe(){
    
    // Starts the game, initializes player and computer moves, and makes first computer move when computer starts first
  $(".startTheGame").each(function(evt){
    var $this = $(this);
    $this.on("click", function(evt){
      $("#myModal").modal("hide");
      $("#game-box").css("-webkit-animation", "game-box 150s linear infinite");
      document.getElementById("animation").className = "moon";
      if($this.text() === "X"){
        playerMove = "<img src='https://www.dropbox.com/s/gy2b5ypj9olulsv/tinywizard.png?raw=1'/>";
        computerMove = "<img src='https://www.dropbox.com/s/gat6ov2zlpdopdw/moonsmile.png?raw=1' class='pic'/>";
        
        $("#x, #o").css("pointer-events", "none");
        $(".centspan").css("pointer-events", "auto");
    }
    else{
      playerMove = "<img src = 'https://www.dropbox.com/s/gat6ov2zlpdopdw/moonsmile.png?raw=1' class='pic'/>";
      computerMove = "<img src='https://www.dropbox.com/s/gy2b5ypj9olulsv/tinywizard.png?raw=1' style='bottom: -20px;'/>";
     
      // Sends computer move to autoMoveHandling for xoField update and completion of move on tic tac toe board
        autoMoveHandling(xoField, computerMove, initialDepth, baseAlpha, baseBeta);
    
      // Deactivates click on buttons for "X" and "O"
      $("#x, #o").css("pointer-events", "none");
      
      // Activates click on tic tac toe squares
      $(".centspan").css("pointer-events", "auto");
    }
  });
});
    
$(".centspan").each(function(){
    var $this = $(this);
    $this.on("click", function(evt){
    evt.preventDefault();
      
    // Ensures tic tac toe squares inactive if playerMove not assigned "X" or "O"
    if(playerMove === null){
      console.log("token is null");
       return;
     }
  
 //When the center square is clicked, we want to remove the moon face so we need to find the div id "sq5".
      var index = +($this.data("num"));
      var boardArray = $(".centspan");
      var placer = ("#" + boardArray[index].id);
      
      if(placer === "#sq5"){
        $("#animation").removeClass("moon");
        $("#animation").addClass("moonNoBkg");
     }
      
  // Places human player move on board and updates xoField  
      $this.html(playerMove);
      xoField[index] = playerMove;
  
  // Send xoField to next step for processing of compouter move
    autoMoveHandling(xoField, computerMove, initialDepth, baseAlpha, baseBeta, 1);
           
    $this.css("pointer-events", "none");
    }); 
  });
 
 // Passes data to negaMax and completes computerMove
function autoMoveHandling(altstate, move, depth, alpha, beta, color){
     // debugger
     negamax(altstate, move, depth, alpha, beta, color);
 
     xoField[autoMove] = computerMove;
  
     var boardArray = $(".centspan");
     var placer = ("#" + boardArray[ autoMove ].id);
     $(placer).css("pointer-events", "none");
 
 //Removes the moon face from center square when computer choice is div id "#sq5".
     if(placer === "#sq5"){
        $("#animation").removeClass("moon");
        $("#animation").addClass("moonNoBkg");
     }
    
     $(placer).html(computerMove);
  
    screenWinners(altstate);
  };
    
function screenWinners(state){
   if(checkWin(state) && result === "Player won"){
         alert("Player wins");
         reset();
       }
      else if(checkWin(state) && result === "Computer won"){
        alert("Computer wins");
        reset();
      }
      else if(checkWin(state) && result === "draw"){
        alert("tie game");
        reset();
      }
 } 

// Returns available indexes of each state.
function getAvailableMoves(state){
  var freeIndexes = [];
  for(var i = 0; i < 9; i++){
    if(state[i] === ""){
      freeIndexes.push(i);
    }
  }

  return freeIndexes;
}
 
// Evaluates valid terminal states    
function checkWin(state){
      
  for(var i = 0; i < winning.length; i++){
      var a = winning[i];
        
      var indx0 = state[a[0]];
      var indx1 = state[a[1]];
      var indx2 = state[a[2]];
        
  if(indx0 === playerMove && indx0 === indx1 && indx1 === indx2){
     // result =  indx0 + "-won";
      result = "Player won"
      var win = a;
      return true;
    }
  if(indx0 === computerMove && indx0 === indx1 && indx1 === indx2){
      //result = indx0 + "-won";
      result = "Computer won";
      return true;
    }
 }
      
  var available = getAvailableMoves(state);
          
  if(available.length === 0) {
    console.log("draw");
      result = "draw";
      return true;
  }
  else {
      return false;
    }
};
       
function score(state, depth) {
	if (checkWin(state) && result === "Player won") {
    return -10 + depth;
	} else if (checkWin(state) && result === "Computer won") {
    return 10 - depth;
	} else {
		return 0;
	}
}
    
var switchTurn = function(move){
  if(move === playerMove){
    return computerMove;
  }
    else{
      return playerMove;
    }
  };    
    
/* After much head banging, I was able to construct this negamax solution based heavily on wikipedia @ https://en.wikipedia.org/wiki/Negamax and Hamed Ahmadi @ http://www.hamedahmadi.com/gametree/ */
function negamax(gameState, piece, depth, alpha, beta, color){
  if(checkWin(gameState) || depth >= maximumDepth){
    return score(gameState, depth) * color;
  }
  
  //Any large integer pair, such as -1000 and 1000 will work
  var max = -Infinity;
  var values = [];
  var moves = [];
  
  /* Other ways of handling turn switching. */
 // var autoPlayer = switchTurn(piece);
 // var autoPlayer = (piece === playerMove) ? computerMove : playerMove;
  
  var availableMoves = getAvailableMoves(gameState);
  for(var i = 0; i < availableMoves.length; i++){
    var newState = gameState.slice(0);
    newState[availableMoves[i]] = piece;
    values.push(-negamax(newState, switchTurn(piece), depth + 1, -beta, -alpha, -color));
    moves.push(availableMoves[i]);
  }
   
    values.filter(function(a, i){
      if(a > max){
        max = a;
       var index = i;
       autoMove = moves[index];
      }
      if(a > alpha){
        alpha = a;
      }
      if(alpha >= beta){
        return alpha;
      }
    });
    return max;
 
  } // negamax
    
} // ticTacToe
  
      ticTacToe();
  
});  // document.ready
