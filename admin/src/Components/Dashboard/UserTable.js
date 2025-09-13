import React from "react";

const UsersTable = ({ users }) => {
  return (
    <div className="mt-6 bg-white shadow rounded overflow-x-auto">
      <table className="w-full text-left table-auto border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 border-b">Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={idx} className="hover:bg-gray-100">
              <td className="p-3 border-b">{user.name}</td>
              <td className="p-3 border-b">{user.email}</td>
              <td className="p-3 border-b">{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
