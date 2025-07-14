// File: src/layouts/DashboardLayout.jsx

import Sidebar from '../components/Sidebar';

const DashboardLayout = ({ children }) => {
  const role = localStorage.getItem('role') || 'dealer'; // you can improve this later

  return (
    <div className="flex">
      <Sidebar role={role} />
      <main className="flex-1 p-4 bg-gray-50 min-h-screen">{children}</main>
    </div>
  );
};

export default DashboardLayout;
