import React, { useState, useEffect } from "react";
import Title from "../components/Title";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const currency = "$";

  // ✅ Dummy orders data
  const products = [
    {
      _id: "1",
      name: "Classic Shirt",
      price: 499,
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/shirt1.png"],
      size: "M",
      quantity: 1,
      status: "Ready to Ship",
      date: "2025-04-22",
    },
    {
      _id: "2",
      name: "Jeans",
      price: 899,
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/jeans1.png"],
      size: "L",
      quantity: 1,
      status: "Shipped",
      date: "2025-04-20",
    },
    {
      _id: "3",
      name: "Winter Jacket",
      price: 1999,
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/jacket1.png"],
      size: "XL",
      quantity: 1,
      status: "Delivered",
      date: "2025-04-18",
    },
    {
      _id: "4",
      name: "Casual T-Shirt",
      price: 299,
      image: ["https://res.cloudinary.com/demo/image/upload/v1680000000/tshirt1.png"],
      size: "M",
      quantity: 1,
      status: "Ready to Ship",
      date: "2025-04-21",
    },
  ];

  useEffect(() => {
    // Take some sample orders
    setOrders(products.slice(0, 3));
  }, []);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl mb-6">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {orders.map((item) => (
        <div
          key={item._id}
          className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
        >
          <div className="flex items-start gap-6 text-sm">
            <img src={item.image[0]} className="w-16 sm:w-20" alt={item.name} />
            <div>
              <p className="sm:text-base font-medium">{item.name}</p>
              <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                <p className="text-lg">
                  {currency} {item.price}
                </p>
                <p>Quantity:{item.quantity}</p>
                <p>Size:{item.size}</p>
              </div>
              <p className="mt-2">
                Date: <span className="text-gray-400">{item.date}</span>
              </p>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-between items-center mt-4 md:mt-0">
            <div className="flex items-center gap-2">
              <p
                className={`min-w-2 h-2 rounded-full ${
                  item.status === "Ready to Ship"
                    ? "bg-green-500"
                    : item.status === "Shipped"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
                }`}
              ></p>
              <p className="text-sm md:text-base">{item.status}</p>
            </div>
            <button className="border px-4 py-2 text-sm font-medium rounded-sm">
              Track Order
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
