var express= require("express");
var router= express.Router();
var employee= require("../models/employee");
var price= require("../models/price");
var sale= require("../models/sale");
var salerecipt= require("../models/salerecipt");
var issueditem= require("../models/issueditem");
var inventory= require("../models/inventory");
var creditsale= require("../models/creditsale");
var creditcash= require("../models/creditcash");
var updateinventory= require("../models/updateinventory");
var ctcprice=require("../models/ctcprice")




router.get("/home",function(req,res){
    employee.find({},function(err, employee){
       if(err){
           console.log(err)
       }else{
           res.render("home/home",{employee:employee})
       } 
    });
    
});

router.get("/sales/addsales",function(req,res){
   employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
          
          price.find({},function(err, price) {
        if(err){
            console.log(err)
        }else{
           res.render("sales/sales",{price:price,employee:employee}) 
        }
        
        }) 
       }
   }) 
    
    
});


router.post("/sales/addsales",function(req, res){
    
    var pm2=parseFloat(req.body.sales.peice200ml);
    var pm3=parseFloat(req.body.sales.peice330ml);
    var pm6=parseFloat(req.body.sales.peice600ml);
    var pm15=parseFloat(req.body.sales.peice1500ml);
    var pm50=parseFloat(req.body.sales.peice5000ml);
    var rm2=parseFloat(req.body.sales.price200ml);
    var rm3=parseFloat(req.body.sales.price330ml);
    var rm6=parseFloat(req.body.sales.price600ml);
    var rm15=parseFloat(req.body.sales.price1500ml);
    var rm50=parseFloat(req.body.sales.price5000ml);
    var total= (pm2*rm2)+(pm3*rm3)+(pm6*rm6)+(pm15*rm15)+(pm50*rm50);
    
    sale.create(req.body.sales, function(err,sale){
      if(err){
          console.log(err);
      } else{
          

         sale.total=total.toFixed(2);
                sale.save();
                req.flash("success","sales successfully added");
                res.redirect("/home");
      }
    });
});

router.get("/sales/viewsales",function(req,res){
    employee.find({},function(err, employee) {
        if(err){
            console.log(err)
        }else{
             res.render("sales/viewsales",{employee:employee})
        }
       
    })
    
});

router.get("/sales/allsales/:name/:month/:year",function(req,res){
sale.find({name:req.params.name,month:req.params.month,year:req.params.year}, function(err, sales){
    if(err){
        console.log(err)
    }else{
        res.render("sales/allsales",{sales:sales})
    }
});
    // res.render("sales/viewsales")
});

router.post("/sales/allsales",function(req,res){
   res.redirect("/sales/allsales/"+req.body.sales.name+"/"+req.body.sales.month+"/"+req.body.sales.year);
    
});

router.post("/sales/setprice",function(req,res){
    price.findOneAndUpdate({},{price200ml:req.body.price.price200ml,price330ml:req.body.price.price330ml,price330ml:req.body.price.price330ml,price600ml:req.body.price.price600ml,price1500ml:req.body.price.price1500ml,price5000ml:req.body.price.price5000ml,vat:req.body.price.vat},function(err,price){
       if(err){
           console.log(err)
       }else{
           req.flash("success","sale price updated");
           res.redirect("/home")
       }
    });
});


router.post("/sales/setctcprice",function(req,res){
    ctcprice.findOneAndUpdate({},{price200ml:req.body.price.price200ml,price330ml:req.body.price.price330ml,price330ml:req.body.price.price330ml,price600ml:req.body.price.price600ml,price1500ml:req.body.price.price1500ml,price5000ml:req.body.price.price5000ml},function(err,price){
       if(err){
           console.log(err)
       }else{
           req.flash("success","cost to company price updated");
           res.redirect("/home")
       }
    });
});

router.get("/sales/salerecipt",function(req,res){
    employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/recipt",{employee:employee}) 
      }  
    })
    
});

