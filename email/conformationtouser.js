const nodemailer = require("nodemailer");
require('dotenv').config()

const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth:{
        user: process.env.Email,
        pass: process.env.password,
    }
})
function sendmail(to,subject,msg){
    transporter.sendMail({
        from: `"SymptoCare" <${process.env.Email}>`,
        to,
        subject,
        html:msg
    }).then(()=>{
        console.log("email send successfully");
    }).catch((err)=>{
        console.log("Error to sending mail",err);
        
    })
}
module.exports= sendmail;