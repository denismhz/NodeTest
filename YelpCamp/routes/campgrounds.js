var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

router.get("/", function(req, res){
	Campground.find({}, function(err, allCampgrounds){
		if(err){ console.loge(err);}
		else{ res.render("campgrounds/campgrounds",{campgrounds:allCampgrounds});}
	});
});

router.post("/", isLoggedIn, function(req, res){
	var name = req.body.name;
	var image = req.body.image;
	var desc = req.body.description;
        var author = {
            id: req.user._id,
            username: req.user.username
        }
	var newCampground = {name: name, image:image, description:desc, author:author};
	Campground.create(newCampground, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/campgrounds");
		}
	});
});

router.get("/:id/edit", checkCampgroundOwnerShip,  function(req, res){
    Campground.findById(req.params.id, function(err, campground){
        res.render("campgrounds/edit", {campground:campground});
    });
});

router.put("/:id", function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground,  function(err, updateCamp){
        if (err) console.log(err);
        else res.redirect("/campgrounds/" + req.params.id);
    });
});

router.delete("/:id", checkCampgroundOwnerShip, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err) console.log(err);
        else res.redirect("/campgrounds");
    });
});

router.get("/new", isLoggedIn, function(req, res){
	res.render("campgrounds/new.ejs");
});

router.get("/:id", function(req, res){
	Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
		if(err){
			console.log(err);
		}else{
			res.render("campgrounds/show", {campground: foundCampground});
		}
	});
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkCampgroundOwnerShip(req, res, next){     
    if(req.isAuthenticated()){

        Campground.findById(req.params.id, function(err, campground){
            if(err) res.redirect("back");
            else{
                if(campground.author.id.equals(req.user._id)){
                    next();
                } else {
                    res.send("back");
                }
            }
        });
    }
    else {
        res.redirect("back");
    }
}

module.exports= router;
