const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    task :{
        type: String ,
        required : true,
    },
    userId :{
        type:String,
    }
})

const Todo = new mongoose.model('todo',todoSchema);

module.exports = Todo;