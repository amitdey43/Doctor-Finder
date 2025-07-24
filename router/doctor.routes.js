const express = require('express');
const router= express.Router();
const {body,validationResult}= require("express-validator");
const doctorModel= require("../models/doctor");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const path = require("path");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");

cloudinary.config({
    cloud_name: 'dbenulf4m',
    api_key: '228915219323633',
    api_secret: 'oHsKNELO62VAIO8ot0gbwgcPMTE'
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'doctor-finder',
        format: async (req, file) => path.extname(file.originalname).slice(1),
        public_id: (req, file) => file.originalname +"-"+ Date.now(),
    },
});

const upload = multer({ storage: storage });

router.get("/create",(req,res)=>{
    res.render("createdr")
})
router.post("/create",
    upload.single("photo"),
    body("email").trim().isEmail().isLength({ min: 5 }),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().isLength({ min: 3 }),
    body("clinic").trim().isLength({ min: 6 }),
    body("fee").trim().isLength({ min: 1 })
    ,async(req,res)=>{
    let error= validationResult(req);
    if(!error.isEmpty()){
        return  res.status(400).send({
            success:false,
            message: "Invalid input"
        })
    }
     let {email, password,name,specialities,clinic,fee} = req.body;
     let u= await doctorModel.findOne({email:email.trim()});
     if(u){
        return res.status(500).send({
            success:false,
            message:"This email is already used"
        })
     }
    let hash = await bcrypt.hash(password.trim(),10);
    let dr= await doctorModel.create({
        email:email.trim(),
        password:hash,
        name:name.trim(),
        specialities,
        clinic:clinic.trim(),
        fee:fee.trim(),
        photo: req.file.path
    })
    res.send({
        success: true,
        message: "User created successfully!"
    });  
})
router.get("/login",(req,res)=>{
    res.render("login1")
})

router.post("/login",async(req,res)=>{
    let {email,password} = req.body;
    let u = await doctorModel.findOne({email:email.trim()});
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
    let token = await jwt.sign({email:email.trim(),as:"doctor"},process.env.secret);
    res.cookie("token",token);
    
    res.send({ 
        success: true,
        message: "doctor Logged in successfully!",
    });
})
module.exports= router 
