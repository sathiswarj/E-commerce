import React from "react";

const CommonTable = ({ columns = [], data = [] }) => {
  return (
    <div className="mt-6 bg-white shadow rounded overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 border-b"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50">
                {columns.map((col, colIdx) => {
                  let value = row[col.accessor];

                  // Format "Created At" column
                  if (col.accessor === "createdAt" && value) {
                    const date = new Date(value);
                    const day = String(date.getDate()).padStart(2, "0");
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    value = `${day}-${month}-${year}`;
                  }

                  // Format arrays as comma-separated strings
                  if (Array.isArray(value)) {
                    value = value.join(", ");
                  }

                  return (
                    <td
                      key={colIdx}
                      className="px-6 py-3 text-sm text-gray-800 border-b"
                    >
                      {value || "-"}
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-3 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CommonTable;
