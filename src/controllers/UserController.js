const {
  UserOTPService,
  RoleCreateService,
  VerifyOTPService,
  CompleteRegistrationService,
  SaveProfileService,
  ReadProfileService,
  LoginWithPasswordService
} = require("../services/UserController");

exports.CreateRole = async (req, res) => {
  try {
    let { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        status: "fail",
        message: "Role name is required",
      });
    }

    name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

    const result = await RoleCreateService({ name, description });

    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: error.message || "Something went wrong",
    });
  }
};

exports.UserOTP = async (req, res) => {
  let result = await UserOTPService(req);
  return res.status(200).json(result);
};

exports.UserVerifyLoginCustomer = async (req, res) => {
  const result = await VerifyOTPService(req);

  if (result["status"] === "success") {
    let cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: false,
    };
    res.cookie("token", result["token"], cookieOption);
    return res.status(200).json(result);
  } else {
    return res.status(200).json(result);
  }
};

exports.UserLogout = async (req, res) => {
  let cookieOption = {
    expires: new Date(Date.now() - 24 * 6060 * 1000),
    httpOnly: false,
  };
  res.cookie("token", "", cookieOption);
  return res.status(200).json({ status: "success" });
};

exports.CompleteRegistration = async (req, res) => {
  const userId = req.headers.user_id;
  const result = await CompleteRegistrationService(userId, req.body);
  res.status(result.status === "success" ? 200 : 400).json(result);
};

exports.LoginWithPassword = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ status: 'fail', message: 'Email and password are required' });
  }

  const result = await LoginWithPasswordService(email, password);

  if (result.status === 'success') {
    return res.status(200).json(result);
  } else if (result.status === 'fail') {
    return res.status(401).json(result);
  } else {
    return res.status(500).json(result);
  }
};

exports.CreateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

exports.UpdateProfile = async (req, res) => {
  let result = await SaveProfileService(req);
  return res.status(200).json(result);
};

exports.ReadProfile = async (req, res) => {
  let result = await ReadProfileService(req);
  res.status(200).json(result);
};

