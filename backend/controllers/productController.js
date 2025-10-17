import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';
 const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
    
     const parsedSizes = JSON.parse(sizes || "[]");

     const files = Object.values(req.files || {}).flat();

     const imageUrls = await Promise.all(
      files.map(file =>
        cloudinary.uploader.upload(file.path, { resource_type: "image" }).then(res => res.secure_url)
      )
    );

    const product = new productModel({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: parsedSizes,
      bestSeller: bestSeller === "true",
      images: imageUrls,
    });

    await product.save();
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

  
const getProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await productModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body || {};
    
    const parsedSizes = sizes ? JSON.parse(sizes) : [];
    const files = Object.values(req.files || {}).flat();
    let newImageUrls = [];

    if (files.length > 0) {
      newImageUrls = await Promise.all(
        files.map(file =>
          cloudinary.uploader.upload(file.path, { resource_type: "image" }).then(res => res.secure_url)
        )
      );
    }

    const existingProduct = await productModel.findOne({ productId });

    if (!existingProduct) return res.status(404).json({ success: false, message: "Product not found" });

    if (name) existingProduct.name = name;
    if (description) existingProduct.description = description;
    if (price) existingProduct.price = Number(price);
    if (category) existingProduct.category = category;
    if (subCategory) existingProduct.subCategory = subCategory;
    if (sizes) existingProduct.sizes = parsedSizes;
    if (bestSeller !== undefined) existingProduct.bestSeller = bestSeller === "true";
    if (newImageUrls.length > 0) existingProduct.images = [...existingProduct.images, ...newImageUrls];

 
    const updatedProduct = await existingProduct.save();

 
    res.status(200).json({ success: true, message: "Product updated successfully", data: updatedProduct });

  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};




const getAllProducts = async (req, res) => {
 try {
    const allProducts = await productModel.find();
 
     return res.status(200).json({
      success: true,
      data: allProducts, 
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

 

const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

 
    const product = await productModel.findOne({ productId });

    if (!product) {
      return res.status(404).json({ 
        success: false, 
        message: "Product not found" 
      });
    }

     if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map(imageUrl => {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          return cloudinary.uploader.destroy(`products/${publicId}`);
        })
      );
    }

    await productModel.deleteOne({ productId });

 
    res.status(200).json({ 
      success: true, 
      message: "Product deleted successfully" 
    });

  } catch (error) {
     res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

export { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct };