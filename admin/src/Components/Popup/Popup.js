import React, { useState } from "react";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";

const Popup = ({ onClose, onSave }) => {
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
    
    // Simple size check - reject files over 1MB
    const maxSize = 1024 * 1024; // 1MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Please select images under 1MB.`);
        return false;
      }
      return true;
    });
    
    // Limit to 3 images max
    if (validFiles.length > 3) {
      alert("Please select maximum 3 images");
      return;
    }
    
    setFormData((prev) => ({ ...prev, images: validFiles }));
  };

  const handleSubmit = async () => {
    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("description", formData.description);
      formPayload.append("category", formData.category);
      formPayload.append("subCategory", formData.subCategory);
      formPayload.append("price", formData.price);
      formPayload.append("bestSeller", formData.bestSeller);

      // sizes as JSON string
      formPayload.append("sizes", JSON.stringify(formData.sizes));

      // Add images
      formData.images.forEach((file, index) => {
        formPayload.append(`image${index + 1}`, file);
      });

      const product = await ApiRequestPost.addProduct(formPayload);

      onSave(product);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      if (error.status === 413) {
        alert("Images are too large. Please select smaller images or reduce the number of images.");
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96 max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Add Item</h2>

        {/* Name */}
        <div className="mb-2">
          <label className="block text-sm font-medium">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        {/* Description */}
        <div className="mb-2">
          <label className="block text-sm font-medium">Description</label>
          <input
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        {/* Category */}
        <div className="mb-2">
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          >
            <option value="">Select Category</option>
            {categoryOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Sub-Category */}
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
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-2">
          <label className="block text-sm font-medium">Price</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            className="border px-2 py-1 w-full rounded"
          />
        </div>

        {/* Sizes */}
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

        {/* Best Seller */}
        <div className="mb-4 flex items-center gap-2">
          <input
            type="checkbox"
            name="bestSeller"
            checked={formData.bestSeller}
            onChange={handleChange}
          />
          <label className="text-sm font-medium">Best Seller</label>
        </div>

        {/* Images */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">
            Images (Max 3 images, under 1MB each)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border px-2 py-1 w-full rounded"
          />
          {formData.images.length > 0 && (
            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-2">
                {formData.images.length} image(s) selected
              </p>
              <div className="flex flex-wrap gap-2">
                {formData.images.map((file, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(file)}
                    alt="preview"
                    className="w-16 h-16 object-cover rounded border"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;