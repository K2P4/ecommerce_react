import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDetailStockQuery } from "../../store/services/endpoints/stock.endpoint";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import { Skeleton } from "@mui/material";
import RecommendComponent from "../../Components/Table/Recommend.component";
import { AllContext } from "../../context/AllContext";

const StockDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useDetailStockQuery(id);
  const [quantity, setQuanity] = useState(1);
  const [atcDisabled, atcSetDisabled] = useState(false);
  const images = data?.stock?.images || [];
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useContext(AllContext);

  const { cart } = useContext(AllContext);

  useEffect(() => {
    const existingItem = cart.find((item) => item.id === data?.stock?._id);

    if (existingItem) {
      if (existingItem) {
        setQuanity(existingItem.quantity);
        atcSetDisabled(true);
      }
    }
  }, [cart, data]);

  const discountPrice =
    data?.stock?.price * (1 - data?.stock?.discountPercentage / 100) * quantity;

  const finalPrice = quantity * data?.stock?.price;

  return (
    <div>
      {/* nav route */}
      <div className="text-xl  mb-17 font-semibold text-gray-800">
        <Link
          className="  text-left text-blue-400  border-b-blue-400 border-b"
          to="/admin/stock"
        >
          Stock
        </Link>
        <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
        <Link to="/admin/stock">
          {" "}
          {data?.stock?.name} | {data?.stock?.code}
        </Link>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-15 mx-auto ">
          <Skeleton variant="rounded" width={450} height={250} />

          <div className="space-y-1">
            <Skeleton variant="rounded" width={250} height={15} />
            <Skeleton
              className="mb-3"
              variant="rounded"
              width={200}
              height={15}
            />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
            <Skeleton variant="rounded" width={700} height={10} />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 items-center  gap-10">
          <div className="col-span-7">
            <div className="flex gap-2 md:gap-5 h-[305px] my-4 items-center align-middle md:h-[420px]">
              <div className="flex flex-col gap-2">
                {images.map((img, index) => (
                  <img
                    key={index}
                    className="w-[150px] h-[70px] md:w-[180px] md:h-[135px] rounded-sm shadow-sm object-cover 
                        border-gray-100 hover:border-blue-400 hover:scale-105 transition-transform"
                    src={img}
                    onMouseEnter={() => setSelectedImage(img)}
                  />
                ))}
              </div>
              <img
                className="w-full h-full border-gray-100 duration-500 rounded-sm shadow-sm object-cover"
                src={selectedImage || images[0]}
                alt="No Image"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="col-span-5 space-y-3 ">
            <div>
              <p className="text-lg capitalize text-gray-600 mb-1">
                {data?.stock?.categoryId?.name || ""}
              </p>

              <div className="flex items-center  justify-between ">
                <h1 className="font-bold text-3xl text-gray-800 mb-4">
                  {data?.stock?.name}{" "}
                </h1>
                {data?.stock?.status == 0 ? (
                  <span className="text-xs px-2 py-1 rounded-lg text-center  bg-emerald-200 text-emerald-600 hover:bg-emerald-300 hover:text-emerald-800 duration-700 transition-all ease-in">
                    Available
                  </span>
                ) : (
                  <span className="text-xs px-2 py-1 rounded-lg text-center  bg-orange-200 text-orange-600 hover:bg-orange-300 hover:text-orange-800 duration-700 transition-all ease-in">
                    Out Of Stocks
                  </span>
                )}
              </div>

              <p className="text-md  line-clamp-2 text-gray-500">
                {data?.stock?.description || "No description available."}
              </p>
            </div>
            {/* Price */}
            <div>
              {data?.stock?.discountPercentage && (
                <div>
                  <div className="flex items-center justify-between  ">
                    <p className="text-lg font-semibold ">
                      KS {Math.ceil(discountPrice)}
                    </p>

                    <span className="   text-center  px-3  py-1 rounded-md   text-emerald-500  hover:cursor-pointer  hover:text-emerald-800 duration-700  font-medium text-sm  ">
                      {data?.stock?.discountPercentage}%
                    </span>
                  </div>

                  <p
                    className={` ${
                      data?.stock?.discountPercentage
                        ? " line-through text-gray-400 "
                        : "text-xl font-semibold"
                    }`}
                  >
                    KS {Math.ceil(finalPrice)}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-y-3 max-w-sm">
              {/* Rating */}
              <div className="text-gray-700 font-semibold ">Rating </div>
              <div className="flex items-center">
                :
                {Array.from(
                  { length: data?.stock?.rating || 0 },
                  (_, index) => (
                    <StarIcon
                      key={index}
                      className="text-yellow-500  ml-0.5 w-5 h-5"
                    />
                  )
                )}
              </div>

              {/* Size */}
              <div className="text-gray-700 font-semibold ">Size </div>
              <p className="text-gray-600">: {data?.stock?.size} ml</p>

              {/* In Stock */}
              <div className="text-gray-700 font-semibold ">Instock </div>
              <p className="text-gray-600">: {data?.stock?.inStock}</p>

               {/* Gender */}
              <div className="text-gray-700 font-semibold ">Gender </div>
              <p className="text-gray-600">: {data?.stock?.gender}</p>

              {/* Reorder Level */}
              <div className="text-gray-700 font-semibold ">Reorder Level </div>
              <p className="text-gray-600">: {data?.stock?.reorderLevel}</p>
            </div>
          </div>
        </div>
      )}

      <div>
        <RecommendComponent />
      </div>
    </div>
  );
};

export default StockDetailPage;
