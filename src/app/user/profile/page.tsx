"use client";

import React, { useEffect, useState } from "react";
import axiosInstance from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import { sendEmail } from "@/helper/mailer";
import Link from "next/link";

export default function profilePage() {
  const router = useRouter();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    isVerified: "",
  });

  // handle logout
  const onLogout = async () => {
    setIsLogoutLoading(true);
    const loadingToastId = toast.loading("Logout...");

    try {
      const response = await axiosInstance.get("/api/users/logout");

      toast.success("Logout successful!", { id: loadingToastId });

      router.push("/");
    } catch (error: any) {
      toast.error(error?.response?.data?.error, {
        id: loadingToastId,
      });
    } finally {
      setIsLogoutLoading(false);
    }
  };

  // get user initially
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    const loadingToastId = toast.loading("Fetching user...");
    try {
      const response = await axiosInstance.get("/api/users/me");

      setUserData(response?.data?.data);

      toast.dismiss(loadingToastId);
    } catch (error: any) {
      toast.error(error?.response?.data?.error, { id: loadingToastId });
    }
  };

  // handle update profile
  const updateProfile = async () => {
    setIsUpdatingLoading(true);
    const loadingToastId = toast.loading("Updating changes...");
    try {
      const response = await axiosInstance.put("/api/users/me", {
        name: userData?.name,
      });

      toast.success("Updated Changes!", { id: loadingToastId });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.error, { id: loadingToastId });
    } finally {
      setIsUpdatingLoading(false);
    }
  };

  // handle send verification email
  const sendVerificationEmail = async () => {
    const loadingToastId = toast.loading("Sending Verification email...");
    setIsVerifyLoading(true);
    try {
      const response = await axiosInstance.post("/api/users/mail", {
        email: userData?.email,
        emailType: "VERIFY",
      });

      toast.success("Verification mail send successful", {
        id: loadingToastId,
      });
    } catch (error: any) {
      toast.error(error?.response?.data?.message, { id: loadingToastId });
    } finally {
      setIsVerifyLoading(false);
    }
  };

  return (
    <section className="flex flex-col md:pt-12 pt-10 overflow-y-scroll pb-16 h-screen w-screen gap-12  items-center overflow-x-hidden">
      {/* header */}
      <header className="relative flex flex-col gap-3 place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute z-[0] after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-3xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] ">
        <h1 className="md:text-5xl text-4xl text-orange-500 p-1 font-semibold text-center z-[2]">
          Welcome To,
        </h1>

        <h2 className="md:text-5xl text-4xl text-purple-600 p-1 font-semibold text-center z-[2]">
          <span className="text-gray-800">Your</span> Profile
        </h2>
      </header>

      {/* main input form */}
      <div className="py-8 px-7 flex flex-col gap-4 md:justify-between justify-center bg-[#00000018] backdrop-blur-sm border-purple-700 rounded-lg md:w-[80%] w-[90%]">
        {/* avatar */}
        <div className="w-[70px] h-[70px] m-auto rounded-full overflow-hidden">
          <Image
            className="rounded-full"
            src={`https://images.pexels.com/users/avatars/97941/hitesh-choudhary-291.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1`}
            width={70}
            height={70}
            alt="avatar"
          />
        </div>

        <div className=" flex w-[100%] md:justify-between justify-center flex-wrap gap-5">
          {/* name */}
          <div className="flex flex-col gap-1.5 md:w-[48%] w-[100%]">
            <label
              htmlFor="fullname"
              className='text-xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
            >
              Full Name
            </label>
            <input
              className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-white outline-none focus:border-gray-500 border-2"
              type="text"
              id="fullname"
              placeholder="Enter your fullname..."
              value={userData?.name || ""}
              onChange={(e) => {
                setUserData((prev) => ({ ...prev, name: e.target.value }));
              }}
              required
            />
          </div>
          {/* email */}
          <div className="flex flex-col gap-1.5 md:w-[48%] w-[100%]">
            <label
              htmlFor="fullname"
              className='text-xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
            >
              Email
            </label>
            <input
              className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-white outline-none disabled:opacity-70 focus:border-gray-500 border-2"
              disabled={true}
              type="email"
              value={userData?.email || ""}
              readOnly
              id="email"
            />
          </div>
          {/* role */}
          <div className="flex flex-col gap-1.5 md:w-[48%] w-[100%]">
            <label
              htmlFor="role"
              className='text-xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
            >
              Role
            </label>
            <input
              className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-white outline-none disabled:opacity-70 focus:border-gray-500 border-2"
              disabled={true}
              type="text"
              value={userData?.role || ""}
              readOnly
              id="role"
            />
          </div>
          {/* isVerified */}
          <div className="flex flex-col relative gap-1.5 md:w-[48%] w-[100%]">
            <label
              htmlFor="isVerified"
              className='text-xl text-gray-900 font-medium after:content-["*"] after:text-red-400'
            >
              isVerified
            </label>
            <input
              className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-white outline-none disabled:opacity-70 focus:border-gray-500 border-2"
              disabled={true}
              type="text"
              value={`${userData?.isVerified?.toString() || ""} ${
                userData?.isVerified ? "✅" : "❌"
              }`}
              readOnly
              id="isVerified"
            />
            {!userData?.isVerified && (
              <button
                className="absolute hover:opacity-75 disabled:opacity-75 right-2.5 top-[50%]
                bg-[#1cdf26] text-base text-white font-[500] rounded-md
                 px-4 py-2"
                disabled={isVerifyLoading}
                onClick={sendVerificationEmail}
              >
                {isVerifyLoading ? "sending mail..." : "send verification mail"}
              </button>
            )}
          </div>
          {/* save changes button */}
          <button
            className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-white outline-none disabled:opacity-70 focus:border-gray-500 border-2 mt-6 hover:bg-blue-500 hover:text-white"
            disabled={isUpdatingLoading}
            onClick={updateProfile}
          >
            {isUpdatingLoading ? "Updating Changes..." : "Save Changes"}
          </button>
          <Link
            className="text-red-500 text-base font-semibold p-3"
            href="/auth/password/reset"
          >
            <button>Change Password</button>
          </Link>
          <Link
            className="text-red-500 text-base font-semibold p-3"
            href="/auth/password/forgot"
          >
            <button>Forgot Password</button>
          </Link>
        </div>
      </div>

      {/* logout button */}
      <button
        className="fixed hover:opacity-75 disabled:opacity-75 top-6 right-5 py-3 px-8 text-base text-white font-semibold bg-red-500 rounded-md"
        disabled={isLogoutLoading}
        onClick={onLogout}
      >
        {isLogoutLoading ? "Logout..." : "Logout"}
      </button>
    </section>
  );
}
