const User= require('../models/user')
const Contact= require('../models/Contact')
const Todo= require('../models/todo')
const {createError}= require('../middleware/error')
const jwt= require('jsonwebtoken')
require('dotenv').config();

const register=async(req,res,next)=>{
    
    try{
        console.log(req)
        const {name,email,phone,password,last}=req.body;
        const userExist= await User.findOne({email});
        // if(userExist){
        //     res.status(500).json({message:"User already exists"})
        // }
        const userData= new User({
            name,email,phone,password,last
        })
        const response= await userData.save();

        res.status(201).json(response);
        console.log("hogaya")
    }
    catch(err){
        // res.status(400).json(err);
        next(err)
    }
}

const login=async(req,res,next)=>{
    try{
        console.log(req.body)
        const {email,password}=req.body;
        const userData= await User.findOne({email});
        if(userData){
            if(userData.password===password){
                const token = jwt.sign({userData},process.env.SECRET_KEY)
                res.status(200).json({message:"Login Successful!",data:userData,token})       //return type gaya 
            }
            else{
                // res.status(400).json({message:"Invalid credentials"})
                return next(createError(404,"Invalid login credentials"))
            }
        }
        else{
            return next(createError(404,"Invalid login credentials"))
            // res.status(400).json({message:"Invalid credentials"})
        }
        console.log("phewwwww")
    }
    catch(err){
        res.status(400).json(err);
    }
}

const updateUser = async (req, res, next) => {
    try {
        // const { name, email, phone, password } = req.body;
        const userdata = await User.updateOne({ email: req.body.email }, {
            $set: {
                // name: req.body.name,
                email: req.body.email,
                // phone: req.body, phone,
                password: req.body.password
            }         //name:name
        })
        res.status(200).json({ message: "Updated successfully!" })
    }
    catch (e) {
        res.status(400).json({ message: "unsuccessfull!" })
    }
}

const sample = async (req, res, next) => {
    try{
        const {task}=req.body
        const userId = req.user.userData._id
        const todo = await new Todo({
            task,
            userId
        })
        const response = await todo.save()
        res.status(201).json({response})
    }catch(err){
        next(err)
    }
}
const getCurrentUser=async(req,res,next)=>{
    try{
   
        const user=req.user.userData
        // console.log(req.user.userData)
        res.status(200).json({user})

    }
    catch(err){
        next(err)
    }
}



module.exports={register,login,sample,updateUser,getCurrentUser}