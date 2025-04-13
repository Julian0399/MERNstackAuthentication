"use client";
import { UseUserContext } from "@/context/userContext";
import React, { useState } from "react";
import SendButtom from "../SendButtom/SendButtom";
import PasswordInput from "../PasswordInput/PasswordInput";
import Link from "next/link";
import toast from "react-hot-toast";

function ChangePasswordForm() {

  const { changePassword } = UseUserContext();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);


  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  
  const currentPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPassword(e.target.value);

  }

  const newPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentPassword || !newPassword ) {
      toast.error("Please fill in all fields");
      return;
    }
    changePassword(currentPassword, newPassword)
    setCurrentPassword("");
    setNewPassword("");
  }
  return (
    <form
    action=""
    className="ml-0 mt-0 w-full m-8 px-10 py-14 max-w-[520px] rounded-lg bg-white "
  >
    <h1 className="mb-2 text-center text-2xl font-bold">
      {" "}
      Change Your Password
    </h1>
    <div className="realtive mt-4 flex flex-col">
      <PasswordInput
        label="Current Password"
        password={currentPassword}
        onChange={currentPasswordChange}
        showPassword={showPassword}
        onClick={handleShowPassword}
      />
      <PasswordInput
        label="New Password"
        password={newPassword}
        onChange={newPasswordChange}
        showPassword={showConfirmPassword}
        onClick={handleShowConfirmPassword}
      />
    </div>
    <div className="">
      <SendButtom onClick={(e) => handleSubmit(e)} text="Change Password" />
    </div>
  </form>
  )
}

export default ChangePasswordForm;
