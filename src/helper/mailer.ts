import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hased token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const encodedToken = encodeURIComponent(hashedToken);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 min
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 15 * 60 * 1000, // 15 min
      });
    }

     var transport = nodemailer.createTransport({
       host: "sandbox.smtp.mailtrap.io",
       port: 2525, 
       auth: {
         user: process.env.SMTP_USERNAME,
         pass: process.env.SMTP_PASSWORD,
       },
     });


 const mailOptions = {
   from: "gulshan@gmail.com",
   to: email,
   subject:
     emailType === "VERIFY" ? "Verify your email" : "Reset your password",
   html: `<p>${emailType === "VERIFY" ? "Click" : "You can reset"} <a href="${
     process.env.DOMAIN
   }/${
     emailType === "VERIFY" ? "auth/verifyemail" : "password/reset"
   }/${encodedToken}">here</a> to ${
     emailType === "VERIFY" ? "verify your email" : "reset your password"
   }.<br /> <br /> If the link above does not work for some reason, you can copy and paste this link in a new tab: ${
     process.env.DOMAIN
   }/${
     emailType === "VERIFY" ? "auth/verifyemail" : "password/reset"
   }/${encodedToken}.<br /> If you did not request this, please ignore this message.</p>`,
 };



    const mailresponse = await transport.sendMail(mailOptions);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
