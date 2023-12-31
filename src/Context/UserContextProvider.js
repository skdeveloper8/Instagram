import React,{useState} from "react";
import UserContext from './UserContext'

const UserContextProvider=({children})=>{
   const [currentUser,setCurretnUser]=useState("");
   const [showPost, setShowPost] = useState(false);
   const [currentPost, setCurrpost] = useState("")
   const [clicksearchedUser, setClickSearchedUser] = useState("")
   const [showExplore, setShowExplore] = useState(false);
   const [showMessage, setShowMessage] = useState(false);
   const loggedinUser=JSON.parse(localStorage.getItem("User"));
    return(
        <UserContext.Provider value={{loggedinUser,clicksearchedUser,setClickSearchedUser, currentUser,setCurretnUser,showPost, setShowPost, currentPost, setCurrpost,showExplore, setShowExplore, showMessage , setShowMessage}}>
        {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider