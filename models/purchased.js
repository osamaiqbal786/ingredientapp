var mongoose= require("mongoose");
var purchasedschema = new mongoose.Schema({
    date:String,
    month:String,
    year:String,
     peice200ml:String,
    price200ml:String,
    peice330ml:String,
    price330ml:String,
    peice600ml:String,
    price600ml:String,
    peice1500ml:String,
    price1500ml:String,
    peice5000ml:String,
    price5000ml:String,
    desc:String,
    vat:String,
    total:String
   
});

module.exports=mongoose.model("purchased", purchasedschema);