import React, { useState } from "react";
import { LuDot } from "react-icons/lu";
import { IoIosArrowBack } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import host from "../ApiRoutes/Routes";
import { useNavigate } from "react-router-dom";
import SideMain from "./SideMain";


const currentUser = JSON.parse(localStorage.getItem("User"));


const ChangePassword = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState("");
  const [show, setShow] = useState(true)
  async function clickHandler() {
   const data= await axios.post(`${host}/sendmail`, {
      token: currentUser?.token,
      email:currentUser?.email
    })
    console.log(data);
    setShow(false);
  }
  async function setPassword() {
    const { data } = await axios.post(`${host}/resetPass`, {
      token: currentUser?.token, userOtp: values.userOtp, newPassword: values.newPassword
    })
    if (data.success === true) {
      alert("Password Change Successfully")
      localStorage.clear();
      navigate("/login");
    } else {
      alert("Try Again")
      setShow(true);
    }

  }
  function changeHandler(e) {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <div>
  <SideMain/>
    <div className="flex flex-col items-center bg-transparent">
      <div className="w-[30rem] px-4 flex flex-col my-2 border-2 rounded-lg bg-gradient-to-b from-gray-200  h-[100vh]">
        <div className="flex justify-between text-2xl py-6">
          <IoIosArrowBack />
          <RxCross2 />
        </div>
        <div className="flex">
          <p>{currentUser.username}</p>
          <LuDot />
          <p>Instagram </p>
        </div>
        <h1 className="text-2xl font-semibold"> Change Password </h1>
        <p className="py-4 text-sm">
          You’ll be logged out of all sessions except this one to protect your
          account if anyone is trying to gain access.
          <br /> <br />
          Your password must be at least 6 characters and should include a
          combination of numbers, letters and special characters (!$@%).
        </p>
        <div className="flex flex-col gap-5">
          {show ?
            (<div className="flex justify-between">
              <p className="text-xl text-gray-600">{currentUser?.email}</p>
              <button className="bg-[#3081E5] p-2 text-white text-xs rounded-md" onClick={clickHandler}>Send OTP</button>
            </div>) : (
              <input
                type="text"
                placeholder={`ENTER OTP `}
                name="userOtp"
                onChange={changeHandler}
                className="w-full h-14 rounded-md border-2" />)
          }
          <input
            type="password"
            placeholder={` New Password `}
            name="newPassword"
            className="w-full h-14 rounded-md border-2"
            onChange={changeHandler}
          />

        </div>

        <button className="flex justify-center p-3 text-white font-semibold rounded-full bg-[#3081E5] my-6" onClick={setPassword}>
          Change Password
        </button>
      </div>
    </div>
    </div>
  );
};

export default ChangePassword;
