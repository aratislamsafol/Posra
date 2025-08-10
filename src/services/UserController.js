const RoleModel = require("../models/Roles");
const UserOTPModel = require("../models/UserOTPModel");
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const EmailSend = require("../utility/helper/EmailHelper");
const {EncodeToken, DecodeToken} = require("../utility/helper/TokenHelper");
const mongoose = require('mongoose');
const UserProfileModel = require("../models/UserProfiles");

const RoleCreateService = async ({ name, description }) => {
  const isExist = await RoleModel.findOne({ name });

  if (isExist) {
    throw new Error("This role Already Exists");
  }

  const role = await RoleModel.create({ name, description });
  return { status: "Success", data: role };
};

const UserOTPService = async (req) => {
  try {
    let email = req.params.email;
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = `Your Verification Code is - ${code}`;
    let EmailSubject = "Email Verification";

    let user = await UserModel.findOne({ email });

    if (user?.isVerified) {
      return { status: "Failed", message: "User is already verified" };
    }
    await EmailSend(email, EmailText, EmailSubject);
    await UserOTPModel.findOneAndUpdate(
      { email: email },
      {
        $set: { otp: code },
        $setOnInsert: { createdAt: new Date() },
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    );

    return { status: "Success", message: "6 Digit OTP has been Send" };
  } catch (err) {
    console.log("Error in UserOTPService:", err);
    return { status: "Fail", message: "Something Went Wrong" };
  }
};

const VerifyOTPService = async (req) => {
  try {
    const { email, otp } = req.body;
    const defaultRoleId = "6894d77976f3c455d6a163da";
    const findUser = await UserOTPModel.findOne({ email, otp });
    if (!findUser) {
      return { status: "fail", message: "Invalid OTP" };
    }

    let user = await UserModel.findOneAndUpdate(
      { email: email },
      { $set: { isVerified: true, role_id: new mongoose.Types.ObjectId(defaultRoleId) } },
      { upsert: true, new: true }
    ).select("_id");

    let token = EncodeToken(email, user._id.toString());

    await UserOTPModel.deleteOne({ email, otp });

    return { status: "success", message: "Valid OTP", token };
  } catch (e) {
    return { status: "failed", message: e.message || "Invalid OTP" };
  }
};


const CompleteRegistrationService = async (userId, data) => {
  try {
    const { name, phone, password } = data;

    if (!name || name.trim().length < 2) {
      return { status: "fail", message: "Name must be at least 2 characters" };
    }

    if (!phone || phone.length < 7 || phone.length > 20) {
      return { status: "fail", message: "Phone number must be between 7 and 20 digits" };
    }
    if (!/^[\d\+\-\s]+$/.test(phone)) {
      return { status: "fail", message: "Phone number format is invalid" };
    }

    if (!password || password.length < 6) {
      return { status: "fail", message: "Password must be at least 6 characters" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // --- Update User ---
    await UserModel.updateOne(
      { _id: userId },
      {
        $set: {
          name: name.trim(),
          phone: phone.trim(),
          password: hashedPassword,
        }
      }
    );

    return { status: "success", message: "Registration completed" };
  } catch (e) {
    return { status: "fail", message: e.message };
  }
};

const SaveProfileService = async (req) => {
  try {
    const user_id = req['headers'].user_id;
  
    if (!user_id) {
      return { status: "fail", message: "User ID not provided" };
    }

    const reqBody = { ...req.body, updatedAt: new Date() };
    const profile = await UserProfileModel.findOneAndUpdate(
      { _id: user_id },
      { $set: reqBody },
      { upsert: true, new: true }
    );

    return { status: "success", message: "Profile saved successfully", data: profile };
  } catch (e) {
    return { status: "fail", message: e.message || "Something went wrong" };
  }
};

const ReadProfileService = async (req) => {
  try {
    let user_id = new mongoose.Types.ObjectId(req.headers.user_id);
    
    let data = await UserModel.aggregate([
      { $match: { _id: user_id } },
      {
        $lookup: {
          from: "userprofiles", 
          localField: "_id",
          foreignField: "_id",
          as: "profile"
        }
      },
      { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } },
      { $project: { password: 0} } 
    ]);

    if (!data.length) {
      return { status: "fail", message: "User not found" };
    }

    return { status: "success", data: data[0] };
  } catch (error) {
    return { status: "error", message: error.message };
  }
};


module.exports = {
  UserOTPService,
  RoleCreateService,
  VerifyOTPService,
  CompleteRegistrationService,
  SaveProfileService,
  ReadProfileService
};
