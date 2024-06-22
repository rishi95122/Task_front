import { useContext, useEffect, useState } from 'react'

import './App.css'
import Homepage from './components/Homepage/Homepage'
import {Routes,Route, useNavigate} from "react-router-dom"
import Login from './components/profile/Login'
import Register from './components/profile/Register'
import Navbar from './components/navbar/Navbar'
import { AuthContext } from './context/AuthContext'
function App() {

  const nav=useNavigate()
  const {currentUser} =useContext(AuthContext)
   useEffect(()=>{
    if(!currentUser)
      nav("/login")
   },[])
  return (
    <>
    <Navbar />
    <Routes>
      <Route path="/" element={ <Homepage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    
    </>
  )
}

export default App
