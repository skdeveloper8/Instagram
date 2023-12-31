import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";
import { BsSave } from "react-icons/bs";
import { CiFaceSmile } from "react-icons/ci";
import UserContext from '../Context/UserContext';
import { useContext } from 'react';
import host from '../ApiRoutes/Routes';
import axios from "axios"

const CurrentPost = () => {
    const { setShowPost, showPost, currentPost } = useContext(UserContext)
    const [comment, setComment] = useState("");
    const [useComments, setUseComments] = useState([])
    const token = JSON.parse(localStorage.getItem("User")).token;
    async function abc() {
        const id = currentPost._id;
        const { data } = await axios.post(`${host}/getcomment`, { "id": id })
        setUseComments(data.data.comments);
    }
    async function submitHandler(e) {
        await axios.post(`${host}/comment`, { token, message: comment, id: currentPost._id })
        abc();
        setComment("");
    }
    useEffect(() => {
        abc();
    }, [])
    return (
        <div className='bg-transparent h-[100vh] flex flex-col items-center justify-center backdrop-filter backdrop-blur-sm bg-opacity-1 z-10 '>
            <div className='w-[50rem] bg-white flex border-[1px] border-gray-400'>
                <div className='w-3/4 border-r-2'>
                    <img src={currentPost?.image} alt='oo' className='h-[80vh] w-full p-2' />
                </div>
                <div>
                    <div className='flex justify-between m-2 w-[25rem]'>
                        <div className='flex items-center'>
                            <img src={currentPost?.user.dp} alt="not" className='w-12 h-12 rounded-full border-2 border-red-600 mx-4' />
                            <h1 > {currentPost?.user.username}</h1>
                        </div>
                        <RxCross2 className='m-3 text-2xl font-semibold' onClick={() => { setShowPost(!showPost) }} />
                    </div>
                    <hr />
                    <div className='flex flex-col gap-2 h-[18rem] overflow-scroll'>
                        {
                            useComments.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((item, index) =>
                            (
                                <div key={item?._id} className='flex justify-between m-2 w-[25rem]'>
                                    <div className='flex items-center'>
                                        <img src={item?.dp} alt="not" className='w-12 h-12 rounded-full border-2 border-red-600 mx-4 mr-2' />
                                        <div className='flex flex-col'>
                                            <h1 className='font-bold capitalize'>{item?.commentor}</h1>
                                            <p className='text-sm'>{item?.message}</p>
                                        </div>
                                    </div>
                                    <IoIosHeartEmpty className='m-3 text-2xl font-semibold' />
                                </div>
                            ))
                        }

                    </div>
                    <hr className='p-1' />
                    <div className='px-4'>
                        <div className='flex justify-between text-2xl '>
                            <div className='flex gap-3'>
                                <IoIosHeartEmpty /><FaRegComment /><FiSend />
                            </div>
                            <BsSave />
                        </div>
                        <p className='py-4'> 1001 likes </p>
                        <hr />
                        <div className='flex '>
                            <CiFaceSmile className='m-2 text-2xl' />
                            <input type="text" placeholder='Add a comment' className='w-full' value={comment} onChange={(e) => { setComment(e.target.value) }} />
                            <span><button onClick={submitHandler}>Post</button></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CurrentPost
