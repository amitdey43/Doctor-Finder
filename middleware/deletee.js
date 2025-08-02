const doctorModel = require("../models/doctor");
const appoModel = require("../models/appointment");
const userModel = require("../models/user");

async function deletee(req, res, next) {
  
    const appointments = await appoModel.find();
    const now = Date.now();

    for (const appo of appointments) {
      if (new Date(appo.date) < now) {
        await appoModel.findByIdAndDelete(appo._id);
      }
    }
    next(); 

}

module.exports = deletee;

