import React, { useContext, useEffect } from 'react'
import './Navbar.css'
import { SiPivotaltracker } from 'react-icons/si'
import { Link } from 'react-router-dom'
import { CgProfile } from "react-icons/cg";
import { AuthContext } from '../../context/AuthContext';
const Navbar = () => {
  const {currentUser,setCurrentUser}= useContext(AuthContext)
 
  const handleLogout=()=>{
    localStorage.clear()
    setCurrentUser(null)
  }
  return (
    <div className='navbar'>
        <div>
        <div className='task-logo'>
           <Link to={currentUser&& "/"}>   <SiPivotaltracker  size={20} /></Link>
   
      </div>
        <h1>Task Manager</h1>
        </div>
        <div className='nav-btn'>
        {currentUser ? (
          <div className="login">
            <CgProfile size={20} />{" "}
            <p >{currentUser.username}</p>{" "}
            <button className="log" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className='nav-log-sing'>
            <Link to="/login">
              {" "}
              <button className="log">Login</button>
            </Link>
            <Link to="/register">
              {" "}
              <button className="singup"> Signup</button>
            </Link>
          </div>
        )}
        </div>
    </div>
  )
}

export default Navbar