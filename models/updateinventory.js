var mongoose= require("mongoose");
var updateinventoryschema = new mongoose.Schema({
    name:String,
    type:String,
    date:String,
    month:String,
    year:String,
    voucher:String,
    peice200ml:String,
    
    peice330ml:String,
    
    peice600ml:String,
    
    peice1500ml:String,
    
    peice5000ml:String
   
});

module.exports=mongoose.model("updateinventory", updateinventoryschema);