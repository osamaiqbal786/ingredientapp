var express= require("express");
var router= express.Router();
var passport= require("passport");
var user= require("../models/user");
var middleware= require("../middleware");

router.get("/register",middleware.isloggedin,function(req, res) {
   res.render("register"); 
});

router.post("/register",middleware.isloggedin,function(req, res) {
   var newuser= new user({username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
       contact:req.body.contact});
   user.register(newuser,req.body.password, function(err,user){
      if(err){
          
          req.flash("error", err.message);
          return res.render("register");
      }
      
        // passport.authenticate("local")(req, res,function(){
        //     req.flash("success","Singed in as"+ user.username);
        //  res.redirect("/home");
         
        // });
       req.flash("success","User added");
       res.redirect("/home");
     
   });
});

router.get("/adminregister",middleware.isauthorised,function(req, res) {
   res.render("adminregister"); 
});

router.post("/adminregister",middleware.isauthorised,function(req, res) {
   var newuser= new user({username: req.body.username,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
       contact:req.body.contact,
       isadmin:"true"
   });
   user.register(newuser,req.body.password, function(err,user){
      if(err){
          
          req.flash("error", err.message);
          return res.render("adminregister");
      }
      
        // passport.authenticate("local")(req, res,function(){
        //     req.flash("success","Singed in as"+ user.username);
        //  res.redirect("/home");
         
        // });
       req.flash("success","Admin added");
       res.redirect("/home");
     
   });
});





router.get("/login",function(req, res) {
   res.render("login"); 
});

router.post("/login", passport.authenticate("local",
    {
    successRedirect:"/home",
    failureRedirect:"/login"
    
    }),function(req, res) {
    
});

router.get("/logout",function(req, res) {
   req.logout();
  req.flash("success","logged out successfully")
   res.redirect("/home");
});





module.exports= router;