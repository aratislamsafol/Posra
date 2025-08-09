const RoleModel = require("../models/Roles");
const UserOTPModel = require("../models/UserOTPModel");
const UserModel = require("../models/User");
const EmailSend = require("../utility/helper/EmailHelper");
const {EncodeToken} = require("../utility/helper/TokenHelper");
const mongoose = require('mongoose');

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


module.exports = {
  UserOTPService,
  RoleCreateService,
  VerifyOTPService,
};
