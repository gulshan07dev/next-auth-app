"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage({params}: any) { 
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyUserEmail = async () => {
    try {
      const token = decodeURIComponent(params.token);
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
    } catch (error: any) {
      setError(true);
      console.log(error);
    }
  };

  useEffect(() => {
    verifyUserEmail();
  }, [])
  

  return (
    <div className="flex flex-col gap-7 items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl text-[#0fc01d] font-semibold">
        Verify Email ✅...
      </h1>

      {verified && (
        <div className="flex flex-col gap-7">
          <h2 className="text-2xl mt-7 text-orange-600 font-sans font-semibold">Email Verified</h2>
          <Link
            href="/auth/login"
            className="px-8 py-2.5 rounded-md text-base text-white bg-blue-500"
          >
            Login
          </Link>
        </div>
      )}
      {error && (
        <div>
          <h2 className="text-2xl text-red-500 font-[500]">incorrect id ❗</h2>
        </div>
      )}
    </div>
  );
}
