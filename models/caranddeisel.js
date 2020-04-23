var mongoose= require("mongoose");
var caranddeiselschema = new mongoose.Schema({
    voucherno:String,
    plate: String,
    name: String,
    desc:String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("caranddeisel", caranddeiselschema);