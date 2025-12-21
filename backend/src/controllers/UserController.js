const UserService= require("../services/UserServices");

class UserController {

  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: 'Failed to get users'
      });
    }
  }

  
  static async getById(req, res) {
    try {
      const { id } = req.params;

      const user = await UserService.getById(id);

      return res.status(200).json({
        data: user
      });
    } catch (error) {
      return res.status(404).json({
        message: error.message
      });
    }
  }

  
  static async updateProfile(req, res) {
    try {
      const { id } = req.params;

      await UserService.updateProfile(id, req.body);

      return res.status(200).json({
        message: "Update profile successfully"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  
  static async changePassword(req, res) {
    try {
      const { id } = req.params;
      const { oldPassword, newPassword } = req.body;

      await UserService.changePassword(id, oldPassword, newPassword);

      return res.status(200).json({
        message: "Change password successfully"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

 
  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      await UserService.updateStatus(id, status);

      return res.status(200).json({
        message: "Update status successfully"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

 
  static async updateRole(req, res) {
    try {
      const { id } = req.params;
      const { role } = req.body;

      await UserService.updateRole(id, role);

      return res.status(200).json({
        message: "Update role successfully"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

 
  static async deactivate(req, res) {
    try {
      const { id } = req.params;

      await UserService.deactivate(id);

      return res.status(200).json({
        message: "User deactivated successfully"
      });
    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
}

module.exports = UserController;
