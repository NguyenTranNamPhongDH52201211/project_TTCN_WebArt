const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

class UserService {
  static async getAll(){
    return await UserModel.getAll();
  }

  static async getById(user_id) {
    const user = await UserModel.getById(user_id);
    if (!user) {
      throw new Error("User not found");
    }

    delete user.user_password_hash;
    return user;
  }


  static async updateProfile(user_id, data) {
    const success = await UserModel.updateProfile(user_id, data);
    if (!success) {
      throw new Error("Update profile failed");
    }
    return true;
  }


  static async changePassword(user_id, oldPassword, newPassword) {
    const user = await UserModel.getById(user_id);
    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
      oldPassword,
      user.user_password_hash
    );
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    const newHash = await bcrypt.hash(newPassword, 10);
    await UserModel.updatePassword(user_id, newHash);

    return true;
  }

 
  static async updateStatus(user_id, status) {
    const success = await UserModel.updateStatus(user_id, status);
    if (!success) {
      throw new Error("Update status failed");
    }
    return true;
  }

  
  static async updateRole(user_id, role) {
    const success = await UserModel.updateRole(user_id, role);
    if (!success) {
      throw new Error("Update role failed");
    }
    return true;
  }

  static async deactivate(user_id) {
    const success = await UserModel.deactivate(user_id);
    if (!success) {
      throw new Error("Deactivate user failed");
    }
    return true;
  }
}

module.exports = UserService;
