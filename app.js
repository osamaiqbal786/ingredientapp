var express= require("express");
var app=express();
var mongoose = require("mongoose");
var bodyparser = require("body-parser");
var flash= require("connect-flash");
var methodoverride= require("method-override");
var passport= require("passport");
var localstrategy= require("passport-local");
var employeeroute=require("./routes/employee");
var salesroute=require("./routes/sales");
var expensesroute=require("./routes/expenses");
var ctcprice=require("./models/ctcprice");




mongoose.connect('mongodb+srv://osamaiqbal786:osama786@cluster0-2683c.mongodb.net/office_record?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("connected to db");
}).catch(err => {
    console.log("error",err.message);
});


app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");
mongoose.set('useFindAndModify', false);
app.use(express.static(__dirname + "/public"));
// seeddb();
app.use(methodoverride("_method"));
app.use(flash());

app.use(require("express-session")({
    secret:"my name is iqbal",
    resave:false,
    saveUninitialized:false
    
}));
app.use(passport.initialize());
app.use(passport.session());
// passport.use(new localstrategy(user.authenticate()));
// passport.serializeUser(user.serializeUser());
// passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentuser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
   next();
});




app.get("/",function(req,res){
    res.redirect("/home");
});

app.get("/order/:p200/:p330/:p600/:p1500/:p5000",function(req,res){
    ctcprice.find({},function(err,price){
        if(err){
            console.log(err);
        }else{
            res.render("purchased/order",{p200:req.params.p200,p330:req.params.p330,p600:req.params.p600,p1500:req.params.p1500,p5000:req.params.p5000,price:price});
        }
    });
    
});




app.use(salesroute);
app.use(employeeroute);
app.use(expensesroute);


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("office app server has started");
});
