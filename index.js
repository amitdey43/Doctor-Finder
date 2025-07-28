const express = require('express');
const path= require("path");
const app= express();
const userrouter = require('./router/user.routes');
const doctorrouter = require('./router/doctor.routes');
require('dotenv').config()
const mongo= require("./config/db");
const {body,validationResult}= require("express-validator");
const doctorModel= require("./models/doctor");
const userModel= require("./models/user");
const appoModel= require("./models/appointment");
const deletee= require("./middleware/deletee")
const isloggedin= require("./middleware/custom")
const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const CookieParser = require('cookie-parser');
mongo();

app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")));
app.use(CookieParser());

app.use("/user",userrouter);
app.use("/doctor",doctorrouter);
app.get("/",(req,res)=>{
    if(!req.cookies.token){
        res.redirect("/user")
    }
    let use= jwt.verify(req.cookies.token,process.env.secret);
    if(use.as=="user"){
        res.redirect("/user")
    }
    if(use.as=="doctor"){
        res.redirect("/panel")
    }
})
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
app.get("/panel",isloggedin,async(req,res)=>{
    let doctor = await doctorModel.findOne({email:req.user.email});
    let appos = await appoModel.find({doctorid:doctor._id}).populate("userid");
    res.render("panel",{doctor,appos})
})
app.get("/panel/edit",isloggedin,async(req,res)=>{
    let doctor = await doctorModel.findOne({email:req.user.email});
    res.render("edit",{doctor})
})
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
app.post("/panel/edit/:email",
    upload.single("photo"),
    body("name").trim().isLength({ min: 3 }),
    body("clinic").trim().isLength({ min: 6 }),
    body("fee").trim().isLength({ min: 1 }),
    body("experience").trim().isLength({min:1})
    ,async(req,res)=>{
    let error= validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).render("panel2",{message: "Invalid input"});
    }
     let {email,name,specialities,clinic,fee,experience,starttime,endtime,availabledays} = req.body;
     let u= await doctorModel.findOne({email:req.params.email});

    if(!Array.isArray(availabledays)){
        availabledays= [availabledays];
    }

    if (starttime >= endtime) {
        return res.status(400).render("panel2",{message: "Start time must be earlier than end time"});
}
    let updateData = {
        name: name.trim(),
        specialities,
        clinic: clinic.trim(),
        fee: fee.trim(),
        experience: experience.trim(),
        starttime,
        endtime,
        availabledays
    };

    if (req.file) {
        updateData.photo = req.file.path;
    }

    let dr = await doctorModel.findOneAndUpdate(
        { email: req.params.email },
        updateData,
        { new: true }
    );



    res.redirect("/panel")  
})
app.listen(3000);