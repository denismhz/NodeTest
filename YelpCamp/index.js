var express 	= require("express"),
    app 	= express(),
    passport    = require("passport"),
    LocalStrategy=require("passport-local"),
    User        = require("./models/user"),
    mongoose 	= require("mongoose"),
    bodyParser 	= require("body-parser"),
    Campground 	= require("./models/campground"),
    Comment	= require("./models/comment"),
    seedDB	= require("./seeds");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
	
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.set("view engine", "ejs");
//seedDB();

app.use(require("express-session")({
    secret:"ksksskksksksksks",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    console.log(req.user);
    res.locals.currentUser = req.user;
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, function(){
	console.log("yelp camp server started");
});
