import React, { useState, useEffect } from "react";
import Title from "../../components/Title";
import CartTotal from "../../components/CartTotal";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { ApiRequestGet } from "../../data/service/ApiRequestGet";
import { ApiRequestPost } from "../../data/service/ApiRequestPost";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
  const currency = "$";

   const handleFetch = async () => {
    try {
      const response = await ApiRequestGet.getAllCart();
      setCartData(response.cartItems || []);
            setTotalAmount(response.totalAmount || 0);

    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

const handleDelete = async (productId) => {
  try {
     
    const response = await ApiRequestPost.removeCart({ 
      productId: productId,
    });    
    if (response && response.success) {
      await handleFetch();
    }
  } catch (error) {
    console.error("Error deleting cart item:", error);
  }
};

  const handleUpdate = async (productId, val) => {
    try {
       const response = await ApiRequestPost.updateCart({ 
        productId: productId, 
        val: val 
      });
       
      if (response && response.success) {
        await handleFetch();
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    }
  };

  return (
    <div className="border-t pt-14 px-5 sm:px-10">
      <div className="text-2xl mb-6">
        <Title text1="YOUR" text2="CART" />
      </div>

      {cartData.length === 0 ? (
        <p className="text-gray-600 text-center py-12">
          Your cart is currently empty.
        </p>
      ) : (
        <>
          <div>
            {cartData.map((item) => (
              <div
                key={item.cartKey}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
              >
                <div className="flex items-center gap-6">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 sm:w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-sm sm:text-lg font-medium">{item.name}</h3>
                    <p className="mt-2">
                      {currency}
                      {item.price}
                    </p>
                  </div>
                </div>

                <input
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val > 0) {
                      handleUpdate(item.productId, val);
                    }
                  }}
                  className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                />

                <img
                  src={assets.bin_icon}
                  alt="Bin"
                  className="w-5 h-5 cursor-pointer"
                  onClick={() => handleDelete(item.productId)}
                />
              </div>
            ))}
          </div>

          <div className="flex justify-end my-20">
            <div className="w-full sm:w-[450px]">
              <CartTotal  totalAmount={totalAmount}/>
              <div className="w-full text-end">
                <button
                  onClick={() => navigate("/place-order")}
                  className="bg-black text-white text-sm my-8 px-8 py-3"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;