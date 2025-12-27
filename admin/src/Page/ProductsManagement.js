import { useState, useEffect } from "react";
import { ApiRequestGet } from "../data/service/ApiRequestGet";
import { ApiRequestPost } from "../data/service/ApiRequestPost";
import CommonTable from "../Components/Dashboard/UserTable";
import ProductFormDialog from "../Components/Popup/Popup";
import DeleteProductDialog from "./Product/DeleteProductDialog";
import { Eye, Edit, Trash2 } from "lucide-react";

const ProductsManagement = () => {
  const [data, setData] = useState([]);
  const [showFormDialog, setShowFormDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [loading, setLoading] = useState(false);

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

   const handleAddProduct = async (productData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
       formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('subCategory', productData.subCategory);
      formData.append('price', productData.price);
      formData.append('sizes', JSON.stringify(productData.sizes));
      formData.append('bestSeller', productData.bestSeller);
      
       if (productData.images && productData.images.length > 0) {
        productData.images.forEach((file) => {
          formData.append('images', file);
        });
      }
      
       if (productData.heroImages && productData.heroImages.length > 0) {
        productData.heroImages.forEach((file) => {
          formData.append('heroImages', file);
        });
      }
      
      const response = await ApiRequestPost.addProduct(formData);
      
      if (response && response.success) {
        setData(prevData => [...prevData, response.data]);
        alert('Product added successfully!');
      } else {
        throw new Error('Failed to add product');
      }
      
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

   const handleEditProduct = async (productData) => {
    try {
      setLoading(true);
      
      const formData = new FormData();
      
       formData.append('name', productData.name);
      formData.append('description', productData.description);
      formData.append('category', productData.category);
      formData.append('subCategory', productData.subCategory);
      formData.append('price', productData.price);
      formData.append('sizes', JSON.stringify(productData.sizes));
      formData.append('bestSeller', productData.bestSeller);
      
       if (productData.images && productData.images.length > 0) {
        productData.images.forEach((file) => {
          formData.append('images', file);
        });
      }
      
 
      if (productData.heroImages && productData.heroImages.length > 0) {
        productData.heroImages.forEach((file) => {
          formData.append('heroImages', file);
        });
      }
      
      const response = await ApiRequestPost.editProduct(
        selectedProduct.productId,
        formData
      );
      
      if (response && response.success) {
        setData(prevData => 
          prevData.map(product => 
            product.productId === selectedProduct.productId 
              ? response.data 
              : product
          )
        );
        alert('Product updated successfully!');
      } else {
        throw new Error('Failed to update product');
      }
      
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

   const handleProductDelete = (productId) => {
    setData(prevData => prevData.filter(product => product.productId !== productId));
  };

   const handleAddClick = () => {
    setSelectedProduct(null);
    setShowFormDialog(true);
  };

   const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowFormDialog(true);
  };

   const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteDialog(true);
  };

  // Table Columns
  const userColumns = [
    { header: "Name", accessor: "name" },
    { 
      header: "Description", 
      accessor: "description",
      Cell: ({ value }) => (
        <div className="max-w-xs truncate" title={value}>
          {value || "-"}
        </div>
      )
    },
    { header: "Category", accessor: "category" },
    { header: "Sub-Category", accessor: "subCategory" },
    { 
      header: "Price", 
      accessor: "price",
      Cell: ({ value }) => `$${value}`
    },
    { 
  header: "Sizes", 
  accessor: "sizes",
  Cell: ({ value }) => {
     let sizesArray = value;
    
    if (typeof value === 'string') {
      try {
        sizesArray = JSON.parse(value);
      } catch (e) {
        console.error('Failed to parse sizes:', e);
        sizesArray = [];
      }
    }
    
     if (!Array.isArray(sizesArray)) {
      return <div>-</div>;
    }
    
    return (
      <div className="flex gap-1 flex-wrap">
        {sizesArray.length > 0 ? (
          sizesArray.map((size, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-200 rounded text-xs">
              {size}
            </span>
          ))
        ) : (
          "-"
        )}
      </div>
    );
  }
},
    {
      header: "Best Seller",
      accessor: "bestSeller",
      Cell: ({ value }) => (
        <span className={`px-2 py-1 rounded text-xs ${
          value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          onClick={handleAddClick}
          disabled={loading}
        >
          Add Product
        </button>
      </div>

      <CommonTable columns={userColumns} data={data} />

       {showFormDialog && (
        <ProductFormDialog
          product={selectedProduct}
          onClose={() => setShowFormDialog(false)}
          onSave={selectedProduct ? handleEditProduct : handleAddProduct}
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