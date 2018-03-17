var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there, welcome to my assignment");
});

app.get("/speak/:animal", function(req, res){
	if(req.params.animal === "pig")
		res.send("The pig says 'Oink'");
	else if(req.params.animal === "cow")
		res.send("The cow says 'Moo'");
	else if(req.params.animal === "dog")
		res.send("The dog says 'Woof'");
});

app.get("/repeat/:this/:times", function(req, res){
	for(var i = 0; i < Number(req.params.times); i++){
		res.send(req.params.this + " ");
	}
});

app.get("*", function(req, res){
	res.send("Sorry, page not found... What are you doing with your life?");
});

app.listen(3000, function(){
	console.log("Starting Server(Port 3000)");
});