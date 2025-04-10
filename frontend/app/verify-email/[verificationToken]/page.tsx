"use client";

import { UseUserContext } from "@/context/userContext";
import {use} from "react";

interface Props {
  params: Promise<{
    verificationToken: string
  }>
}
function page({ params }: Props) {
  const { verificationToken } = use(params);
  const {verifyUser } = UseUserContext()
  return (
    <div className="auth-page flex flex-col justify-center items-center min-h-screen ">
      <div className="flex flex-col justify-center items-center p-16 rounded-3xl bg-white">
        <h1 className="text-black text-4xl font-bold">Verify Your Account</h1>
        <h5 className="mb-4">
          You will need to verify your email to complete registration
        </h5>
        <img
          src="/email.png"
          className="w-1/2 mb-6"
          alt="Email received image"
        />
        <div className="flex w-full max-w-sm gap-4">
          <button className="flex-1 px-4 py-2 text-white bg-indigo-800 rounded-md hover:bg-indigo-700"
            onClick={() =>verifyUser(verificationToken) }>
            Verify
          </button>
          <button className="flex-1 px-4 py-2 text-white bg-indigo-800 rounded-md hover:bg-indigo-700">
            Resend Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default page;
