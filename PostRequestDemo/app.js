var express = require("express");
var app = express();
var bodyParser = require("body-parser");

var friends = ["Tony", "dada", "deede", "beege", "DSDSDS"];



app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");


app.post("/addFriend", function(req, res){
	var newFriend = req.body.newFriend;
	friends.push(newFriend);
	res.redirect("friends");
});

app.get("/", function(req, res){
	res.render("home");
});

app.get("/friends", function(req, res){
	res.render("friends", {friends:friends});
});

app.listen(3000, function(){
	console.log("server started port 3000");
});
