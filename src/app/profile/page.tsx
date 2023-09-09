"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import Image from "next/image";

export default function Page() {
  // Correct the function name to start with a capital letter
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    isVerified: "",
  });

  const onLogout = async () => {
    setIsLoading(true);
    // Display a loading toast while the request is being processed
    const loadingToastId = toast.loading("Logout...");

    try {
      const response = await axios.get("/api/users/logout");

      // update the loading toast to a success toast
      toast.success("Logout successful!", { id: loadingToastId });

      // route to home page
      router.push("/");
    } catch (error: any) {
      // update the loading toast to an error toast
      toast.error(error?.response?.data?.error, {
        id: loadingToastId,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = async () => {
    // Display a loading toast while the request is being processed
    const loadingToastId = toast.loading("Fetching user...");
    try {
      const response = await axios.get("/api/users/me");
      console.log(response);

      setUserData((prev) => ({
        ...prev,
        name: response?.data?.data?.name,
        email: response?.data?.data?.email,
        role: response?.data?.data?.role,
        isVerified: response?.data?.data?.isVerified,
      }));

      toast.dismiss(loadingToastId);
    } catch (error: any) {
      toast.error(error?.response?.data?.error, { id: loadingToastId });
    }
  };

  return (
    <section className="flex flex-col md:pt-12 pt-20 pb-16 min-h-screen w-screen gap-12  items-center">
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
              <button className="absolute hover:opacity-75 right-2.5 top-[50%] bg-[#1cdf26] text-base text-white font-[500] rounded-md px-4 py-2">
                verify
              </button>
            )}
          </div>
          {/* save changes button */}
          <button className="text-gray-600 md:text-lg text-base w-[100%] py-3.5 px-3 transition-all rounded-xl bg-white outline-none disabled:opacity-70 focus:border-gray-500 border-2 mt-6 hover:bg-blue-500 hover:text-white">
            Save Changes
          </button>
        </div>
      </div>

      {/* logout button */}
      <button
        className="fixed hover:opacity-75 disabled:opacity-75 top-6 right-5 py-3 px-8 text-base text-white font-semibold bg-red-500 rounded-md"
        disabled={isLoading}
        onClick={onLogout}
      >
        {isLoading ? "Logout..." : "Logout"}
      </button>
    </section>
  );
}
