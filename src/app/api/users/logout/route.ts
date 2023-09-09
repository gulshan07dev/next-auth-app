import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// init db
connect();

export async function GET(request: NextRequest) {
    try {
        const response = NextResponse.json({
            message: "Logout successful",
            success: true
        }, {status: 200});

        response.cookies.delete("token");

        return response
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}