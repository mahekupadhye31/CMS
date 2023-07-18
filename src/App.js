import "./App.css";
import Users from './components/Users'
import Adduser from './components/Adduser'
import Updateuser from './components/Updateuser'
import Login from './components/Login'
import Signup from './components/Signup'
import Header from './components/Header/Header'
import Error from './components/Error'
import { Route, Routes } from "react-router";
import { BrowserRouter as Router, Outlet, Navigate } from "react-router-dom";

function App() {
  const token=localStorage.getItem('token')
  return (
    <>
      <Router>
      <div className="App">
        <Routes>

          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          <Route path="/error" element={<Error/>} />
          <Route path="/userDetails" element={<Header />}/>

          <Route path="/userlist" element={<Users />} />
          <Route path="/adduser" element={<Adduser />} />
          <Route path="/updateuser/:id" element={<Updateuser />} />
 
        

        </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;
