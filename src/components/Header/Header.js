import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {useEffect,useState} from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {TextField,Button} from '@mui/material'
import axios from 'axios'

export default function MenuAppBar() {

  const [name,setName]=useState("")
  const [email,setEmail]=useState("")
  const [phone,setPhone]=useState("")

  const handleLogout=()=>{
    localStorage.removeItem('token')
    console.log(localStorage.getItem('token'))
    window.location.href='./'
  }
  
  useEffect(() => {

      const token = localStorage.getItem('token');
  
      // console.log(localStorage.getItem('token'))
      axios.get("http://localhost:8000/user/getCurrentUser", {
        headers: {
          'authentication':token,
        }
      })
        .then((res) => {
          console.log(res.status);
          setName(res.data.user.name);
          setEmail(res.data.user.email);
          setPhone(res.data.user.phone);
          
        })
        .catch((err) => {
          console.log(err);
          window.location.href="./error"
        });
    
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{color:"#145DA0",backgroundColor:"#fcfcfc",boxShadow:" 26px 26px 93px #e3e3e3,-26px -26px 93px #ffffff"}}>
        <Toolbar>
          Contact Management System
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
            <div>
              {name}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                sx={{marginTop:"4vh",marginRight:"12vw"}}
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{ }}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem  onClick={handleLogout}>Logout</MenuItem>
                
              </Menu>
            </div>

        </Toolbar>
      </AppBar>
    </Box>
  );
}