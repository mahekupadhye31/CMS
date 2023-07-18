import React, { useState, useEffect } from "react";
import "../styles/login-signup.css";
import { Box, TextField, Typography, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
import LoginImg from "../images/register.svg";
import axios from "axios";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import CloseIcon from "@mui/icons-material/Close";

function Login() {
  const navigate = useNavigate();
  const container = document.querySelector(".container");
  const handleClick = () => {
    container.classList.add("sign-up-mode");
  };
  const handleSignin = () => {
    container.classList.remove("sign-up-mode");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [error_email, setError_email] = useState(false);
  const [error_pass, setError_pass] = useState(false);
  const [open, setOpen] = useState(true);
  const [openn, setOpenn] = useState(true);
  const [alert,setAlert]=useState(false)

    const handleClose = () => {
      setOpenn(false);
    };
    setTimeout(handleClose, 5000);
    function validateForm() {
      if (email.length === 0) {
        // alert('Email Address can not be empty')
        console.log("email"+error)
        setError(true)
        setTimeout(() => {
          console.log("yaar")
          setError(false);
        }, 5000);
        return
      }
      if (password.length===0) {
        // alert(
        //   'Password must contain greater than or equal to 8 characters.',
        // )
        console.log("pass"+error)
        setError(true)
        setTimeout(() => {
          console.log("yaar")
          setError(false);
        }, 5000);
        return
      }
    }

  const submit = async (e) => {
    e.preventDefault();
    validateForm();
    try {
      const response = await axios.post("http://localhost:8000/user/login", {
        email,
        password,
      });
      console.log(response.data);
      console.log(response.data.token);
      if (response.status === 200) {
        localStorage.setItem("token",response.data.token)
        setSuccess(true);
        setTimeout(() => {
          window.location.href='./userlist'
        }, 2000);
      }
    } catch (err) {
      console.log("submit"+error)

    }
  };

 

  return (
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form
            action="POST"
            style={{ color: "#4d84e2", maxWidth: "600px", maxHeight: "650px" }}
          >
            <Typography
              variant="h4"
              style={{ color: "#5a5a5a", paddingBottom: "5vh" }}
              textAlign="center"
            >
              
              {error && (
                 <Collapse in={openn}>
                  <Alert
                    severity="error"
                    sx={{
                      width: "30vw",
                      marginLeft: "2vw",
                      marginBottom: "10vh",
                    }}
                  >
                    An error has occured!
                  </Alert>
                </Collapse>) }
                
            
              {success && (
                <Collapse in={open}>
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
                    sx={{
                      width: "30vw",
                      marginLeft: "2vw",
                      marginBottom: "10vh",
                    }}
                  >
                    You're Logged in!
                  </Alert>
                </Collapse>
              )}
              <strong>Login</strong>
            </Typography>

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
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
              name="email"
              margin="normal"
              type={"email"}
              variant="outlined"
              placeholder="Email"
            />
            {/* {errors.email && <p className="error">{errors.email}</p>}  */}

            <TextField
              id="input-with-icon-textfield"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
              className="TextField-with-border-radius"
              fullWidth
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
              name="password"
              margin="normal"
              type={"password"}
              variant="outlined"
              placeholder="Password"
            />
            {/* {errors.password && <p className="error">{errors.password}</p>} */}

            <Button
              className="btn"
              onClick={submit}
              type="submit"
              variant="contained"
              sx={{ borderRadius: "30px", marginTop: "4vh" }}
            >
              Log In
            </Button>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content" style={{ paddingRight: "15vw" }}>
            <h4 style={{ paddingBottom: "2vh" }}>New here ?</h4>
            <Link to="/Signup" style={{ textDecoration: "none" }}>
              {" "}
              <button
                className="btn transparent"
                onClick={handleClick}
                id="sign-in-btn"
              >
                {" "}
                Sign up
              </button>
            </Link>
          </div>
          <img src={LoginImg} className="image" alt="No image seen" />
        </div>
      </div>
    </div>
  );
}

export default Login;
