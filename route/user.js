const express= require('express');
const {register,login,sample,updateUser,getCurrentUser}=require('../controller/user')
const {verifyToken}=require('../middleware/auth')

const router= express.Router();

router.post('/register',register);
router.post('/login',login);
router.put('/update',verifyToken,updateUser)
router.post('/todo',verifyToken,sample)
router.get('/getCurrentUser',verifyToken,getCurrentUser)


module.exports=router;