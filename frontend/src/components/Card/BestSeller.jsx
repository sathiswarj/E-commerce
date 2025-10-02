import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Title";
import ProductItem from "./ProductItem";
import { fetchAllProducts } from "../../redux/Product/productReducer";

const BestSeller = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);
  const [bestSeller, setBestSeller] = useState([]);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const best = products.filter((item) => item.bestSeller); // filter best sellers
      setBestSeller(best.slice(0, 10)); // take first 10 best sellers
    }
  }, [products]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"BEST"} text2={"SELLERS"} />
        <p className="w-3/4 m-auto text-xs md:text-base sm:text-sm text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.map((item) => (
          <ProductItem
            key={item._id}
            id={item._id}
            image={item.images && item.images.length > 0 ? item.images[0] : ""}
            name={item.name}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
