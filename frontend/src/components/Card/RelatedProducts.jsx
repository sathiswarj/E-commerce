import { useState, useEffect } from "react";
import Title from "../Title";
import ProductItem from "./ProductItem";

const RelatedProducts = ({ category, subCategory }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  // ✅ Dummy products data
  const products = [
    {
      _id: "1",
      name: "Classic Shirt",
      price: 499,
      category: "Men",
      subCategory: "Topwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/shirt1.png"],
    },
    {
      _id: "2",
      name: "Elegant Dress",
      price: 1299,
      category: "Women",
      subCategory: "Topwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/dress1.png"],
    },
    {
      _id: "3",
      name: "Casual T-Shirt",
      price: 299,
      category: "Men",
      subCategory: "Topwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/tshirt1.png"],
    },
    {
      _id: "4",
      name: "Winter Jacket",
      price: 1999,
      category: "Men",
      subCategory: "Winterwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/jacket1.png"],
    },
    {
      _id: "5",
      name: "Summer Shorts",
      price: 399,
      category: "Men",
      subCategory: "Bottomwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/shorts1.png"],
    },
    {
      _id: "6",
      name: "Jeans",
      price: 899,
      category: "Women",
      subCategory: "Bottomwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/jeans1.png"],
    },
    {
      _id: "7",
      name: "Hoodie",
      price: 799,
      category: "Men",
      subCategory: "Topwear",
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/hoodie1.png"],
    },
  ];

  useEffect(() => {
    const filteredProducts = products.filter(
      (product) => product.category === category && product.subCategory === subCategory
    );
    setRelatedProducts(filteredProducts.slice(0, 5));
  }, [category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {relatedProducts.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            image={product.image}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
