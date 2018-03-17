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

app.get("/r/:subredditName", function(req, res) {
	var subreddit = req.params.subredditName;
	res.send("u are in subreddit " + subreddit.toUpperCase() + " Subredditt");
});

app.get("*", function(req, res) {
	res.send("u are a satr!!");
});

app.listen(3000, function(){
	console.log("server Started port 3000");
});
