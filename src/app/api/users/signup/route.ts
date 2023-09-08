import { connect } from "@/dbConfig/dbConfig"; 
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

// init db
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {username, email, password} = reqBody;

    // check if user already exist  
    const user = await User.findOne({email});
    if(user) {
        return NextResponse.json({ error: "User already exist",  status: 400 });
    }

    // hash the password before storing in db
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create User info instance
    const userInfo = new User({
        username,
        email,
        password: hashedPassword,
    })

    // save user in dbConfig
    await userInfo.save();

    return NextResponse.json({
        message: "User signup successfully",
        success: true,
        userInfo
    })
  } catch (error: any) {
    console.log(error);
    
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
