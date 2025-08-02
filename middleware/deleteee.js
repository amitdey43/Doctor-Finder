const doctorModel = require("../models/doctor");
const appoModel = require("../models/appointment");
const userModel = require("../models/user");
function toISTFromUTC(datetime) {
  const date = new Date(datetime);
  const offset = date.getTimezoneOffset();
  if (offset === 0) {
    return new Date(date.getTime() - (5.5 * 60 * 60 * 1000));
  }
  return date;
}

async function deleteee(req, res, next) {
  
    const appointments = await appoModel.find();
    const now = Date.now();

    for (const appo of appointments) {   
      if (toISTFromUTC(appo.date ) < now) {
        await appoModel.findByIdAndDelete(appo._id);
      }
    }
    next(); 

}

module.exports = deleteee;