const express = require('express');
const path= require("path");
const app= express();
const userrouter = require('./router/user.routes');
const doctorrouter = require('./router/doctor.routes');
require('dotenv').config()
const mongo= require("./config/db");
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

app.listen(3000);