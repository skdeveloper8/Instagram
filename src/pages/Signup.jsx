import React, { useState } from 'react'
import axios from 'axios'
import host from '../ApiRoutes/Routes'
import { FaGooglePlusSquare } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const Navigate=useNavigate();
  const [userData,setuserData]=useState({
    username:"",
    name:"",
    email:"",
    password:""
  })
  async function submitHandler (e){
    e.preventDefault();
    const {username,email,name,password}=userData;
    const data = await axios.post(`${host}/register`,{username, name , email, password});
    if(data){
      alert("SignUp Successfull")
      Navigate("/login");
    }else{
      alert("Some Error Try Again")
    }
  }
  function handleChange(e){
    setuserData({...userData,[e.target.name]:e.target.value})
    console.log(userData);
  }
  return (
    <div className='flex flex-col justify-center h-full items-center pt-2'>
      <div className='flex flex-col w-[340px] text-center border-[1px] border-gray-300 p-6'>
        <h1 className='logo-text p-4 font-bold text-3xl'> Social-Hub </h1>
        <p className='pb-5'> Sign up to see photos and videos from your friends.</p>
        <button className='flex justify-center p-2 rounded-full bg-[#1877F2] text-white'>
          <FaGooglePlusSquare className='mx-2 text-2xl'/>Log in with Google </button>
        <div className='flex pt-8'>
            <div className='w-32 bg-gray-800 h-[1px]'></div>
            <div className='mt-[-.7rem] px-3'> OR </div>
            <div className='w-32 bg-gray-800 h-[1px]'></div>
        </div>

        <form onSubmit={submitHandler} className='p-3'>
            <input type="email" name='email' placeholder='Enter an Email 'className='p-1 w-64 rounded-sm border-2 m-1'onChange={handleChange}/>
            <input type="text"name='username' placeholder='Username 'className='p-1 w-64 rounded-sm border-2 m-1' onChange={handleChange}/>
            <input type="text"name='name' placeholder='Full Name'className='p-1 w-64 rounded-sm border-2 m-1' onChange={handleChange}/>
            <input type="password"name='password' placeholder='Password 'className='p-1 w-64 rounded-sm border-2 m-1' onChange={handleChange}/>

            <p className='text-xs p-1 text-gray-500'>People who use our service may have uploaded your contact information to Instagram. <span> Learn More</span>  <br /> <br />By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>

            <button type='submit' className='flex mt-3 mb-4 justify-center p-1 w-full rounded-lg bg-[#1877F2] text-white'> Sign Up </button>
        </form>
      </div>
      <div className='w-[340px] p-4 m-2 flex justify-center border-[1px] border-gray-300 cursor-pointer'onClick={()=>{Navigate('/login')}}> Have an account <span className='text-[#0095F6]'> Log in </span></div>
      <div className='flex list-none gap-3 text-sm p-4'>
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
      <div className='flex p-4 text-sm'>
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

export default Signup
