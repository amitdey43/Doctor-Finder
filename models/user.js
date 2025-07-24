const mongoose= require("mongoose");
const userSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    age: Number,
    drList: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "doctor"}
    ],
    gender:String
})
module.exports= mongoose.model("user",userSchema);