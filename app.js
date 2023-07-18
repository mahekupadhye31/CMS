const express= require('express')
require('dotenv').config();
require('./config')
const app=express();
const PORT= process.env.PORT || 8000
const cors= require('cors')

//first middleware
app.use(express.json())
app.use(cors())

//second middleware
const userRoute= require('./route/user');

app.use('/user',userRoute)
const ContactRoute= require('./route/Contact')

app.use('/contact',ContactRoute)

//handling errors next(err)
app.use((err,req,res,next)=>{
    const error_status= err.status|| 500 //internal database error
    const error_message= err.message || "Oops! Something went wrong"
    res.status(error_status).json({
        success:false,
        status:error_status,
        message:error_message,
        stack:err.stack
    })
})


app.listen(PORT,()=>{
    console.log(`listening to port ${PORT}`);
})