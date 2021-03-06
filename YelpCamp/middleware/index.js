var Campground = require("../models/campground");
var User = require("../models/user");
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
                    if(campground.author.id.equals(req.user._id) || req.user.isAdmin){
                        next();
                    } else {
                        res.redirect("back");
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
                    if(foundComment.author.id.equals(req.user._id) || req.user.isAdmin){
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

middlewareObj.checkIfCurrentUser =
    function(req, res, next){
        if(req.isAuthenticated()){
            if(req.user._id.equals(req.params.id)){
                next();
            } else {
                req.flash("error", "You don't have permission to do that!");
                res.redirect("/users/" + req.params.id);
            }
        } else {
            req.flash("error", "Login first!");
            res.redirect("/login");
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
