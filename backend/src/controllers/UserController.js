const userService = require('../services/UserServices');

class UserController {

  // POST /users/register
  async register(req, res) {
    try {
      const {
        user_email,
        user_password,
        user_first_name,
        user_last_name,
        user_phone
      } = req.body;

      if (!user_email || !user_password) {
        return res.status(400).json({
          message: 'Email và password là bắt buộc'
        });
      }

      const newUser = await userService.createUser({
        user_email,
        user_password,
        user_first_name,
        user_last_name,
        user_phone
      });

      return res.status(201).json({
        message: 'Tạo tài khoản thành công',
        data: newUser
      });

    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  // GET /users
  async getAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // GET /users/:id
  async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getUserById(id);

      if (!user) {
        return res.status(404).json({
          message: 'Không tìm thấy user'
        });
      }

      return res.json(user);

    } catch (error) {
      return res.status(500).json({
        message: error.message
      });
    }
  }

  // PUT /users/:id
  async update(req, res) {
    try {
      const { id } = req.params;
      const {
        user_first_name,
        user_last_name,
        user_phone,
        user_account_status
      } = req.body;

      const updated = await userService.updateUser(id, {
        user_first_name,
        user_last_name,
        user_phone,
        user_account_status
      });

      return res.json({
        message: 'Cập nhật user thành công',
        data: updated
      });

    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }

  // DELETE /users/:id
  async delete(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteUser(id);

      return res.json({
        message: 'Xóa user thành công'
      });

    } catch (error) {
      return res.status(400).json({
        message: error.message
      });
    }
  }
}

module.exports = UserController;
