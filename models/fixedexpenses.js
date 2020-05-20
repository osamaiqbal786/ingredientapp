var mongoose= require("mongoose");
var fixedexpensesschema = new mongoose.Schema({
    name: String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("fixedexpenses", fixedexpensesschema);