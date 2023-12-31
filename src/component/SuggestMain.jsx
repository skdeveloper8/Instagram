import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import host from '../ApiRoutes/Routes'
import { useNavigate } from 'react-router-dom'
import { FaPowerOff } from "react-icons/fa";
import UserContext from '../Context/UserContext';

const followlist = [
  { username: "Ms Dhoni", name: "Mahendra Singh Dhoni", img: "https://c.ndtvimg.com/2021-10/nn6emufo_ms-dhoni-ipl_650x400_07_October_21.jpg?im=FeatureCrop,algorithm=dnn,width=806,height=605" },
  { username: "Ritikasingh0948", name: " Ritika ", img: "https://i.pinimg.com/736x/57/81/15/578115fbe4c4e633ca59ece7dbdad940.jpg" },
  { username: "ramesh111", name: " Ramesh ", img: "https://thumbs.dreamstime.com/b/basic-rgb-basic-rgb-219903843.jpg" },
  { username: "nisha000", name: " nisha ", img: "https://i.pinimg.com/736x/1e/32/b4/1e32b45fc32f763e9165d527cabfe4c3.jpg" },
  { username: "official_Rk", name: " Rakesh ", img: "https://static.vecteezy.com/system/resources/previews/006/732/012/original/cartoon-illustration-of-smiling-a-boy-walking-free-vector.jpg" },
  { username: "Hardik", name: "Hardik Pandya", img: "https://cdn.zeebiz.com/sites/default/files/2023/05/23/243678-ms-dhoni.jpg" }
]
const SuggestMain = () => {
  const {setClickSearchedUser}=useContext(UserContext)
  const currentUser= JSON.parse(localStorage.getItem("User"));
  const navigate=useNavigate();
  async function clickHandler() {
    const user = JSON.parse(localStorage.getItem("User"));
    const {data} = await axios.post(`${host}/profile`, {
       id: user?._id
    })
    if(data.success===true){
        setClickSearchedUser(data.data)
      navigate('/profile');
    }else{
      alert("Login again")
      navigate('/login')
    }
    
  }
  useEffect(()=>{
    if(!localStorage.getItem("User")){
      navigate('/login')
    }
  },[])
  function logout(){
    localStorage.clear();
    navigate('/login')
  }
  return (
    <div className='suggestmain px-3 w-[350px] absolute right-0 mt-6'>
      <div className='flex cursor-pointer' onClick={clickHandler}>
        <img src={currentUser?.dp} alt="User" className='w-12 h-12 mr-4 rounded-full' />
        <div className='py-1 w-64'>
          <h1 className='font-bold text-base mt-1'>{currentUser?.username}</h1>
          <p className='text-sm'> {currentUser?.name}</p>
        </div>
        <div className='flex items-center px-8 font-bold text-2xl text-[red] 'onClick={logout}><FaPowerOff/>  </div>
      </div>
      <div className='flex my-9'> <h1 className='w-[260px]'> Suggested for you </h1> <p>See all</p></div>
      <div>
        {followlist.map((i, index) => (
          <div key={index} className='flex pt-2'>
            <img src={i.img} alt="User" className='w-12 h-12 mr-4 rounded-full' />
            <div className='py-1 w-64'>
              <h1 className='font-bold text-base'> {i.username} </h1>
              <p className='text-sm'> {i.name}</p>
            </div>
            <div className='flex items-center px-8 font-bold text-xs text-[#0095F6] '> Follow </div>
          </div>
        ))}
      </div>
      <div className='flex list-none flex-wrap gap-2 text-xs mt-5 text-gray-500'>
        <li>About</li>
        <li>Help</li>
        <li>Press</li>
        <li>API</li>
        <li>Jobs</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Locations</li>
        <li>Language</li>
        <li>Meta Verified</li>
      </div>
      <li className='flex list-none text-xs py-3 text-gray-500'>© 2023 INSTAGRAM FROM META</li>
    </div>
  )
}

export default SuggestMain
