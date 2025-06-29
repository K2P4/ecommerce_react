import React, { useContext, useState } from "react";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { XIcon } from "lucide-react";
import { AllContext } from "../../context/AllContext";


const CartPage = () => {
  const { cart, cartTotalAmount, removeCart, addToCart } = useContext(AllContext);


  const nav = useNavigate();
  const addQuantity = (id) => {
    const currentItem = cart.find((item) => item.id == id);
    let addQ = currentItem.quantity + 1;

    const updateCart = {
      id: currentItem.id,
      quantity: currentItem.quantity + 1,
      price: (currentItem.price / currentItem.quantity) * addQ,
    };


    addToCart(updateCart);
  };

  const removeQuantity = (id) => {
    const currentItem = cart.find((item) => item.id == id);
    let removeQ = currentItem.quantity - 1;

    const updateCart = {
      id: currentItem.id,
      quantity: currentItem.quantity - 1,
      price: (currentItem.price / currentItem.quantity) * removeQ,
    };
    addToCart(updateCart);
  };


  return (
    <div>
  

      <div
        transition
        className="pointer-events-auto   transform transition duration-500 ease-in-out  mt-10 sm:duration-700"
      >
        {cart?.length > 0 ? (
          <div className="flex  flex-col rounded-lg   bg-gray-50 w-full shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h1 className="text-lg sm:text-xl font-medium text-gray-900">
                  Shopping Cart List
                </h1>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.map((product) => (
                      <li key={product.id} className="flex py-6">
                        <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={product?.image}
                            className="size-full object-cover"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>
                                <a
                                  href={`/products/${product.id}`}
                                  className="text-sm md:text-base text-black hover:underline text-nowrap duration-500 cursor-pointer "
                                >
                                  {product?.name}
                                </a>
                              </h3>
                              <div className="flex md:ml-4">
                                <button
                                  onClick={() => removeCart(product.id)}
                                  type="button"
                                  className="font-medium text-gray-400 active:scale-95 cursor-pointer hover:text-gray-500 duration-500 transition-all "
                                >
                                  <XIcon />
                                </button>
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {product.color}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center gap-2 sm:gap-4">
                              <PlusIcon
                                className="  bg-gray-200 cursor-pointer p-1 sm:p-0.5 text-gray-600 active:scale-95 duration-500 transition-all rounded-full   "
                                onClick={() =>
                                  product?.quantity > 0 &&
                                  addQuantity(product.id)
                                }
                              />
                              <p className="text-gray-500">
                                {product?.quantity}
                              </p>
                              <MinusIcon
                                onClick={() =>
                                  product.quantity > 1 &&
                                  removeQuantity(product?.id)
                                }
                                className="  bg-gray-200 cursor-pointer p-1 sm:p-0.5 text-gray-600 active:scale-95 duration-500 transition-all rounded-full  "
                              />
                            </div>

                            <p className="text-xs sm:text-base md:ml-4">{Number(product.price).toLocaleString()} MMK</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between  text-sm sm:text-md font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{cartTotalAmount.toLocaleString()} MMK</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                 to="/products/checkout"
                  className="flex items-center px-4 py-2.5 justify-center rounded-md border border-transparent bg-blue-600 duration-500 transition-all sm:px-6 sm:py-3 text-base font-medium text-white shadow-xs hover:bg-blue-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <button
                  onClick={() => nav('/products')}
                    type="button"
                    className="font-medium text-blue-600 duration-500 hover:text-blue-500"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-10 flex flex-col justify-center  items-center w-full  h-[500px] m-auto ">
            <img
              src="/empty-cart.png"
              className="w-xl m-auto  h-72  object-contain mb-0 "
            />

            <p className="text-center text-gray-500 ">Your Cart is empty</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
