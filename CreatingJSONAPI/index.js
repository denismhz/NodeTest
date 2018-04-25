var express     = require("express"),
    app         = express(),
    todoRoutes  = require("./routes/todos"),
    bodyParser  = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.use("/api/todos", todoRoutes);

app.get("/", function(req,res){
    res.json({message: "Hi from js object"});
});

app.listen(3000, function(){
    console.log("Todo server started");
});
