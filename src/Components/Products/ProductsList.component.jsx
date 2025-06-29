import React, { useContext, useEffect, useState } from "react";
import { Grid, Container } from "@mui/material";
import { Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../context/AllContext";
import PaginationComponent from "../Pagination.component";
import SearchComponent from "../Search/Search.component";

const ProductsListComponent = ({
  handleFilter,
  search,
  setSearch,
  sort,
  setSort,
  setFinal,
  productPage = false,
  headerText = "",
  filterStock,
  isLoading,
  checkPaginate = true,
  total,
  page,
  setPage,
  isCategory = false,
  categoryData,
  changeCategory,
  selectCategory,
  maxW = "lg",
}) => {
  const { addToCart, cart } = useContext(AllContext);
  const nav = useNavigate();

  const handleAddToCart = (
    id,
    quantity,
    name,
    description,
    image,
    price,
    discount
  ) => {
    const newCart = {
      id,
      quantity,
      name,
      description,
      image,
      price: price * (1 - discount / 100) * quantity,
      discount: discount,
    };
    addToCart(newCart);
  };

  const isDisabled = (id, status) => {
    return status == 0 ? cart.some((cartItem) => cartItem.id === id) : true;
  };

  return (
    <div>
    

      <section className={` ${!productPage && "py-12"} `}>
        <Container maxWidth={maxW} className="">
          {maxW !== "xl" &&
            (productPage ? (
              <div className="flex items-center justify-between my-5">
                <h2
                  className={` text-xl lg:text-2xl font-semibold text-gray-800 ${
                    !productPage && "mb-8"
                  } underline ${!productPage && "text-center"} `}
                >
                  {headerText}
                </h2>
                <SearchComponent
                  search={search}
                  handleFilter={handleFilter}
                  setSearch={setSearch}
                  sort={sort}
                  setFinal={setFinal}
                  setSort={setSort}
                />
              </div>
            ) : (
              <h2
                className={`text-2xl font-semibold text-gray-800 mb-8 underline text-center `}
              >
                {headerText}
              </h2>
            ))}
          {/*  Categoryies  */}
          {isCategory && (
            <div className="flex justify-center space-x-6 mb-8 text-lg font-medium text-gray-600">
              {categoryData?.map((category) => (
                <div
                  key={category._id}
                  className={`
              cursor-pointer
              py-2
              hover:text-blue-600
              transition-colors
              duration-300
              ${
                selectCategory === category?._id
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "border-transparent "
              }
            `}
                  onClick={() => changeCategory(category?._id)}
                >
                  {category?.name}
                </div>
              ))}
            </div>
          )}

          {filterStock?.length > 0 ? (
            <Grid container spacing={!productPage ? 4 : 2}>
              {filterStock.map((item) => (
                <Grid
                  className=""
                  item
                  xs={12}
                  sm={6}
                  md={productPage ? 4 : 3}
                  key={item?._id}
                >
                  <div className="hover:bg-gray-300 relative rounded-lg hover:cursor-pointer hover:shadow-xl hover:ease-in duration-500 transition-all">
                    {item?.status == 0 ? (
                      <span className="text-xs absolute top-2 right-3 px-2 py-1 rounded-lg text-center  bg-emerald-200 text-emerald-600 hover:bg-emerald-300 hover:text-emerald-800 duration-700 transition-all ease-in">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs absolute top-2 right-3 px-2 py-1 rounded-lg text-center  bg-orange-200 text-orange-600 hover:bg-orange-300 hover:text-orange-800 duration-700 transition-all ease-in">
                        Out Of Stocks
                      </span>
                    )}

                    <div className="bg-white  shadow-md rounded-lg overflow-hidden">
                      <img
                        src={item?.images[0]}
                        alt={`Perfume ${item}`}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-sm font-semibold text-gray-700 truncate">
                            {item?.categoryId?.name}
                          </h3>
                          <span className=" text-emerald-600 text-xs font-medium ml-auto">
                            Save {item?.discountPercentage}%
                          </span>
                        </div>
                        <p className="text-gray-500 text-xs mt-1 truncate">
                          {item?.name}
                        </p>

                        {item?.discountPercentage ? (
                          <p className="text-sm font-semibold text-blue-700 mt-2">
                            {Math.round(
                              item?.price * (1 - item?.discountPercentage / 100)
                            ).toLocaleString()}{" "}
                            MMK
                          </p>
                        ) : (
                          <p className="text-blue-600 font-semibold text-sm mt-2">
                            {item?.price.toLocaleString()} MMK
                          </p>
                        )}
                        <div className="text-sm font-semibold my-5 flex items-center justify-between">
                          <a
                            href={`/products/${item?._id}`}
                            className="text-black-600 hover:text-black-800 transition duration-500 "
                          >
                            View Product
                          </a>

                          <Button
                            disabled={isDisabled(item?._id, item?.status)}
                            onClick={() =>
                              handleAddToCart(
                                item?._id,
                                1,
                                item?.name,
                                item?.description,
                                item?.images[0],
                                item?.price,
                                item?.discountPercentage
                              )
                            }
                            size="small"
                            className=" font-bold text-right "
                          >
                            <ShoppingCartIcon
                              className={` cursor-pointer    ${
                                isDisabled(item?._id, item?.status)
                                  ? "text-gray-500"
                                  : ""
                              }`}
                            />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          ) : (
            <div className=" m-auto text-center text-xl flex  flex-col justify-center  align-middle  font-medium  ">
              <img
                src="/no-results.png"
                alt="not found"
                className=" h-[250px] object-contain "
              />
              <p>Not Found Products</p>
            </div>
          )}
        </Container>
      </section>

      {/* Pagination */}
      {isCategory && total > 1 && (
        <PaginationComponent page={page} setPage={setPage} total={total} />
      )}
    </div>
  );
};

export default ProductsListComponent;
