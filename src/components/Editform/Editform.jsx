import { useContext, useState } from 'react'
import { ImCross } from 'react-icons/im'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AuthContext } from '../../context/AuthContext'
import './editform.css'
import axios from 'axios'

const Editform = ({setEditForm,editForm,item}) => {
    const {currentUser,getData,loader,setLoader}=useContext(AuthContext)

  const [name,setName]=useState(item.name)
  const [description,setDescription]=useState(item.description)
  const [date ,setDate]=useState(item.date)
 
  function handleClick(e){
    e.preventDefault()
    setLoader(true)
    if(date.length<=0 || name.length<=0 )
        return;
      if(!currentUser)
        return;
    const newData={
      id:item.id,
      username:currentUser.username,
      name:name,
      description:description,
      date:date
    }
    axios.post(`${import.meta.env.VITE_BACK_API}/api/tasks/updatetask`,newData).then(()=>{
      
        getData(currentUser.username)
        setEditForm(false)
        setLoader(false)
      })
  }
  return (
    <div className='editform'>
      
    <form>
     <div className='cross'>
       <p></p>
     <h3>Enter new Details</h3>
     <div onClick={()=>setEditForm(!editForm)}>
     <ImCross />
     </div>
    
     </div>
   
     <input type="text" value={name} placeholder='Task name' onChange={(e)=>setName(e.target.value)}/>
     <textarea type="text" value={description} placeholder='Task Description' onChange={(e)=>setDescription(e.target.value)}/> 
    
     <input type="date" value={date} onChange={(e)=>setDate(e.target.value)}/>
     <button className='addbtn' onClick={handleClick}>
     Submit
     </button>
  
     
    </form>
 </div>
  )
}

export default Editform