"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
// import { axios } from "axios";

export default function SignupPage(): React.JSX.Element {
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",

    // const onSignup = async () => {
    //     axios.post()
    // }
  });
  return (
    <section className="flex flex-col gap-4 pt-12 h-screen w-screen bg-gray-950   items-center">
      <h1 className="text-4xl text-white font-semibold  p-5">Signup Page</h1>
      <div className="py-14 px-5 flex flex-col gap-6 bg-black border-2 border-purple-700 rounded-lg max-w-[500px]  w-[97%]">
        {/* name */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label htmlFor="name">Full Name</label>
          <input
            className="  text-black text-base w-[100%] py-2 px-2 rounded-md bg-white outline-none"
            type="text"
            id="name"
            placeholder="Enter your name..."
            onChange={(e) => setUser({...user, username: e.target.value})}
          />
        </div>
        {/* email */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label htmlFor="email">Email</label>
          <input
            className="  text-black text-base w-[100%] py-2 px-2 rounded-md bg-white outline-none"
            type="email"
            id="email"
            placeholder="Enter your email..."
            onChange={(e) => setUser({...user, email: e.target.value})}
          />
        </div>

        {/* password */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label htmlFor="password">Password</label>
          <input
            className="  text-black text-base w-[100%] py-2 px-2 rounded-md bg-white outline-none"
            type="password"
            id="password"
            placeholder="Enter your password..."
            onChange={(e) => setUser({...user, password: e.target.value})}
          />
        </div>

        {/* submit btn */}
        <button className="bg-blue-600 text-base font-semibold my-3 hover:opacity-75 text-white p-3 rounded-md w-[100%]"
        // onClick={onSignup}
        >
          Signup
        </button>

        <div>
          <span className="text-gray-400 text-sm font-medium">
            if you have already account?{" "}
          </span>
           <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </section>
  );
}
