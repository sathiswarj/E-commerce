import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/Shopcontext.jsx";
import ProductItem from "./ProductItem.jsx";
import { assets } from "../assets/assets.js";
import Title from "../components/Title.jsx";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  const [filterProducts, setFilterProducts] = useState([]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((cat) => cat !== category)
        : [...prev, category]
    );
  };

  const handleSubCategoryChange = (subCat) => {
    setSubCategory((prev) =>
      prev.includes(subCat)
        ? prev.filter((cat) => cat !== subCat)
        : [...prev, subCat]
    );
  };

  const applyFilter = (products) => {
    let filtered = [...products];

    if (search && showSearch) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((product) =>
        subCategory.includes(product.subCategory)
      );
    }

    return filtered;
  };

  const sortProduct = (productList) => {
    let sorted = [...productList];

    switch (sortType) {
      case "low-high":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    return sorted;
  };

  useEffect(() => {
    if (Array.isArray(products)) {
      let filtered = applyFilter(products);
      let sorted = sortProduct(filtered);
      setFilterProducts(sorted);
    }
  }, [products, selectedCategories, subCategory, sortType, search, showSearch]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <div className="min-w-60">
        <p
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
          onClick={() => setShowFilter(!showFilter)}
        >
          FILTERS
          <img
            src={assets.dropdown_icon}
            className={`h-3 sm:hidden transition-transform duration-200 ${
              showFilter ? "rotate-90" : ""
            }`}
          />
        </p>

         <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Men", "Women", "Kids"].map((category) => (
              <label key={category} className="flex items-center gap-2">
                <input
                  className="w-3 h-3"
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCheckboxChange(category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>

         <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          }`}
        >
          <p className="mb-3 text-sm font-medium">SUB-CATEGORIES</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
              <label key={subCat} className="flex items-center gap-2">
                <input
                  className="w-3 h-3"
                  type="checkbox"
                  value={subCat}
                  checked={subCategory.includes(subCat)}
                  onChange={() => handleSubCategoryChange(subCat)}
                />
                {subCat}
              </label>
            ))}
          </div>
        </div>
      </div>


      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"ALL"} text2={"COLLECTIONS"} />
          <select
            className="border-2 border-gray-300 text-sm px-2"
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low - High</option>
            <option value="high-low">Sort by: High - Low</option>
          </select>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((product) => (
            <ProductItem
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
