var mongoose= require("mongoose");
var salaryschema = new mongoose.Schema({
    name: String,
    designation:String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("salary", salaryschema);