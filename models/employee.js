var mongoose= require("mongoose");
var employeeschema = new mongoose.Schema({
   
    name:String,
    designation:String,
    image:String,
    salary:String,
    joiningdate:String
});

module.exports=mongoose.model("employee", employeeschema);