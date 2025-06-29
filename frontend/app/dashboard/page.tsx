"use client";
import UserHeader from '@/component/user/header';
import AdminHeader from '@/component/admin/header';
import SuperadminHeader from '@/component/superadmin/header';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/store';
import { useEffect } from 'react';
import axios from 'axios';

export default function DashboardPage() {
  const { email, role, name } = useSelector((state: RootState) => state.auth);

  const renderHeader = () => {
    if (role === 'admin') return <AdminHeader />;
    if (role === 'superadmin') return <SuperadminHeader />;
    return <UserHeader />;
  };
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get('/api/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log('User Info:', response.data); // or dispatch to Redux here
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      }
    };
  
    fetchUser();
  }, []);

  return (
    <div>
      {renderHeader()}
      <p>User: {name}</p>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}
