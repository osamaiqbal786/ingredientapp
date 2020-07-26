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
var ctcprice=require("../models/ctcprice");
var homeprice=require("../models/homeprice");
var middleware= require("../middleware");




router.get("/home",function(req,res){
    employee.find({},function(err, employee){
       if(err){
           console.log(err)
       }else{
           res.render("home/home",{employee:employee})
       } 
    });
    
});

router.get("/sales/addsales",middleware.isauthorised,function(req,res){
   employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
          
          price.find({},function(err, price) {
        if(err){
            console.log(err)
        }else{
            homeprice.find({},function(err, hprice) {
              if(err){
                  console.log(err)
              }  else{
                   res.render("sales/sales",{price:price,employee:employee,hprice:hprice}) 
              }
            })
          
        }
        
        }) 
       }
   }) 
    
    
});


router.get("/sales/addsales/:name/:voucher",middleware.isauthorised,function(req,res){
   employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
          
          price.find({},function(err, price) {
        if(err){
            console.log(err)
        }else{
            homeprice.find({},function(err, hprice) {
                if(err){
                    console.log(err)
                }else{
                    res.render("sales/repeatsales",{price:price,employee:employee,name:req.params.name,voucher:req.params.voucher,hprice:hprice}) 
                }
            })
           
        }
        
        }) 
       }
   }) 
    
    
});



router.post("/sales/addsales",middleware.isauthorised,function(req, res){
    
    if(req.body.sales.peice200ml===""){
        req.body.sales.peice200ml="0";
    }
     if(req.body.sales.peice330ml===""){
        req.body.sales.peice330ml="0";
    }
     if(req.body.sales.peice600ml===""){
        req.body.sales.peice600ml="0";
    }
     if(req.body.sales.peice1500ml===""){
        req.body.sales.peice1500ml="0";
    }
     if(req.body.sales.peice5000ml===""){
        req.body.sales.peice5000ml="0";
    }
    
    sale.find({voucher:req.body.sales.voucher},function(err, saless) {
      if(err){
          console.log(err)
      }else{
          if(saless.length<1){

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
                res.redirect("/sales/addsales/"+req.body.sales.name+"/"+req.body.sales.voucher);
      }
    });
             
              
          }else{
              req.flash("error","Voucher number already used please fill again");
              res.redirect('back')
          }
      }  
    })

});

router.get("/sales/viewsales",middleware.isloggedin,function(req,res){
    employee.find({},function(err, employee) {
        if(err){
            console.log(err)
        }else{
             res.render("sales/viewsales",{employee:employee})
        }
       
    })
    
});

router.get("/sales/allsales/:name/:month/:year",middleware.isloggedin,function(req,res){
sale.find({name:req.params.name,month:req.params.month,year:req.params.year}, function(err, sales){
    if(err){
        console.log(err)
    }else{
        res.render("sales/allsales",{sales:sales})
    }
});
    // res.render("sales/viewsales")
});

router.post("/sales/allsales",middleware.isloggedin,function(req,res){
   res.redirect("/sales/allsales/"+req.body.sales.name+"/"+req.body.sales.month+"/"+req.body.sales.year);
    
});

router.post("/sales/setprice",middleware.isauthorised,function(req,res){
    price.findOneAndUpdate({},{price200ml:req.body.price.price200ml,price330ml:req.body.price.price330ml,price600ml:req.body.price.price600ml,price1500ml:req.body.price.price1500ml,price5000ml:req.body.price.price5000ml,vat:req.body.price.vat},function(err,price){
       if(err){
           console.log(err)
       }else{
           req.flash("success","sale price updated");
           res.redirect("/home")
       }
    });
});


router.post("/sales/sethomeprice",middleware.isauthorised,function(req,res){
    homeprice.findOneAndUpdate({},{price200ml:req.body.price.price200ml,price330ml:req.body.price.price330ml,price600ml:req.body.price.price600ml,price1500ml:req.body.price.price1500ml,price5000ml:req.body.price.price5000ml},function(err,price){
       
       if(err){
           console.log(err)
       }else{
           req.flash("success","sale price updated");
           res.redirect("/home")
       }
    });
});

router.post("/sales/setctcprice",middleware.isauthorised,function(req,res){
    ctcprice.findOneAndUpdate({},{price200ml:req.body.price.price200ml,price330ml:req.body.price.price330ml,price600ml:req.body.price.price600ml,price1500ml:req.body.price.price1500ml,price5000ml:req.body.price.price5000ml,vat:req.body.price.vat},function(err,price){
       if(err){
           console.log(err)
       }else{
           req.flash("success","cost to company price updated");
           res.redirect("/home")
       }
    });
});

router.get("/sales/salerecipt",middleware.isauthorised,function(req,res){
    employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/recipt",{employee:employee}) 
      }  
    })
    
});

router.get("/sales/salerecipt/:name/:voucher",middleware.isauthorised,function(req,res){
   employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
          
         
           res.render("sales/repeatrecipt",{employee:employee,name:req.params.name,voucher:req.params.voucher}) 

       }
   }) 
    
    
});

router.post("/sales/addsalerecipt",middleware.isauthorised,function(req, res){
    salerecipt.find({voucher:req.body.salerecipt.voucher},function(err, sold) {
       if (err){
           console.log(err)
       }else{
           if(sold.length<1){
               salerecipt.create(req.body.salerecipt, function(err,salerecipt){
      if(err){
          console.log(err);
      } else{
          req.flash("success","sale recipt successfully added");
          res.redirect("/sales/salerecipt/"+salerecipt.name+"/"+salerecipt.voucher);
      }
    }); 
           }else{
                req.flash("error","Voucher number already used please fill again");
              res.redirect('back')
           }
       } 
    })
    
   
});

router.get("/sales/viewallrecipt",middleware.isloggedin,function(req,res){
     employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/viewrecipt",{employee:employee}) 
      }  
    });
});

router.get("/sales/viewallsalerecipt/:name/:month/:year",middleware.isloggedin,function(req,res){
salerecipt.find({name:req.params.name,month:req.params.month,year:req.params.year}, function(err, recipt){
    if(err){
        console.log(err)
    }else{
       
        res.render("sales/allrecipt",{recipt:recipt})
    }
});
    // res.render("sales/viewsales")
});



router.post("/sales/viewallsalerecipt",middleware.isloggedin,function(req,res){
   res.redirect("/sales/viewallsalerecipt/"+req.body.salerecipt.name+"/"+req.body.salerecipt.month+"/"+req.body.salerecipt.year);
    
});

router.get("/sales/issueitem",middleware.isauthorised,function(req, res) {
       employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/issueitem",{employee:employee}) 
      }  
    });
    
});

router.get("/sales/issueitem/:name/:voucher",middleware.isauthorised,function(req,res){
   employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
          
         
           res.render("sales/repeatissue",{employee:employee,name:req.params.name,voucher:req.params.voucher})
       }
   }) 
    
    
});



router.post("/sales/issueitem",middleware.isauthorised,function(req, res) {
   var pm2=parseFloat(req.body.item.peice200ml);
    var pm3=parseFloat(req.body.item.peice330ml);
    var pm6=parseFloat(req.body.item.peice600ml);
    var pm15=parseFloat(req.body.item.peice1500ml);
    var pm50=parseFloat(req.body.item.peice5000ml);
    var total= (pm2)+(pm3)+(pm6)+(pm15)+(pm50); 
    
    issueditem.find({voucher:req.body.item.voucher},function(err, issued) {
        if(err){
            console.log(err)
        }else{
            if(issued.length<1){
              
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
                 invto.name=req.body.item.name;
                 invto.save();
                 req.flash("success","Item successfully issued");
                 res.redirect("/sales/issueitem/"+req.body.item.name+"/"+req.body.item.voucher)
             } 
          });
            
           
        }
    });
              
                
            }else{
                req.flash("error","Voucher number already used please fill again");
              res.redirect('back')
            }
        }
    })
    
    
   
});

router.get("/sales/viewissued",middleware.isloggedin,function(req,res){
           employee.find({},function(err, employee) {
      if(err){
          console.log(err)
      }else{
         res.render("sales/viewissueditem",{employee:employee}) 
      }  
    });
});

