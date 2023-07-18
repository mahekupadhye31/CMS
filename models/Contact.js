const mongoose = require('mongoose')

const ContactSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    userId:{
        type:String
    }
})

const Contact= new mongoose.model("Contact",ContactSchema)

module.exports=Contact;