import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide a username"], 
        minLength: [3, "Name should be at least 3 char"]
    },
    email: {
        type: String,
        require: [true, "Please provide a email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [4, 'Password must be at least 4 character']
    },
    avatar: {
        public_id: {
            type: String
        },
        secure_url: {
            type: String
        }
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'USER',
        enum: ["USER", "ADMIN"]
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date
}, { timestamps: true })

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;