router.get("/sales/viewallissueditem/:name/:month/:year",middleware.isloggedin,function(req,res){
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



router.post("/sales/viewallissueditem",middleware.isloggedin,function(req,res){
   res.redirect("/sales/viewallissueditem/"+req.body.item.name+"/"+req.body.item.month+"/"+req.body.item.year);
    
});

router.post("/sales/updatecreditsale/:name/:month/:year",middleware.isauthorised,function(req, res) {
 
   creditsale.create(req.body.item,function(err,credit){
      if(err){
          console.log(err)
      }else{
          credit.name=req.params.name;
          credit.year=req.params.year;
          credit.save()
          req.flash("success","Item on truck for "+req.params.month+" added successfully");
          res.redirect("/sales/viewallissueditem/"+req.params.name+"/"+req.params.month+"/"+req.params.year)
       
      } 
   }); 
});

router.post("/sales/updatecreditcash/:name/:month/:year",middleware.isauthorised,function(req, res) {
 
   creditcash.create(req.body.item,function(err,credit){
      if(err){
          console.log(err)
      }else{
          credit.name=req.params.name;
          credit.year=req.params.year;
          credit.save()
          req.flash("success","cash credit for "+req.params.month+" added successfully");
          res.redirect("/sales/allcreditcash/"+req.params.name+"/"+req.params.month+"/"+req.params.year)
       
      } 
   }); 
});



router.get("/sales/creditcash",middleware.isloggedin,function(req, res) {
    employee.find({},function(err, employee) {
       if(err){
           console.log(err)
       }else{
           res.render("sales/creditcash",{employee:employee}) 
       } 
    })
   
});

router.get("/sales/allcreditcash/:name/:month/:year",middleware.isloggedin,function(req, res) {
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



router.post("/sales/allcreditcash",middleware.isloggedin,function(req, res) {
   res.redirect("/sales/allcreditcash/"+req.body.item.name+"/"+req.body.item.month+"/"+req.body.item.year); 
});

router.get("/inventory/update",middleware.isauthorised,function(req, res) {
   res.render("inventory/inventory") 
});

router.get("/inventory/viewinventory",middleware.isloggedin,function(req, res) {
   res.render("inventory/viewinventory") 
});

router.get("/inventory/view/:month/:year",middleware.isloggedin,function(req, res) {
    inventory.find({},function(err, invt) {
        if(err){
            console.log(err)
        }else{
            updateinventory.find({month:req.params.month,year:req.params.year},function(err, uinvt) {
                if(err){
                    console.log(err)
                }else{
                    employee.find({},function(err,employee) {
                       if(err){
                           console.log(err)
                       }else{
                            res.render("inventory/view",{invt:invt,uinvt:uinvt,employee:employee})
                       } 
                    })
                   
                }
            })
        }
    })
});
router.post("/inventory/viewinventory",middleware.isloggedin,function(req, res) {
   res.redirect("/inventory/view/"+req.body.invt.month+"/"+req.body.invt.year); 
});

router.post("/inventory/update",middleware.isauthorised,function(req, res) {
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
                req.flash("success","successfully added to inventory");
                res.redirect("/home")
                } 
            });
      } 
   });

});


router.get("/sales/:id/edit",middleware.isauthorised,function(req, res) {
    sale.findById(req.params.id,function(err,updatesale){
        if(err){
            console.log(err)
        }else{
            price.find({},function(err, price) {
                if(err){
                    console.log(err)
                }else{
                    employee.find({},function(err, employee) {
                        if(err){
                            console.log(err)
                        }else{
                            homeprice.find({},function(err, hprice) {
              if(err){
                  console.log(err)
              }  else{
                            res.render("sales/editsales",{sales:updatesale,price:price,employee:employee,hprice:hprice})
              }
                    })
                        }
                    })
                     
                }
            })
            
        }
    })
   
});

router.put("/sales/edit/:id/:name/:month/:year",middleware.isauthorised,function(req, res){

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
    sale.findByIdAndUpdate(req.params.id,req.body.sales, function(err,sale){
      if(err){
          console.log(err);
      } else{
          

         sale.total=total.toFixed(2);
                sale.save();
                req.flash("success","sales edited added");
               res.redirect("/sales/allsales/"+ req.params.name+"/"+req.params.month+"/"+req.params.year)
      }
    });
            
});


router.get("/sales/issueditem/:id/edit",middleware.isauthorised,function(req, res) {
    issueditem.findById(req.params.id,function(err,updateitem){
        if(err){
            console.log(err)
        }else{
            
                    employee.find({},function(err, employee) {
                        if(err){
                            console.log(err)
                        }else{
                            res.render("sales/editissue",{item:updateitem,employee:employee})
                        }
                    })
            
        }
    })
   
});

