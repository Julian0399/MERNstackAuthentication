"use client"

import React, { useState } from 'react'
import EmailInput from '../EmailInput/EmailInput'
import PasswordInput from '../PasswordInput/PasswordInput'
import SendButtom from '../SendButtom/SendButtom'
import { UseUserContext } from '@/context/userContext'

function LoginForm() {
    const {loginUser, userState , handleUserInput} = UseUserContext()
    const {name,email,password} = userState
    const [showPassword, setShowPassword] = useState(false)

    const handleShowPassword = () => setShowPassword(!showPassword)

  return (
    <form className='m-2 px-10 py-14 rounded-lg bg-white w-full max-w-xl shadow-lg'>
      <div className='relative z-10'>
        <h1 className="mb-4 text-center text-2xl font-medium">
            Welcom back to my APP
        </h1>
        <h1 className="mb-4 text-center text-[1 rem] font-medium">
            Login to your Account
        </h1>
        <EmailInput email={email} onChange={handleUserInput("email")}/>
        <PasswordInput password={password}
         onChange={handleUserInput("password")}
         showPassword={showPassword}
         onClick={handleShowPassword} />
        <div className='mt-4 flex justify-start'>
            <a href="/auth/forgot-password" className='text-indigo-800 text-sm font-bold hover:text-fuchsia-800'>Forgot Password?</a>
        </div>
        <SendButtom onClick={(e) => loginUser(e)} text='Log in'/>
        <p className="mt-8 px-8 text-center text-2x2 text-sm">
            Don't have an account? {""}
            <a href="register" className='text-indigo-800 font-bold hover:text-fuchsia-800'>Sign up</a>
        </p>
      </div>
    </form>
  )
}

export default LoginForm

