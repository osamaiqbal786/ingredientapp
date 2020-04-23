var mongoose= require("mongoose");
var trailorrentschema = new mongoose.Schema({
    voucherno:String,
    desc:String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("trailorrent", trailorrentschema);