var mongoose = require("mongoose");
var passportLocalMongoose =  require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    avatar:String,
    firstName:String,
    lastName:String,
    bio:{type:String, default:"Tell someting about you."},
    email:{type: String, unique: true, required: true},
    resetPasswordToken:String,
    resetPasswordExpires:Date,
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