router.post("/sales/addsalerecipt",function(req, res){
    
    salerecipt.create(req.body.salerecipt, function(err,salerecpt){
      if(err){
          console.log(err);
      } else{
          req.flash("success","sale recipt successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/sales/viewallrecipt",function(req,res){
     employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/viewrecipt",{employee:employee}) 
      }  
    });
});

router.get("/sales/viewallsalerecipt/:name/:month/:year",function(req,res){
salerecipt.find({name:req.params.name,month:req.params.month,year:req.params.year}, function(err, recipt){
    if(err){
        console.log(err)
    }else{
       
        res.render("sales/allrecipt",{recipt:recipt})
    }
});
    // res.render("sales/viewsales")
});



router.post("/sales/viewallsalerecipt",function(req,res){
   res.redirect("/sales/viewallsalerecipt/"+req.body.salerecipt.name+"/"+req.body.salerecipt.month+"/"+req.body.salerecipt.year);
    
});

router.get("/sales/issueitem",function(req, res) {
       employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/issueitem",{employee:employee}) 
      }  
    });
    
});

router.post("/sales/issueitem",function(req, res) {
   var pm2=parseFloat(req.body.item.peice200ml);
    var pm3=parseFloat(req.body.item.peice330ml);
    var pm6=parseFloat(req.body.item.peice600ml);
    var pm15=parseFloat(req.body.item.peice1500ml);
    var pm50=parseFloat(req.body.item.peice5000ml);
    var total= (pm2)+(pm3)+(pm6)+(pm15)+(pm50); 
    issueditem.create(req.body.item,function(err,item){
        if(err){
            console.log(err)
        }else{
        inventory.find({},function(err, invt) {
            if(err){
                console.log(err)
            }  else{
                // console.log((parseInt(invt[0].peice200ml)-parseInt(req.body.sales.peice200ml)).toString())
                invt[0].peice200ml=(parseInt(invt[0].peice200ml)-parseInt(req.body.item.peice200ml)).toString();
                invt[0].peice330ml=(parseInt(invt[0].peice330ml)-parseInt(req.body.item.peice330ml)).toString();
                invt[0].peice600ml=(parseInt(invt[0].peice600ml)-parseInt(req.body.item.peice600ml)).toString();
                invt[0].peice1500ml=(parseInt(invt[0].peice1500ml)-parseInt(req.body.item.peice1500ml)).toString();
                invt[0].peice5000ml=(parseInt(invt[0].peice5000ml)-parseInt(req.body.item.peice5000ml)).toString();
                invt[0].dateupdated=req.body.item.date;
                invt[0].save();
                item.total=total;
                item.save()
                
            }
          });
          updateinventory.create(req.body.item,function(err, invto) {
             if(err){
                 console.log(err)
             }else{
                 invto.type="ISSUED"
                 invto.name="Issued to-"+req.body.item.name;
                 invto.save();
                 res.redirect("/home")
             } 
          });
            
           
        }
    });
});

router.get("/sales/viewissued",function(req,res){
           employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/viewissueditem",{employee:employee}) 
      }  
    });
});

router.get("/sales/viewallissueditem/:name/:month/:year",function(req,res){
    var month;
    var year;
    if(req.params.month==="JANUARY"){
        month="DECEMBER";
        year=(parseInt(req.params.year)-1).toString();
        
    }else{
       var months=[{month:"JANUARY"},{month:"FEBRUARY"},{month:"MARCH"},{month:"APRIL"},{month:"MAY"},{month:"JUNE"},{month:"JULY"},{month:"AUGUST"},{month:"SEPTEMBER"},{month:"OCTOBER"},{month:"NOVEMBER"},{month:"DECEMBER"}]
   for( var i=0;i<months.length;i++){
       if(months[i].month===req.params.month){
           month=months[i-1].month;
           year=req.params.year;
       }
   }    
    
    }

issueditem.find({name:req.params.name,month:req.params.month,year:req.params.year}, function(err, item){
    if(err){
        console.log(err)
    }else{
       sale.find({name:req.params.name,month:req.params.month,year:req.params.year},function(err,sales){
           if(err){
               console.log(err)
           }else{
                  creditsale.find({name:req.params.name,month:month.toLocaleUpperCase(),year:year},function(err, credit) {
                      if(err){
                          console.log(err)
                      }else{
                    
                         res.render("sales/allissueditem",{item:item,sales:sales,credit:credit}) 
                      }
                  })   
                     
                     
          
           }
       })
    }
});
    // res.render("sales/viewsales")
});



router.post("/sales/viewallissueditem",function(req,res){
   res.redirect("/sales/viewallissueditem/"+req.body.item.name+"/"+req.body.item.month+"/"+req.body.item.year);
    
});

