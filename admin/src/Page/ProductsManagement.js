import { useState, useEffect } from "react";
import { ApiRequestGet } from "../data/service/ApiRequestGet";
import CommonTable from "../Components/Dashboard/UserTable";
import Popup from "../Components/Popup/Popup";

const ProductsManagement = () => {
  const [data, setData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await ApiRequestGet.getAllProducts();
        if (response) {
          setData(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    };
    handleFetch();
  }, []);

  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Category", accessor: "category" },
    { header: "Sub-Category", accessor: "subCategory" },
    { header: "Price", accessor: "price" },
    { 
      header: "Size", 
      accessor: "sizes"  // assuming API returns sizes as array
    },
    { 
      header: "Created At", 
      accessor: "createdAt",
      Cell: ({ value }) => {
        if (!value) return "-";
        const date = new Date(value);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); 
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
      }
    },
  ];

  const handleSave = (newProduct) => {
    setData((prev) => [...prev, newProduct]);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          onClick={() => setShowPopup(true)}
        >
          Add Product
        </button>
      </div>

      <CommonTable columns={userColumns} data={data} />

      {showPopup && (
        <Popup
          onClose={() => setShowPopup(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProductsManagement;
