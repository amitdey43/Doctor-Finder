const mongoose= require('mongoose');

function mongo(){
    mongoose.connect(process.env.mongodburl).then(()=>{
        console.log("database connected");
    }).catch((err)=>{
        console.error(err)
    })
}
module.exports = mongo;