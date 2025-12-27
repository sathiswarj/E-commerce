import React, { useState, useEffect } from "react";

const ProductFormDialog = ({ 
  product = null, // null for Add, populated for Edit
  onClose, 
  onSave 
}) => {
  const isEditMode = !!product;

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subCategory: "",
    price: "",
    sizes: [],
    images: [],
    heroImages: [],
    bestSeller: false,
  });
  const [loading, setLoading] = useState(false);

  const categoryOptions = ["Men", "Women", "Kids"];
  const subCategoryOptions = ["Topwear", "Bottomwear", "Winterwear"];
  const sizeOptions = ["S", "M", "L"];

   useEffect(() => {
    if (isEditMode && product) {
      setFormData({
        name: product.name || "",
        description: product.description || "",
        category: product.category || "",
        subCategory: product.subCategory || "",
        price: product.price || "",
        sizes: product.sizes || [],
        images: [],
        heroImages: [],
        bestSeller: product.bestSeller || false,
      });
    }
  }, [product, isEditMode]);

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
    
    const maxSize = 1024 * 1024;
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Please select images under 1MB.`);
        return false;
      }
      return true;
    });
    
    if (validFiles.length > 3) {
      alert("Please select maximum 3 images");
      return;
    }
    
    setFormData((prev) => ({ ...prev, images: validFiles }));
  };

  const handleHeroImageChange = (e) => {
    const files = Array.from(e.target.files);
    
    const maxSize = 1024 * 1024;
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        alert(`${file.name} is too large. Please select images under 1MB.`);
        return false;
      }
      return true;
    });
    
    if (validFiles.length > 4) {
      alert("Please select maximum 4 hero images");
      return;
    }
    
    setFormData((prev) => ({ ...prev, heroImages: validFiles }));
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
    if (!formData.subCategory) {
      alert("Sub-category is required");
      return;
    }
    if (!formData.price || formData.price <= 0) {
      alert("Valid price is required");
      return;
    }

    setLoading(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">
            {isEditMode ? `Edit Product: ${product.name}` : "Add New Product"}
          </h2>
          <button
            onClick={onClose}
            disabled={loading}
            className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form Content */}
        <div className="overflow-y-auto p-6 space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Name <span className="text-red-500">*</span>
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Category and Sub-Category Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                disabled={loading}
              >
                <option value="">Select Category</option>
                {categoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sub-Category <span className="text-red-500">*</span>
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none bg-white"
                disabled={loading}
              >
                <option value="">Select Sub-Category</option>
                {subCategoryOptions.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
              <input
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                disabled={loading}
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Available Sizes
            </label>
            <div className="flex gap-3">
              {sizeOptions.map((size) => (
                <label
                  key={size}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                    formData.sizes.includes(size)
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={formData.sizes.includes(size)}
                    onChange={() => handleSizeChange(size)}
                    disabled={loading}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-semibold">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Best Seller Toggle */}
          <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <input
              type="checkbox"
              name="bestSeller"
              checked={formData.bestSeller}
              onChange={handleChange}
              disabled={loading}
              className="w-5 h-5 text-amber-600 rounded focus:ring-2 focus:ring-amber-500"
            />
            <div>
              <label className="text-sm font-semibold text-amber-900">Mark as Best Seller</label>
              <p className="text-xs text-amber-700 mt-0.5">This product will be featured prominently</p>
            </div>
          </div>

          {/* Product Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Images {isEditMode && "(Optional - Add new images)"}
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-all duration-200">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="product-images-upload"
                disabled={loading}
              />
              <label htmlFor="product-images-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-700">Click to upload images</p>
                  <p className="text-xs text-gray-500 mt-1">Max 3 images, under 1MB each</p>
                </div>
              </label>
            </div>
            
            {formData.images.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {formData.images.length} image(s) selected
                </p>
                <div className="grid grid-cols-3 gap-3">
                  {formData.images.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="preview"
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Image {idx + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Hero Images */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Hero Images {isEditMode && "(Optional - Add new images)"}
            </label>
            <div className="border-2 border-dashed border-purple-300 rounded-lg p-6 text-center hover:border-purple-400 transition-all duration-200">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleHeroImageChange}
                className="hidden"
                id="hero-images-upload"
                disabled={loading}
              />
              <label htmlFor="hero-images-upload" className="cursor-pointer">
                <div className="flex flex-col items-center">
                  <svg className="w-12 h-12 text-purple-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm font-semibold text-gray-700">Click to upload hero images</p>
                  <p className="text-xs text-gray-500 mt-1">Max 4 images, under 1MB each</p>
                </div>
              </label>
            </div>
            
            {formData.heroImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  {formData.heroImages.length} hero image(s) selected
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {formData.heroImages.map((file, idx) => (
                    <div key={idx} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt="hero preview"
                        className="w-full h-24 object-cover rounded-lg border-2 border-purple-200"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 rounded-lg transition-all duration-200 flex items-center justify-center">
                        <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Hero {idx + 1}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 shadow-sm"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 disabled:from-blue-300 disabled:to-blue-400 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEditMode ? "Updating..." : "Adding..."}
              </span>
            ) : (
              isEditMode ? "Update Product" : "Add Product"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductFormDialog;