const express = require('express');
const router= express.Router();
const {body,validationResult}= require("express-validator");
const doctorModel= require("../models/doctor");
const appoModel= require("../models/appointment");
const userModel = require("../models/user");
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const isloggedin= require("../middleware/custom")
const cloudinary = require('cloudinary').v2;
const path = require("path");
const bcrypt= require("bcrypt");
const jwt = require("jsonwebtoken");
const datedata = require("../days/day");
const datadate = require("../days/day1");

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
    body("fee").trim().isLength({ min: 1 }),
    body("experience").trim().isLength({min:1})
    ,async(req,res)=>{
    let error= validationResult(req);
    if(!error.isEmpty()){
        return  res.status(400).send({
            success:false,
            message: "Invalid input"
        })
    }
     let {email, password,name,specialities,clinic,fee,experience,starttime,endtime,availabledays} = req.body;
     let u= await doctorModel.findOne({email:email.trim()});
    if(u){
        return res.status(500).send({
            success:false,
            message:"This email is already used"
        })
    }
    if(!Array.isArray(availabledays)){
        availabledays= [availabledays];
    }
    if(availabledays.length==0){
        return res.status(500).send({
            success:false,
            message:"Invalid input"
        })
    }
    if (starttime >= endtime) {
        return res.status(400).send({
        success: false,
        message: "Start time must be earlier than end time"
    });
}
    let hash = await bcrypt.hash(password.trim(),10);
    let dr= await doctorModel.create({
        email:email.trim(),
        password:hash,
        name:name.trim(),
        specialities,
        clinic:clinic.trim(),
        fee:fee.trim(),
        experience: experience.trim(),
        photo: req.file.path,
        starttime,
        endtime,
        availabledays
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
router.get("/list",isloggedin,async (req,res)=>{
    let doctors = await doctorModel.find()
    let u = await userModel.findOne({email:req.user.email});
    let a = await appoModel.find({userid:u._id});
    res.render("list",{doctors,appo:a})
})
router.post("/khela/:email",isloggedin,async(req,res)=>{
    let d= await doctorModel.findOne({email:req.params.email});
    let {datetime}= req.body;
    let datet = new Date(datetime);
    let da= datet.getDay();
    let bool =true;
    let today= new Date();
    let maxdate= new Date();
    maxdate.setDate(today.getDate()+14)
    today= today.toISOString().slice(0,16);
    maxdate= maxdate.toISOString().slice(0,16);
    let date= datet.toISOString().slice(0,16);
    if(date<today){
        return res.status(500).render("page1",{message:"Enter valid date"})
        // return res.status(500).json({
        //     success:false,
        //     message:"Enter valid date"
        // })
    }
    if(date>maxdate){
        return res.status(500).render("page1",{message:"Appointments can be booked within 14 days from today"})
        // return res.status(500).json({
        //     success:false,
        //     message:"Appointments can be booked within 14 days from today",
        // })
    }
    d.availabledays.forEach((day)=>{
        if(datedata[day]==da){
            bool= false;
        }
    })
    if(bool){
        return res.status(500).render("page1",{message:`${datadate[da]} is not available for appointment`})
        // return res.status(500).json({
        //     success:false,
        //     message:`${datadate[da]} is not available for appointment`
        // })
    }
    
    let hour = datet.getHours();
    let min = datet.getMinutes();
    let selecttime= hour*60+min;
    let [sth ,stm]= d.starttime.split(":").map(Number);
    let [eh ,em]= d.endtime.split(":").map(Number);
    let st = sth*60+ stm;
    let en= eh*60+em;
    if(selecttime>en || selecttime<st){
        return res.status(500).render("page1",{message:`Book your appointment between ${d.starttime} to ${d.endtime}`})
    }
    let uuser = await userModel.findOne({email:req.user.email});
    let r= await appoModel.create({
        userid: uuser._id,
        doctorid: d._id,
        date: datet
    })
    uuser.drList.push(d._id);
    d.userList.push(uuser._id);
    await uuser.save();
    await d.save();
    res.redirect(`/confirmation/${d.email}`);
})
router.get("/:appoid",async(req,res)=>{
    await appoModel.findOneAndDelete({_id:req.params.appoid});
    res.redirect("/kal")
})
module.exports= router 
