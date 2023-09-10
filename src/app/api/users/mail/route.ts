import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helper/mailer";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// init db
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, emailType } = reqBody;

    // check if user not exist
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid details",
          success: false,
        },
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
    console.log(error);
    
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send the mail",
      },
      { status: 400 }
    );
  }
}
