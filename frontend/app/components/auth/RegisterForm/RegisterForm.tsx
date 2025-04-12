"use client"

import React, { useState } from 'react'
import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import SendButtom from '../SendButtom/SendButtom'
import { UseUserContext } from '@/context/userContext'

function RegisterForm() {
    const {registerUser, userState , handleUserInput} = UseUserContext()
    const {name,email,password} = userState
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <form className='m-2 px-10 py-14 rounded-lg bg-white w-full max-w-xl shadow-lg'>
      <div className='relative z-10'>
        <h1 className="mb-4 text-center text-2xl font-medium">
            Create your account 
        </h1>
        <div className="flex flex-col">
            <label htmlFor="name" className="mb-1 text-zinc-400">Full Name</label>
            <input type="text"
            id='name'
            value={name}
            onChange={handleUserInput("name")}
            name='name'
            className='px-4 py-3 border-[1px] rounded-md outline-indigo-800 '
            placeholder='JavaScript Doe' />
        </div>
        <EmailInput email={email} onChange={handleUserInput("email")}/>
        <PasswordInput password={password}
         onChange={handleUserInput("password")}
         showPassword={showPassword}
         onClick={handleShowPassword} />
        <SendButtom onClick={(e) => registerUser(e)} text='Create Account'/>
        <p className="mt-8 px-8 text-center text-2x2 text-sm">
            Have an account? {""}
            <a href="login" className='text-indigo-800 font-bold hover:text-fuchsia-800'>Log in</a>
        </p>
      </div>
    </form>
  )
}

export default RegisterForm