router.put("/sales/editissue/:id/:name/:month/:year/:voch",middleware.isauthorised,function(req, res){
   
    var pm2=parseFloat(req.body.item.peice200ml);
    var pm3=parseFloat(req.body.item.peice330ml);
    var pm6=parseFloat(req.body.item.peice600ml);
    var pm15=parseFloat(req.body.item.peice1500ml);
    var pm50=parseFloat(req.body.item.peice5000ml);
    var total= (pm2)+(pm3)+(pm6)+(pm15)+(pm50); 
    
    issueditem.findByIdAndUpdate(req.params.id,req.body.item, function(err,updated){
        if(err){
          console.log(err) 
        }else{
          inventory.find({},function(err, invt) {
            if(err){
                console.log(err)
            }  else{
                invt[0].peice200ml=(parseInt(invt[0].peice200ml)+(parseInt(req.body.item.oldpeice200ml)-parseInt(req.body.item.peice200ml))).toString();
                invt[0].peice330ml=(parseInt(invt[0].peice330ml)+(parseInt(req.body.item.oldpeice330ml)-parseInt(req.body.item.peice330ml))).toString();
                invt[0].peice600ml=(parseInt(invt[0].peice600ml)+(parseInt(req.body.item.oldpeice600ml)-parseInt(req.body.item.peice600ml))).toString();
                invt[0].peice1500ml=(parseInt(invt[0].peice1500ml)+(parseInt(req.body.item.oldpeice1500ml)-parseInt(req.body.item.peice1500ml))).toString();
                invt[0].peice5000ml=(parseInt(invt[0].peice5000ml)+(parseInt(req.body.item.oldpeice5000ml)-parseInt(req.body.item.peice5000ml))).toString();
                // invt[0].dateupdated=req.body.item.date;
                invt[0].save();
                updated.total=total;
                updated.save()
                
            }
          });
        }
    })
    
  updateinventory.find({voucher:req.params.voch},function(err, uinvt) {
      if(err){
          console.log(err)
      }else{
          uinvt[0].type="ISSUED"
                 uinvt[0].name=req.body.item.name;
                 uinvt[0].date=req.body.item.date;
                 uinvt[0].month=req.body.item.month;
                 uinvt[0].year=req.body.item.year;
                 uinvt[0].voucher=req.body.item.voucher;
                 uinvt[0].peice200ml=req.body.item.peice200ml;
                 uinvt[0].peice330ml=req.body.item.peice330ml;
                 uinvt[0].peice600ml=req.body.item.peice600ml;
                 uinvt[0].peice1500ml=req.body.item.peice1500ml;
                 uinvt[0].peice5000ml=req.body.item.peice5000ml;
                 uinvt[0].save();
                 req.flash("success","updated successfully");
                 res.redirect("/sales/viewallissueditem/"+req.params.name+"/"+req.params.month+"/"+req.params.year)
           
      }
  }) ;
    
    
});




router.get("/sales/recipt/:id/edit",middleware.isauthorised,function(req, res) {
    salerecipt.findById(req.params.id,function(err,recipt){
        if(err){
            console.log(err)
        }else{
            
                    employee.find({},function(err, employee) {
                        if(err){
                            console.log(err)
                        }else{
                            res.render("sales/editrecipt",{recipt:recipt,employee:employee})
                        }
                    })
            
        }
    })
   
});



router.put("/sales/editrecipt/:id/:name/:month/:year",middleware.isauthorised,function(req, res){
  salerecipt.findByIdAndUpdate(req.params.id,req.body.salerecipt, function(err,updated){
        if(err){
          console.log(err) 
        }else{
            req.flash("success","updated successfully");
                 res.redirect("/sales/viewallsalerecipt/"+req.params.name+"/"+req.params.month+"/"+req.params.year)
            
        }
  })
    
})
router.get("/inventory/viewinventory/:id/edit",middleware.isauthorised,function(req,res){
   updateinventory.findById(req.params.id,function(err, uinvt) {
       if(err){
           console.log(err)
       }else{
          
           res.render("inventory/editadded",{uinvt:uinvt}) 

       }
   });
   
});

router.put("/inventory/update/edit/:id/:month/:year",middleware.isauthorised,function(req,res){
   updateinventory.findByIdAndUpdate(req.params.id,req.body.sales,function(err,updated){
       if(err){
           console.log(err)
       }else{
           inventory.find({},function(err, invt) {
            if(err){
                console.log(err)
            }  else{
                invt[0].peice200ml=(parseInt(invt[0].peice200ml)-(parseInt(req.body.sales.oldpeice200ml)-parseInt(req.body.sales.peice200ml))).toString();
                invt[0].peice330ml=(parseInt(invt[0].peice330ml)-(parseInt(req.body.sales.oldpeice330ml)-parseInt(req.body.sales.peice330ml))).toString();
                invt[0].peice600ml=(parseInt(invt[0].peice600ml)-(parseInt(req.body.sales.oldpeice600ml)-parseInt(req.body.sales.peice600ml))).toString();
                invt[0].peice1500ml=(parseInt(invt[0].peice1500ml)-(parseInt(req.body.sales.oldpeice1500ml)-parseInt(req.body.sales.peice1500ml))).toString();
                invt[0].peice5000ml=(parseInt(invt[0].peice5000ml)-(parseInt(req.body.sales.oldpeice5000ml)-parseInt(req.body.sales.peice5000ml))).toString();
                // invt[0].dateupdated=req.body.sales.date;
                invt[0].save();
               res.redirect("/inventory/view/"+req.params.month+"/"+req.params.year) 
                
            }
          });
         
       }
   }) 
})

module.exports= router;