var express = require("express");
var app = express();

app.get("/", function(req, res){
	res.render("dogs.ejs");
	//res.send("<h1>Welcome to the homepage</h1><h2>balakdfajlsk</h2>");
});

app.get('/fallinlovewith/:thing', function(req, res){
	var thing = req.params.thing;
	res.render("love.ejs", {thingVar: thing});
});

app.get("/posts", function(req, res){
	var posts = [
		{title: "post 1", author: "susy"},
		{title: "jajdjdjdeidia", author: "dandy"},
		{title: "adddd", author: "serverd"},
	]

	res.render("posts.ejs", {posts:posts});
});

app.listen(3000, function(){
	console.log("server started port 3000");
});
