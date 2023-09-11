"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignupPage(): React.JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const onSignup = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    // Display a loading toast while the request is being processed
    const loadingToastId = toast.loading("Signing...");

    try {
      const response = await axios.post("/api/users/signup", user);

      // update the loading toast to a success toast
      toast.success("Signup successful!", { id: loadingToastId });

      // route to login
      router.push("/auth/login");
    } catch (error: any) {
      // update the loading toast to an error toast
      toast.error(error?.response?.data?.error, {
        id: loadingToastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col pt-7 min-h-screen w-screen gap-10 pb-5  overflow-x-hidden  items-center">
      {/* header */}
      <header className="relative flex flex-col gap-3 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute  z-[0] after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] ">
        <h1 className="md:text-5xl text-4xl text-gray-800 p-1 font-semibold text-center z-[2]">
          <span className="text-purple-600">Signup</span> Page
        </h1>
      </header>

      {/* main input form */}
      <form
        autoComplete="off"
        onSubmit={onSignup}
        className="py-12 px-7 flex flex-col gap-6 bg-[#00000018] backdrop-blur-sm  border-purple-700 rounded-lg max-w-[500px]  w-[95%]"
      >
        {/* name */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="fullname"
            className='text-2xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
          >
            Full Name
          </label>
          <input
            className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-gray-50 outline-none focus:dark:bg-white focus:border-gray-500 border-2  "
            type="text"
            id="fullname"
            placeholder="Enter your fullname..."
            required
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </div>

        {/* email */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="email"
            className='text-2xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
          >
            Email
          </label>
          <input
            className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-gray-50 outline-none focus:dark:bg-white focus:border-gray-500 border-2  "
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
            className='text-2xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
          >
            Password
          </label>
          <input
            className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-gray-50 outline-none focus:dark:bg-white focus:border-gray-500 border-2  "
            type="password"
            id="password"
            placeholder="Enter your password..."
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </div>

        {/* submit btn */}
        <button
          className="bg-blue-600 text-base disabled:opacity-75 font-semibold my-3 hover:opacity-75 text-white p-3 rounded-xl w-[100%]"
          disabled={isLoading}
        >
          {isLoading ? "Signing..." : "Signup"}
        </button>

        <div>
          <span className="text-gray-600 text-sm font-medium">
            if you have already account?{" "}
          </span>
          <Link href={"/auth/login"} className="text-blue-600 font-[500]">
            Login
          </Link>
        </div>
      </form>
    </section>
  );
}
