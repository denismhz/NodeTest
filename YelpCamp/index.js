require("dotenv").config();
var express 	= require("express"),
    app 	= express(),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy=require("passport-local"),
    User        = require("./models/user"),
    mongoose 	= require("mongoose"),
    bodyParser 	= require("body-parser"),
    Campground 	= require("./models/campground"),
    Comment	= require("./models/comment"),
    methodOverride=require("method-override"),
    seedDB	= require("./seeds");

var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");

mongoose.connect("mongodb://localhost/yelp_camp");
	
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
app.use(flash());
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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/", indexRoutes);

app.listen(3000, function(){
	console.log("yelp camp server started");
});
