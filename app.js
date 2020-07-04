var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");

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
  console.log("tictactoe Server started!");
});
