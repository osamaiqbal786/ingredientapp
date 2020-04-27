var mongoose= require("mongoose");
var salaryschema = new mongoose.Schema({
    name: String,
    designation:String,
    type:String,
    date:String,
    bsalary:String,
    food:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("salary", salaryschema);