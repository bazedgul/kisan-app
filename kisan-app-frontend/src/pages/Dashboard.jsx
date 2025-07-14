import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  CircleUserRound,
  Tractor,
  PackageSearch,
  Warehouse,
  Users,
} from "lucide-react";
import { useEffect, useState } from 'react';
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import MandiTicker from '../components/MandiTicker';
// import Clock from "react-live-clock";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const { t } = useTranslation();

  const useClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return time.toLocaleTimeString();
};

  // ✅ Mock Data
  const bookingsData = [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 10 },
    { month: "Mar", count: 7 },
    { month: "Apr", count: 12 },
    { month: "May", count: 8 },
  ];
const time = useClock();

  const resourceData = [
    { name: "Seeds", value: 60 },
    { name: "Fertilizers", value: 40 },
  ];

  const activityData = [
    { date: "Week 1", uploads: 2 },
    { date: "Week 2", uploads: 4 },
    { date: "Week 3", uploads: 3 },
    { date: "Week 4", uploads: 5 },
  ];

  const COLORS = ["#34D399", "#60A5FA"];
  // 🔧 Simulated logged-in user (change role: 'admin' or 'dealer')
  const user = {
    name: "Ahmed",
    role: "admin", // or 'dealer'
  };

  // 🔧 Demo stats
  const stats = {
    totalDealers: 12,
    totalBookings: 34,
    totalTractor: 8,
    totalFertilizer: 20,
    totalSeeds: 50,
    myBookings: 5,
    myTractors: 2,
    myFertilizers: 3,
  };

  const StatCard = ({ icon: Icon, label, value }) => (
    <div className="bg-white p-6 rounded-2xl shadow-md flex items-center gap-4">
      <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
        <Icon size={28} />
      </div>
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <motion.div
      className="p-6 min-h-screen bg-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold mb-4 text-primary">
        👋 {t("welcome")}, {user?.name}
      </h1>

      <div>
      <MandiTicker />
      {/* Next: MandiTable here */}
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {user.role === "admin" && (
          <>
            <StatCard
              icon={Users}
              label={t("totalDealers")}
              value={stats.totalDealers}
            />
            <StatCard
              icon={PackageSearch}
              label={t("totalBookings")}
              value={stats.totalBookings}
            />
            <StatCard
              icon={Tractor}
              label={t("tractorRequests")}
              value={stats.totalTractor}
            />
            <StatCard
              icon={Warehouse}
              label={t("fertilizers")}
              value={stats.totalFertilizer}
            />
            <StatCard
              icon={Warehouse}
              label={t("seeds")}
              value={stats.totalSeeds}
            />
          </>
        )}

        {user.role === "dealer" && (
          <>
            <StatCard
              icon={PackageSearch}
              label={t("myBookings")}
              value={stats.myBookings}
            />
            <StatCard
              icon={Tractor}
              label={t("myTractors")}
              value={stats.myTractors}
            />
            <StatCard
              icon={Warehouse}
              label={t("myFertilizers")}
              value={stats.myFertilizers}
            />
          </>
        )}
      </div>
      <div className="relative mt-10 bg-gradient-to-br from-green-100 via-white to-blue-100 p-6 rounded-2xl shadow-md overflow-hidden">
        {/* 🌀 Spotlight effect */}
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-gradient-to-r from-green-300 via-blue-300 to-transparent rounded-full opacity-30 blur-2xl animate-pulse"></div>

        <h2 className="text-xl font-bold mb-4 z-10 relative">
          📊 {t("dashboardInsights")}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 z-10 relative">
          {/* ⏰ Clock + Calendar */}
          <div className="bg-white p-4 rounded-xl shadow flex flex-col items-center justify-center">
        
           <div className="text-2xl font-bold text-primary">{time}</div>

            <Calendar className="mt-4 rounded-xl shadow border-none" />
          </div>

          {/* 📅 Bookings BarChart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold mb-2">
              {t("monthlyBookings")}
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={bookingsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 🧪 Pie Chart */}
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold mb-2">{t("resourceRatio")}</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={resourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {resourceData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* 📈 Line Chart */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white p-4 rounded-xl shadow">
            <h3 className="text-sm font-semibold mb-2">{t("weeklyUploads")}</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={activityData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="uploads"
                  stroke="#60A5FA"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
