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
const sendmail = require("../email/conformationtouser");
const objectkey = require('../specialities/objectkey');

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
        return res.status(400).render("page3",{
        
            message:"Somthing went wrong",
        })
    }
    let c = await bcrypt.compare(password,u.password);
    if(!c){
       return res.status(400).render("page3",{
        
            message:"Somthing went wrong",
        })
    }
    let token = await jwt.sign({email:email.trim(),as:"doctor"},process.env.secret);
    res.cookie("token",token);
    
    res.redirect("/panel");
})

let stopwords = new Set([
  "i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your",
  "yours", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her",
  "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs",
  "themselves", "what", "which", "who", "whom", "this", "that", "these", "those",
  "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had",
  "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if",
  "or", "because", "as", "until", "while", "of", "at", "by", "for", "with",
  "about", "against", "between", "into", "through", "during", "before", "after",
  "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over",
  "under", "again", "further", "then", "once", "here", "there", "when", "where",
  "why", "how", "all", "any", "both", "each", "few", "more", "most", "other",
  "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too",
  "very", "can", "will", "just", "don", "should", "now"
]);
router.get("/list",isloggedin,async (req,res)=>{
    let doctors = await doctorModel.find()
    let u = await userModel.findOne({email:req.user.email});
    let a = await appoModel.find({userid:u._id});
    let {textarea}= req.query;
    textarea= textarea.toLowerCase();
    textarea = textarea.replace(/\s+/g, ' ').replace(/[^\w\s]/g, '');

    let c=0,special1;
    objectkey.forEach((key)=>{
        let d=0;
        key.keywords.forEach((keyword)=>{
            if(textarea.includes(keyword.toLowerCase())){
                d++;
            }
        })
        if(d>c){
            c= d;
            special1= key.specialist;
        }
    })

    let text = new Set(textarea.split(/\W+/).filter(Boolean))
    let f=0,special2;
    objectkey.forEach((key)=>{
        let e=0;
        key.keywords.forEach((keyword)=>{
            let ar = keyword.toLowerCase().split(/\W+/).filter(Boolean);
            ar.forEach((arr)=>{
                if(!stopwords.has(arr) && text.has(arr)){
                    e++;
                }
            })
        })
        if(e>f){
            f=e;
            special2= key.specialist;
        }
    })
    console.log(special1);
    console.log(special2);
    if(!special1 && !special2){
        special1="General Physician"
    }
    let doc= await doctorModel.find({
        $or: [
            {specialities:special1},
            {specialities:special2}
        ]
    })
    console.log(doc);
    
    res.render("list",{doctors,appo:a,doc,textarea})
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
    const msg = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
        <h2 style="color: #2e86de;">🩺 SymptoCare - Appointment Confirmation</h2>
        
        <p>Dear Patient,</p>
        
        <p>Your appointment with <strong>Dr. ${d.name}</strong> has been <strong>successfully confirmed</strong>.</p>

        <h3>👨‍⚕️ Doctor Details:</h3>
        <ul>
        <li><strong>Name:</strong> Dr. ${d.name}</li>
        <li><strong>Specialties:</strong> ${d.specialities}</li>
        <li><strong>Clinic Address:</strong> ${d.clinic}</li>
        <li><strong>Consultation Fee:</strong> ₹${d.fee} (Pay at clinic)</li>
        </ul>

        <h3>📅 Appointment Details:</h3>
        <ul>
        <li><strong>Date:</strong> ${datet.toLocaleDateString()}</li>
        <li><strong>Time Slot:</strong> ${datet.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} – ${new Date(datet.getTime() + 30*60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>

        <li><strong>Duration:</strong> 30 minutes (approx.)</li>
        </ul>

        <p>Please make sure to reach the clinic at least <strong>10 minutes before</strong> your scheduled time. Payment is to be made <strong>offline at the clinic</strong>.</p>

        <p>If you have any questions, feel free to reply to this email.</p>

        <br/>
        <p style="color: #555;">Thank you,<br/>
        SymptoCare Team</p>

        <hr style="margin-top: 30px;">
        <small style="color: #999;">This is an automated email. Please do not reply directly to this message.</small>
    </div>
    `;
    sendmail(req.user.email,"SymptoCare Booking Confirmation",msg)
    const doctorMsg = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; color: #333;">
        <h2 style="color: #e67e22;">👨‍⚕️ New Appointment Notification</h2>
        
        <p>Dear Dr. ${d.name},</p>
        
        <p>You have a new appointment booked through <strong>SymptoCare</strong>.</p>

        <h3>📅 Appointment Details:</h3>
        <ul>
            <li><strong>Patient Name:</strong> ${uuser.name}</li>
            <li><strong>Patient Email:</strong> ${uuser.email}</li>
            <li><strong>Date:</strong> ${datet.toLocaleDateString()}</li>
            <li><strong>Time Slot:</strong> ${datet.toLocaleTimeString()} – ${(new Date(datet.getTime() + 30 * 60000)).toLocaleTimeString()}</li>
        </ul>

        <p>Please be ready to receive the patient at your clinic located at:</p>
        <p><strong>${d.clinic}</strong></p>

        <p>Fees will be collected offline at the clinic.</p>

        <br/>
        <p style="color: #555;">Thanks,<br/>SymptoCare System</p>
        <hr style="margin-top: 30px;">
        <small style="color: #999;">This is an automated email for appointment notification.</small>
    </div>
    `;

    sendmail(d.email, "SymptoCare - New Patient Appointment", doctorMsg);

    res.redirect(`/confirmation/${d.email}`);
})
router.get("/:appoid",async(req,res)=>{
    let a= await appoModel.findOne({_id:req.params.appoid});
    let u= await userModel.findOne({_id:a.userid});
    let d= await doctorModel.findOne({_id:a.doctorid});
    await userModel.findOneAndUpdate({_id:a.userid},{
        drList: u.drList.filter((dr)=>dr.toString() != d._id.toString())
    })
    await doctorModel.findOneAndUpdate({_id:a.doctorid},{
        userList: d.userList.filter((user)=>user.toString() != u._id.toString())
    })
    await appoModel.findOneAndDelete({_id:req.params.appoid});
    const cancelMsg = `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #ffe6e6; color: #333;">
            <h2 style="color: #c0392b;">Appointment Cancelled ❌</h2>
            <p>Dear Dr. ${d.name},</p>
            <p>The appointment with the following patient has been <strong>cancelled</strong>:</p>
            <ul>
                <li><strong>Patient Name:</strong> ${u.name}</li>
                <li><strong>Patient Email:</strong> ${u.email}</li>
                <li><strong>Scheduled Time:</strong> ${new Date(a.date).toLocaleString()}</li>
            </ul>
            <p>This slot is now available for new bookings.</p>
            <p style="margin-top: 20px;">Thank you,<br>SymptoCare Team</p>
        </div>
        `;

    sendmail(d.email, "SymptoCare - Appointment Cancelled", cancelMsg);
    res.redirect("/kal")
})
module.exports= router 
