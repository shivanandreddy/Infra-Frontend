import React from "react";

/* ================= MINI COMPONENTS ================= */

const StatCard = ({ label, value }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 hover:shadow-md transition">
      <p className="text-xs text-gray-500 uppercase tracking-wide">
        {label}
      </p>

      {label === "Shift Handover" ? (
        <span className="inline-block mt-3 px-3 py-1 text-xs sm:text-sm font-semibold rounded-full bg-yellow-100 text-yellow-700">
          {value}
        </span>
      ) : (
        <p className="text-2xl sm:text-3xl font-bold text-gray-800 mt-3">
          {value}
        </p>
      )}
    </div>
  );
};

const StatusBadge = ({ status }) => {
  const styles =
    status === "On Shift"
      ? "bg-green-100 text-green-700"
      : status === "Off Shift"
      ? "bg-gray-200 text-gray-700"
      : "bg-red-100 text-red-700";

  return (
    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${styles}`}>
      {status}
    </span>
  );
};

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Quick Actions
      </h3>

      <div className="grid grid-cols-2 gap-3 text-sm">
        <button className="bg-emerald-600 text-white rounded-lg py-2 hover:bg-emerald-500 transition">
          Create Handover
        </button>
        <button className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-500 transition">
          Add Employee
        </button>
        <button className="bg-purple-600 text-white rounded-lg py-2 hover:bg-purple-500 transition">
          View Reports
        </button>
        <button className="bg-orange-500 text-white rounded-lg py-2 hover:bg-orange-400 transition">
          Settings
        </button>
      </div>
    </div>
  );
};

const ActivityPanel = () => {
  const activities = [
    "Rajendra updated firewall rules",
    "Teja resolved 2 network tickets",
    "Mahesh marked incident as resolved",
    "New shift handover created",
  ];

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">
        Recent Activity
      </h3>

      <ul className="space-y-3 text-sm text-gray-600">
        {activities.map((item, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="w-2 h-2 mt-2 rounded-full bg-emerald-500"></span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

/* ================= MAIN DASHBOARD ================= */

const Dashboard = () => {
  const stats = [
    { label: "Shift Handover", value: "Pending" },
    { label: "Total Employees", value: 10 },
    { label: "Todo's", value: 12 },
    { label: "Points to Discuss", value: 8 },
  ];

  const employees = [
    {
      id: 1,
      name: "Shivanand Reddy",
      role: "Helpdesk Engineer",
      shift: "Morning",
      status: "On Shift",
      tickets: 3,
    },
    {
      id: 2,
      name: "Rajendra",
      role: "System Admin",
      shift: "Night",
      status: "Off Shift",
      tickets: 1,
    },
    {
      id: 3,
      name: "Teja",
      role: "Network Engineer",
      shift: "Morning",
      status: "On Shift",
      tickets: 4,
    },
    {
      id: 4,
      name: "Mahesh",
      role: "Application Support",
      shift: "General",
      status: "On Leave",
      tickets: 0,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-10 py-6 mt-5">


      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((item, index) => (
          <StatCard key={index} {...item} />
        ))}
      </div>

      {/* Middle Section (Roster + Side Panels) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        

        {/* Right Side Panels */}
        <div className="space-y-6">
          <QuickActions />
          <ActivityPanel />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
