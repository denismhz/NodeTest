require("dotenv").config();
const express           = require("express"),
      app               = express(),
      cors              = require("cors"),
      PORT              = 8081,
      errorHandler      = require("./handlers/error"),
      authRoutes        = require("./routes/auth"),
      messagesRoutes    = require("./routes/messages");
      bodyParser        = require("body-parser");

const {loginRequired, ensureCorrectUser} = require("./middleware/auth");

app.use(cors());
app.use(bodyParser.json());

//all my routes over here
app.use("/api/auth", authRoutes);
app.use("/api/users/:id/messages",
  loginRequired,
  ensureCorrectUser,
  messagesRoutes
);

app.get("/api/messages", loginRequired, async function(req, res, next){
  try {
    let messages = await db.Message.find().sort({createdAt: "descending"})
      .populate("user", {
        username:true,
        profileImageUrl:true
      });
    return res.status(200).json(messages);
  } catch (err) {
    return next(err);
  }
});

app.use(function(req, res, next){
  let err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(errorHandler);

app.listen(PORT, function(){
  console.log(`Warbler server started on port ${PORT}`);
});
