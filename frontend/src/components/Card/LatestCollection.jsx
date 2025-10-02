import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../Title";
import ProductItem from "./ProductItem";
import { fetchAllProducts } from "../../redux/Product/productReducer";

const LatestCollection = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchAllProducts());  
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="my-10">
      <div className="text-center py-8 text-3xl">
        <Title text1={"LATEST"} text2={"COLLECTIONS"} />
        <p className="w-3/4 m-auto text-xs md:text-base sm:text-sm text-gray-600">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 gap-y-6">
        {products.slice(0, 10).map((item) => (
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

export default LatestCollection;
