import React, { useState, useEffect, useRef, useContext } from "react";
import { FaRegEdit, FaRegSmile } from "react-icons/fa";
import { LuDot } from "react-icons/lu";
import { MdCall } from "react-icons/md";
import { CiVideoOn } from "react-icons/ci";
import { GrCircleInformation } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import UserContext from "../Context/UserContext";
import host from "../ApiRoutes/Routes";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

const Message = () => {
  const socket = useRef();
  const { loggedinUser, clicksearchedUser,setClickSearchedUser } = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const [messeges, setMesseges] = useState([]);
  const [msg, setMsg] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const navigate=useNavigate();
  async function abc() {
    const response = await axios.post(`${host}/getmsg`, {
      from: loggedinUser?._id,
      to: clicksearchedUser?._id,
    });
    setMesseges(response.data);
  }
  const handleSendMsg = async () => {
    abc();
    await axios.post(`${host}/addmsg`, {
      from: loggedinUser._id,
      to: clicksearchedUser._id,
      message: msg,
    });
    abc();
    socket.current.emit("send-msg", {
      to: clicksearchedUser._id,
      from: loggedinUser._id,
      message: msg,
    });
    const msgs = [...messeges];
    msgs.push({ messege: msg });
    setMesseges(msgs);
    setMsg("");
  };
  useEffect(() => {
    arrivalMessage && setMesseges((prev) => [...prev, arrivalMessage]);
    abc();
  }, [arrivalMessage]);
 
  useEffect(() => {
    if (loggedinUser) {
      socket.current = io("http://localhost:5000");
      socket.current.emit("add-user", loggedinUser._id);
    }
  }, [loggedinUser]);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    getFollowing();
    async function getFollowing() {
      const { data } = await axios.post(`${host}/getFollowing`, {
        _id: loggedinUser?._id
      })
      setFollowing(data.data.following)
    }
  }, [])
  async function handleChatUser(e){
    const {data}=await axios.post(`${host}/searchUser`,{username:e.target.id})
    setClickSearchedUser(data.data);
  }
  async function clickHandler(){
    navigate("/profile");
  }
  return (
    <div className="flex w-[94%] absolute left-16 bg-white h-[100vh]">
      <div className="flex flex-col w-[30%] h-[100vh] border-r-2">
        <div className="flex justify-between p-4 items-center text-xl font-semibold">
          <h1>{loggedinUser?.username}</h1>
          <p>
            <FaRegEdit />
          </p>
        </div>
        <div className="flex justify-between p-4 items-center">
          <h1 className="font-semibold text-xl">Followings</h1>
          <p className="text-gray-600 text-sm font-semibold">Requests</p>
        </div>
        <hr />
        <div className="flex flex-col overflow-scroll h-full overflow-x-hidden bg-white  rounded-lg" >
          {
            following && following.map((user, index) => (
              <div key={index} className=" h-16 p-2 flex  bg-red-200 mt-2 rounded-sm " id={user?.username} onClick={handleChatUser}>
                <img
                  src={user?.dp}
                  alt="DP"
                  className="w-12 rounded-full h-12 border-4"
                  id={user?.username} onClick={handleChatUser}
                />
                <div className="flex flex-col px-3 pt-1" id={user?.username} onClick={handleChatUser}>
                  <h1 className="font-semibold" id={user?.username} onClick={handleChatUser}>{user?.username}</h1>
                  <p className="text-sm text-gray-600 flex items-center">
                    message <LuDot /> 4h
                  </p>
                </div>

              </div>
            ))
          }
        </div>
      </div>
      <hr />

      <div className="flex flex-col w-full h-[100vh]">
        <div className="chat-username flex w-full justify-between h-[15vh] bg-sky-100">
          <div className="p-4 px-6 flex items-center">
            <img
              src={clicksearchedUser?.dp}
              alt="dp"
              className="w-12 rounded-full h-12 border-4"
            />
            <h1 className="px-4 font-semibold">{clicksearchedUser?.name}</h1>
          </div>
          <div className="flex items-center gap-4 text-xl px-4">
            <MdCall /> <CiVideoOn /> <GrCircleInformation />
          </div>
        </div>

        <div className="chat flex flex-col w-full overscroll-scoll overflow-x-hidden h-[73vh] px-4">
          <div className="flex flex-col items-center justify-center gap-2">
            <img
              src={clicksearchedUser?.dp}
              alt=""
              className="rounded-full w-32 h-32 border-4"
            />
            <h1 className="text-2xl font-bold"> {clicksearchedUser?.name} </h1>
            <p className="flex items-center text-sm text-gray-400">
              {clicksearchedUser?.username} <LuDot /> Instagram
            </p>
            <button className="p-1 px-4 font-sm bg-slate-300 rounded-lg font-semibold" onClick={clickHandler}>
              View Profile
            </button>
          </div>
          <div >
            {messeges.map((msg, index) => {
              return (
                <div key={index} className="mx-2 ">
                  <div className={!msg.fromSelf ? "flex flex-col items-start " : "flex flex-col items-end"}>
                    <div
                      className={!msg.fromSelf ? "bg-sky-300 w-fit max-w-[40%] px-2 rounded-lg text-xl p-2 my-2" : "bg-red-300 w-fit max-w-[40%] px-2 rounded-lg text-xl p-2 my-2"}>
                      <p>{msg.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat-input w-[74%] flex justify-between p-4 h-[10vh] items-center border-2 rounded-3xl mx-2 absolute bottom-2">
          <div className="flex w-full items-center gap-2 text-xl">
            <FaRegSmile />
            <input
              type="text"
              className="w-full outline-0 text-xl"
              placeholder="Messages"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(event) => { if (event.key === 'Enter') { handleSendMsg() } }}
            />
          </div>
          <div className="flex gap-4 text-xl">
            <button onClick={handleSendMsg}>
              <IoSend />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
