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
var indexroute=require("./routes/index");
var user=require("./models/user");




mongoose.connect('mongodb+srv://osamaiqbal888208:iqbal786@cluster0-9uczn.mongodb.net/office_record?retryWrites=true&w=majority',{
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
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentuser=req.user;
  res.locals.error=req.flash("error");
  res.locals.success=req.flash("success");
   next();
});




app.get("/",function(req,res){
    res.redirect("/home");
});





app.use(indexroute);
app.use(salesroute);
app.use(employeeroute);
app.use(expensesroute);


app.listen(process.env.PORT, process.env.IP,function(){
    console.log("office app server has started");
});
