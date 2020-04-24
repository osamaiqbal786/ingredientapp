var express= require("express");
var router= express.Router();
var caranddeisel=require("../models/caranddeisel");
var govtfee=require("../models/govtfee");
var trailorrent=require("../models/trailorrent");
var extraexpense=require("../models/extraexpense");
var bank=require("../models/bank");
var salary= require("../models/salary");
var employee=require("../models/employee");





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
   res.redirect("/expenses/allsalary/"+req.body.salerecipt.month+"/"+req.body.salerecipt.year);
    
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




module.exports= router;