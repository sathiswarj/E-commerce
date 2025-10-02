import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../../assets/assets";
import RelatedProducts from "../../components/Card/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState(null);

  // ✅ Dummy product data
  const products = [
    {
      _id: "1",
      name: "Classic Shirt",
      description: "A comfortable cotton shirt perfect for all occasions.",
      price: 499,
      category: "Men",
      subCategory: "Topwear",
      sizes: ["S", "M", "L", "XL"],
      image: [
        "https://res.cloudinary.com/demo/image/upload/v1680000000/shirt1.png",
        "https://res.cloudinary.com/demo/image/upload/v1680000000/shirt2.png",
        "https://res.cloudinary.com/demo/image/upload/v1680000000/shirt3.png",
      ],
    },
    {
      _id: "2",
      name: "Elegant Dress",
      description: "Stylish dress for formal and casual events.",
      price: 1299,
      category: "Women",
      subCategory: "Topwear",
      sizes: ["S", "M", "L"],
      image: [
        "https://res.cloudinary.com/demo/image/upload/v1680000000/dress1.png",
        "https://res.cloudinary.com/demo/image/upload/v1680000000/dress2.png",
      ],
    },
  ];

  useEffect(() => {
    const item = products.find((item) => item._id === productId);
    if (item) {
      setProduct(item);
      setImage(item.image[0]);
    }
  }, [productId]);

  const addToCart = (id, size) => {
    alert(`Added product ${id} (size: ${size}) to cart`);
  };

  if (!product)
    return <div className="p-10 text-center">Loading product...</div>;

  return (
    <div className="border-t-2 pt-10 px-5 sm:px-20 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex flex-col sm:flex-row gap-12 sm:gap-12">
        {/* Images */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 flex-1">
          <div className="flex sm:flex-col overflow-x-auto overflow-y-auto justify-between sm:justify-normal sm:w-[18.7%] w-full">
            {product.image.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                onClick={() => setImage(img)}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%] flex-1">
            <img
              src={image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-md shadow-md"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4 mt-12">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={assets.star_icon} alt="Star" className="w-3.5" />
            ))}
            <img src={assets.star_dull_icon} alt="Star" className="w-3.5" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="text-3xl font-medium mt-5">${product.price}</p>
          <p className="mt-5 text-gray-600 md:w-4/5">{product.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8 mt-12 mb-8">
            <p className="font-medium mb-2">Select Size</p>
            <div className="flex gap-2">
              {product.sizes.map((item) => (
                <button
                  key={item}
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            className="mt-12 mb-[15px] bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
            onClick={() => addToCart(product._id, size)}
          >
            ADD TO CART
          </button>
          <hr className="mt-12 sm:w-4/5 mb-8" />
          <div className="text-md text-gray-500 pt-4 leading-sm">
            <p>100% Original product.</p>
            <p>Cash on delivery is available.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>
        <div className="flex flex-col gap-4 border px-6 py-6 text-sm text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
            inventore, necessitatibus unde libero perferendis quam quidem
            numquam provident voluptates.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat
            illum dolor quod possimus, tempore totam esse id inventore!
          </p>
        </div>
      </div>

      <RelatedProducts
        category={product.category}
        subCategory={product.subCategory}
      />
    </div>
  );
};

export default Product;
