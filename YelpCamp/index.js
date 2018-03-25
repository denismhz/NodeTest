var express 	= require("express"),
    app 	= express(),
    mongoose 	= require("mongoose"),
    bodyParser 	= require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");

var campgrounds = [
		{name:"Salmon Creek", image: "https://www.alaskacenters.gov/sites/alaskacenters.gov/files/sunset-trees-400_1.jpg"},
		{name: "Granite Hill", image: "data:image/jpeg;base64,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"},
		{name: "Mountain Goat Rest", image:"https://www.nps.gov/mora/learn/nature/images/TahomaGlacier-emeraldridge-2002_web_1.jpeg?maxwidth=650&autorotate=false"}
	];
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	res.render("campgrounds", {campgrounds:campgrounds});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var newCampground = {name: name, image:image};
	console.log(req.body.name + " " + req.body.image);
	campgrounds.push(newCampground);
	res.redirect("/campgrounds");
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.listen(3000, function(){
	console.log("yelp camp server started");
});
