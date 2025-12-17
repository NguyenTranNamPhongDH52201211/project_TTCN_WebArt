const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

class UserService {
    static async register(data) {
        const existUser = await UserModel.getByEmail(data.user_email);
        if (existUser) {
            throw new Error("Email already exists");
        }
        const passwordHash = await bcrypt.hash(data.passwordHash, 10);

        await UserModel.create({
            user_email: data.user_email,
            user_password_hash: passwordHash,
            user_first_name: data.user_first_name,
            user_last_name: data.user_last_name,
            user_phone: data.user_phone
        });
        return true;
    }

    static async login(user_email, password) {
        const user = await UserModel.getByEmail(user_email);
        if (!user) {
            throw new Error("Invalid eamil or password");
        }

        if (user.user_account_status !== "active") {
            throw new Error("Account is not active");
        }

        const isMatch = await bcrypt.compare(
            password,
            user.user_password_hash
        );
        if (!isMatch) {
            throw new Error("Invalid email or password");
        }

        const token = jwt.sign(
            {
                user_id: user.user_id,
                role: user.user_role_type
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: "1d"
            }
        );
        await UserModel.updateLastLogin(user.user_id);
        return {
            token,
            user: {
                user_id: user.user_id,
                user_email: user.user_email,
                user_first_name: user.user_first_name,
                user_last_name: user.user_last_name,
                user_role_type: user.user_role_type

            }
        }
    }


    static async getById(user_id) {
        const user = await UserModel.getById(user_id);
        if (!user) {
            throw new Error("User not found");
        }

        // không trả password hash
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
