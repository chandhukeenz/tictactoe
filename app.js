const http = require("http");
var express = require("express");
var app = express();
app.set("view engine","ejs");

app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/jscript"));

app.get("/", function(req, res){
	res.render("home");
	});
app.get("/gameboard", function(req, res){
	res.render("gameboard");
	});
app.get("*", function(req, res){
	res.send("<h1>SORRY! PAGE NOT FOUND!!</h1>");
	});

var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("tictactoe Server started! at 3000");
});

  