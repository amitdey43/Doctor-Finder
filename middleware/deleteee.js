const doctorModel = require("../models/doctor");
const appoModel = require("../models/appointment");
const userModel = require("../models/user");
const drappoModel = require("../models/dr_app");

async function deleteee(req, res, next) {
  
    const appointments = await drappoModel.find();
    const now = Date.now();

    for (const dappo of appointments) {
      if(new Date(dappo.date)<now){
        if(dappo.status == "pending"){
          await drappoModel.findByIdAndDelete(dappo._id);
        }    
        else if (new Date(dappo.date.getTime()+(60*60*1000)) < now) {
          await drappoModel.findByIdAndDelete(dappo._id);
        }
      }
    }
    next(); 

}

module.exports = deleteee;
