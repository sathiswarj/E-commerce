import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});

  const addToCart = (id, selectedSize) => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    const cartData = structuredClone(cartItems);
    if (!cartData[id]) cartData[id] = {};

    if (cartData[id][selectedSize]) {
      cartData[id][selectedSize].quantity += 1;
    } else {
      const product = products.find((p) => p._id === id);
      cartData[id][selectedSize] = {
        quantity: 1,
        product,
        size: selectedSize,
      };
    }

    setCartItems(cartData);
  };

  const updateCart = (id, selectedSize, quantity) => {
    const cartData = structuredClone(cartItems);

    if (!cartData[id]) return;

    if (quantity <= 0) {
      delete cartData[id][selectedSize];
      if (Object.keys(cartData[id]).length === 0) delete cartData[id];
    } else {
      cartData[id][selectedSize].quantity = quantity;
    }

    setCartItems(cartData);
  };

  const getCartCount = () => {
    let count = 0;
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        try {
          const entry = cartItems[id][size];
          if (entry && entry.quantity > 0) {
            count += entry.quantity;
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
    return count;
  };

  const getCartAmount = () => {
    let amount = 0;
    for (const id in cartItems) {
      for (const size in cartItems[id]) {
        const entry = cartItems[id][size];
        try {
          if (entry && entry.quantity > 0 && entry.product) {
            amount += entry.quantity * entry.product.price;
          }
        } catch (e) {
          console.error("Error calculating cart total:", e);
        }
      }
    }
    return amount;
  };

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    updateCart,
    getCartCount,
    getCartAmount,
  };

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
