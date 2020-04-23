var mongoose= require("mongoose");
var bankschema = new mongoose.Schema({
    desc:String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("bank", bankschema);