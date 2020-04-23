var mongoose= require("mongoose");
var govtfeeschema = new mongoose.Schema({
    voucherno:String,
    desc:String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("govtfee", govtfeeschema);