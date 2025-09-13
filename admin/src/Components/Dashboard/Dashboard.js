import React from "react";
import DashboardCard from "./DashboardCard";
import UsersTable from "./UserTable";

const Dashboard = () => {
  const users = [
    { name: "John Doe", email: "john@example.com", role: "Admin" },
    { name: "Jane Smith", email: "jane@example.com", role: "User" },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard title="Total Users" value={users.length} />
        <DashboardCard title="Total Products" value={567} />
        <DashboardCard title="Revenue" value="$12,345" />
      </div>
      <UsersTable users={users} />
    </div>
  );
};

export default Dashboard;
