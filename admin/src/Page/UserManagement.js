import React, { useEffect, useState } from "react";
import { ApiRequestGet } from "../data/service/ApiRequestGet";
import CommonTable from "../Components/Dashboard/UserTable";
import AdminOnboardingDialog from "../Components/Popup/UserOnboard";

const UserManagement = () => {
  const [data, setData] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [loading, setLoading] = useState(false);
   const userRole = localStorage.getItem("userRole")  ;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await ApiRequestGet.getAllUsers();
      if (response) {
        setData(response.data);
        console.log(response);
      }
    } catch (error) {
      console.log("Error in fetching users: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserCreated = () => {
     fetchUsers();
    setShowAddPopup(false);
  };

  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
    { header: "Phone", accessor: "phone" },
    { header: "Status", accessor: "isActive" },
  ];

  return (
    <div className="p-6">
       <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">User Management</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={() => setShowAddPopup(true)}
        >
          Add User
        </button>
      </div>

       {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="text-gray-500">Loading users...</div>
        </div>
      ) : (
        <CommonTable columns={userColumns} data={data} />
      )}
   {(userRole === "admin" || userRole === "super_admin") && showAddPopup && (
  <AdminOnboardingDialog
    isOpen={showAddPopup}
    onClose={() => setShowAddPopup(false)}
    onUserCreated={handleUserCreated}
  />
)}


    </div>
  );
};

export default UserManagement;