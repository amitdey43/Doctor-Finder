const mongoose = require("mongoose");
let appoModel = mongoose.Schema({
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
    }
})
module.exports= mongoose.model("appo",appoModel);