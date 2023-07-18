const mongoose= require('mongoose');
require('dotenv').config();

const connectionParameters = {
    useNewUrlParser: true,
    useUnifiedTopology:true
}

const connection= mongoose.connect(process.env.mongoURL,connectionParameters).then(()=>{
    console.log("Database connection successful");
}).catch((err)=>{
    console.log("error has occured");
})

module.exports=connection;