import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
    
    // Convert sizes from string to array
    const parsedSizes = JSON.parse(sizes || "[]");

    // Get all uploaded files dynamically
    const files = Object.values(req.files || {}).flat();

    // Upload to Cloudinary
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

}

const getAllProducts = async (req, res) => {
 try {
    const allProducts = await productModel.find();
 
    // Always respond with JSON, even if empty
    return res.status(200).json({
      success: true,
      data: allProducts, // empty array if no users
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

const updateProduct = async (req, res) => { 

}

const deleteProduct = async (req, res) => {

}

export { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct };