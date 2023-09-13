import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from 'bcryptjs';
import { connect } from "@/dbConfig/dbConfig";

// init db
connect();

export async function POST(request: NextRequest, { params }: any) {
  try {
    const { newPassword } = await request.json();
    const { token } = params;

    // check field
    if (!newPassword) {
      return NextResponse.json(
        { error: "New password is required to reset password" },
        { status: 400 }
      );
    }

    // check token is valid or not
    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Token Expire, send new url" },
        { status: 400 }
      );
    }

    // reset the password with new password and save in db
     const salt = await bcryptjs.genSalt(10);
     const changedPassword = await bcryptjs.hash(newPassword, salt);
     user.password = changedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordExpiry = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Password reset successfully!" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
