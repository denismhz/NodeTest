var	express					= require("express"),
	app					= express(),
	mongoose				= require("mongoose"),
	bodyParser				= require("body-parser"),
	passport				= require("passport"),
	LocalStrategy			        = require("passport-local"),
        User                                    = require("./models/user"),
	passportLocalMongoose	                = require("passport-local-mongoose");
			
mongoose.connect("mongodb://localhost/auth_demo_app");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/",function(req, res){
		res.render("home");
});

app.get("/secret", isLoggedIn, function(req, res){
		res.render("secret");
});

app.get("/register", function(req, res){
    res.render("register");
});

app.post("/register", function(req, res) {
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err) console.log("error");
        passport.authenticate("local")(req, res, function(){
            res.redirect("/secret");
        });
    });
});

app.get("/login", function(req, res){
    res.render("login");
});

app.post("/login", passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function(req, res){

});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        console.log("authenticated");
        return next();
    }
    console.log("not authenticated");
    res.redirect("/login");
}

app.listen(3000, function(){
		console.log("Auth demo started");
});
