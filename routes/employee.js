var express= require("express");
var router= express.Router();
var employee= require("../models/employee");
var middleware= require("../middleware");

var multer = require('multer');
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'djweoyvdx', 
  api_key:862965739664757, 
  api_secret: 'LE20IJzelodOHiKR092XiQmCBNw'
});

router.get("/addemployee",middleware.isauthorised,function(req,res){
    res.render("employee/addemployee")
});


router.post("/addemployee", upload.single('image'),middleware.isauthorised, function(req, res) {
   
   cloudinary.uploader.upload(req.file.path, function(result) {
  req.body.employee.image = result.secure_url;
   
   employee.create(req.body.employee,function(err,employee){
       if(err){
           console.log(err)
       }else{
           res.redirect("/home")
       }
   });
   });
});
router.delete("/employee/:id",middleware.isauthorised, function(req, res){
   employee.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/home");
      } else{
          req.flash("success","Employee removed successfully");
         res.redirect("/home"); 
      }
   }); 
});
router.get("/viewemployee",middleware.isloggedin,function(req,res){
    employee.find({},function(err, employee){
       if(err){
           console.log(err)
       }else{
           res.render("home/homeextra",{employee:employee})
       } 
    });
    
});


router.get("/editemployee/:id/edit",middleware.isauthorised,function(req,res){
  
           employee.findById(req.params.id,function(err, employee){
            if(err){
            console.log(err)
            }else{
           res.render("employee/editemployee",{employee:employee}) 
            }
         }); 
    
});

router.put("/employee/:id/edit",middleware.isauthorised,function(req,res){
   employee.findByIdAndUpdate(req.params.id,req.body.employee,function(err,updated){
       if(err){
           console.log(err)
       }else{
          res.redirect("/viewemployee") 
       }
   }) 
})


module.exports= router;