const express = require("express");
const app = express();
const server =require("http").Server(app);
const io =require("socket.io")(server);
users=[];
connections=[];
//require('MicrosoftEngage2020/tictactoe/jscript/minimax.js')(io);

//extension .ejs 
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/jscript"));
app.use(express.static("/workspace/MicrosoftEngage2020/tictactoe/client.js"));

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


io.sockets.on("connection",function(socket){
	if(connections.length<2){
	connections.push(socket);
	console.log("Connected:  %s sockets connected",connections.length);
	}else{
		console.log("sry, maximum connections reached!");
	}
	
	//disconnect
	socket.on('disconnect',function(data){
		connections.splice(connections.indexOf(socket),1);
	    console.log("Disconnected: %s  sockets connected",connections.length);
	});
	
	//send msg
	socket.on('send msg',function(data){
		console.log(data);
		io.sockets.emit('new msg',{msg:data});
	});
	
});


//server started at port 3000
var port = process.env.PORT || 3000;
server.listen(port,function(){
	console.log("tictactoe Server started! at 3000");
});

  