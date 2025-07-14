import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Tractor,
  Wheat,
  Users,
  Landmark,
  LogOut,
} from 'lucide-react';

const Sidebar = ({ role = 'dealer' }) => {
  const commonLinks = 
[
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/mandi', label: 'Mandi Rates', icon: <Landmark size={18} /> },
  ];

  const dealerLinks = [
    { to: '/seeds', label: 'Seeds', icon: <Wheat size={18} /> },
    { to: '/tractors', label: 'Tractors', icon: <Tractor size={18} /> },
  ];

  const adminLinks = [
    { to: '/dealers', label: 'Dealers', icon: <Users size={18} /> },
    { to: '/users', label: 'Users', icon: <Users size={18} /> },
  ];

  const links = [...commonLinks, ...(role === 'admin' ? adminLinks : dealerLinks)];

  return (
    <aside className="w-64 bg-white border-r h-screen p-4 space-y-6 shadow-lg">
      <h2 className="text-xl font-bold text-green-600">🌾 Kisan App</h2>
      <nav className="space-y-2">
        {links.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
                isActive ? 'bg-green-100 text-green-700' : 'text-gray-700 hover:bg-gray-100'
              }`
            }
          >
            {icon} <span>{label}</span>
          </NavLink>
        ))}

        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-100 rounded-xl w-full"
        >
          <LogOut size={18} /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
