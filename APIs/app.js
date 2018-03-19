var express = require("express");
app = express();
var request = require("request");

app.set("view engine", "ejs");

app.get("/results", function(req, res){
	var query = req.query.search;
	console.log(query);
	var url = "https://omdbapi.com/?s=" + query + "&apikey=thewdb";
	request(url, function(error, response, body){
		if(!error && response.statusCode == 200){
			var data = JSON.parse(body);
			console.log(data);
			if(data["Error"]){
				res.render("undefined", {query:query});
			} else {
				//res.send(results["Search"][0]["Title"]);
				res.render("results", {data:data});
			}
		}
	});
});

app.get("/", function(req, res){
	res.render("search");
});

app.listen(3000, function(){
	console.log("movieapp started");
});
