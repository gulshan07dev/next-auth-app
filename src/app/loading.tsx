"use client"

import React from 'react'
import { InfinitySpin } from 'react-loader-spinner';

export default function loading() {
  return (
    <div className="h-screen w-screen flex justify-center items-center text-3xl text-gray-700 font-semibold">
      <InfinitySpin width="200" color="#4fa94d" />
    </div>
  );
}
