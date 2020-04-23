var mongoose= require("mongoose");
var creditsaleschema = new mongoose.Schema({
    name: String,
    date:String,
    month:String,
    year:String,
    peice200ml:String,
    
    peice330ml:String,
    
    peice600ml:String,
    
    peice1500ml:String,
    
    peice5000ml:String,
   
});

module.exports=mongoose.model("creditsale", creditsaleschema);