// frontend/src/features/Admin/pages/UserDetail.js
import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserDetailPage.css';

const UserDetail = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    user_first_name: '',
    user_last_name: '',
    user_phone: '',
    user_role_type: '',
    user_account_status: ''
  });

  // Fetch user details
  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const fetchUserDetail = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}`, {
        credentials: 'include' // Thay thế vớiCredentials: true
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Giả định API trả về { success: true, data: {...} } hoặc tương tự
      const userData = data.data || data;
      
      setUser(userData);
      setFormData({
        user_first_name: userData.user_first_name || '',
        user_last_name: userData.user_last_name || '',
        user_phone: userData.user_phone || '',
        user_role_type: userData.user_role_type || 'customer',
        user_account_status: userData.user_account_status || 'active'
      });
    } catch (err) {
      console.error('Fetch user detail error:', err);
      setError('Không thể tải thông tin người dùng');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Update profile (name, phone)
      await fetch(`http://localhost:3000/api/user/${id}/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          user_first_name: formData.user_first_name,
          user_last_name: formData.user_last_name,
          user_phone: formData.user_phone
        })
      });

      // Update role nếu thay đổi
      if (formData.user_role_type !== user.user_role_type) {
        await fetch(`http://localhost:3000/api/user/${id}/role`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ role: formData.user_role_type })
        });
      }

      // Update status nếu thay đổi
      if (formData.user_account_status !== user.user_account_status) {
        await fetch(`http://localhost:3000/api/user/${id}/status`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ status: formData.user_account_status })
        });
      }

      alert('Cập nhật thành công!');
      setIsEditing(false);
      fetchUserDetail(); // Refresh data
    } catch (err) {
      console.error('Save user error:', err);
      alert('Cập nhật thất bại: ' + (err.message || 'Unknown error'));
    }
  };

  const handleDeactivate = async () => {
    if (!window.confirm('Bạn có chắc muốn vô hiệu hóa tài khoản này?')) return;
    
    try {
      const res = await fetch(`http://localhost:3000/api/user/${id}/deactivate`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      
      alert('Đã vô hiệu hóa tài khoản');
      navigate('/admin/users');
    } catch (err) {
      console.error('Deactivate user error:', err);
      alert('Vô hiệu hóa thất bại: ' + err.message);
    }
  };

  if (loading) return <div className="loading">Đang tải...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!user) return <div>Không tìm thấy người dùng</div>;

  return (
    <div className="user-detail-container">
      <div className="header-actions">
        <Link to="/userpage" className="back-btn">
          ← Quay lại danh sách
        </Link>
        <div className="action-buttons">
          {!isEditing ? (
            <button onClick={() => setIsEditing(true)} className="edit-btn">
              Chỉnh sửa
            </button>
          ) : (
            <>
              <button onClick={handleSave} className="save-btn">
                Lưu thay đổi
              </button>
              <button onClick={() => {
                setIsEditing(false);
                setFormData({
                  user_first_name: user.user_first_name || '',
                  user_last_name: user.user_last_name || '',
                  user_phone: user.user_phone || '',
                  user_role_type: user.user_role_type,
                  user_account_status: user.user_account_status
                });
              }} className="cancel-btn">
                Hủy
              </button>
            </>
          )}
          <button onClick={handleDeactivate} className="deactivate-btn">
            Vô hiệu hóa
          </button>
        </div>
      </div>

      <div className="user-detail-card">
        <div className="user-header">
          <h2>Thông tin người dùng </h2>
          <div className={`status-badge ${user.user_account_status}`}>
            {user.user_account_status === 'active' ? 'Đang hoạt động' : 'Đã vô hiệu hóa'}
          </div>
        </div>

        <div className="user-info-grid">
          {/* Thông tin cơ bản */}
          <div className="info-section">
            <h3>Thông tin cơ bản</h3>
            
            <div className="info-row">
              <label>Email:</label>
              <div className="info-value">{user.user_email}</div>
            </div>

            <div className="info-row">
              <label>Họ và tên:</label>
              {isEditing ? (
                <div className="edit-fields">
                  <input
                    type="text"
                    name="user_first_name"
                    value={formData.user_first_name}
                    onChange={handleInputChange}
                    placeholder="Họ"
                    className="name-input"
                  />
                  <input
                    type="text"
                    name="user_last_name"
                    value={formData.user_last_name}
                    onChange={handleInputChange}
                    placeholder="Tên"
                    className="name-input"
                  />
                </div>
              ) : (
                <div className="info-value">
                  {user.user_first_name} {user.user_last_name}
                </div>
              )}
            </div>

            <div className="info-row">
              <label>Số điện thoại:</label>
              {isEditing ? (
                <input
                  type="text"
                  name="user_phone"
                  value={formData.user_phone}
                  onChange={handleInputChange}
                  className="edit-input"
                />
              ) : (
                <div className="info-value">{user.user_phone || 'Chưa có'}</div>
              )}
            </div>

            <div className="info-row">
              <label>Ngày tạo:</label>
              <div className="info-value">
                {new Date(user.user_created_at).toLocaleString('vi-VN')}
              </div>
            </div>

            <div className="info-row">
              <label>Lần đăng nhập cuối:</label>
              <div className="info-value">
                {user.user_last_login 
                  ? new Date(user.user_last_login).toLocaleString('vi-VN')
                  : 'Chưa đăng nhập'
                }
              </div>
            </div>
          </div>

          {/* Thông tin tài khoản */}
          <div className="info-section">
            <h3>Thông tin tài khoản</h3>
            
            <div className="info-row">
              <label>Vai trò:</label>
              {isEditing ? (
                <select
                  name="user_role_type"
                  value={formData.user_role_type}
                  onChange={handleInputChange}
                  className="edit-select"
                >
                  <option value="customer">Khách hàng</option>
                  <option value="admin">Quản trị viên</option>
                  <option value="staff">Nhân viên</option>
                </select>
              ) : (
                <div className="info-value">
                  <span className={`role-badge ${user.user_role_type}`}>
                    {user.user_role_type === 'admin' ? 'Quản trị viên' : 
                     user.user_role_type === 'staff' ? 'Nhân viên' : 'Khách hàng'}
                  </span>
                </div>
              )}
            </div>

            <div className="info-row">
              <label>Trạng thái:</label>
              {isEditing ? (
                <select
                  name="user_account_status"
                  value={formData.user_account_status}
                  onChange={handleInputChange}
                  className="edit-select"
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Đã vô hiệu hóa</option>
                  <option value="suspended">Tạm khóa</option>
                  <option value="pending">Chờ xác nhận</option>
                </select>
              ) : (
                <div className="info-value">
                  <span className={`status-text ${user.user_account_status}`}>
                    {user.user_account_status === 'active' ? '✅ Đang hoạt động' :
                     user.user_account_status === 'inactive' ? '❌ Đã vô hiệu hóa' :
                     user.user_account_status === 'suspended' ? '⚠️ Tạm khóa' :
                     '⏳ Chờ xác nhận'}
                  </span>
                </div>
              )}
            </div>

            <div className="info-row">
              <label>Xác thực email:</label>
              <div className="info-value">
                {user.user_email_verified ? '✅ Đã xác thực' : '❌ Chưa xác thực'}
              </div>
            </div>
          </div>
        </div>

        {/* Thông tin thống kê (nếu có) */}
        <div className="stats-section">
          <h3>Thống kê</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-label">Tổng đơn hàng</div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Tổng chi tiêu</div>
              <div className="stat-value">0 ₫</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Đơn hàng gần nhất</div>
              <div className="stat-value">Chưa có</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;