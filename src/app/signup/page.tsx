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
    <section className="flex flex-col pt-12 min-h-screen w-screen bg-gray-950 overflow-x-hidden  items-center">
      {/* header */}
      <header className="relative before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute  z-[0] after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] ">
        <h1 className="text-5xl p-2 text-yellow-500 font-semibold text-center z-[10]">
          <span className="text-purple-500">Signup</span> Page
        </h1>
      </header>

      {/* main input form */}
      <form
        autoComplete="off"
        className="py-14 px-5 flex flex-col gap-6 bg-[#00000018] backdrop-blur-sm  border-purple-700 rounded-lg max-w-[500px]  w-[97%]"
      >
        {/* name */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="fullname"
            className='text-2xl text-white font-medium after:content-["*"] after:text-red-400'
          >
            Full Name
          </label>
          <input
            className="text-white md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl dark:bg-neutral-800/50 outline-none focus:dark:bg-neutral-800/30 focus:border-gray-500 border-2 border-blue-800"
            type="text"
            id="fullname"
            placeholder="Enter your fullname..."
            onChange={(e) => setUser({ ...user, username: e.target.value })}
          />
        </div>

        {/* email */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="email"
            className='text-2xl text-white font-medium after:content-["*"] after:text-red-400'
          >
            Email
          </label>
          <input
            className="text-white md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl dark:bg-neutral-800/50 outline-none focus:dark:bg-neutral-800/30 focus:border-gray-500 border-2 border-blue-800"
            type="email"
            id="email"
            placeholder="Enter your email..."
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </div>

        {/* password */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="password"
            className='text-2xl text-white font-medium after:content-["*"] after:text-red-400'
          >
            Password
          </label>
          <input
            className="text-white md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl dark:bg-neutral-800/50 outline-none focus:dark:bg-neutral-800/30 focus:border-gray-500 border-2 border-blue-800"
            type="password"
            id="password"
            placeholder="Enter your password..."
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {/* submit btn */}
        <button className="bg-blue-600 text-base font-semibold my-3 hover:opacity-75 text-white p-3 rounded-xl w-[100%]">
          Signup
        </button>

        <div>
          <span className="text-gray-400 text-sm font-medium">
            if you have already account?{" "}
          </span>
          <Link href={"/login"}>Login</Link>
        </div>
      </form>
    </section>
  );
}
