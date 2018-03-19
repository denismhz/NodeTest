var express = require("express");
var app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("home");
	//res.send("<h1>Welcome to the homepage</h1><h2>balakdfajlsk</h2>");
});

app.get('/fallinlovewith/:thing', function(req, res){
	var thing = req.params.thing;
	res.render("love", {thingVar: thing});
});

app.get("/posts", function(req, res){
	var posts = [
		{title: "post 1", author: "susy"},
		{title: "jajdjdjdeidia", author: "dandy"},
		{title: "adddd", author: "serverd"},
	]

	res.render("posts", {posts:posts});
});

app.listen(3000, function(){
	console.log("server started port 3000");
});
