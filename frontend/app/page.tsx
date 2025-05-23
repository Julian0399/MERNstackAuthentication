"use client";

import { UseUserContext } from "@/context/userContext";
import useRedirect from "@/hooks/useUserRedirect";
import { useState } from "react";
import ChangePasswordForm from "./components/auth/ChangePasswordForm/ChangePasswordForm";

export default function Home() {
  useRedirect("/auth/login");
  const {
    logoutUser,
    user,
    handleUserInput,
    userState,
    updateUser,
    emailVerification,
    allUsers,
    deleteUser,
  } = UseUserContext();
  const { name, photo, isVerified, bio } = user;
  console.log(photo);
  const [isOpen, setIsOpen] = useState(false);

  const myToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <main className="py-8 mx-40">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome to my APP <span className="text-indigo-800">{name}</span>
        </h1>
        <div className="flex items-center gap-4">
          <img
            src={photo}
            alt={`${name}'s profile picture`}
            className="w-12 h-12 rounded-full border-2 border-indigo-800"
          />
          {!isVerified && (
            <button
              className="px-4 py-2 bg-indigo-500 text-white rounded-md"
              onClick={() => emailVerification()}
            >
              Verify Account
            </button>
          )}
          <button
            onClick={logoutUser}
            className="px-4 py-2 text-white bg-indigo-800 rounded-md hover:bg-indigo-700"
          >
            Log Out
          </button>
        </div>
      </header>
      <section>
        <p className="text-gray-600 text-[2rem] ">{bio}</p>
        <h1>
          <button
            onClick={myToggle}
            className="px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-700"
          >
            Update Bio
          </button>
        </h1>
        {isOpen && (
          <form action="" className="mt-4 min-w-10 max-w-sm w-full ">
            <div className="flex flex-col gap-4 mt-4">
              <label htmlFor="bio" className="mb-1 text-gray-600">
                Bio
              </label>
              <textarea
                name="bio"
                defaultValue={bio}
                onChange={(e) => handleUserInput("bio")(e)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => updateUser(e, { bio: userState.bio })}
              className="mt-4  px-4 py-2 bg-indigo-800 text-white rounded-md hover:bg-indigo-700"
            >
              Update Bio
            </button>
          </form>
        )}
      </section>
      <div className="flex gap-6 mt-6">
        <div className="flex-1">
          <ChangePasswordForm />
        </div>
        <div className="flex-1">
          {
            <ul>
              {allUsers.map((user: any) => (
                user.role !== "admin" && (
                  <li
                  key={user._id}
                  className="p-1 grid grid-cols-4 gap-4 border border-gray-300 items-center rounded-md mb-4"
                >
                  <img
                    src={user.photo}
                    alt={`${user.name}'s profile picture`}
                    className="w-12 h-12 rounded-full border-2 border-indigo-800"
                  />
                  <p className="text-black">{user.name}</p>
                  <p className="text-gray-500">{user.bio}</p>
                  <button className="text-red-500" onClick={() => deleteUser(user._id)}>
                    <i className="fas fa-trash text-red-500"></i>
                    Delete User
                  </button>
                </li>
                )
              ))}
            </ul>
          }
        </div>
      </div>
    </main>
  );
}
