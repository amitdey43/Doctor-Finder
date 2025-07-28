const mongoose= require("mongoose");
const doctorSchema = mongoose.Schema({
    email: String,
    password: String,
    name: String,
    specialities: {
        type: String,
        enum: [
        "General Physician",
        "Cardiologist",
        "Dermatologist",
        "Pediatrician",
        "Orthopedic",
        "Neurologist",
        "ENT Specialist",
        "Gynecologist",
        "Psychiatrist",
        "Dentist",
        "General Surgeon",
        "Sexologist",
        "Oncologist",
        "Hematologist",
        "Rheumatologist",
        "Nephrologist",
        "Urologist",
        "Gastroenterologist",
        "Pulmonologist",
        "Endocrinologist",
        "Ophthalmologist"
        ],
        required: true
    },
    userList: [
        {type: mongoose.Schema.Types.ObjectId,
        ref: "user"}
    ],
    clinic: String,
    fee:Number,
    photo:String,
    experience:String,
    starttime:String,
    endtime:String,
    availabledays:[
        {type: String,
        default: []}
    ]
})
module.exports= mongoose.model("doctor",doctorSchema);