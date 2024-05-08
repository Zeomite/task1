const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    userid:{
        type : String,
        required: true
    },
    name: {
        type : String,
        
    },
    password: {
        type : String,
        required: true
    },
    email: {
        type : String,
        required : true
    }

})

module.exports = mongoose.model("User", userSchema);