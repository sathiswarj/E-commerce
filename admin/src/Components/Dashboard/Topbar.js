import React from "react";

const Topbar = () => {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div>
        <button className="bg-blue-500 text-white px-3 py-1 rounded">Profile</button>
      </div>
    </header>
  );
};

export default Topbar;
