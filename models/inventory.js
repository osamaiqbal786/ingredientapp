var mongoose= require("mongoose");
var inventoryschema = new mongoose.Schema({
   
   dateupdated:String,
   
    peice200ml:String,
    
    peice330ml:String,
  
    peice600ml:String,
   
    peice1500ml:String,
   
    peice5000ml:String,

});

module.exports=mongoose.model("inventory", inventoryschema);