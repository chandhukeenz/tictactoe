var express = require("express");
var app = express();

//extension .ejs 
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/jscript"));

//request homePage
app.get("/", function(req, res){
	res.render("home");
});

//request gamePage
app.get("/gameboard", function(req, res){
	res.render("gameboard");
});

//for unknown requests
app.get("*", function(req, res){
	res.send("<h1>SORRY! PAGE NOT FOUND!!</h1>");
});

//server started at port 3000
var port = process.env.PORT || 3000;
app.listen(port,function(){
	console.log("tictactoe Server started! at 3000");
});

  