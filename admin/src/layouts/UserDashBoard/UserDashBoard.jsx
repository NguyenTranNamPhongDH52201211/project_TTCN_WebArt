import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GenericDashboard from "../GenericDashBoard/GenericDashBoard";


const UserDashBoard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const navigate=useNavigate();

  const itemsPerPage = 5;

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const fetchUsers = async () => {
    try {


      setLoading(true);
      const res = await fetch(`http://localhost:3000/api/user?page=${page}&limit=${itemsPerPage}`);
      const result = await res.json();

      const payload = result.data || [];
      const normalized = payload.map(u => ({
        user_id: u.user_id,
        user_email: u.user_email,
        user_full_name: u.user_full_name,
        user_role_type: u.user_role_type,
        user_phone:u.user_phone,
        user_account_status: u.user_account_status,
        user_email_verified: Boolean(u.user_email_verified),
        user_created_at: u.user_created_at,
        user_last_login: u.user_last_login
      }));
      console.log('normalized users:', normalized);
      setUsers(normalized);
      setTotalUsers(result.pagination?.totalItems || 0);
    } catch (err) {
      console.error("Fetch users error:", err);
    } finally {
      setLoading(false);
    }

  }
   const handleView = (row) => {
    
    navigate(`/userdetailpage/${row.user_id}`);
  };

  

  
  const handleDeactivateUser = async (row) => {
    if (!window.confirm(`Ban user "${row.email}"? User will not be able to log in.`)) {
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${row.user_id}/deactivate`,
        { method: "PATCH" }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to deactivate user");
      }

      alert("User deactivated successfully!");
      fetchUsers();

    } catch (error) {
      console.error("Deactivate user error:", error);
      alert(`Failed to deactivate user: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      key: 'user_full_name',
      title: 'Name',
      minWidth: '200px',
      flex: 2,
      sortable: true,
      render: (value) => (
        <div className="user-name">
          {value || 'No name'}
        </div>
      )
    },
    {
      key: 'user_email',
      title: 'Email',
      minWidth: '220px',
      sortable: true
    },
    {
      key: 'user_phone',
      title: 'Phone',
      minWidth: '140px',
      sortable: true,
      render: (value) => value || '—'
    },
    {
      key: 'user_role_type',
      title: 'Role',
      minWidth: '120px',
      sortable: true,
      render: (value) => (
        <span className={`role-badge role-${value}`}>
          {value}
        </span>
      )
    },
    {
      key: 'user_created_at',
      title: 'Created At',
      minWidth: '160px',
      sortable: true,
      render: (value) => {
        if (!value) return '—';
        return new Date(value).toLocaleDateString('vi-VN');
      }
    },
    {
      key: 'user_account_status',
      title: 'Status',
      minWidth: '140px',
      sortable: true,
      render: (value) => (
        <span className={`status-badge status-${value}`}>
          {value}
        </span>
      )
    }
  ];

  return (
    <GenericDashboard
      title="User Management"
      subtitle="Manage user accounts and permissions"
      breadcrumbs={[
        { label: 'Home', path: '/' },
        { label: 'Users' }
      ]}
      titleView="View"
      titleDelete="Deactivate"
      viewPath="/userdetailpage/:id"
      columns={columns}
      data={users}
      idField="user_id"

      actions={{
        view: handleView,
        deactivate: handleDeactivateUser
      }}

      showAddButton={false}

      currentPage={page}
      totalItems={totalUsers}
      itemsPerPage={5}
      onPageChange={setPage}
      
    />

  );

};

export default UserDashBoard;