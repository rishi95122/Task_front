import { useContext, useState } from 'react'
import "./taskform.css"
import { IoIosAddCircle } from "react-icons/io";

import { AuthContext } from '../../context/AuthContext';
import { ImCross } from "react-icons/im";
import axios from 'axios';

const TaskForm = ({clickForm,setClickForm}) => {
const {currentUser,getData,setLoader}=useContext(AuthContext)
  const [name,setName]=useState("")
  const [description,setDescription]=useState("")

  const [date ,setDate]=useState("")
  function uniqueId() {
    const timestamp = new Date().getTime(); 
    const randomNum = Math.floor(Math.random() * 1000000000);
    return `${timestamp}-${randomNum}`; 
  }
  function handleClick(){

      if(date.length<=0 || name.length<=0 )
        return;
      if(!currentUser)
        return;
      setLoader(true)
      setClickForm(false)
    const newData={
      id:uniqueId(),
      username:currentUser.username,
      name:name,
      description:description,
      date:date
    }
     axios.post(`${import.meta.env.VITE_BACK_API}/api/tasks/addtask`,newData).then(()=>{
      setClickForm(false)
      getData(currentUser.username)
      setName("")
     setDescription("")
      setDate("")
 
      setTimeout(()=>{
      
        setLoader(false)
      },2000)
      
    })
 
  }

  return (
    <div className='taskform'>
      
       <form>
        <div className='cross'>
          <p></p>
        <h3>Enter Details</h3>
        <div onClick={()=>setClickForm(!clickForm)}>
        <ImCross />
        </div>
       
        </div>
      
        <input type="text" value={name} placeholder='Task name' onChange={(e)=>setName(e.target.value)}/>
        <textarea type="text" value={description} placeholder='Task Description' onChange={(e)=>setDescription(e.target.value)}/> 
       
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
        <div className='addbtn' onClick={handleClick}>
        <IoIosAddCircle size={26}   />
        </div>
     
        
       </form>
    </div>
  )
}

export default TaskForm