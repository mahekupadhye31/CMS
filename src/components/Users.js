import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Table from "@mui/material/Table";
import axios from "axios";
import TableBody from "@mui/material/TableBody";
import { TableCell, Button, Typography } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ContentPasteSearchIcon from "@mui/icons-material/ContentPasteSearch";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import Header from './Header/Header'

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

export default function Users() {
 
  const [open, setOpen] = React.useState(false);
  const [userid, setUserid] = React.useState("");
  const [name, setName] = useState("");
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    setSearch(e.target.value);
    console.log("searched:" + search);
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
    console.log(age);
  };

  const handleOpen = (id) => {
    const token = localStorage.getItem('token');
    const response = axios
      .get("http://localhost:8000/contact/getuser/" + id, {
        headers: {
          'authentication':token,
        }
      })
      .then((result) => {
        console.log(result);
        if (result.status === 200) {
          setUserid(id);
          setOpen(true);
          setName(result.data.name);
        }
      })
      .catch((e) => {
        console.log("error hai bro get request for update wala component main");
        window.location.href="./error"
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [users, setUsers] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const response = axios
      .get("http://localhost:8000/contact/userlist", {
        headers: {
          'authentication':token,
        }
      })
      .then((result) => {
        const s = result.data;
        console.log("data")
        console.log(s);
        setUsers(s);
      })
      .catch((e) => {
        console.log("error hai bro get request main");
        window.location.href="./error"
      });
  }, []);

  const handleDelete = (id) => {

    const token = localStorage.getItem('token');
    const response = axios
      .delete("http://localhost:8000/contact/deleteUser/" + id, {
        headers: {
          'authentication':token,
        }
      })
      .then((result) => {
        console.log("second" + id);
        console.log(result);
        window.location.reload();
      })
      .catch((e) => {
        console.log("error hai bro delete request main");
        window.location.href="./error"
      });
  };
  return (
    <>
    <Header/>
      <Link to="/adduser">
        <Button sx={{ marginTop: "5vh", marginBottom: "3vh" }}>
          Add Contacts +{" "}
        </Button>
      </Link>
      <div>
        <FormControl
          sx={{ m: 1, width: "40ch" }}
          variant="outlined"
          value={search}
          placeholder="  ...Search User..."
          onChange={handleSearch}
        >
          <OutlinedInput
            placeholder="Search User..."
            id="outlined-adornment-weight"
            startAdornment={
              <InputAdornment position="start">
                <ContentPasteSearchIcon />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              "aria-label": "weight",
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: 140 }}>
          <Select
            value={age}
            onChange={handleChange}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="">
              <em style={{ color: "#003B73" }}>Sort Age:</em>
            </MenuItem>
            <MenuItem value={10}>Hight to Low</MenuItem>
            <MenuItem value={20}>Low to High</MenuItem>
          </Select>
        </FormControl>
      </div>

      <TableContainer
        component={Paper}
        sx={{
          marginRight: "20vw",
          marginLeft: "20vw",
          marginTop: "5vh",
          width: "60vw",
          marginBottom:"9vh" 
        }}
      >
        <Table sx={{ minWidth: 650}} aria-label="customised table">
          <TableHead sx={{ backgroundColor: "#D4F1F4", fontColor: "white" }}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell sx={{ paddingLeft: "6vw" }}>Email</TableCell>
              <TableCell align="right">Age</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Address</TableCell>
              <TableCell align="right">Update</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          {age==10?
          (
          <TableBody>
            {users.length !== 0 ? (
              users
                .filter((user) => {
                  return search.toLowerCase() === ""
                    ? user
                    : user.name.toLowerCase().includes(search);
                }).sort((a,b)=>b.age-a.age)
                .map((user) => {
                  return (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell >{user.email}</TableCell>
                      <TableCell align="right">{user.age}</TableCell>
                      <TableCell align="right">{user.phone}</TableCell>
                      <TableCell align="right">{user.address}</TableCell>
                      <TableCell align="right">
                        <Link to={`/updateuser/${user._id}`}>
                          <Button>
                            <UpdateIcon />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={(e) => handleOpen(user._id)}>
                          <DeleteOutlineIcon sx={{ color: "red" }} />
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box sx={{ ...style, width: 390 }}>
                            <h2 id="parent-modal-title">
                              Are you sure you want to delete
                              <Typography
                                sx={{
                                  color: "#003B73",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                }}
                              >
                                {name} ?
                              </Typography>
                            </h2>
                            <Button
                              sx={{ color: "red" }}
                              onClick={(e) => handleDelete(userid)}
                            >
                              Delete
                            </Button>
                            <Button
                              sx={{ color: "gray" }}
                              onClick={() => {
                                handleClose();
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <Typography
                variant="body1"
                align="centre"
                color="initial"
                sx={{ margin: "8vh", paddingLeft: "20vw" }}
              >
                No data to display
              </Typography>
            )}
          </TableBody>
          ):(
            <TableBody>
            {users.length !== 0 ? (
              users
                .filter((user) => {
                  return search.toLowerCase() === ""
                    ? user
                    : user.name.toLowerCase().includes(search);
                }).sort((a,b)=>a.age-b.age)
                .map((user) => {
                  return (
                    <TableRow
                      key={user._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {user.name}
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell align="right">{user.age}</TableCell>
                      <TableCell align="right">{user.phone}</TableCell>
                      <TableCell align="right">{user.address}</TableCell>
                      <TableCell align="right">
                        <Link to={`/updateuser/${user._id}`}>
                          <Button>
                            <UpdateIcon />
                          </Button>
                        </Link>
                      </TableCell>
                      <TableCell align="right">
                        <Button onClick={(e) => handleOpen(user._id)}>
                          <DeleteOutlineIcon sx={{ color: "red" }} />
                        </Button>
                        <Modal
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box sx={{ ...style, width: 390 }}>
                            <h2 id="parent-modal-title">
                              Are you sure you want to delete{" "}
                              <Typography
                                sx={{
                                  color: "#003B73",
                                  fontWeight: "bold",
                                  fontSize: "1.2rem",
                                }}
                              >
                                {name} ?
                              </Typography>
                            </h2>
                            <Button
                              sx={{ color: "red" }}
                              onClick={(e) => handleDelete(userid)}
                            >
                              Delete
                            </Button>
                            <Button
                              sx={{ color: "gray" }}
                              onClick={() => {
                                handleClose();
                              }}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Modal>
                      </TableCell>
                    </TableRow>
                  );
                })
            ) : (
              <Typography
                variant="body1"
                align="centre"
                color="initial"
                sx={{ margin: "8vh", paddingLeft: "20vw" }}
              >
                No data to display
              </Typography>
            )}
          </TableBody>

          )
      }
        </Table>
      </TableContainer>
    </>
  );
}
