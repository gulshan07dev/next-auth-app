import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "@/helpers/getDataFromToken";

// init db
connect();

export async function GET(request: NextRequest) {
    try {
      const userId = await getDataFromToken(request);
      const user = await User.findOne({ _id: userId }).select("-password");
      return NextResponse.json({
        mesaaage: "User found",
        data: user,
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
}