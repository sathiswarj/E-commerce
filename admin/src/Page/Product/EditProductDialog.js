import React, { useState, useEffect } from "react";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";

const EditProductDialog = ({ product, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
    images: [],
    bestSeller: false,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      console.log("Editing product:", product); // DEBUG
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        price: product.price || "",
        sizes: product.sizes || [],
        images: [],
        bestSeller: product.bestSeller || false,
      });
    }
  }, [product]);

  const categoryOptions = ["Men", "Women", "Kids"];
  const subCategoryOptions = ["Topwear", "Bottomwear", "Winterwear"];
  const sizeOptions = ["S", "M", "L"];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSizeChange = (size) => {
    setFormData((prev) => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter((s) => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 1024 * 1024; // 1MB
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Max 1MB`);
        return false;
      }
      return true;
    });
    if (validFiles.length > 3) {
      alert("Select maximum 3 images");
      return;
    }
    setFormData((prev) => ({ ...prev, images: validFiles }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert("Product name is required");
      return;
    }
    if (!formData.category) {
      alert("Category is required");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      alert("Valid price is required");
      return;
    }

    setLoading(true);
    try {
      const formPayload = new FormData();
 
      formPayload.append("name", formData.name.trim());
      formPayload.append("description", formData.description.trim());
      formPayload.append("category", formData.category);
      formPayload.append("subCategory", formData.subCategory);
      formPayload.append("price", formData.price.toString());
      formPayload.append("bestSeller", formData.bestSeller.toString());
      formPayload.append("sizes", JSON.stringify(formData.sizes));

      // Append images
      formData.images.forEach((file, index) => {
        formPayload.append(`image${index + 1}`, file);
      });

      // Log FormData contents
      for (let pair of formPayload.entries()) {
        console.log(pair[0], pair[1]);
      }

      const response = await ApiRequestPost.editProduct(
        product.productId,
        formPayload
      );

 

      if (response && response.success) {
        const updatedProduct = response.data;
 
        onClose();
      } else {
        throw new Error(response?.message || "Update failed");
      }
    } catch (error) {
      console.error("=== UPDATE ERROR ===");
      console.error("Error:", error);
 
     } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Edit Product (ID: {product?.name})</h2>

         <div className="mb-2">
          <label className="block text-sm font-medium">Name *</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
            required
          />
        </div>

         <div className="mb-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
            rows="3"
          />
        </div>

         <div className="mb-2">
          <label className="block text-sm font-medium">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
            required
          >
            <option value="">Select Category</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

         <div className="mb-2">
          <label className="block text-sm font-medium">Sub-Category</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          >
            <option value="">Select Sub-Category</option>
            {subCategoryOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

         <div className="mb-2">
          <label className="block text-sm font-medium">Price *</label>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
            required
          />
        </div>

         <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Sizes</label>
          <div className="flex gap-4">
            {sizeOptions.map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleSizeChange(size)}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

         <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
          />
          <label className="text-sm font-medium">Best Seller</label>
        </div>

         <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Upload New Images (Max 3, Optional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border px-2 py-1 w-full rounded"
          />
          {formData.images.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {formData.images.map((file, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                  className="w-16 h-16 object-cover rounded border"
                />
              ))}
            </div>
          )}
        </div>

         <div className="flex justify-end gap-2 mt-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProductDialog;