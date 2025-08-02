const doctorModel = require("../models/doctor");
const appoModel = require("../models/appointment");
const userModel = require("../models/user");

async function deletee(req, res, next) {
  
    const appointments = await appoModel.find();
    const now = Date.now();

    for (const appo of appointments) {
      if (new Date(appo.date) < now) {
        let a= await appoModel.findOne({_id:appo._id});
        let u= await userModel.findOne({_id:a.userid});
        let d= await doctorModel.findOne({_id:a.doctorid});
        await userModel.findOneAndUpdate({_id:a.userid},{
            drList: u.drList.filter((dr)=>dr.toString() != d._id.toString())
        })
        await doctorModel.findOneAndUpdate({_id:a.doctorid},{
            userList: d.userList.filter((user)=>user.toString() != u._id.toString())
        })
        await appoModel.findByIdAndDelete(appo._id);
      }
    }
    next(); 

}

module.exports = deletee;

