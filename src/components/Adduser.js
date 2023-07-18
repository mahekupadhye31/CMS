import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import PersonIcon from "@mui/icons-material/Person";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import NumbersIcon from '@mui/icons-material/Numbers';
import axios from 'axios'
import HomeIcon from '@mui/icons-material/Home';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import "../App.css";


const Adduser = () => {
  const navigate=useNavigate();
  const [name,setName]=useState('')
  const [email,setEmail]=useState('')
  const [age,setAge]=useState('')
  const [address,setAddress]=useState('')
  const [phone,setPhone]=useState('')

  const handleSubmit= async (e)=>{
    e.preventDefault();
    const token = localStorage.getItem('token');
    try{
      const response= await axios.post("http://localhost:8000/contact/createUser",{
        name,email,age,address,phone
      }, {
        headers: {
          'authentication':token,
        }
      })
      if(response.status===500){
        alert("User with this email already exists")
      }
      console.log(response)
      navigate("/userlist");
    }
    catch(err){
      console.log("Error is:",err);
      window.location.href="./error"
    }
  }

  return (
    <>
    <Typography variant="body1" color="initial" sx={{fontSize:"2rem",color:"#003B73",margin:"8vh"}}>Add User</Typography>
    <div style={{ marginLeft: "35vh", marginRight: "35vh", marginTop: "10vh" }}>
      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PersonIcon />
            </InputAdornment>
          ),
        }}
        className="TextField-with-border-radius"
        autoComplete="off"
        fullWidth
        name="name"
        value={name}
        onChange={(e)=>{setName(e.target.value)}}
        margin="normal"
        type={"text"}
        variant="outlined"
        placeholder="Name"
      />
      

      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon />
            </InputAdornment>
          ),
        }}
        className="TextField-with-border-radius"
        fullWidth
        name="email"
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}
        margin="normal"
        type={"email"}
        variant="outlined"
        placeholder="Email"
      />
      

      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <NumbersIcon />
            </InputAdornment>
          ),
        }}
        className="TextField-with-border-radius"
        fullWidth
        name="age"
        value={age}
        onChange={(e)=>{setAge(e.target.value)}}
        margin="normal"
        type={"number"}
        variant="outlined"
        placeholder="Age"
      />


      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <HomeIcon />
            </InputAdornment>
          ),
        }}
        className="TextField-with-border-radius"
        fullWidth
        name="address"
        value={address}
        onChange={(e)=>{setAddress(e.target.value)}}
        margin="normal"
        type={"text"}
        variant="outlined"
        placeholder="Address"
      />


      <TextField
        id="input-with-icon-textfield"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LocalPhoneIcon />
            </InputAdornment>
          ),
        }}
        className="TextField-with-border-radius"
        fullWidth
        name="phone"
        value={phone}
        onChange={(e)=>{setPhone(e.target.value)}}
        margin="normal"
        type={"text"}
        variant="outlined"
        placeholder="Phone"
      />

          {/* <Button
          sx={{marginLeft:"0vw",marginRight:"60vw",width:"10vw",marginTop:"3vh"}}
          variant="outlined"
          component="label"
          >
            Upload Img
            <input
              type="file"
              hidden
            />
          </Button> */}
      
      <Button
        onClick={handleSubmit}
        className="btn"
        type="submit"
        variant="contained"
        sx={{ borderRadius: "30px", marginTop: "20px", marginTop: "10vh" }}
      >
        Submit
      </Button>
    </div>
    </>
  );
};

export default Adduser;
