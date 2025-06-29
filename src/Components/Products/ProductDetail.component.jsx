import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDetailStockQuery } from "../../store/services/endpoints/stock.endpoint";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { Button, Skeleton, Chip, IconButton, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import SecurityIcon from "@mui/icons-material/Security";
import { MinusIcon, PlusIcon } from "lucide-react";
import { AllContext } from "../../context/AllContext";
import RecommendProductComponent from "./RecommendProduct.component";

const ProductDetailComponent = () => {
  const { id } = useParams();
  const { data, isLoading } = useDetailStockQuery(id);
  const [quantity, setQuantity] = useState(1);
  const [atcDisabled, atcSetDisabled] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const images = data?.stock?.images || [];
  const { addToCart, cart } = useContext(AllContext);

  useEffect(() => {
    const existingItem = cart.find((item) => item.id === data?.stock?._id);
    if (existingItem) {
      setQuantity(existingItem.quantity);
      atcSetDisabled(true);
    }
  }, [cart, data]);

  const handleAddToCart = () => {
    const newCart = {
      id: data?.stock?._id,
      quantity,
      name: data?.stock?.name,
      description: data?.stock?.description,
      image: data?.stock?.images[0],
      price: discountPrice,
      discount: data?.stock?.discountPercentage,
    };

    addToCart(newCart);
    atcSetDisabled(true);
  };

  const discountPrice =
    data?.stock?.price * (1 - data?.stock?.discountPercentage / 100) * quantity;
  const finalPrice = quantity * data?.stock?.price;

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<StarIcon key={i} className="text-amber-400 w-5 h-5" />);
      } else {
        stars.push(
          <StarBorderIcon key={i} className="text-gray-300 w-5 h-5" />
        );
      }
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image Skeleton */}
            <div className="space-y-4">
              <Skeleton
                variant="rounded"
                className="w-full h-96 lg:h-[500px]"
              />
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} variant="rounded" className="w-20 h-20" />
                ))}
              </div>
            </div>

            {/* Content Skeleton */}
            <div className="space-y-6">
              <div className="space-y-3">
                <Skeleton variant="text" className="w-32 h-6" />
                <Skeleton variant="text" className="w-full h-10" />
                <Skeleton variant="text" className="w-3/4 h-6" />
              </div>
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} variant="text" className="w-full h-4" />
                ))}
              </div>
              <div className="flex gap-4">
                <Skeleton variant="rounded" className="w-32 h-12" />
                <Skeleton variant="rounded" className="w-40 h-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: document.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied!");
      }
    } catch (e) {
      console.error("Share failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-blue-600 transition-colors">
            Home
          </Link>
          <ArrowForwardIosIcon className="w-3 h-3" />
          <Link
            to={`/category/${data?.stock?.categoryId?._id}`}
            className="hover:text-blue-600 transition-colors"
          >
            {data?.stock?.categoryId?.name}
          </Link>
          <ArrowForwardIosIcon className="w-3 h-3" />
          <span className="text-gray-900 font-medium truncate">
            {data?.stock?.name}
          </span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden group">
              <img
                src={images[selectedImageIndex] || images[0]}
                alt={data?.stock?.name}
                className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />

              {/* Share buttons */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Tooltip title="Share Product">
                  <IconButton
                    onClick={handleShare}
                    className="bg-white/90 backdrop-blur-sm shadow-lg hover:bg-white text-gray-600 transition-all"
                    size="small"
                  >
                    <ShareIcon />
                  </IconButton>
                </Tooltip>
              </div>

              {/* Discount Badge */}
              {data?.stock?.discountPercentage > 0 && (
                <div className="absolute top-4 left-4">
                  <Chip
                    label={`-${data?.stock?.discountPercentage}%`}
                    className="bg-red-500 text-white font-semibold shadow-lg"
                    size="small"
                  />
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImageIndex === index
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${data?.stock?.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {data?.stock?.description || "No description available."}
              </p>
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Chip
                  label={data?.stock?.categoryId?.name || "Product"}
                  variant="outlined"
                  className="text-blue-600 border-blue-200 bg-blue-50"
                  size="small"
                />
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    data?.stock?.status === 0
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {data?.stock?.status === 0 ? " In Stock" : " Out of Stock"}
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 leading-tight">
                {data?.stock?.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {renderStars(data?.stock?.rating)}
                </div>
                <span className="text-sm text-gray-600">
                  ({data?.stock?.rating || 0}/5)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="space-y-3">
                {data?.stock?.discountPercentage > 0 ? (
                  <>
                    <div className="flex items-center gap-4">
                      <span className="text-3xl font-bold text-gray-900">
                        {Math.ceil(discountPrice).toLocaleString()} MMK
                      </span>
                      <span className="text-lg text-gray-400 line-through">
                        {Math.ceil(finalPrice).toLocaleString()} MMK
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-medium">
                        Save {data?.stock?.discountPercentage}%
                      </span>
                      <span className="text-sm text-gray-600">
                        You save{" "}
                        {Math.ceil(finalPrice - discountPrice).toLocaleString()}{" "}
                        MMK
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    {Math.ceil(finalPrice).toLocaleString()} MMK
                  </span>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="space-y-2">
                  <span className="text-gray-600">Size</span>
                  <p className="font-medium text-gray-900">
                    {data?.stock?.size} ml
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-gray-600">Gender</span>
                  <p className="font-medium text-gray-900">
                    {data?.stock?.gender}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add to Cart
              </h3>

              <div className="flex items-center gap-4">
                {/* Quantity Selector */}
                <div className="flex items-center border-2 border-gray-200 rounded-xl">
                  <IconButton
                    onClick={() =>
                      quantity > 1 && setQuantity((pre) => pre - 1)
                    }
                    disabled={quantity <= 1}
                    className="text-gray-600 hover:text-blue-600"
                    size="small"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </IconButton>
                  <span className="px-4 py-2 font-semibold text-gray-900 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <IconButton
                    onClick={() => setQuantity((pre) => pre + 1)}
                    className="text-gray-600 hover:text-blue-600"
                    size="small"
                  >
                    <PlusIcon className="w-4 h-4" />
                  </IconButton>
                </div>

                {/* Add to Cart Button */}
                <Button
                  disabled={atcDisabled || data?.stock?.status !== 0}
                  variant="contained"
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:bg-gray-300 disabled:transform-none disabled:shadow-none"
                  startIcon={<ShoppingCartIcon />}
                >
                  {atcDisabled ? "Added to Cart" : "Add to Cart"}
                </Button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <LocalShippingIcon className="w-5 h-5 text-green-600" />
                  <span>Free shipping over 100,000 MMK</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <SecurityIcon className="w-5 h-5 text-blue-600" />
                  <span>Secure payment guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-16">
          <RecommendProductComponent
            categoryName={data?.stock?.categoryId?.name}
            isLoading={isLoading}
            featureData={data?.stockDataByCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailComponent;
