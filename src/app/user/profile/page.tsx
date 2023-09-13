"use client";

import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "@/helper/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [isVerifyLoading, setIsVerifyLoading] = useState(false);
  const [isUpdatingLoading, setIsUpdatingLoading] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const [avatar, setAvatar] = useState<File | null>(null);
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

      setUserData((prev) => ({ ...prev, ...response?.data?.data }));

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
        name: userData.name
      });
      toast.success("Updated Changes!", { id: loadingToastId });
    } catch (error: any) { 
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
    <>
      {/* header */}
      <nav className="md:h-[70px] h-[65px] sticky top-0 z-50 bg-white shadow-sm items-center flex md:px-[30px] px-[10px] justify-between">
        <span className="md:text-3xl text-xl text-purple-500 font-[500]">
          Profile
        </span>
        {/* logout button */}
        <button
          className=" hover:opacity-75 disabled:opacity-75   py-3 px-8 text-base text-white font-semibold bg-red-500 rounded-md"
          disabled={isLogoutLoading}
          onClick={onLogout}
        >
          {isLogoutLoading ? "Logout..." : "Logout"}
        </button>
      </nav>
      <section className=" pb-10 py-8 w-screen flex justify-center  min-h-screen overflow-x-hidden">
        {/* main input form */}
        <div className="px-7 flex flex-col gap-7  bg-[#ffffff] rounded-lg md:w-[80%] w-[95%]">
          {/* avatar */}
          <div
            className="w-[70px] cursor-cell h-[70px] mx-auto rounded-full overflow-hidden"
            onClick={() => {
              avatarInputRef.current?.click();
            }}
          >
            <Image
              className="rounded-full"
              src={`${
                avatar
                  ? URL.createObjectURL(avatar)
                  : "https://images.pexels.com/users/avatars/97941/hitesh-choudhary-291.jpeg?auto=compress&fit=crop&h=130&w=130&dpr=1"
              }`}
              width={70}
              height={70}
              alt="avatar"
            />
            <input
              type="file"
              className="hidden"
              ref={avatarInputRef}
              accept="image/*, .png, .jpg, .jpeg"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setAvatar(e.target.files[0]);
                }
              }}
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
                  {isVerifyLoading
                    ? "sending mail..."
                    : "send verification mail"}
                </button>
              )}
            </div>
            {/* save changes button */}
            <button
              className="md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl   outline-none disabled:opacity-70 peer-hover:opacity-60 hover:opacity-70 mt-6 bg-blue-500 text-white"
              disabled={isUpdatingLoading}
              onClick={updateProfile}
            >
              {isUpdatingLoading ? "Updating Changes..." : "Save Changes"}
            </button>
            {/* link */}
            <div className="flex md:justify-between md:w-auto md:flex-row flex-col w-[100%] justify-center items-center gap-1">
              <Link
                className="text-red-500 text-base font-semibold p-1"
                href="/auth/password/change"
              >
                <button>Change Password</button>
              </Link>
              <div className="md:h-6 md:w-[1px] bg-gray-200 w-[100%] h-[1px] "></div>
              <Link
                className="text-red-500 text-base font-semibold p-1"
                href="/auth/password/forgot"
              >
                <button>Forgot Password</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
