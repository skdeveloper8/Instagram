import React from 'react'
import Stories from './Stories'
import Post from './Post'

const BodyMain = () => {
  return (
    <div className='bodymain flex flex-col justify-center mx-auto w-[40rem] mt-4'>
      {/* <Stories /> */}
      <Post />
    </div>
  )
}

export default BodyMain
