const RoleModel = require("../models/Roles");
const UserModel = require("../models/User");
const mongoose = require("mongoose");

exports.CheckRole = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const user_id = req.headers.user_id;
      const user = await UserModel.findById(user_id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const role = await RoleModel.findById(user.role_id);
      if (!role) return res.status(404).json({ message: "Role not found" });

      const roleName = role.name.toLowerCase();
      req.userRole = roleName;
      req.user = user;

      if (!allowedRoles.includes(roleName)) {
        return res.status(403).json({ message: `Forbidden: Role ${roleName}` });
      }

      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  };
};
