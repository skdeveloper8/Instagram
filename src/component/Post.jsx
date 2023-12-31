import React, { useEffect, useState, useContext } from 'react'
import { BsThreeDots, BsDot } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { MdOutlineModeComment } from "react-icons/md";
import { FiSend } from "react-icons/fi";
import { RiFileDownloadFill } from "react-icons/ri";
import { PiSmiley } from "react-icons/pi";
import axios from 'axios';
import host from '../ApiRoutes/Routes';
import profile from '../assets/profile.webp'
import UserContext from '../Context/UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

const Post = () => {
  const [datas, setDatas] = useState([]);
  const navigate=useNavigate()
  const [currpostId, setCurrpostId] = useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const { setShowPost, showPost, setCurrpost,setClickSearchedUser } = useContext(UserContext)
  const currentUser = JSON.parse(localStorage.getItem("User"));
 
  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [currentUser?.token]);

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(`Fetching data for page ${currentPage}`);
      const { data } = await axios.post(`${host}`, { token: currentUser?.token, page: currentPage });
      console.log('Fetched data:', data);
      setDatas((prevData) => [...prevData, ...data.data]);
      setCurrentPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    console.log('Handling scroll...');
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !loading) {
      fetchData();
    }
  };

  async function clickhandler(e) {
    setCurrpostId(e.target.id);
    if (currpostId) {
      const { data } = await axios.post(`${host}/currentPost`, { id: currpostId })
      setCurrpost(data.data);
      setShowPost(!showPost)
    }
   
  }
  async function postref(e){
    const username=e.target.name;
    const { data } = await axios.post(`${host}/searchUser`, {username })
    setClickSearchedUser(data.data);
      navigate("/profile")
  }

  return (
    <div >
      {datas &&
        datas.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((i, index) => (
          <div
            key={index}
            className="postdiv w-[580px] border-b-2 border-gray-400 mb-6 pb-3 "
          >
            <div className="header  flex py-5 w-[100%] justify-between" id={i?._id}>
              <div className="flex" name={i?.user?.username}  onClick={postref}>
                <img name={i?.user?.username} 
                  src={i.user?.dp || profile}
                  alt="user"
                  className="w-10 h-full rounded-full cursor-pointer"
                />
                <div className="flex flex-col pl-3">
                  <h1 name={i?.user?.username}  className="flex font-semibold h-10 items-center">

                    {i?.user?.username} <BsDot className="pt-1 text-2xl" />
                    <span className="text-gray-600 font-normal">
                      {i?.time}
                    </span>
                  </h1>
                </div>
              </div>
              <BsThreeDots className="flex mt-4" />
            </div>
            <div>
              <img src={i?.image} alt="post" className="w-[100%] h-[35rem]" />
            </div>
            <div>
              <div className="flex justify-between text-2xl py-4">
                <div className="flex gap-4">
                  <CiHeart className="8xl" /> <MdOutlineModeComment />
                  <FiSend />
                </div>
                <div>
                  <RiFileDownloadFill />
                </div>
              </div>
              <div className="font-sm font-semibold">
                <h1> likes</h1>
                <p className="font-light font-xs ">{i.username}</p>
              </div>
              <div>
                <p className="font-sm text-gray-600 cursor-pointer" onClick={clickhandler} id={i?._id} > View all comments</p>
                <div className="flex justify-between">
                  <input type="text" placeholder="Add a comment" />
                  <PiSmiley />
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Post;
