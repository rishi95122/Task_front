import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const [loader,setLoader]=useState(false)
  const [clickForm,setClickForm]=useState(false)
  const [editForm,setEditForm]=useState(false)  
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [todosData, setTodosdata] = useState([]);


  const getData = (username) => {
    if(!username)
      return;
setLoader(true)
     axios.post(`${import.meta.env.VITE_BACK_API}/api/tasks/gettasks`, { username: username })
      .then((res) => {
        setTodosdata(res.data);
        setLoader(false)
      });
    
  };


 
  useEffect(() => {
    getData(currentUser ? currentUser.username : "");
  }, []);
  return (
    <AuthContext.Provider
      value={{
        editForm,
        setEditForm,
        loader,
        setLoader,
        getData,
        setClickForm,
        clickForm,
        currentUser,
        setCurrentUser,
        todosData,
        setTodosdata,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
