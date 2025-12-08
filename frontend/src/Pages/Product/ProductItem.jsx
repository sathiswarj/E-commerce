import React from "react";
import { Link } from "react-router-dom";

 const ProductItem = ({ productId, name, image, price }) => {
   return (
    <Link className="cursor-pointer" to={`/product/${productId}`}>
      <div className="overflow-hidden">
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image || ""}  
          alt={name}
        />
      </div>
      <p className="pt-3 pb-1 text-sm">{name}</p>
      <p className="text-sm font-medium">{price}</p>
    </Link>
  );
};

export default ProductItem;
