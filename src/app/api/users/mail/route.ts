import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// init db
connect();

export async function POST(request: NextRequest) {
  try { 
    const { email, emailType } = await request.json();

    // check if user does'nt pass email
    if (!email) {
      return NextResponse.json(
        { error: "Email is required", success: false },
        { status: 400 }
      );
    }

    // check if user not exist with this email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not registered with this email!", success: false },
        { status: 400 }
      );
    }

    await sendEmail({ email, emailType, userId: user?._id });
    return NextResponse.json(
      {
        success: true,
        message: "Mail send successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to send the mail",
      },
      { status: 500 }
    );
  }
}
