"use client";

import React, { useState } from "react";
import Link from "next/link";
import axiosInstance from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function ChangePasswordPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  //   handle forgot password
  const onChangePassword = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingToastId = toast.loading("changing...");

    try {
      const response = await axiosInstance.post("/api/users/password/change", {
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully", {
        id: loadingToastId,
      });
    } catch (error: any) { 
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
      <header className="relative flex flex-col gap-3 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute  z-[0] after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ffa4] after:dark:opacity-40 before:lg:h-[360px] ">
        <h1 className="md:text-5xl text-4xl text-orange-500 p-1 font-semibold text-center z-[2]">
          change Your,
        </h1>

        <h2 className="md:text-5xl text-4xl text-gray-800 p-1 font-semibold text-center z-[2]">
          <span className="text-purple-600"></span>Password
        </h2>
      </header>

      {/* main input form */}
      <form
        autoComplete="off"
        onSubmit={onChangePassword}
        className="py-12 px-7 flex flex-col gap-6 bg-transparent backdrop-blur-lg  border-purple-700 rounded-lg max-w-[500px]  w-[95%]"
      >
        {/* old password */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="oldPassword"
            className='text-xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
          >
            Old Password
          </label>
          <input
            className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-gray-50 outline-none focus:dark:bg-white focus:border-gray-500 border-2  "
            type="password"
            id="oldPassword"
            placeholder="Enter old password..."
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        {/* new password */}
        <div className="flex flex-col gap-1.5 w-[100%]">
          <label
            htmlFor="newPassword"
            className='text-xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
          >
            New Password
          </label>
          <input
            className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-gray-50 outline-none focus:dark:bg-white focus:border-gray-500 border-2  "
            type="password"
            id="newPassword"
            placeholder="Enter new password..."
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>

        {/* submit btn */}
        <button
          className="bg-blue-600 text-base disabled:opacity-75 font-semibold my-3 hover:opacity-75 text-white p-3 rounded-xl w-[100%]"
          disabled={isLoading}
        >
          {isLoading ? "changing password..." : "change password"}
        </button>

        <div>
          <span className="text-gray-600 text-base font-medium">
            Back to Profile?{" "}
          </span>
          <Link href={"/user/profile"} className="text-blue-600 font-[500]">
            Profile
          </Link>
        </div>
      </form>
    </section>
  );
}
