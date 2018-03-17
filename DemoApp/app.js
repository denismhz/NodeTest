var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.send("Hi there!");
});

app.get("/bye", function(req, res) {
	res.send("Goodbye");
});

app.get("/Dog", function(req, res) {
	console.log("requested /Dog");
	res.send("MEOW!");
});

app.listen(3000, function(){
	console.log("Demo app listening on port 3000!");
});
 

