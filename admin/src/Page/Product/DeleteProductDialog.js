import React, { useState } from "react";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";

const DeleteProductDialog = ({ product, onClose, onDelete }) => {
  const [loading, setLoading] = useState(false);
 
  const handleDelete = async () => {
  
    setLoading(true);
    try {
 
      const response = await ApiRequestPost.deleteProduct(product.productId);

 
      if (response && response.success) {
        alert("Product deleted successfully!");
        onDelete(product.productId);  
        onClose();
      } else {
        throw new Error(response?.message || "Delete failed");
      }
    } catch (error) {
       alert(error.message || "Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Delete Product
        </h2>

        {/* Product Info */}
        <div className="mb-4 p-3 bg-gray-100 rounded">
          <p className="text-sm font-medium">
            Product ID: <span className="font-normal">{product?.productId}</span>
          </p>
          <p className="text-sm font-medium mt-1">
            Name: <span className="font-normal">{product?.name}</span>
          </p>
          <p className="text-sm font-medium mt-1">
            Price: <span className="font-normal">₹{product?.price}</span>
          </p>
        </div>

         <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded">
          <p className="text-sm text-red-800">
            ⚠️ <strong>Warning:</strong> This action cannot be undone. All product data including images will be permanently deleted.
          </p>
        </div>

         <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:bg-red-300 transition-colors"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Product"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductDialog;