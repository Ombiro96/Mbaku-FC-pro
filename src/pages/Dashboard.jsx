import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const auth = useSelector(state => state.auth);
  const user = auth.user;

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.email}</p>
      {/* Add dashboard content here */}
    </div>
  );
};

export default Dashboard;