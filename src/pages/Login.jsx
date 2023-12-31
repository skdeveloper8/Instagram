import React, { useContext, useState } from 'react'
import { FaGooglePlus } from "react-icons/fa";
import axios from 'axios';
import host from '../ApiRoutes/Routes';
import { useNavigate, } from 'react-router-dom';
import UserContext from '../Context/UserContext';

const Login = () => {
  const { setCurretnUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  function handleChange(e) {
    setUserData({ ...userData, [e.target.name]: e.target.value })
    console.log(userData);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const { email, password } = userData;
    const { data } = await axios.post(`${host}/login`, { email, password });
    if (data.message === "Sucessfully login") {
      localStorage.setItem("User", JSON.stringify(data.user));
      const user = JSON.parse(localStorage.getItem("User"));
      if (user.token) {
        console.log(data, "CURRENT USER");
        setCurretnUser(JSON.parse(localStorage.getItem("User")));
        alert("Sucessfully login")
          navigate("/");
      
      } else {
        alert("login again")
      }
    } else {
      alert("Incorrect  credentials")
    }
  }
  return (
    <div className='flex flex-col'>
      <div className='flex justify-center'>
        <div className='loginpage'>
          <img src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png" alt="img" />
        </div>
        <div className='flex flex-col justify-center h-full items-center pt-12'>
          <div className='flex flex-col w-[340px] text-center border-[1px] border-gray-300 p-6'>
            <h1 className='logo-text p-4 font-bold text-3xl'> Social-Hub </h1>
            <form className='p-3' onSubmit={handleSubmit} >
              <input type="text" name='email' placeholder='Enter an Email ' className='p-1 w-64 rounded-sm border-2 m-1' onChange={handleChange} />
              <input type="password" name='password' placeholder='Password ' className='p-1 w-64 rounded-sm border-2 m-1' onChange={handleChange} />
              <button type='submit' className='flex mt-3 mb-4 justify-center p-1 w-full rounded-lg bg-[#1877F2] text-white'> Login </button>
            </form>
            <div className='flex pt-2 text-sm'>
              <div className='w-32 bg-gray-600 h-[1px]'></div>
              <div className='mt-[-.7rem] px-3'> OR </div>
              <div className='w-32 bg-gray-600 h-[1px]'></div>
            </div>
            <div className='flex justify-center p-6 '><FaGooglePlus className='mx-2 text-2xl' />Log in with Google </div>
            <div className='flex justify-center text-xs'>Forgot Password? </div>

          </div>
          <div className='w-[340px] p-4 m-2 flex justify-center border-[1px] border-gray-300 text-sm cursor-pointer' onClick={() => { navigate('/register') }}> Don't have an account? <span className='text-[#0095F6] px-3 '> Sign Up </span></div>

        </div>
      </div>
      <div className='flex justify-center list-none gap-3 text-sm p-4 flex-wrap'>
        <li>Meta</li>
        <li>About</li>
        <li>Blog</li>
        <li>Jobs</li>
        <li>Help</li>
        <li>API</li>
        <li>Privacy</li>
        <li>Terms</li>
        <li>Locations</li>
        <li>Instagram Lite</li>
        <li>Threads</li>
        <li>Contact Uploading & Non-Users</li>
        <li>Meta Verified</li>
      </div>
      <div className='flex p-4 text-sm justify-center'>
        <select name="">
          <option value="eng"> English</option>
          <option value="hindi"> Hindi </option>
          <option value="nepali"> Napali </option>
          <option value="aus"> Australia </option>
          <option value="nez"> New Zealend </option>
        </select>
        <p className='px-4'>© 2023 Instagram from Meta</p>
      </div>
    </div>
  )
}

export default Login
