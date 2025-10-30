import React from "react";

const Topbar = () => {
     const userRole = localStorage.getItem("userRole")  ;

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-lg font-semibold">Dashboard</div>
      <div>
          Role: <span className="font-semibold capitalize">{userRole.replace('_', ' ')}</span>
      </div>
    </header>
  );
};

export default Topbar;
