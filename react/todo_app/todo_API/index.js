var express     = require("express"),
    app         = express(),
    todoRoutes  = require("./routes/todos"),
    bodyParser  = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/todos", todoRoutes);

app.get("/", function(req,res){
    res.sendFile("index.html");
});

app.listen(8080, function(){
    console.log("Todo server started");
});
