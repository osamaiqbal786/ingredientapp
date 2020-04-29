var mongoose=require("mongoose");
var passportlocalmongoose= require("passport-local-mongoose");

var userschema= new mongoose.Schema({
   
   username:String,
   password:String,
   firstname:String,
   lastname:String,
   email:String,
   contact:String,
   
});

userschema.plugin(passportlocalmongoose)

module.exports=mongoose.model("user", userschema);
