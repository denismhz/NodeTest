require("dotenv").load();
const jwt = require("jsonwebtoken");

//make sure the user is logged - Authentication
exports.loginRequired = function(req, res, next){
  try {
    const token = req.headers.authorization.split(" ")[1]; //Bearrer token
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded) {
      if(decoded) {
        return next();
      } else {
        return next({
          status: 401,
          message: "please login first"
        });
      }
    });
  } catch(e) {
    return next({status: 401, message:"Plese loin first"});
  }
}

//make sure we geht teh correct user - Authorization
exports.ensureCorrectUser = function(req, res, next){
  try {
    const token = req.header.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET_KEY, function(err, decoded){
      if(decoded && decoded.id === req.params.id){
        return next();
      } else {
        return next({
          status: 401,
          message: "Unauthorized"
        });
      }
    });
  } catch(e){
    return next({status: 401, message:"unauthorizued"});
  }
};

