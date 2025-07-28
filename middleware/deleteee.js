const doctorModel = require("../models/doctor");
const appoModel = require("../models/appointment");
const userModel = require("../models/user");

async function deleteee(req, res, next) {
  
    const appointments = await appoModel.find();
    const now = Date.now();

    for (const appo of appointments) {
      if (new Date(appo.date.getTime() + 60 * 60 * 1000) < now) {
        await appoModel.findByIdAndDelete(appo._id);
      }
    }
    next(); 

}

module.exports = deleteee;
