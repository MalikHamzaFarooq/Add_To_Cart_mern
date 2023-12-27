var mongoose =require("mongoose");

var userSchema = mongoose.Schema({
    name: {type : String},
    email: {type : String,required:true,lowercase:true},
    dob :Date,
    password:{type:String,required:true},
},{timestamps:true});

var User = mongoose.model("User",userSchema); 

module.exports = User;