import React, { useEffect, useState } from "react";
import { ApiRequestGet } from "../data/service/ApiRequestGet";
import CommonTable from "../Components/Dashboard/UserTable";

const UserManagement = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await ApiRequestGet.getAllUsers();
        if (response) {
          setData(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log("Error in fetching users: ", error);
      }
    };
    handleFetch();
  }, []);

  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Email", accessor: "email" },
    { header: "Role", accessor: "role" },
  ];

  return <CommonTable columns={userColumns} data={data} />;
};

export default UserManagement;
