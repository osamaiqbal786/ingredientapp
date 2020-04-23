var mongoose= require("mongoose");
var issueditemschema = new mongoose.Schema({
    name: String,
    voucher:String,
    date:String,
    month:String,
    year:String,
    peice200ml:String,
    
    peice330ml:String,
    
    peice600ml:String,
    
    peice1500ml:String,
    
    peice5000ml:String,

    total:String
   
});

module.exports=mongoose.model("issueditem", issueditemschema);