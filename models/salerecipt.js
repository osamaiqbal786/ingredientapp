var mongoose= require("mongoose");
var salereciptschema = new mongoose.Schema({
    name: String,
    voucher:String,
    date:String,
    month:String,
    year:String,
    amount:String
   
});

module.exports=mongoose.model("salerecipt", salereciptschema);