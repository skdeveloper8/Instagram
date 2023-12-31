import React, { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import host from "../ApiRoutes/Routes";
import UserContext from "../Context/UserContext";
import {useNavigate} from 'react-router-dom'

const Search = () => {
  const navigate=useNavigate();
  const [username, setUsername] = useState("");
  const [searchedUser, setSearchedUser] = useState([]);
  const {clicksearchedUser,setClickSearchedUser}=useContext(UserContext)
  useEffect(() => {
    abc();
    async function abc() {
      const { data } = await axios.post(`${host}/search`, { username })
      setSearchedUser(data.data);
      console.log(searchedUser);
    }
  }, [username])
  async function clickHandler(e){
    console.log(e.target.id);
     const {data}=await axios.post(`${host}/searchUser`,{id:e.target.id})
     setClickSearchedUser(data.data);
     console.log(clicksearchedUser);
   navigate("/profile")
  }
  return (
    <div className="w-[22rem] h-[100vh] border-2 rounded-xl bg-white">
      <div >
        <h1 className="text-3xl px-4 py-8 font-semibold"> Search </h1>
        <div className="flex border-2 w-fit mx-4 bg-[#EFEFEF] mb-6 rounded-md">
          <input type="text" className="text-2xl bg-[#EFEFEF] " onChange={(e) => { setUsername(e.target.value) }} />
          <ImCross className="m-2 " />
        </div>
        <hr />
      </div>
      <div>
        <div className="flex justify-between font-semibold p-4">
          <h1> Recent </h1>
          <p className="text-sky-700"> Clear all </p>
        </div>
        <div className="flex flex-col w-[21rem] h-[20rem] overflow-scroll">
          {
            searchedUser && searchedUser.map((user, index) => (
              <div key={index} className="flex justify-between p-2 h-[4rem] w-[21rem]" id={user?._id} onClick={clickHandler}>
                <div className="flex pl-2">
                  <img src={user?.dp} alt="user " className="w-12  h-12 rounded-full border-2" />
                  <div className="px-4">
                    <h1 className="font-semibold capitalize"> {user?.username} </h1>
                    <h3> {user?.name} </h3>
                  </div>
                  <hr />
                </div>

                <ImCross className="m-3 " />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Search;
