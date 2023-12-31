import React, { useContext, useEffect, useState } from "react";
import { IoSettingsOutline, IoSaveSharp } from "react-icons/io5";
import { IoMdGrid } from "react-icons/io";
import { AiOutlineContacts } from "react-icons/ai";
import SideMain from "../component/SideMain";
import axios from "axios";
import host from "../ApiRoutes/Routes";
import profile from '../assets/profile.webp'
import UserContext from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import Message from "./Message";


const UserPage = () => {
  const { clicksearchedUser } = useContext(UserContext)
  const [follow, setFollow] = useState("Follow");
  const admin=JSON.parse(localStorage.getItem("User"))
  const currentUser = clicksearchedUser || JSON.parse(localStorage.getItem("User"));

  const navigate = useNavigate();
  const [datas, setdata] = useState(clicksearchedUser?.posts || null);
  useEffect(() => {
    abc();
    async function abc() {
      const { data } = await axios.post(`${host}/profile`, {
        id: currentUser?._id
      })
      setdata(data?.data?.posts);
    }
  }, []);
    useEffect(()=>{
      admin.following.map((user)=>{
          if(user.username===clicksearchedUser.username){
            setFollow("Unfollow")
          }
      })
    },[])
  async function followHandler() {
       const data=await axios.post(`${host}/following`,{
        token: JSON.parse(localStorage.getItem("User")).token,
        username:clicksearchedUser?.username,
        dp:clicksearchedUser?.dp
       })
       setFollow("Unfollow")
  }
  return (
    <div>
      <SideMain />
      <div className="userprofile flex flex-col pl-[125px]">
        <div className="flex justify-center h-[250px] items-center">
          <img src={currentUser?.dp || profile} alt="user" className="w-[9rem] h-[9rem] mx-12 rounded-full" />
          <div className="flex flex-col justify-between w-[26rem]">
            <div className="flex gap-5 w-[100%]">
              <div className="text-xl text-gray-800 font-semibold">{currentUser?.username}</div>
              {
                (admin.username===clicksearchedUser?.username) && <div className="flex gap-2 w-fit h-fit">
                  <button className="py-1 px-3 text-sm rounded-lg bg-gray-300" onClick={() => { navigate("/editProfile") }}>Edit Profile</button>
                  <button className="py-1 px-3 text-sm rounded-lg bg-gray-300" onClick={() => { navigate('/changePassword') }}> Change Password</button>
                  <IoSettingsOutline className="my-1 text-xl" />
                </div>
              }
            </div>
            <div className="flex justify-between w-[22rem] py-5">
              <div><span className="text-xl font-semibold">55</span> Post</div>
              <div><span className="text-xl font-semibold">1M</span> Follower</div>
              <div><span className="text-xl font-semibold">226</span> Following</div>
            </div>
            <div className="text-sm font-bold"> {currentUser?.bio} </div>
            <div className=" flex gap-5">
              {
                !(admin.username===clicksearchedUser?.username) && <span onClick={() => { navigate(<Message />) }}>
                  <button className="py-1 px-3 text-sm rounded-lg bg-gray-300"> Message </button></span>
              }
             
              {
                !(admin.username===clicksearchedUser?.username) && <span onClick={followHandler}> <button className="py-1 px-3 text-sm rounded-lg bg-gray-300"> {follow} </button></span>
              }
            </div>
          </div>
        </div>
        <div className=" border-y-[1px] border-gray-400 flex w-[80%] mx-auto"> </div>
        <div>
          <div className="flex gap-12  justify-center">
            <h1 className="flex text-sm"> <IoMdGrid className="mt-[2px] mx-2" /> Post </h1>
            <h1 className="flex text-sm"> <IoSaveSharp className="mt-[2px] mx-2" /> Saved </h1>
            <h1 className="flex text-sm"> <AiOutlineContacts className="mt-[2px] mx-2" />Tagged</h1>
          </div>
          <div className="w-[80%] mx-auto">
            <div className="grid grid-cols-3 grid-flow-rows gap-3 p-5 mt-4">
              {
                datas && (datas?.map((i) => {
                  return <div key={i?._id}>
                    <img  src={i?.image || profile} alt="dp" className="w-[20rem] h-[22rem] md:h-[15rem]" />
                  </div>
                }
                ))
              }
              {
                (datas?.length === 0) && <p className="text-2px font-bold">Not Posted Anything yet..</p>
              }

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default UserPage;
