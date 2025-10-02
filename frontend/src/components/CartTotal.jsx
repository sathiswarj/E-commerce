import React, { useState, useEffect } from "react";
import Title from "./Title";

const CartTotal = () => {
  // ✅ Dummy data
  const [currency] = useState("$");
  const [delivery_fee] = useState(50);
  const [cartItems] = useState([
    { id: 1, name: "Classic Shirt", price: 499, quantity: 2 },
    { id: 2, name: "Jeans", price: 899, quantity: 1 },
  ]);

  // Calculate subtotal
  const getCartAmount = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency}
            {getCartAmount()}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>
            {currency} {getCartAmount() + delivery_fee}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
