import React, { useState,useEffect } from 'react'
import '../styles/login-signup.css'
import LoginImg from '../images/log .svg'
import {
    Link, useNavigate
  } from "react-router-dom";
import {Box,TextField,Typography,Button} from '@mui/material'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PersonIcon from '@mui/icons-material/Person';
import InputAdornment from '@mui/material/InputAdornment';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import { Menu } from '@mui/icons-material';
import axios from 'axios'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';



import CloseIcon from '@mui/icons-material/Close';


function Signup() {


    const [last, setLast] = React.useState(" ");
    const handleChange = (event) => {
      setLast(event.target.value);
      console.log(last)
    };
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [success,setSuccess]=useState(false)
    const [error,setError]=useState(false)
    const [open, setOpen] = useState(true);
    const [alertt, setAlertt] = useState(false);
    const [openn, setOpenn] = useState(true);
    const [userexists, setUserexists] = useState(false)

    const handleClose = () => {
      setOpenn(false);
    };
    setTimeout(handleClose, 5000);
    function validateForm() {
      if (name.length==0){
        alert('Name field cant be empty')
        return
      }
      
      if (phone.length==0){
        alert('Invalid phone number')
        return
      }
      if (email.length == 0) {
        alert('Email Address can not be empty')
        return
      }
      if (password.length===0) {
        alert(
          'Password must contain greater than or equal to 8 characters.',
        )
        return
      }
  
    }
    const submit=async(e)=>{
      e.preventDefault();
      validateForm()
      try{
        const response= await axios.post("http://localhost:8000/user/register",{
          name,phone,
          password,email,last
        })
        if(response.status===500){
          alert("User with this email already exists")
        }
        console.log(response)
        setSuccess(true)
        setTimeout(() => {
          navigate("/");
        }, 2000);


      }
      catch(err){
        console.log("Error is:",err);
        setError(true)
      }

    }
    
    
  return (
       <> 
    
    <div className="container">
      
      <div className="forms-container">
        <div className="signin-signup">
          
        
        <form  style={
          {color:"#4d84e2",
           maxWidth:"600px",
          }}

          >
      
            <Typography variant="h4" style={{color:"#5a5a5a",paddingBottom:"5vh"}} textAlign="center">
              {
                success&&<Collapse in={open}>
                <Alert
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpen(false);
                      }}
                    >
                      <CloseIcon fontSize="inherit" />
                    </IconButton>
                  }
                  sx={{width:"30vw",marginLeft:"2vw",marginBottom:"10vh"}}
                >
                  Congrats! You have successfully signed up.
                </Alert>
               </Collapse>
               }
               {
                 userexists&&<Collapse in={openn}>
                 <Alert
                 severity="error"
                 action={
                   <IconButton
                     aria-label="close"
                     color="inherit"
                     size="small"
                     onClick={() => {
                       setOpen(false);
                     }}
                   >
                     <CloseIcon fontSize="inherit" />
                   </IconButton>
                 }
                 sx={{width:"30vw",marginLeft:"2vw",marginBottom:"10vh"}}
               >
                 User with this email already exists!
               </Alert>
              </Collapse>
              }

                {
                  error&&<Collapse in={openn}>
                 <Alert
                 severity="error"
                 action={
                   <IconButton
                     aria-label="close"
                     color="inherit"
                     size="small"
                     onClick={() => {
                       setOpen(false);
                     }}
                   >
                     <CloseIcon fontSize="inherit" />
                   </IconButton>
                 }
                 sx={{width:"30vw",marginLeft:"2vw",marginBottom:"10vh"}}
               >
                 An error has occured!
               </Alert>
              </Collapse>
              }
             <strong>Sign Up</strong>
            </Typography>
            <TextField 
            autocomplete="off"
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < PersonIcon/>
                </InputAdornment>
              ),
            }}
             className="TextField-with-border-radius" autoComplete="off" fullWidth onChange={(e)=>{setName(e.target.value)}} name="name" margin="normal" type={'text'} variant="outlined" placeholder="Name" value={name}/>


    

            <TextField 
            autocomplete="off"
             id="input-with-icon-textfield"
             InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   < EmailIcon/>
                 </InputAdornment>
               ),
             }}
             className="TextField-with-border-radius" fullWidth onChange={(e)=>{setEmail(e.target.value)}} value={email} name="email" margin="normal" type={'email'} variant="outlined" placeholder="Email"/>


            <TextField
             id="input-with-icon-textfield"
             InputProps={{
               startAdornment: (
                 <InputAdornment position="start">
                   < LockIcon/>
                 </InputAdornment>
               ),
             }}
               className="TextField-with-border-radius" fullWidth onChange={(e)=>{setPassword(e.target.value)}} value={password} name="password" margin="normal" type={'password'} variant="outlined" placeholder="Password"/>
  

            <TextField 
            id="input-with-icon-textfield"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  < PhoneIcon/>
                </InputAdornment>
              ),
            }}
             className="TextField-with-border-radius" fullWidth onChange={(e)=>{setPhone(e.target.value)}} value={phone} name="phone" margin="normal" type={'phone_number'} variant="outlined" placeholder="Phone No."/>
 

            <FormControl className="TextField-with-border-radius" sx={{ m: 1, minWidth: 440}}>
              <Select
                name="last"
                sx={{ borderRadius: '30px' }}
                onChange={handleChange}
                value={last}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                <MenuItem name="Yes" value="Yes" >Yes</MenuItem>
                <MenuItem name="No" value="No" >No</MenuItem>
                
              </Select>
              <FormHelperText sx={{color:"#287ba4",fontSize:"1.0rem"}}>Are you looking to manage your contacts?</FormHelperText>
            </FormControl>

            <Button  className="btn" onClick={submit}  type="submit" variant="contained" sx={{borderRadius:"30px",marginTop:"5px", marginTop:"4vh"}}>
              Sign up
            </Button>
 
      </form>
        
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content" style={{paddingRight:"15vw"}}>
            <h4 style={{paddingBottom:"2vh"}}>One of us ?</h4>
                <Link to='/login' 
                style={{textDecoration:"none"}}
                > <button className="btn transparent"   id="sign-in-btn"> Sign in</button>
                </Link> 
          </div>
          <img src={LoginImg} className="image" alt="" />
        </div>
         
      </div>
    </div>

  </>
  
  )
}

export default Signup
