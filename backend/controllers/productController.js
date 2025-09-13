import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

const addProduct = async (req, res) => {
    try {
      const { name, description, price, category, subCategory, sizes, bestSeller } = req.body;
      const image1 = req.files?.image1?.[0];
      const image2 = req.files?.image2?.[0];
      const image3 = req.files?.image3?.[0];
      const image4 = req.files?.image4?.[0];
  
      const images = [image1, image2, image3, image4].filter(image => image !== undefined);
  
      const imageUrls = await Promise.all(images.map(async (item) => {
        const result = await cloudinary.uploader.upload(item.path, {
          resource_type: 'image'
        });
        return result.secure_url;
      }));
  
      // console.log(name, description, price, category, subCategory, sizes, bestSeller);
      console.log(imageUrls);

      const productData = {
        name,
        description,
        price:Number(price),
        category,
        subCategory,
        sizes:JSON.parse(sizes),
        bestSeller: bestSeller === 'true' ? true : false,
        image: imageUrls,
        date: Date.now()
      };
      console.log(productData);
      const product = new productModel(productData);
      await product.save();   
      res.status(200).json({ success: true, data: { name, description, price, category, subCategory, sizes, bestSeller, imageUrls }, message: 'Product added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: error.message });
    }
  };
  
const getProduct = async (req, res) => {

}

const getAllProducts = async (req, res) => {

}

const updateProduct = async (req, res) => { 

}

const deleteProduct = async (req, res) => {

}

export { addProduct, getProduct, getAllProducts, updateProduct, deleteProduct };