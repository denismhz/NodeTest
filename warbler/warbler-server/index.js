require("dotenv").config();
const express           = require("express"),
      app               = express(),
      cors              = require("cors"),
      PORT              = 8081,
      errorHandler      = require("./handlers/error"),
      authRoutes        = require("./routes/auth"),
      bodyParser        = require("body-parser");

app.use(cors());
app.use(bodyParser.json());

//all my routes over here
app.use("/api/auth", authRoutes);

app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Warbler server started on port ${PORT}`);
});
