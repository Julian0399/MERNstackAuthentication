"use client";

import { UseUserContext } from "@/context/userContext";

export default function Home() {
  const user = UseUserContext();
  console.log(user);
  return (
    <main></main>
  );
}
