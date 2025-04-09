"use client";

import { UseUserContext } from "@/context/userContext";

export default function Home() {
  const {logoutUser} = UseUserContext();
  return (
    <main className="py-8 mx-40">
      <header className="flex items-center justify-center">
        <h1 className="text-4xl">
          Welcome to my APP
        </h1>
        <div className="flex items-center gap-4">
          <img src="" alt="" />
          <button onClick={logoutUser} className="px-4 py-2 text-white bg-indigo-800 rounded-md hover:bg-indigo-700">
            Log Out
          </button>
        </div>
      </header>
    </main>
  );
}
