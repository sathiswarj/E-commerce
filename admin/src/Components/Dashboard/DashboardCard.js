import React from "react";

const DashboardCard = ({ title, value }) => {
  return (
    <div className="bg-white shadow rounded p-4">
      <h3 className="text-gray-700 font-bold">{title}</h3>
      <p className="text-2xl mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
