import React, { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import host from "../ApiRoutes/Routes";
import { useNavigate } from "react-router-dom";
function EditProfile() {
  const token = JSON.parse(localStorage.getItem("User")).token;
  const currentUser = JSON.parse(localStorage.getItem("User"));
  const navigate=useNavigate();
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [bio, setBio] = useState("");
  async function saveImg(){
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dgu0i42tw");

    try {
      if (image === null) {
        return alert("Please upload an image");
      } else {
        const result = await fetch(
          "https://api.cloudinary.com/v1_1/dgu0i42tw/image/upload",
          {
            method: "POST",
            body: data,
          }
        );
        const cloudData = await result.json();
        setUrl(cloudData.url);
        console.log(cloudData.url);
        alert("Image Uploded Successfully");
        
      }
    } catch (err) {
      console.error(err);
    }
  };
  async function handleSubmit() {
    
   const {data}= await axios.post(`${host}/editProfile`, {
      dp: url ,
      bio,
      token,
    });
    if(data?.success===true){
      localStorage.clear();
      navigate('/login')
    }
  }
  async function handleclick(e){
    await  saveImg()
    await setImage(e.target.files[0]);
    await  saveImg()
  }
  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h1 className="flex justify-center text-3xl font-semibold underline underline-offset-8 p-6">
          
          Edit Profile
        </h1>
        <div className="flex justify-center bg-[#9b9494] items-center rounded-lg">
          {/* {image ? (
            <img
              src={URL.createObjectURL(image)}
              alt="oo"
              className="w-12 h-12 rounded-full mx-2"
            />
          ) : (
            <IoMdAddCircle className="w-12 h-12 rounded-full mx-2" />
          )} */}
          {/* <img src={currentUser?.dp} alt="user" className='w-12 h-12 rounded-full mx-2'/> */}
          <div className="min-w-[30rem] h-[5rem] flex flex-col justify-center px-4">
            <div className="font-semibold text-xl"> {currentUser.username}</div>
            <div> {currentUser.name}</div>
          </div>
          <button className="p-2 mx-4 text-white font-semibold rounded-md bg-[#0095F6]">
            <input type="file" onClick={handleclick}  className="w-[6rem]"/></button>
        </div>
        <div className="flex flex-col m-2">
          <h1 className="text-4xl py-2 mx-2 font-bold"> Bio </h1>
          <textarea
            type="text"
            className="min-w-[43rem] h-[5rem] border-2 border-gray-300"
            onChange={(e)=>{setBio(e.target.value)}}
          />
        </div>
        <div className="flex flex-col m-2">
          <h1 className="text-4xl py-2 mx-2 font-bold"> Gender </h1>
          <select
            name="Gender"
            className="min-w-[43rem] h-[5rem] border-2 border-gray-200"
          >
            <option value="Not Say"> Not Want to Say </option>
            <option value="M"> Male </option>
            <option value="F"> Female </option>
          </select>
        </div>
        <button onClick={handleSubmit} className="p-4 bg-[#0095F6] rounded-lg text-white text-3xl font-bold">
          
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditProfile;

