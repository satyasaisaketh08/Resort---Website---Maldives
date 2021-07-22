// jshint esversion : 6

const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

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

// reviews = [{
//     "name": "vikram",
//     "review": "so good"
//   },
//   {
//     "name": "sai",
//     "review": "so good"
//   },
//   {
//     "name": "Teja",
//     "review": "so good"
//   }
// ];

app.get("/", function(req, res) {
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

app.post("/review",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var n = req.body.Name;
  var e = req.body.Email;
  var r = req.body.Review;
  var nreview = new tabel({name : n,email : e,review : r});
  nreview.save();
  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server started at port 3000");
});
