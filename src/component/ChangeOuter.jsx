import React from 'react'
import { GoLock } from "react-icons/go";

const ChangeOuter = () => {
  return (
    <div>
      <div>
        <GoLock />
        <h1>Trouble logging in?</h1>
        <p>Enter your email, phone, or username and we'll send you a link to get back into your account.</p>
        <input
            type="text"
            placeholder={`Email, Phone or Username `}
            className="w-full h-14 rounded-md border-2"
          />
          <button> Send Login link </button>
          <div> Can't reset your password? </div>
          <div className='flex '>
            <hr />
             Or 
            <hr />
          </div>
      </div>
    </div>
  )
}

export default ChangeOuter
