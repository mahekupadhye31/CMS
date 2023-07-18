const express =require('express');
const {verifyToken}=require('../middleware/auth')
const {createUser,updateUser,deleteUser,userList,getUser}=require('../controller/Contact')
const router= express.Router();

router.post('/createUser',verifyToken,createUser);
router.get('/userlist',verifyToken,userList);
router.get('/getuser/:id',verifyToken,getUser);
router.put('/updateUser/:id',verifyToken,updateUser);
router.delete('/deleteUser/:id',verifyToken,deleteUser);

module.exports=router;