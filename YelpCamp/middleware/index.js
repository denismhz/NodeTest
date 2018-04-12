var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {};

middlewareObj.checkCampgroundOwnerShip = 
    function(req, res, next){     
        if(req.isAuthenticated()){

            Campground.findById(req.params.id, function(err, campground){
                if(err || !campground){
                    req.flash("error", "Campground not found!");
                    res.redirect("back");
                    }
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

middlewareObj.checkCommentOwnerShip =
    function(req, res, next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if(err || !foundComment){
                    req.flash("Comment not found!");
                    res.redirect("back");
                }
                else{
                    if(foundComment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                    }
                }
            });
        } else {
            req.flash("error", "Login first!");
            res.redirect("back");
        }
    }


middlewareObj.isLoggedIn =
    function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error", "Login first!");
        res.redirect("/login");
    }
module.exports = middlewareObj;
