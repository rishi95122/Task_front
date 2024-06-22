
import "./login.css"
import React, { useContext, useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router"
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../context/AuthContext"
import { BarLoader } from "react-spinners"
const Register = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const[err,setErr]=useState("")
  const nav=useNavigate()
  const {currentUser,loader,setLoader}=useContext(AuthContext)

  useEffect(()=>{
    if(currentUser)
      nav("/")
    },[])

  const onButtonClick = () => {
    setLoader(true)
    if(!email.includes("@")||!email.includes("."))
      {setErr("Email must include @ and .")
        setLoader(false)
        return;}
        if(email.length<=4)
          {setErr("Email must be greater than 4 characters")
            setLoader(false)
            return;}
        if(password.length <8)
          {
            setErr("Password must be greater than 8")
            setLoader(false)
            return;
          }
          if(username.length <3)
            {
              setErr("Username must be greater than 3 characters")
              setLoader(false)
              return;
            }

   axios.post(`${import.meta.env.VITE_BACK_API}/api/auth/register`,{
    email:email.toLowerCase(),
    username:username.toLowerCase().trim(),
    password:password
  }).then(()=>{
  setLoader(false)
    nav("/login")

  }).catch((e)=>{
    setLoader(false)
setErr(e.response.data)
  })
  
  }
console.log(err)
  return (
    <div className='mainContainer'>
      <div className='titleContainer'>
        <div>Create an account</div>
      </div>

      <div className='inputContainer'>
        <input
          value={email}
          placeholder="Enter your email here"
          onChange={(ev) => setEmail(ev.target.value)}
          className='inputBox'
        />
      
      </div>

      <div className='inputContainer'>
        <input
          value={username}
          placeholder="Enter your Username here"
          onChange={(ev) => setUsername(ev.target.value)}
          className='inputBox'
        />
    
      </div>
      
      <div className='inputContainer'>
        <input
          value={password}
          placeholder="Enter your password here"
          onChange={(ev) => setPassword(ev.target.value)}
          className='inputBox'
        />
     
      </div>
   
    
      {loader ?<div className='loader'> <BarLoader color="#36d7b7" /></div>:       <label className="errorLabel">{err}</label>}

      <div className='inputContainer'>
        <button className='inputButton' type="button" onClick={onButtonClick}>Register</button>
      </div>
    </div>
  )
}

export default Register