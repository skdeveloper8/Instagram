import React, { useContext, useState } from 'react'
import { IoHome, IoMenuOutline } from "react-icons/io5";
import { FaSearch, FaVideo, FaFacebookMessenger, FaRegPlusSquare, FaRegHeart, FaInstagram } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoIosContact } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Search from './Search';
import CreatePost from '../pages/CreatePost';
import UserContext from '../Context/UserContext';



const SideMain = () => {
  const Navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [createPostShow, setCreatePostShow] = useState(false)
  const [sidemainHide, setSidemainHide] = useState(false);
  const { setShowExplore, showExplore, setClickSearchedUser , setShowMessage,showPost, showMessage } = useContext(UserContext);
  const [active, setActive] = useState(false);
  const admin=JSON.parse(localStorage.getItem("User"))
  const data = [
    {icon: <IoHome />, label: 'Home', onClick: () => { Navigate('/') },  },
    {icon: <FaSearch />, label: 'Search', onClick: () => { setShow(!show); setActive(!active)  } },
    {icon: <MdOutlineExplore />, label: 'Explore', onClick: () => {setShowExplore(!showExplore); setActive(!active)  } },
    {icon: <FaVideo />, label: 'Reels', onClick: () => { Navigate('/'); setActive(!active)  } },
    {icon: <FaFacebookMessenger />, label: 'Message', onClick: () => { setShowMessage(!showMessage); setActive(!active) } },
    {icon: <FaRegHeart />, label: 'Notification', onClick: () => { Navigate('/'); setActive(!active) } },
    {icon: <FaRegPlusSquare />, label: 'Create', onClick: () => { setCreatePostShow(!createPostShow); setActive(!active)  } },
    {icon: <IoIosContact />, label: 'Profile', onClick: () => { setClickSearchedUser(admin);
      Navigate('/profile'); setActive(!active) } },
    {icon: <IoMenuOutline />, label: 'More', onClick: () => { Navigate('/'); setActive(!active) } },
  ]
  

  return (
    <div className={`${active ? "sidemain flex h-full p-2 border-r-6 w-fit bg-white":"sidemain flex h-full p-2 border-r-2 w-[250px] bg-white"} `}>
      <div>
        <ul className={`sidemain-ul flex flex-col px-1 `} onClick={() => { setSidemainHide(!sidemainHide) }}>
          <div className="logo p-5 text-3xl cursor-pointer">
            <h1 className='flex'><FaInstagram /><p className={`${active ? "hidden":"mt-[-2px] px-2 text-2xl font-semibold"} `}> Instagram </p></h1>
          </div>

          {data.map((item)=>(
            <li key={item?.id} className='flex p-4 text-[1.5rem] cursor-pointer' onClick={item?.onClick}>
            {item?.icon} <p className={`${active ? "hidden":"text-base px-3 font-thin"} `}>{item?.label}</p>
          </li>

          ))}
        </ul>
      </div>
      {show && <Search />}
      {!show &&createPostShow && <CreatePost />}
    </div>
  )
}

export default SideMain
