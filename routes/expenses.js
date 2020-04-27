var express= require("express");
var router= express.Router();
var caranddeisel=require("../models/caranddeisel");
var govtfee=require("../models/govtfee");
var trailorrent=require("../models/trailorrent");
var extraexpense=require("../models/extraexpense");
var bank=require("../models/bank");
var salary= require("../models/salary");
var employee=require("../models/employee");
var purchased=require("../models/purchased");
var ctcprice=require("../models/ctcprice");
var salerecipt= require("../models/salerecipt");
var credittotalcash= require("../models/credittotalcash");


router.get("/expenses/addsalary",function(req,res){
    employee.find({},function(err, employee){
        if(err){
            console.log(err)
        }else{
           res.render("salary/addsalary",{employee:employee}) 
        }
    });
});

router.post("/expenses/addsalary",function(req, res){
    
    salary.create(req.body.salary, function(err,salerecpt){
      if(err){
          console.log(err);
      } else{
          req.flash("success","salary successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewsalary",function(req,res){
    res.render("salary/viewsalary")
});

router.get("/expenses/allsalary/:month/:year",function(req,res){
salary.find({month:req.params.month,year:req.params.year}, function(err, salary){
    if(err){
        console.log(err)
    }else{
       
        res.render("salary/allsalary",{salary:salary})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allsalary",function(req,res){
   res.redirect("/expenses/allsalary/"+req.body.salary.month+"/"+req.body.salary.year);
    
});












router.get("/expenses/addcaranddeisel",function(req,res){
        employee.find({},function(err, employee){
        if(err){
            console.log(err)
        }else{
           res.render("caranddeisel/adddeisel",{employee:employee}) 
        }
    });
});

router.post("/expenses/addcaranddeisel",function(req, res){
    
    caranddeisel.create(req.body.car, function(err,caranddeisel){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewcaranddeisel",function(req,res){
    res.render("caranddeisel/viewcaranddeisel")
});

router.get("/expenses/allcaranddeisel/:plate/:month/:year",function(req,res){
caranddeisel.find({plate:req.params.plate,month:req.params.month,year:req.params.year}, function(err, car){
    if(err){
        console.log(err)
    }else{
       
        res.render("caranddeisel/allcaranddeisel",{car:car})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allcaranddeisel",function(req,res){
   res.redirect("/expenses/allcaranddeisel/"+req.body.deisel.plate+"/"+req.body.deisel.month+"/"+req.body.deisel.year);
    
});










router.get("/expenses/addgovtfees",function(req,res){
    res.render("govtfees/addgovtfees")
});

router.post("/expenses/addgovtfees",function(req, res){
    
    govtfee.create(req.body.fees, function(err,govtfees){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewgovtfees",function(req,res){
    res.render("govtfees/viewgovtfees")
});

router.get("/expenses/allgovtfees/:month/:year",function(req,res){
govtfee.find({month:req.params.month,year:req.params.year}, function(err, fees){
    if(err){
        console.log(err)
    }else{
       
        res.render("govtfees/allgovtfees",{fees:fees})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allgovtfees",function(req,res){
   res.redirect("/expenses/allgovtfees/"+req.body.fees.month+"/"+req.body.fees.year);
    
});










router.get("/expenses/addtrailorrent",function(req,res){
    res.render("trailorrent/addtrailorrent")
});

router.post("/expenses/addtrailorrent",function(req, res){
    
    trailorrent.create(req.body.trailor, function(err,trailorrent){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewtrailorrent",function(req,res){
    res.render("trailorrent/viewtrailorrent")
});

router.get("/expenses/alltrailorrent/:month/:year",function(req,res){
trailorrent.find({month:req.params.month,year:req.params.year}, function(err, trailor){
    if(err){
        console.log(err)
    }else{
       
        res.render("trailorrent/alltrailorrent",{trailor:trailor})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/alltrailorrent",function(req,res){
   res.redirect("/expenses/alltrailorrent/"+req.body.trailor.month+"/"+req.body.trailor.year);
    
});








router.get("/expenses/addextra",function(req,res){
    res.render("extraexpenses/addextra")
});

router.post("/expenses/addextra",function(req, res){
    
    extraexpense.create(req.body.extra, function(err,extra){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewextra",function(req,res){
    res.render("extraexpenses/viewextra")
});

router.get("/expenses/allextra/:month/:year",function(req,res){
extraexpense.find({month:req.params.month,year:req.params.year}, function(err, extra){
    if(err){
        console.log(err)
    }else{
       
        res.render("extraexpenses/allextra",{extra:extra})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allextra",function(req,res){
   res.redirect("/expenses/allextra/"+req.body.extra.month+"/"+req.body.extra.year);
    
});








router.get("/expenses/addtobank",function(req,res){
    res.render("bank/addtobank")
});

router.post("/expenses/addtobank",function(req, res){
    
    bank.create(req.body.bank, function(err,bank){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewtobank",function(req,res){
    res.render("bank/viewtobank")
});

router.get("/expenses/alltobank/:month/:year",function(req,res){
bank.find({month:req.params.month,year:req.params.year}, function(err, bank){
    if(err){
        console.log(err)
    }else{
       
        res.render("bank/alltobank",{bank:bank})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/alltobank",function(req,res){
   res.redirect("/expenses/alltobank/"+req.body.bank.month+"/"+req.body.bank.year);
    
});







router.get("/expenses/viewexpenses",function(req,res){
    res.render("expenses/viewexpenses")
});

router.get("/expenses/allexpenses/:month/:year",function(req,res){
salary.find({month:req.params.month,year:req.params.year}, function(err, salary){
    if(err){
        console.log(err)
    }else{
        caranddeisel.find({month:req.params.month,year:req.params.year}, function(err, car){
             if(err){
                console.log(err)
            }else{
             govtfee.find({month:req.params.month,year:req.params.year},function(err, govt) {
                 if(err){
                     console.log(err)
                 }else{
                     trailorrent.find({month:req.params.month,year:req.params.year},function(err, rent) {
                         if(err){
                             console.log(err)
                         }else{
                             extraexpense.find({month:req.params.month,year:req.params.year},function(err, extra) {
                                if(err){
                                    console.log(err)
                                }else{
                                    
                                    res.render("expenses/allexpenses",{salary:salary,car:car,govt:govt,rent:rent,extra:extra}) 
                                } 
                             })
                             
                         }
                     })
                     
                 }
             })   
        
        
            }
      }) 
       
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allexpenses",function(req,res){
   res.redirect("/expenses/allexpenses/"+req.body.expenses.month+"/"+req.body.expenses.year);
    
});










router.get("/expenses/addpurchaseditem",function(req,res){
    ctcprice.find({},function(err, price) {
      if(err){
          console.log(err)
      }else{
         res.render("purchased/addpurchaseditem",{price:price}) 
      }  
    })
});

router.post("/expenses/addpurchaseditem",function(req, res){
    var pm2=parseFloat(req.body.pitem.peice200ml);
    var pm3=parseFloat(req.body.pitem.peice330ml);
    var pm6=parseFloat(req.body.pitem.peice600ml);
    var pm15=parseFloat(req.body.pitem.peice1500ml);
    var pm50=parseFloat(req.body.pitem.peice5000ml);
    var rm2=parseFloat(req.body.pitem.price200ml);
    var rm3=parseFloat(req.body.pitem.price330ml);
    var rm6=parseFloat(req.body.pitem.price600ml);
    var rm15=parseFloat(req.body.pitem.price1500ml);
    var rm50=parseFloat(req.body.pitem.price5000ml);
    var total= (pm2*rm2)+(pm3*rm3)+(pm6*rm6)+(pm15*rm15)+(pm50*rm50);
    
    purchased.create(req.body.pitem, function(err,pitem){
      if(err){
          console.log(err);
      } else{
          pitem.total=total.toFixed(2);
          pitem.save()
          req.flash("success","purchased successfully updated");
          res.redirect("/home");
      }
    });
});

router.get("/expenses/viewpurchaseditem",function(req,res){
    res.render("purchased/viewpurchaseditem")
});

router.get("/expenses/allpurchaseditem/:month/:year",function(req,res){
purchased.find({month:req.params.month,year:req.params.year}, function(err, pitem){
    if(err){
        console.log(err)
    }else{
       
        res.render("purchased/allpurchaseditem",{pitem:pitem})
    }
});
});


router.post("/expenses/allpurchaseditem",function(req,res){
   res.redirect("/expenses/allpurchaseditem/"+req.body.pitem.month+"/"+req.body.pitem.year);
    
});


router.get("/expenses/salaryslip",function(req,res){
        employee.find({},function(err, employee){
        if(err){
            console.log(err)
        }else{
           res.render("salary/salaryslip",{employee:employee}) 
        }
    });
});



router.get("/expenses/viewsalaryslip/:name/:month/:year",function(req,res){
salary.find({month:req.params.name,month:req.params.month,year:req.params.year}, function(err, slip){
    if(err){
        console.log(err)
    }else{
       
        res.render("salary/viewsalaryslip",{slip:slip})
    }
});
});

router.post("/expenses/viewsalaryslip",function(req,res){
   res.redirect("/expenses/viewsalaryslip/"+req.body.slip.name+"/"+req.body.slip.month+"/"+req.body.slip.year);
    
});













router.get("/expenses/viewcashflow",function(req,res){
    res.render("expenses/viewcashflow")
});

router.get("/expenses/allcashflow/:month/:year",function(req,res){
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
    
salary.find({month:req.params.month,year:req.params.year}, function(err, salary){
    if(err){
        console.log(err)
    }else{
        caranddeisel.find({month:req.params.month,year:req.params.year}, function(err, car){
             if(err){
                console.log(err)
            }else{
             govtfee.find({month:req.params.month,year:req.params.year},function(err, govt) {
                 if(err){
                     console.log(err)
                 }else{
                     trailorrent.find({month:req.params.month,year:req.params.year},function(err, rent) {
                         if(err){
                             console.log(err)
                         }else{
                             extraexpense.find({month:req.params.month,year:req.params.year},function(err, extra) {
                                if(err){
                                    console.log(err)
                                }else{
                                    salerecipt.find({month:req.params.month,year:req.params.year},function(err, recipt) {
                                        if(err){
                                            console.log(err)
                                        }else{
                                            bank.find({month:req.params.month,year:req.params.year},function(err,bank) {
                                                if(err){
                                                    console.log(err)
                                                }else{
                                                    
                                                    credittotalcash.find({month:month,year:year},function(err,credit){
                                                        if(err){
                                                            console.log(err)
                                                        }else{
                                                          employee.find({designation:"salesman"},function(err, employee) {
                                                              if(err){
                                                                  console.log(err)
                                                              }else{
                                                                  
                                                                  res.render("expenses/allcashflow",{salary:salary,car:car,govt:govt,rent:rent,extra:extra,recipt:recipt,bank:bank,credit:credit,employee:employee})
                                                                  
                                                                   
                                                              }
                                                          }) 
                                                            
                                                        }
                                                        
                                                    })
                                                }
                                            })
                                        }
                                    })
                                     
                                } 
                             })
                             
                         }
                     })
                     
                 }
             })   
        
        
            }
      }) 
       
    }
});

});


router.post("/expenses/allcashflow",function(req,res){
   res.redirect("/expenses/allcashflow/"+req.body.cash.month+"/"+req.body.cash.year);
    
});




module.exports= router;