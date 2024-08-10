'use client';
import { useEffect, useState } from 'react';
import { greet } from '@/utilities/actions/greet';
import Logout from '../user/components/Logout';
import User from '../user/components/User';
import DataTable from './DataTable';

const Dashboard = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const token =
      localStorage.getItem('token') || sessionStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    const checkToken = async () => {
      const res = await greet(token!);
      if (!res.successfull) {
        window.location.href = '/login';
      }
      setUser(res.username!);
    };
    checkToken();
  }, []);
  return (
    <div>
      <Logout />
      <User user={user} />
      <DataTable />
    </div>
  );
};

export default Dashboard;
