const express = require('express');
const {body,validationResult} = require("express-validator");
const router= express.Router();
const userModule = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isloggedin= require("../middleware/custom")
const doctorModel= require("../models/doctor");
const appoModel= require("../models/appointment");
const userModel = require("../models/user");
const deletee= require("../middleware/deletee")
router.get('/',deletee,async(req,res)=>{
    res.render("index",{cookies:req.cookies});
})
router.get("/symptoms",isloggedin,deletee,(req,res)=>{ 
    res.render("symptoms");
})
router.get("/create",(req,res)=>{
    res.render("create");
})
router.post("/create",
    body("email").trim().isEmail().isLength({min:5}),
    body("password").trim().isLength({min:6}),
    body("name").trim().isLength({min:3}),
    body("age").trim().isLength({min:1})
    ,async(req,res)=>{
    let error= validationResult(req);
    if(!error.isEmpty()){
        return  res.status(400).send({
            success:false,
            message: "Invalid input"
        })
    }
    let {email,password,name,age,gender}= req.body;
    let u = await userModule.findOne({email:email.trim()});
    if(u){
        return  res.status(500).send({
            success:false,
            message: "This email is already used"
        })
    }
    let hash = await bcrypt.hash(password.trim(),10);
    let users = await userModule.create({
        email: email.trim(),
        password: hash,
        name: name.trim(),
        age: age.trim(),
        gender:gender.trim()
    })
    res.send({
        success: true,
        message: "User created successfully!"
    });
})
router.get("/login",(req,res)=>{
    res.render("login");
})
router.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    let u = await userModule.findOne({email:email.trim()});
    if(!u){
        return res.status(400).send({
            success:false,
            message:"Somthing went wrong",
        })
    }
    let c = await bcrypt.compare(password,u.password);
    if(!c){
        return res.status(400).send({
            success:false,
            message:"Somthing went wrong",
        })
    }
    let token = await jwt.sign({email:email.trim(),as:"user"},process.env.secret);
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000
    });
    
    res.redirect("/user")
})

module.exports= router