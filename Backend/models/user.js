import mongoose , { Schema } from "mongoose";

const userSchema = new Schema ({
    email: {
        type: String,
        required: true,
        trim: true,
        lowerCase: true,
    },
    password: {type: String, required: true, select: false},
    name: { type:String, required:true, trim: trim },
    profilePicture: { type:String },
    isEmailVerified: { type:Boolean, default:false},
    lastLogin:{type:Data},
    is2FEnabled: { type:String, select: false },
    twoFAOtp:{ type:Data, select:false },
    twoFAOtpExpires: { type:Data, select:false },
},
{timestamp: true}
);

const User = mongoose.model("User", userSchema);


export default User;