"use client";
import { UseUserContext } from "@/context/userContext";
import React, { useState } from "react";
import EmailInput from "../EmailInput/EmailInput";
import SendButtom from "../SendButtom/SendButtom";

function ForgotPasswordForm() {
  const { forgotPassword } = UseUserContext();

  const [email, setEmail] = useState("");

  const handleEmailChange = (email: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(email.target.value);
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      forgotPassword(email);
    }
  }
  return (
  <form className="w-full m-8 px-10 py-14 max-w-[520px] rounded-lg bg-white ">
    <h1 className="text-2xl font-bold text-center mb-4">Forgot Password</h1>
    <p className="text-left ">
      Email to send reset instructions to
    </p>
    <div className="mb-2">
      <EmailInput email={email} onChange={handleEmailChange} />
    </div>
    <SendButtom text="Send" onClick={handleSubmit}/>
    <h4 className="text-gray-500 mt-4 text-center">Back to <a href="/auth/login" className="text-indigo-800">Log in</a></h4>
  </form>
  )
}

export default ForgotPasswordForm;
