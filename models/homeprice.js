var mongoose= require("mongoose");
var homepriceschema = new mongoose.Schema({
   
    price200ml:String,
    
    price330ml:String,
  
    price600ml:String,
   
    price1500ml:String,
   
    price5000ml:String,
    
    vat:String
});

module.exports=mongoose.model("homeprice", homepriceschema);