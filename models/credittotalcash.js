var mongoose= require("mongoose");
var credittotalcashschema = new mongoose.Schema({
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("credittotalcash", credittotalcashschema);