var mongoose= require("mongoose");
var saleschema = new mongoose.Schema({
    name: String,
    voucher:String,
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
    vat:String,
    shop:String,
    total:String
   
});

module.exports=mongoose.model("sale", saleschema);