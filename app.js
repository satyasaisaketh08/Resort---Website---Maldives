const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const md5 = require("md5");

const app = express();
app.use(bodyparser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");

//connecting to mongodb database

mongoose.connect("mongodb://localhost:27017/reviewsdb", {useNewUrlParser: true, useUnifiedTopology: true});

const schema = new mongoose.Schema({ // creating a schema to use for model ( tabel )
  name : String,
  email : String,
  review : String
});

const tabel = new mongoose.model("Review",schema); // creating a tabel (model)

const r1 = new tabel({ // creating an object wrto schema to store in model
  name : "vikram",
  email : "vikram@gmail.com",
  review : "wonderful hotel near maldives !! Thriving to come here again theres a lot of fun at this place if any is planning to come here dont forget to enjoy the night at the beach which will be awesome !!"
});

const rarray = [r1]; // an array which holds all the reviews

const mailschema = new mongoose.Schema({ // creating a schema to use for model ( tabel )
  email : String
});

const mailtabel = new mongoose.model("Mail",mailschema);

const userschema = new mongoose.Schema({ // creating a schema to use for model ( tabel )
  fname : String,
  lname : String,
  email : String,
  password : String
});

const usertabel = new mongoose.model("User",userschema);


app.get("/reviews", function(req, res) {
  tabel.find({},function(err,response){
    if(response.length === 0)
    {
      tabel.insertMany(rarray,function(err){ // inserting the data into model
        if(err){
          console.log(err);
        }else{
          console.log("data sucessfully inserted");
        }
      });
      res.redirect("/");
    }else{
      res.render("index", {
        "reviews": response
      });
    }
  });
});

app.get("/marriage-packs",function(req,res){
  res.sendFile(__dirname+"/marriage.html");
});


app.get("/login",function(req,res){
  res.render("login");
});

app.get("/register",function(req,res){
  res.render("register");
});

app.post("/review",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.get("/",function(req,res){
  res.sendFile(__dirname+"/home.html");
});

app.get("/accomodation",function(req,res){
  res.sendFile(__dirname+"/accomodation.html");
});

app.get("/about-us",function(req,res){
  res.sendFile(__dirname+"/aboutus.html");
});

app.get("/contact-us",function(req,res){
  res.sendFile(__dirname+"/contact-us.html");
});

app.get("/offers",function(req,res){
  res.sendFile(__dirname+"/offers.html");
});

app.get("/carrers",function(req,res){
  res.sendFile(__dirname+"/carrers.html");
});

app.get("/facilities",function(req,res){
  res.sendFile(__dirname+"/facilities.html");
});

app.post("/subscribe",function(req,res){
  const r1 = new mailtabel({ // creating an object wrto schema to store in model
      email : req.body.email
    });
  r1.save(function(err)
{
  if(err){
    res.sendFile(__dirname+"/public/failure.html");
  }
  else{
    res.sendFile(__dirname+"/public/sucess.html");
  }
});
});

app.post("/reviews",function(req,res){
  var n = req.body.Name;
  var e = req.body.Email;
  var r = req.body.Review;
  var nreview = new tabel({name : n,email : e,review : r});
  nreview.save();
  res.redirect("/reviews");
});

app.post("/login",function(req,res){
  usertabel.findOne({email : req.body.email},function(err,response){
    if(response === null ){
      // alert("please register Before login");
      // console.log(err);
      // res.sendFile(__dirname+"/public/failure.html");
      // res.redirect("/register");
      res.sendFile(__dirname+"/public/nouser.html");
    }else{
      if(response != null && response.password == md5(req.body.password))
      {
        // res.redirect("/");
        res.sendFile(__dirname+"/public/login_sucess.html");
      }
      else{
        // res.send("Incorrect password please try again !!");
        // res.redirect("/login");
        res.sendFile(__dirname+"/public/login_failure.html");
        // alert("please correct your password");
        // res.sendFile(__dirname+"/public/failure.html");
      }
    }
  });
});

app.post("/register",function(req,res){
  const user = new usertabel({ // creating an object wrto schema to store in model
      fname : req.body.fname,
      lname : req.body.lname,
      email : req.body.email,
      password : md5(req.body.password)
    });
  user.save(function(err){
    if(err){
      console.log(err);
    }else{
      res.render("login");
    }
  });

});


app.listen(3000, function() {
  console.log("Server started at port 3000");
});
