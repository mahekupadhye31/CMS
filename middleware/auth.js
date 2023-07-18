const {createError}= require('./error')
const jwt= require('jsonwebtoken')
require('dotenv').config();

const verifyToken=(req,res,next)=>{

    const token= req.header('authentication')
    if(!token){
        console.log("the hell man")
        return next(createError(400,"User not authenticated"));
    }
    else{
        jwt.verify(token,process.env.SECRET_KEY,(err,payload)=>{
            if(err) return next(createError(400,"Token not valid!"));
            req.user=payload
            next()
        })
    }
}

module.exports={verifyToken}