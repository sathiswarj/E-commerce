import { useState, useEffect } from "react";
import { ApiRequestGet } from "../data/service/ApiRequestGet";
import CommonTable from "../Components/Dashboard/UserTable";
import Popup from "../Components/Popup/Popup";
import { Eye, Edit, Trash2 } from "lucide-react";
import EditProductDialog from "./Product/EditProductDialog";
import DeleteProductDialog from "./Product/DeleteProductDialog";

const ProductsManagement = () => {
  const [data, setData] = useState([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
 
  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  const handleProductDelete = (productId) => {
    setData(prevData => prevData.filter(product => product.productId !== productId));
  };

  const handleProductAdd = (newProduct) => {
    // Add the new product to the beginning of the list
    setData(prevData => [newProduct, ...prevData]);
  };

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await ApiRequestGet.getAllProducts();
        if (response) {
          setData(response.data);
        }
      } catch (error) {
        console.log("Error in fetching products: ", error);
      }
    };
    handleFetch();
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditPopup(true);
  };
 
  const userColumns = [
    { header: "Name", accessor: "name" },
    { header: "Description", accessor: "description" },
    { header: "Category", accessor: "category" },
    { header: "Sub-Category", accessor: "subCategory" },
    { header: "Price", accessor: "price" },
    { header: "Size", accessor: "sizes" },
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
      },
    },
    {
      header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => (
        <div className="flex gap-2">
          <Eye size={18} className="cursor-pointer text-blue-500" />
          <Edit
            size={18}
            className="cursor-pointer text-green-500"
            onClick={() => handleEditClick(row)}
          />
          <Trash2 
            size={18} 
            className="cursor-pointer text-red-500" 
            onClick={() => handleDeleteClick(row)}
          />
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          onClick={() => setShowAddPopup(true)}
        >
          Add Product
        </button>
      </div>

      <CommonTable columns={userColumns} data={data} />

      {showAddPopup && (
        <Popup 
          onClose={() => setShowAddPopup(false)} 
          onSave={handleProductAdd}
        />
      )}

      {showEditPopup && selectedProduct && (
        <EditProductDialog
          product={selectedProduct}
          onClose={() => setShowEditPopup(false)}
        />
      )}

      {showDeleteDialog && selectedProduct && (
        <DeleteProductDialog
          product={selectedProduct}
          onClose={() => setShowDeleteDialog(false)}
          onDelete={handleProductDelete}
        />
      )}
    </>
  );
};

export default ProductsManagement;