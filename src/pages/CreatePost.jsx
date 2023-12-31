import React, {useState } from "react";
import { toast } from "react-toastify";
import { CiFaceSmile } from "react-icons/ci";
import { IoMdAddCircle } from "react-icons/io";
import axios from "axios";
import host from "../ApiRoutes/Routes";
import{useNavigate} from 'react-router-dom'

const CreatePost = () => {
  const navigate=useNavigate();
  const [image, setImage] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("User"));
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const saveImg = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "myCloud");
    data.append("cloud_name", "dgu0i42tw");

    try {
      if (image === null) {
        return toast.error("Please upload an image");
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
        alert("Image Uploded Successfully")
      }
    } catch (err) {
      console.error(err);
    }
  };
  async function handleSUbmit() {
    if (!image) {
      alert("Please Submit image and Description Both")
    } else {

      const { data } = await axios.post(`${host}/create-post`, {
        image: url, description: text, token: JSON.parse(localStorage.getItem("User")).token
      })
      if (data.success === true) {
        alert("Posted successfully")
        navigate('/');
        
      } else {
        alert("Try again")
      }
    }
  }


  return (
      <div className="w-[70vw] h-[100vh] flex flex-col items-center justify-center backdrop-filter backdrop-blur-lg bg-opacity-50 pt-10">
    
      <div className="create-post w-[35rem] rounded-lg flex flex-col p-4 m-auto bg-white text-black border-gray-600 border-2 ">

        <div className="flex justify-center font-bold text-lg border-b-2"> Create New Post</div>

        <div className="create-post2 flex h-full py-2 flex-wrap">
          <div className="card flex flex-col items-center w-1/2 border-2 ">
            {image ? (<img src={URL.createObjectURL(image)} alt="oo" className="w-36 h-52 mt-5 mb-10" />) :
              (<IoMdAddCircle className="text-4xl mt-24 mb-20 cursor-pointer" />)}
            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="flex text-xs" />
            <button onClick={() => saveImg()} className="bg-gray-400 p-2 rounded-lg">Upload</button>
          </div>

          <div className="card h-full border-l-2 p-2 w-1/2 border-2 mx-auto">
            <div className="flex mx-2 bg-gray-300 p-1 rounded-full">
              <img src={currentUser?.dp} alt="user" className="w-9 h-9 rounded-full" />
              <div className="mx-3">
                <h1 className="font-bold text-xs mt-1"> {currentUser.username} </h1>
                <p className="text-xs"> {currentUser.name}</p>
              </div>
            </div>
            <textarea cols="26" rows="5" className="mx-4 mt-2 border-gray-300 border-[1px]" placeholder=" Write Something..." onChange={(e) => { setText(e.target.value) }}></textarea>
            <div className="flex justify-between">
              <div><CiFaceSmile className="text-2xl mx-3" /></div>
              <div><p className="text-xs p-2"> 1 / 100</p></div>
            </div>
            <button type="submit" onClick={handleSUbmit} className="bg-cyan-600 w-full rounded-md p-2 font-bold"> Post </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;