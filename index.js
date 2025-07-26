const express = require('express');
const path= require("path");
const app= express();
const userrouter = require('./router/user.routes');
const doctorrouter = require('./router/doctor.routes');
require('dotenv').config()
const mongo= require("./config/db");
const doctorModel= require("./models/doctor");
const userModel= require("./models/user");
const appoModel= require("./models/appointment");
const deletee= require("./middleware/deletee")
const isloggedin= require("./middleware/custom")
const CookieParser = require('cookie-parser');
mongo();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(CookieParser());

app.use("/user",userrouter);
app.use("/doctor",doctorrouter);

app.get("/logout",(req,res)=>{
    res.cookie("token","");
    res.redirect("/user");
})
app.get("/available",isloggedin,deletee,async(req,res)=>{
    let searc = req.query.search?.trim() || "";
    searc = RegExp(searc,"i");
    let doctors;
    if(searc){
        doctors= await doctorModel.find({
            $or: [
                {name: searc},
                {specialities: searc},
                {clinic: searc}
            ]
        })
    }
    else{
        doctors= await doctorModel.find();
    }
    let u = await userModel.findOne({email:req.user.email});
    let a = await appoModel.find({userid:u._id});
    res.render("available",{doctors,appo:a})
    
})
app.get("/confirmation/:email",isloggedin,async(req,res)=>{
    let d= await doctorModel.findOne({email:req.params.email});
    let u= await userModel.findOne({email:req.user.email});
    let a= await appoModel.findOne({userid:u._id,doctorid:d._id})
    
    res.render("confirmation",{doctor:d,appo:a});
})
app.get("/kal",isloggedin,deletee,async(req,res)=>{
    let u= await userModel.findOne({email:req.user.email});
    let a= await appoModel.find({userid:u._id}).populate("doctorid")
    res.render("kal",{appos:a})
})

app.listen(3000);