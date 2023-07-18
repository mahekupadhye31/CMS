const Contact= require('../models/Contact');
const User= require('../models/user')
const Todo= require('../models/todo')

const createUser= async(req,res,next)=>{
    try{
        const {name,email,age,address,phone}=req.body;
        const userId = req.user.userData._id
        const contactdata= await new Contact({
            name,email,age,address,phone,userId
        })
        const response =await contactdata.save();
        res.status(201).json(response);
    }
    catch(e){
        res.status(400).json(e);
    }
}

const userList =async(req,res,next)=>{
        const userId = req.user.userData._id
        Contact.find({userId:userId}).then(contacts=>res.json(contacts)).catch(err=>res.json(err));
}

const updateUser=async(req,res,next)=>{
    const id=req.params.id;
    Contact.findByIdAndUpdate({_id:id},{name:req.body.name,email:req.body.email,age:req.body.age,address:req.body.address,phone:req.body.phone}).then(contacts=>res.json(contacts)).catch(err=>res.json(err));
}

const deleteUser=async(req,res,next)=>{
    const id=req.params.id;
    Contact.findByIdAndDelete({_id:id}).then(contacts=>res.json(contacts)).catch(err=>res.json(err));
}


const getUser=async(req,res,next)=>{
    const id=req.params.id;
    Contact.findById({_id:id}).then(contacts=>res.status(200).json(contacts)).catch(err=>res.json(err));
}

module.exports={createUser,updateUser,deleteUser,userList,getUser}