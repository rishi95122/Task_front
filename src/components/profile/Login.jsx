/* eslint-disable no-undef */

import axios from "axios"
import "./login.css"
import React, { useContext, useEffect, useState } from 'react'

import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import { ToastContainer, toast } from 'react-toastify'
import { BarLoader } from "react-spinners"
import { Link } from "react-router-dom"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const {setCurrentUser,getData,loader,setLoader}=useContext(AuthContext)
const nav=useNavigate()

console.log(import.meta.env.VITE_BACK_API)

  const onButtonClick = () => {

    setLoader(true)
    if(email.length<=0 || password.length <=0)
      { setError("Check Inputs")
        setLoader(false)
        return;
      }

    axios.post(`${import.meta.env.VITE_BACK_API}/api/auth/login`,{
      email:email.toLowerCase(),
      password:password
    }).then((data)=>{
      localStorage.setItem("user",JSON.stringify(data.data))
      setCurrentUser(data.data)
      console.log(data.data.username)
      getData(data.data.username)
      setLoader(false)
      nav("/")
    }).catch((err)=>{
      setLoader(false)
      setError(err.response.data)
    })

  }

  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Welcome back!</div>
        <b>Please enter your details</b>
      </div>
    
   
      <div className='inputContainer'>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
      
        />
     
      </div>

      <div className='inputContainer'>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          
        />

      </div> 
     
     
      {loader ?<div className='loader'> <BarLoader color="#36d7b7" /></div>: <label className="errorLabel">{error}</label>}
      <div className='btn-con'>
        <button className='inputButton' type="button" onClick={onButtonClick} >Log in</button>
      <Link to="/register">
      <button className='registerbtn' type="button" onClick={onButtonClick} >Create new account</button>
      </Link>
       
      </div>
    
    </div>
  )
}

export default Login