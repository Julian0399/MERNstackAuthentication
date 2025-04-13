"use client";

import React, { useState } from "react";
import PasswordInput from "@/app/components/auth/PasswordInput/PasswordInput";
import SendButtom from "@/app/components/auth/SendButtom/SendButtom";
import Link from "next/link";
import { UseUserContext } from "@/context/userContext";
import toast from "react-hot-toast";
import { use } from "react";

interface Props {
  params: Promise<{
    resetPasswordToken: string;
  }>;
}

function page({ params }: Props) {
  const { resetPasswordToken } = use(params);
  const { recoveryPassword } = UseUserContext();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [confimPassword, setConfirmPassword] = useState("");

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setConfirmPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confimPassword) {
      toast.error("Passwords do not match");
      return;
    }
    console.log("Token en handleSubmit:", resetPasswordToken);
    recoveryPassword(resetPasswordToken, password);
  };
  return (
    <main className="auth-page w-full h-full flex items-center justify-center ">
      <form
        action=""
        className="w-full m-8 px-10 py-14 max-w-[520px] rounded-lg bg-white "
      >
        <h1 className="mb-2 text-center text-2xl font-bold">
          {" "}
          Reset Your Password
        </h1>
        <div className="realtive mt-4 flex flex-col">
          <PasswordInput
            label="New Password"
            password={password}
            onChange={handlePasswordChange}
            showPassword={showPassword}
            onClick={handleShowPassword}
          />
          <PasswordInput
            label="Confirm Password"
            password={confimPassword}
            onChange={handleConfirmPassword}
            showPassword={showConfirmPassword}
            onClick={handleShowConfirmPassword}
          />
        </div>
        <div className="">
          <SendButtom onClick={(e) => handleSubmit(e)} text="Reset Password" />
          <h4 className="text-gray-500 mt-4 text-center">
            Back to{" "}
            <Link href="/auth/login" className="text-indigo-800">
              Log in
            </Link>
          </h4>
        </div>
      </form>
    </main>
  );
}

export default page;
