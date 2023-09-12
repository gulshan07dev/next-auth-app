import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helper/getDataFromToken";

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

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name } = reqBody;
    const userId = getDataFromToken(request);

    await User.findByIdAndUpdate(
      userId,
      { $set: { name: name } },
      {
        runValidators: true,
      }
    ); 

    return NextResponse.json(
      { message: "Successful Update Profile", success: true },
      { status: 200 }
    );
  } catch (error: any) { 
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
