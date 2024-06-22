import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './todos.css'
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import Editform from '../Editform/Editform';
import { BarLoader } from 'react-spinners';
import 'react-toastify/dist/ReactToastify.css';
const Todos = () => {
    const {todosData,setLoader,loader,currentUser,getData,editForm,setEditForm,setClickForm}=useContext(AuthContext) 
   const [formid,setFormid]=useState()
  
    function handleClick(id){
        console.log(id)
        setLoader(true)
        axios.post(`${import.meta.env.VITE_BACK_API}/api/tasks/deletetask`,{
          username:currentUser.username,
          id:id
        }).then(()=>{
         getData(currentUser.username)
        
         setTimeout(()=>{
        
          setLoader(false)
        },2000)
        })
        
      }
      
      function handleEdit(id){
setEditForm(!editForm)
setClickForm(false)
setFormid(id)
      }
      console.log(editForm)
  return (
    <div>
        <h2>Tasks</h2>
        <div className='todos'>
                {
                   !loader ? (todosData.map((item)=>{
                        return <div key={item.id} className='parent-todo'>
                            <div  className='todo'>
                                                            
                                <p>{item.name}</p>
                              
                                <p>{item.description}</p>
                                <p>{item.date}</p>
                                </div>
                                <div className='btn'>
                                  <div onClick={()=>handleEdit(item.id)}>
<MdEdit />
                                    </div>
                             
                                <div onClick={()=>handleClick(item.id)}>

                                <MdDelete />
                                </div>
                                    </div>
                                    { editForm && formid===item.id && <Editform item={item} editForm={editForm} setEditForm={setEditForm} />}
                        </div>
                    })):<div className='loader'><BarLoader color="#f1f6f6" /></div>
                }
        </div>
 
    </div>
  )
}

export default Todos