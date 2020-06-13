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
var fixedexpenses= require("../models/fixedexpenses");
var sale= require("../models/sale");
var middleware= require("../middleware");


router.get("/expenses/addsalary",middleware.isauthorised,function(req,res){
    employee.find({},function(err, employee){
        if(err){
            console.log(err)
        }else{
           res.render("salary/addsalary",{employee:employee}) 
        }
    });
});

router.post("/expenses/addsalary",middleware.isauthorised,function(req, res){
    
    salary.create(req.body.salary, function(err,salerecpt){
      if(err){
          console.log(err);
      } else{
          req.flash("success","salary successfully added");
          res.redirect("/expenses/addsalary");
      }
    });
});

router.get("/expenses/viewsalary",middleware.isloggedin,function(req,res){
    res.render("salary/viewsalary")
});

router.get("/expenses/allsalary/:month/:year",middleware.isloggedin,function(req,res){
salary.find({month:req.params.month,year:req.params.year}, function(err, salary){
    if(err){
        console.log(err)
    }else{
       
        res.render("salary/allsalary",{salary:salary})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allsalary",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allsalary/"+req.body.salary.month+"/"+req.body.salary.year);
    
});
router.get("/expenses/editsalary/:id/edit",middleware.isauthorised,function(req,res){
   salary.findById(req.params.id,function(err, salary) {
       if(err){
           console.log(err)
       }else{
           employee.find({},function(err, employee){
            if(err){
            console.log(err)
            }else{
           res.render("salary/editsalary",{employee:employee,salary:salary}) 
            }
         }); 
       }
   });
   
});

router.put("/expenses/editsalary/:id/:month/:year",middleware.isauthorised,function(req,res){
   salary.findByIdAndUpdate(req.params.id,req.body.salary,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/allsalary/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})










router.get("/expenses/addcaranddeisel",middleware.isauthorised,function(req,res){
        employee.find({},function(err, employee){
        if(err){
            console.log(err)
        }else{
           res.render("caranddeisel/adddeisel",{employee:employee}) 
        }
    });
});

router.post("/expenses/addcaranddeisel",middleware.isauthorised,function(req, res){
    
    caranddeisel.create(req.body.car, function(err,caranddeisel){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/expenses/addcaranddeisel");
      }
    });
});

router.get("/expenses/viewcaranddeisel",middleware.isloggedin,function(req,res){
    res.render("caranddeisel/viewcaranddeisel")
});

router.get("/expenses/allcaranddeisel/:plate/:month/:year",middleware.isloggedin,function(req,res){
caranddeisel.find({plate:req.params.plate,month:req.params.month,year:req.params.year}, function(err, car){
    if(err){
        console.log(err)
    }else{
       
        res.render("caranddeisel/allcaranddeisel",{car:car})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allcaranddeisel",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allcaranddeisel/"+req.body.deisel.plate+"/"+req.body.deisel.month+"/"+req.body.deisel.year);
    
});
router.get("/expenses/editcaranddeisel/:id/edit",middleware.isauthorised,function(req,res){
       caranddeisel.findById(req.params.id,function(err, car) {
           if(err){
               console.log(err)
           }else{
              employee.find({},function(err, employee){
                if(err){
                console.log(err)
                 }else{
                    res.render("caranddeisel/editcar",{employee:employee,car:car}) 
                    }
                }); 
           }
       })
        
});
router.put("/expenses/editcaranddeisel/:id/:plate/:month/:year",middleware.isauthorised,function(req,res){
   caranddeisel.findByIdAndUpdate(req.params.id,req.body.car,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/allcaranddeisel/"+req.params.plate+"/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})









router.get("/expenses/addgovtfees",middleware.isauthorised,function(req,res){
    res.render("govtfees/addgovtfees")
});

router.post("/expenses/addgovtfees",middleware.isauthorised,function(req, res){
    
    govtfee.create(req.body.fees, function(err,govtfees){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/expenses/addgovtfees");
      }
    });
});

router.get("/expenses/viewgovtfees",middleware.isloggedin,function(req,res){
    res.render("govtfees/viewgovtfees")
});

router.get("/expenses/allgovtfees/:month/:year",middleware.isloggedin,function(req,res){
govtfee.find({month:req.params.month,year:req.params.year}, function(err, fees){
    if(err){
        console.log(err)
    }else{
       
        res.render("govtfees/allgovtfees",{fees:fees})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allgovtfees",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allgovtfees/"+req.body.fees.month+"/"+req.body.fees.year);
    
});
router.get("/expenses/editgovtfees/:id/edit",middleware.isauthorised,function(req,res){
   govtfee.findById(req.params.id,function(err, fees) {
       if(err){
           console.log(err)
       }else{
          
           res.render("govtfees/editgovtfees",{fees:fees}) 

       }
   });
   
});

router.put("/expenses/editgovtfees/:id/:month/:year",middleware.isauthorised,function(req,res){
   govtfee.findByIdAndUpdate(req.params.id,req.body.fees,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/allgovtfees/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})









router.get("/expenses/addtrailorrent",middleware.isauthorised,function(req,res){
    res.render("trailorrent/addtrailorrent")
});

router.post("/expenses/addtrailorrent",middleware.isauthorised,function(req, res){
    
    trailorrent.create(req.body.trailor, function(err,trailorrent){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/expenses/addtrailorrent");
      }
    });
});

router.get("/expenses/viewtrailorrent",middleware.isloggedin,function(req,res){
    res.render("trailorrent/viewtrailorrent")
});

router.get("/expenses/alltrailorrent/:month/:year",middleware.isloggedin,function(req,res){
trailorrent.find({month:req.params.month,year:req.params.year}, function(err, trailor){
    if(err){
        console.log(err)
    }else{
       
        res.render("trailorrent/alltrailorrent",{trailor:trailor})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/alltrailorrent",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/alltrailorrent/"+req.body.trailor.month+"/"+req.body.trailor.year);
    
});
router.get("/expenses/edittrailorrent/:id/edit",middleware.isauthorised,function(req,res){
   trailorrent.findById(req.params.id,function(err, rent) {
       if(err){
           console.log(err)
       }else{
          
           res.render("trailorrent/edittrailorrent",{rent:rent}) 

       }
   });
   
});

router.put("/expenses/edittrailorrent/:id/:month/:year",middleware.isauthorised,function(req,res){
   trailorrent.findByIdAndUpdate(req.params.id,req.body.trailor,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/alltrailorrent/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})







router.get("/expenses/addextra",middleware.isauthorised,function(req,res){
    res.render("extraexpenses/addextra")
});

router.post("/expenses/addextra",middleware.isauthorised,function(req, res){
    
    extraexpense.create(req.body.extra, function(err,extra){
      if(err){
          console.log(err);
      } else{
          req.flash("success","expenses successfully added");
          res.redirect("/expenses/addextra");
      }
    });
});

router.get("/expenses/viewextra",middleware.isloggedin,function(req,res){
    res.render("extraexpenses/viewextra")
});

router.get("/expenses/allextra/:month/:year",middleware.isloggedin,function(req,res){
extraexpense.find({month:req.params.month,year:req.params.year}, function(err, extra){
    if(err){
        console.log(err)
    }else{
       
        res.render("extraexpenses/allextra",{extra:extra})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allextra",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allextra/"+req.body.extra.month+"/"+req.body.extra.year);
    
});
router.get("/expenses/editextra/:id/edit",middleware.isauthorised,function(req,res){
   extraexpense.findById(req.params.id,function(err, extra) {
       if(err){
           console.log(err)
       }else{
          
           res.render("extraexpenses/editextra",{extra:extra}) 

       }
   });
   
});

router.put("/expenses/editextra/:id/:month/:year",middleware.isauthorised,function(req,res){
   extraexpense.findByIdAndUpdate(req.params.id,req.body.extra,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/allextra/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})







router.get("/expenses/addtobank",middleware.isauthorised,function(req,res){
    res.render("bank/addtobank")
});

router.post("/expenses/addtobank",middleware.isauthorised,function(req, res){
    
    bank.create(req.body.bank, function(err,bank){
      if(err){
          console.log(err);
      } else{
          req.flash("success","successfully added to bank");
          res.redirect("/expenses/addtobank");
      }
    });
});

router.get("/expenses/viewtobank",middleware.isloggedin,function(req,res){
    res.render("bank/viewtobank")
});

router.get("/expenses/alltobank/:month/:year",middleware.isloggedin,function(req,res){
bank.find({month:req.params.month,year:req.params.year}, function(err, bank){
    if(err){
        console.log(err)
    }else{
       
        res.render("bank/alltobank",{bank:bank})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/alltobank",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/alltobank/"+req.body.bank.month+"/"+req.body.bank.year);
    
});
router.get("/expenses/edittobank/:id/edit",middleware.isauthorised,function(req,res){
   bank.findById(req.params.id,function(err, bank) {
       if(err){
           console.log(err)
       }else{
          
           res.render("bank/edittobank",{bank:bank}) 

       }
   });
   
});

router.put("/expenses/edittobank/:id/:month/:year",middleware.isauthorised,function(req,res){
   bank.findByIdAndUpdate(req.params.id,req.body.bank,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/alltobank/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})






router.get("/expenses/viewexpenses",middleware.isloggedin,function(req,res){
    res.render("expenses/viewexpenses")
});

router.get("/expenses/allexpenses/:month/:year",middleware.isloggedin,function(req,res){
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
                                    fixedexpenses.find({month:req.params.month,year:req.params.year},function(err, fexpenses) {
                                      if(err){
                                          console.log(err)
                                      }else{
                                           res.render("expenses/allexpenses",{salary:salary,car:car,govt:govt,rent:rent,extra:extra,fexpenses:fexpenses})
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
    // res.render("sales/viewsales")
});


router.post("/expenses/allexpenses",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allexpenses/"+req.body.expenses.month+"/"+req.body.expenses.year);
    
});










router.get("/expenses/addpurchaseditem",middleware.isauthorised,function(req,res){
    ctcprice.find({},function(err, price) {
      if(err){
          console.log(err)
      }else{
         res.render("purchased/addpurchaseditem",{price:price}) 
      }  
    })
});

router.get("/order/:p200/:p330/:p600/:p1500/:p5000/:desc",middleware.isloggedin,function(req,res){
    ctcprice.find({},function(err,price){
        if(err){
            console.log(err);
        }else{
            res.render("purchased/order",{p200:req.params.p200,p330:req.params.p330,p600:req.params.p600,p1500:req.params.p1500,p5000:req.params.p5000,price:price,desc:req.params.desc});
        }
    });
    
});

router.get("/expenses/viewpurchaseditem",middleware.isloggedin,function(req,res){
    res.render("purchased/viewpurchaseditem")
});

router.get("/expenses/allpurchaseditem/:month/:year",middleware.isloggedin,function(req,res){
purchased.find({month:req.params.month,year:req.params.year}, function(err, pitem){
    if(err){
        console.log(err)
    }else{
       
        res.render("purchased/allpurchaseditem",{pitem:pitem})
    }
});
});


router.post("/expenses/allpurchaseditem",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allpurchaseditem/"+req.body.pitem.month+"/"+req.body.pitem.year);
    
});


router.post("/expenses/addpurchaseditem",middleware.isauthorised,function(req, res){
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
          pitem.save();
          res.redirect("/expenses/allpurchaseditem/"+pitem.month+"/"+pitem.year);
      }
    });
});




router.get("/expenses/salaryslip",middleware.isauthorised,function(req,res){
        employee.find({},function(err, employee){
        if(err){
            console.log(err)
        }else{
           res.render("salary/salaryslip",{employee:employee}) 
        }
    });
});



router.get("/expenses/viewsalaryslip/:name/:month/:year",middleware.isauthorised,function(req,res){
salary.find({name:req.params.name,month:req.params.month,year:req.params.year}, function(err, slip){
    if(err){
        console.log(err)
    }else{
       
        res.render("salary/viewsalaryslip",{slip:slip})
    }
});
});

router.post("/expenses/viewsalaryslip",middleware.isauthorised,function(req,res){
   res.redirect("/expenses/viewsalaryslip/"+req.body.slip.name+"/"+req.body.slip.month+"/"+req.body.slip.year);
    
});













router.get("/expenses/viewcashflow",middleware.isloggedin,function(req,res){
    res.render("expenses/viewcashflow")
});

router.get("/expenses/allcashflow/:month/:year",middleware.isloggedin,function(req,res){
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
                                                          employee.find({},function(err, employee) {
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


router.post("/expenses/allcashflow",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allcashflow/"+req.body.cash.month+"/"+req.body.cash.year);
    
});


router.post("/expenses/updatecredittotalcash/:month/:year",middleware.isauthorised,function(req,res){
    let today = new Date().toLocaleDateString()
    credittotalcash.create(req.body.flow,function(err, cash) {
        if(err){
            console.log(err)
        }else{
            cash.year=req.params.year;
            cash.date=today;
            cash.save();
            req.flash("success","cash left in hand updated");
           res.redirect("/expenses/allcashflow/"+req.params.month+"/"+req.params.year); 
        }
    })
   
    
});







router.get("/balancesheet",middleware.isloggedin,function(req,res){
    res.render("expenses/viewbalancesheet")
});

router.get("/viewbalancesheet/:month/:year",function(req,res){

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
                                    sale.find({month:req.params.month,year:req.params.year},function(err, sale) {
                                        if(err){
                                            console.log(err)
                                        }else{
                                            ctcprice.find({},function(err,item) {
                                                if(err){
                                                    console.log(err)
                                                }else{
                                                         fixedexpenses.find({month:req.params.month,year:req.params.year},function(err, fexpenses) {
                                                             if(err){
                                                                 console.log(err)
                                                             }else{
                                                                 salerecipt.find({month:req.params.month,year:req.params.year},function(err, recipt) {
                                                                     if(err){
                                                                         console.log(err)
                                                                     }else{
                                                                          res.render("expenses/allbalancesheet",{salary:salary,car:car,govt:govt,rent:rent,extra:extra,sale:sale,item:item,employee:employee,fexpenses:fexpenses,recipt:recipt})
                                                                  
                                                              
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


router.post("/viewbalancesheet",middleware.isloggedin,function(req,res){
   res.redirect("/viewbalancesheet/"+req.body.sheet.month+"/"+req.body.sheet.year);
    
});




router.get("/expenses/order/:id/edit",middleware.isauthorised,function(req, res) {
    purchased.findById(req.params.id,function(err,order){
        if(err){
            console.log(err)
        }else{
            
                    employee.find({},function(err, employee) {
                        if(err){
                            console.log(err)
                        }else{
                            ctcprice.find({},function(err, price) {
                                if(err){
                                    console.log(err)
                                }else{
                                    res.render("purchased/editorder",{order:order,employee:employee,price:price})
                                }
                            })
                            
                        }
                    })
            
        }
    })
   
});



router.put("/expenses/editorder/:id/:month/:year",middleware.isauthorised,function(req, res){
  purchased.findByIdAndUpdate(req.params.id,req.body.pitem, function(err,updated){
        if(err){
          console.log(err) 
        }else{
            req.flash("success","updated successfully");
                 res.redirect("/expenses/allpurchaseditem/"+req.params.month+"/"+req.params.year)
            
        }
  });
    
});

router.get("/expenses/addfixedexpenses",middleware.isauthorised,function(req,res){
           res.render("expenses/fixedexpenses",{employee:employee}) 
});

router.post("/expenses/addfixedexpenses",middleware.isauthorised,function(req, res){
    
    fixedexpenses.create(req.body.fexpenses, function(err,fexpenses){
      if(err){
          console.log(err);
      } else{
          req.flash("success","Expense successfully added");
          res.redirect("/expenses/addfixedexpenses");
      }
    });
});
router.get("/expenses/viewfixedexpenses",middleware.isloggedin,function(req,res){
    res.render("expenses/viewfixedexpenses")
});

router.get("/expenses/allfixedexpenses/:month/:year",middleware.isloggedin,function(req,res){
fixedexpenses.find({month:req.params.month,year:req.params.year}, function(err, fexpense){
    if(err){
        console.log(err)
    }else{
       
        res.render("expenses/allfixedexpenses",{fexpense:fexpense})
    }
});
    // res.render("sales/viewsales")
});


router.post("/expenses/allfixedexpenses",middleware.isloggedin,function(req,res){
   res.redirect("/expenses/allfixedexpenses/"+req.body.fexpense.month+"/"+req.body.fexpense.year);

});
router.get("/expenses/editfixedexpenses/:id/edit",middleware.isauthorised,function(req,res){
   fixedexpenses.findById(req.params.id,function(err, fexpense) {
       if(err){
           console.log(err)
       }else{
          
           res.render("expenses/editfixedexpenses",{fexpense:fexpense}) 

       }
   });
   
});

router.put("/expenses/editfixedexpenses/:id/:month/:year",middleware.isauthorised,function(req,res){
   fixedexpenses.findByIdAndUpdate(req.params.id,req.body.fexpense,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/expenses/allfixedexpenses/"+req.params.month+"/"+req.params.year) 
       }
   }) 
})


module.exports= router;