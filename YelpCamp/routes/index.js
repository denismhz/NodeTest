var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
	res.render("landing");
});

router.get("/register", function(req, res){
    res.render("register", {page: 'register'});
});

router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    if(req.body.adminCode === "secretcode123"){
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log("107" + err.message);
            return res.render("register", {error: err.message});
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

router.get("/login", function(req, res){
    res.render("login", {page: 'login'});
});

router.post("/login", passport.authenticate("local",
    {   successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
});

router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;
