import React, { useEffect, useState } from "react";
import { Rating, Switch } from "@mui/material";

const ProductsBarComponent = ({
  categoryId,
  categoryData,
  colors,
  filters,
  setFilters,
  handleColorSelect,
  handleFilter,
  clearFilter,
}) => {
 


  return (
    <div
      className={` hidden sm:inline w-64  lg:w-72 bg-white shadow-lg p-6 h-full overflow-y-auto`}
    >
      {/* Category */}
      {categoryId == null && (
        <div className="border-b border-gray-300 pb-4">
          <p className="text-lg   font-semibold text-black mb-3"> Category </p>
          <div className="flex flex-col space-y-2.5 mb-4">
            {categoryData?.data?.map((category) => (
              <label key={category?._id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.categories?.includes(category._id)}
                  onChange={(e) => {
                    const checked = e.target.checked;
                    const id = category._id;
                    setFilters((prev) => {
                      const updatedCategories = checked
                        ? [...(prev.categories || []), id]
                        : (prev.categories || []).filter(
                            (catId) => catId !== id
                          );

                      return { ...prev, categories: updatedCategories };
                    });
                  }}
                  className="accent-blue-500 mr-2"
                />
                <p className="text-sm"> {category?.name} </p>
              </label>
            ))}
          </div>
        </div>
      )}
      {/* Price Range */}
      <div className="border-b border-gray-300  py-4">
        <p className="text-lg font-semibold text-black mb-3"> Price Range </p>
        <div className="flex items-center mb-2">
          <input
            type="number"
            min={5}
            max={1000}
            value={filters?.priceRange[0]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [Number(e.target.value), prev.priceRange[1]],
              }))
            }
            className="w-16 border rounded px-2 py-0.5 text-sm mr-2"
          />
          <span className="mx-1"> - </span>{" "}
          <input
            type="number"
            min={5}
            max={1000}
            value={filters.priceRange[1]}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                priceRange: [prev.priceRange[0], Number(e.target.value)],
              }))
            }
            className="w-16 border rounded px-1 py-0.5 text-sm ml-2"
          />
        </div>{" "}
      </div>
      {/* Brand */}
      {/* <div className="border-b border-gray-300 py-4">
        <p className="text-lg font-semibold text-black mb-2 mt-4"> Brand </p>
        <select
          value={filters.brand}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, brand: e.target.value }))
          }
          className="w-full border rounded px-2 py-1 mb-4 text-md"
        >
          <option value=""> All </option>{" "}
        </select>{" "}
      </div> */}
      {/* Color */}{" "}
      <div className="border-b border-gray-300 py-4">
        <p className="text-lg font-semibold text-black mb-3"> Color </p>{" "}
        <div className="flex flex-col space-y-1 mb-4">
          {colors.map((color) => (
            <label key={color} className="flex items-center">
              <input
                type="radio"
                checked={filters.color === color}
                onChange={() => handleColorSelect(color)}
                className="accent-blue-500 mr-2"
              />
              <p className="text-md"> {color} </p>{" "}
            </label>
          ))}{" "}
        </div>{" "}
      </div>
      {/* Rating */}{" "}
      <div className="border-b border-gray-300 py-4">
        <p className="text-lg font-semibold text-black mb-3"> Rating </p>{" "}
        <div className="flex items-center justify-between mb-4">
          <Rating
            value={filters?.rating}
            onChange={(e) =>
              setFilters((pre) => ({ ...pre, rating: e.target.value }))
            }
            // onChange={(value) =>
            //   setFilters((prev) => ({ ...prev, rating: value }))
            // }
            // ratedColor="blue"
            // unratedColor="gray"
          />
          <span className="ml-2  text-blue-600 font-medium text-sm">
            {" "}
            {filters?.rating} +
          </span>{" "}
        </div>{" "}
      </div>
      {/* Discount */}{" "}
      <div className="border-b border-gray-300 py-4">
        <p className="text-lg font-semibold text-black mb-3"> Discount </p>{" "}
        <div className="flex items-center justify-between mb-4">
          <input
            type="range"
            min={0}
            max={90}
            step={10}
            value={filters.discount}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                discount: Number(e.target.value),
              }))
            }
            className="w-32 accent-blue-500"
          />
          <span className="ml-2  text-blue-600 font-medium text-sm">
            {" "}
            {filters.discount} %
          </span>{" "}
        </div>{" "}
      </div>
      {/* Stock Filter */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-black"> Only in Stock </p>{" "}
          <Switch
            checked={filters?.onlyInStock == 0 ? true : false}
            onChange={(e) =>
              setFilters((prev) => ({
                ...prev,
                onlyInStock: e.target.checked ? 0 : 1,
              }))
            }
            sx={{
              "& .MuiSwitch-switchBase.Mui-checked": {
                color: "#3B82F6",
              },
              "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#3B82F6",
              },
            }}
          />{" "}
        </div>{" "}
      </div>
      {/* Clear All Button */}{" "}
      <div className="flex items-center mt-20 gap-3">
        <button
          onClick={handleFilter}
          className="w-full mt-6 bg-blue-400 text-white py-2 px-4 rounded active:scale-95 cursor-pointer hover:bg-blue-600 duration-700 transition-colors"
        >
          Filter{" "}
        </button>{" "}
        <button
          onClick={clearFilter}
          className="w-full mt-6 bg-gray-700 text-white py-2 px-4 rounded  active:scale-95  cursor-pointer hover:bg-gray-900 duration-700 transition-colors"
        >
          Clear{" "}
        </button>{" "}
      </div>{" "}
    </div>
  );
};

export default ProductsBarComponent;
