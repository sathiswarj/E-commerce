import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/Shopcontext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const { cartItems, currency, products, updateCart } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const tempData = [];

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        const cartEntry = cartItems[productId][size];
        if (cartEntry && cartEntry.quantity > 0) {
          tempData.push({
            quantity: cartEntry.quantity,
            _id: productId,
            size,
            product: cartEntry.product,
          });
        }
      }
    }

    setCartData(tempData);
  }, [cartItems]);

  return (
    <>
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
              {cartData.map((item, index) => {
                const productData = products.find(
                  (product) => product._id === item._id
                );
                if (!productData) return null;

                return (
                  <div
                    key={index}
                    className="py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center"
                  >
                    <div className="flex items-center gap-6">
                      <img
                        src={productData.image[0]}
                        alt={productData.name}
                        className="w-16 sm:w-20 h-20 object-cover rounded"
                      />
                      <div>
                        <h3 className="text-sm sm:text-lg font-medium">
                          {productData.name}
                        </h3>
                        <div className="flex items-center gap-5 mt-2">
                          <p>
                            {currency}
                            {productData.price}
                          </p>
                          <p className="px-2 sm:px-3 sm:py-1 border bg-slate-50">
                            {item.size}
                          </p>
                        </div>
                      </div>
                    </div>

                    <input
                      type="number"
                      min={1}
                      defaultValue={item.quantity}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        if (val > 0) {
                          updateCart(item._id, item.size, val);
                        }
                      }}
                      className="border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                    />

                    <img
                      src={assets.bin_icon}
                      alt="Bin"
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => updateCart(item._id, item.size, 0)}
                    />
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end my-20">
              <div className="w-full sm:w-[450px]">
                <CartTotal />
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
    </>
  );
};

export default Cart;
