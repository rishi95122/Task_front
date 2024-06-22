import  { useContext, useState } from 'react'
import "./Homepage.css"
import { BiTask } from "react-icons/bi";
import TaskForm from '../TaskForm/TaskForm';
import Todos from '../Todos/Todos';
import { MdPostAdd } from "react-icons/md";
import { AuthContext } from '../../context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Homepage = () => {
  const {clickForm,setClickForm,setEditForm}=useContext(AuthContext)
 
  
  function handleClick(){
    setClickForm(!clickForm)
    setEditForm(false)
  }

  return (
    <div className='homepage'>
      <div className='center'>
      <div className='task-logo'>

<BiTask size={80} />
</div>
  <h1>Task Manager</h1>

 
  <div className='addnewtask'>
  <button onClick={handleClick}>Add new Task <MdPostAdd size={23} /></button>
  
    </div>
    <div className='form'>
 {clickForm &&    <TaskForm clickForm={clickForm} setClickForm={setClickForm} />}
 
  </div>
      </div>
        <div className=''>
      <Todos />
        </div>
     
    </div>
  )
}

export default Homepage