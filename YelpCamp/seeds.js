var mongoose 	= require("mongoose"),
Comment = require("./models/comment"),
Campground = require("./models/campground");

var data = [
    {name: "Camp 1", image: "https://images.unsplash.com/photo-1498910265115-9fb541931cd1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b93ef63d91fab0386964e7e1ed2a971e&auto=format&fit=crop&w=1389&q=80", description: "desc"},
    {name: "Camp 2", image: "https://images.unsplash.com/photo-1500993855538-c6a99f437aa7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=72a0229d410f0e7c7701ebfc53b68a65&auto=format&fit=crop&w=1350&q=80", description: "desc"},
    {name: "Camp 3", image: "https://images.unsplash.com/photo-1504982692992-f66b2dbd2f95?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8243c6f8f2a708cb70366d5994463c01&auto=format&fit=crop&w=1350&q=80", description: "Lorem Ipsum SSSSSSSSS SSSSS SSSSSS aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb dddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd        cddddddddddddddddddddddddddda sddddddddddddddfaaaaaaaaaaaaaadas dfasdf"}
]


function seedDB(){
        Campground.remove({}, function(err){
            if(err) console.log(err);
            console.log("removed campgrounds");
            Comment.remove({}, function(){
                console.log("comments removed");
                campgrounds.forEach(function(seed){
                    Campground.create(seed, function(err, campground){
                    if(err) console.log(err);
                    else{
                        console.log("added Campground" + campground.name);
                    }
                });
            });
        });
    });
}

module.exports = seedDB;
