"use client"

import axios, { AxiosInstance } from "axios"

const axiosInstance: AxiosInstance = axios.create({
    baseURL: process.env.DOMAIN,
    withCredentials: true
})

export default axiosInstance;