router.post("/sales/updatecreditsale/:name/:month/:year",function(req, res) {
 
   creditsale.create(req.body.item,function(err,credit){
      if(err){
          console.log(err)
      }else{
          credit.name=req.params.name;
          credit.month=req.params.month;
          credit.year=req.params.year;
          credit.save()
          res.redirect("/home")
       
      } 
   }); 
});

router.post("/sales/updatecreditcash/:name/:month/:year",function(req, res) {
 
   creditcash.create(req.body.item,function(err,credit){
      if(err){
          console.log(err)
      }else{
          credit.name=req.params.name;
          credit.month=req.params.month;
          credit.year=req.params.year;
          credit.save()
          res.redirect("/home")
       
      } 
   }); 
});



router.get("/sales/creditcash",function(req, res) {
    employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
           res.render("sales/creditcash",{employee:employee}) 
       } 
    })
   
});

router.get("/sales/allcreditcash/:name/:month/:year",function(req, res) {
    var month;
    var year;
    if(req.params.month==="JANUARY"){
        month="DECEMBER";
        year=(parseInt(req.params.year)-1).toString();
        
    }else{
       var months=[{month:"JANUARY"},{month:"FEBRUARY"},{month:"MARCH"},{month:"APRIL"},{month:"MAY"},{month:"JUNE"},{month:"JULY"},{month:"AUGUST"},{month:"SEPTEMBER"},{month:"OCTOBER"},{month:"NOVEMBER"},{month:"DECEMBER"}]
   for( var i=0;i<months.length;i++){
       if(months[i].month===req.params.month){
           month=months[i-1].month;
           year=req.params.year;
       }
   }    
    
    }

   
  sale.find({name:req.params.name,month:req.params.month,year:req.params.year},function(err, sales) {
      if(err){
          console.log(err)
      } else{
          salerecipt.find({name:req.params.name,month:req.params.month,year:req.params.year},function(err, recipt) {
              if(err){
                  console.log(err)
              }else{
                  creditcash.find({name:req.params.name,month:month,year:year},function(err, credit) {
                      if(err){
                          console.log(err)
                      }else{
                          
                          
                          res.render("sales/allcreditcash",{sales:sales,recipt:recipt,credit:credit})
                      }
                  })
              }
          })
      }
  }); 
});



router.post("/sales/allcreditcash",function(req, res) {
   res.redirect("/sales/allcreditcash/"+req.body.item.name+"/"+req.body.item.month+"/"+req.body.item.year); 
});

router.get("/inventory/update",function(req, res) {
   res.render("inventory/inventory") 
});

router.get("/inventory/viewinventory",function(req, res) {
   res.render("inventory/viewinventory") 
});

router.get("/inventory/view/:month/:year",function(req, res) {
    inventory.find({},function(err, invt) {
        if(err){
            console.log(err)
        }else{
            updateinventory.find({month:req.params.month,year:req.params.year},function(err, uinvt) {
                if(err){
                    console.log(err)
                }else{
                    res.render("inventory/view",{invt:invt,uinvt:uinvt})
                }
            })
        }
    })
});
router.post("/inventory/viewinventory",function(req, res) {
   res.redirect("/inventory/view/"+req.body.invt.month+"/"+req.body.invt.year); 
});

router.post("/inventory/update",function(req, res) {
   updateinventory.create(req.body.sales,function(err,invt){
      if(err){
          console.log(err)
      }else{
          invt.name="Added to stock"
          invt.save();
             inventory.find({},function(err, invto) {
                if(err){
                     console.log(err)
                 }else{
                invto[0].peice200ml=(parseInt(invto[0].peice200ml)+parseInt(req.body.sales.peice200ml)).toString();
                invto[0].peice330ml=(parseInt(invto[0].peice330ml)+parseInt(req.body.sales.peice330ml)).toString();
                invto[0].peice600ml=(parseInt(invto[0].peice600ml)+parseInt(req.body.sales.peice600ml)).toString();
                invto[0].peice1500ml=(parseInt(invto[0].peice1500ml)+parseInt(req.body.sales.peice1500ml)).toString();
                invto[0].peice5000ml=(parseInt(invto[0].peice5000ml)+parseInt(req.body.sales.peice5000ml)).toString();
                invto[0].dateupdated=req.body.sales.date;
                
                invto[0].save();
                res.redirect("/home")
                } 
            });
      } 
   });

});

module.exports= router;