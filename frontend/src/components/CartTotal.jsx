import React from "react";
import Title from "./Title";

const CartTotal = ({ totalAmount }) => {
  const currency = "$";
  const delivery_fee = 50;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART"} text2={"TOTALS"} />
      </div>

      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>
            {currency} {totalAmount}
          </p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Shipping fee</p>
          <p>
            {currency} {delivery_fee}
          </p>
        </div>
        <hr />
        <div className="flex justify-between font-semibold">
          <p>Total</p>
          <p>
            {currency} {totalAmount + delivery_fee}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;