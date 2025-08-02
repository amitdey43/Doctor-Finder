const mongoose = require("mongoose");
let drappoModel = mongoose.Schema({
    userid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    doctorid:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"doctor"
    },
    date: {
        type:Date,
    },
    status:{
        type: String,
        enum: ["pending","approved"],
        default:"pending",
    }
})
module.exports= mongoose.model("dappo",drappoModel);