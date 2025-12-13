import React from "react";

const CommonTable = ({ columns = [], data = [] }) => {
  return (
    <div className="mt-6">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100">
        {/* Table Header with Gradient */}
        <div className="bg-indigo-600 px-6 py-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Data Overview
          </h3>
        </div>

        {/* Table Container */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-indigo-200">
                {columns.map((col, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                        {col.header}
                      </span>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                      </svg>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {data.length > 0 ? (
                data.map((row, rowIdx) => (
                  <tr 
                    key={rowIdx} 
                    className="group hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 ease-in-out"
                  >
                    {columns.map((col, colIdx) => {
                      let value = row[col.accessor];

                      if (col.accessor === "createdAt" && value) {
                        const date = new Date(value);
                        const day = String(date.getDate()).padStart(2, "0");
                        const month = String(date.getMonth() + 1).padStart(2, "0");
                        const year = date.getFullYear();
                        value = `${day}-${month}-${year}`;
                      }

                      if (Array.isArray(value)) {
                        value = value.join(", ");
                      }

                      return (
                        <td
                          key={colIdx}
                          className="px-6 py-4"
                        >
                          <div className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors">
                            {col.Cell ? col.Cell({ row, value }) : value || (
                              <span className="text-gray-400 italic font-normal">N/A</span>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-16"
                  >
                    <div className="flex flex-col items-center justify-center">
                      {/* Animated Icon */}
                      <div className="relative mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full p-6">
                          <svg 
                            className="w-16 h-16 text-indigo-600" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path 
                              strokeLinecap="round" 
                              strokeLinejoin="round" 
                              strokeWidth={1.5} 
                              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" 
                            />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Text Content */}
                      <h4 className="text-gray-800 font-bold text-lg mb-2">No Data Available</h4>
                      <p className="text-gray-500 text-sm mb-4 max-w-sm text-center">
                        There's no data to display at the moment. Start adding items to see them here.
                      </p>
                      
                      {/* Decorative Elements */}
                      <div className="flex gap-2 mt-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Info */}
        {data.length > 0 && (
          <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600 font-medium">
                Showing <span className="text-indigo-600 font-bold">{data.length}</span> {data.length === 1 ? 'entry' : 'entries'}
              </span>
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs">Updated just now</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonTable;