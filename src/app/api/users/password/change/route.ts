import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/dbConfig/dbConfig";

// init db
connect();

export async function POST(request: NextRequest) {
  try {
    const { oldPassword, newPassword } = await request.json(); 

    // check if any field not fill
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required!" },
        { status: 400 }
      );
    }

    // find user
    const userId = getDataFromToken(request);
    const user = await User.findOne({ _id: userId }); 

    // check old password correct or not
    const isOldPasswordCorrect = await bcryptjs.compare(
      oldPassword,
      user?.password
    ); 

    if (!isOldPasswordCorrect) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 400 }
      );
    }

    // change new password
    const salt = await bcryptjs.genSalt(10);
    const changedPassword = await bcryptjs.hash(newPassword, salt);
    user.password = changedPassword;
    await user.save();

    return NextResponse.json(
      { message: "password change successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
