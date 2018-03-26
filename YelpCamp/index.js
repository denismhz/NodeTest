var express 	= require("express"),
    app 	= express(),
    mongoose 	= require("mongoose"),
    bodyParser 	= require("body-parser");

mongoose.connect("mongodb://localhost/yelp_camp");

//Schema setup
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

//Campground.create(	
//	function(err, campground){
//		if(err){
//			console.log(err);
//		} else console.log(campground);
//});
					

var campgrounds = [


	];
app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", function(req, res){
	res.render("landing");
});

app.get("/campgrounds", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){ console.loge(err);}
		else{ res.render("campgrounds",{campgrounds:allCampgrounds});}
	});
});

app.post("/campgrounds", function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
	var newCampground = {name: name, image:image, description:desc};
	//console.log(req.body.name + " " + req.body.image);
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

app.get("/campgrounds/new", function(req, res){
	res.render("new.ejs");
});

app.get("/campgrounds/:id", function(req, res){
	Campground.findById(req.params.id, function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("show", {campground: foundCampground});
		}
	});
});

app.listen(3000, function(){
	console.log("yelp camp server started");
});
