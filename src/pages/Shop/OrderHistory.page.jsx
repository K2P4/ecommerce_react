import React, { useContext, useEffect, useState } from "react";
import { useGetOrdersQuery } from "../../store/services/endpoints/order.endpoint";

import {
  OrderInfoComponent,
  OrderInvoiceComponent,
  ProgressLoadingComponent,
  SearchComponent,
} from "../../Components";

import moment from "moment";
import { AllContext } from "../../context/AllContext";
import ContainerComponent from "../../Components/Container.component";

const OrderHistoryPage = () => {
  const [progress, setProgress] = useState(10);
  const [openInfo, setOpenInfo] = useState(null);
  const [finalSearch, setFinal] = useState("");
  const [search, setSearch] = useState("");
  const [openInvoice, setOpenInvoice] = useState(null);
  const [sort, setSort] = useState("desc");
  const { addToCart } = useContext(AllContext);
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetOrdersQuery({
    search: finalSearch,
    page: page,
    perpage: 5,
    status: [2, 3],
    sort: sort,
  });

  const handleOpenInvoice = (orderNumber) => {
    setOpenInvoice(orderNumber);
  };

  const handleCloseInvoice = () => {
    setOpenInvoice(null);
  };

  const handleOpenInfo = (orderNumber) => {
    setOpenInfo(orderNumber);
  };

  const handleCloseInfo = () => {
    setOpenInfo(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 0 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

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
      price: price,
      discount: discount,
    };
    addToCart(newCart);
  };

  return (
    <div className="mt-2">
      <ContainerComponent>
        {/* main */}
        <div className="flex items-center   justify-between">
          <div>
            <h1 className="font-medium text-2xl">Order history</h1>
            <p className="text-gray-500 text-sm mt-1">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>

          <SearchComponent
            search={search}
            setSearch={setSearch}
            sort={sort}
            setFinal={setFinal}
            setSort={setSort}
          />
        </div>

        {/* Order list */}

        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <ProgressLoadingComponent value={progress} />
          </div>
        ) : data?.data?.length == 0 ? (
          <div className="py-10 flex flex-col justify-center  items-center w-full  h-[500px] m-auto ">
            <img
              src="../../public/empty-cart.png"
              className="w-xl m-auto  h-72  object-contain mb-0 "
            />

            <p className="text-center text-gray-500 ">
              Your Oder List Is Empty
            </p>
          </div>
        ) : (
          <div>
            {/* Order list */}
            {data?.data?.map((order) => {
              const subTotal = order?.items.reduce((total, item) => {
                return total + item.price;
              }, 0);
              const taxAmount = subTotal > 200000 ? subTotal * 0.005 : 0;
              const deliveryFee = order?.deliveryType == 0 ? 3000 : 5000;
              const isInvoiceOpen = openInvoice === order?.orderNumber;
              const isInfoOpen = openInfo === order?.orderNumber;

              return (
                <div
                  key={order?.orderNumber}
                  className="border bg-gray-50 shadow-sm rounded-sm    overflow-hidden mb-4"
                >
                  <div className="px-4 py-3 grid grid-cols-12 gap-x-10 items-center">
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        Order number
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {order?.orderNumber}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        Ordered Date
                      </p>
                      <p className="mt-1 text-sm text-gray-900">
                        {moment(order?.createdAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-sm font-medium text-gray-500">
                        Total amount
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-900">
                        {order?.totalAmount.toLocaleString()} MMK
                      </p>
                    </div>

                    <div className="col-span-6 flex justify-end items-center gap-4">
                      <OrderInvoiceComponent
                        open={isInvoiceOpen}
                        setOpen={handleOpenInvoice}
                        handleClose={handleCloseInvoice}
                        orders={order}
                        calculateSubTotal={subTotal}
                        taxAmount={taxAmount}
                        deliveryFee={deliveryFee}
                      />
                      <OrderInfoComponent
                        open={isInfoOpen}
                        setOpen={handleOpenInfo}
                        handleClose={handleCloseInfo}
                        order={order}
                      />
                    </div>
                  </div>

                  {order?.items?.map((item, index) => (
                    <div key={index} className="px-4 py-4 border-t">
                      <div className="grid grid-cols-12 gap-x-1 items-start">
                        <div className="col-span-2">
                          <img
                            src={
                              item?.image || "https://via.placeholder.com/70"
                            }
                            alt={item?.name}
                            className="w-44 h-44 object-cover rounded-md"
                          />
                        </div>
                        <div className="col-span-7 ms-5">
                          <h3 className="text-sm font-semibold text-gray-900">
                            {item?.name}
                          </h3>
                          <p className="mt-2 text-sm text-gray-500">
                            {item?.description}
                          </p>

                          <p className="mt-3 text-sm text-gray-500">
                            Qty {item?.quantity}
                          </p>
                        </div>
                        <div className="col-span-3 text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {item?.price?.toLocaleString()} MMK
                          </p>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500">
                          <svg
                            className=" h-5 w-5 text-green-500 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Delivered on{" "}
                          {moment(order?.deliveryDate).format("MMMM D, YYYY")}
                        </div>
                        <div className="flex items-center gap-x-3">
                          <a
                            href={`/stock/${item.id}`}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            View product
                          </a>
                          <button
                            onClick={() =>
                              handleAddToCart(
                                item?.id,
                                1,
                                item?.name,
                                item?.description,
                                item?.image,
                                item?.price,
                                item?.discount
                              )
                            }
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Buy again
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}

            {/* Pagination */}
            {data?.totalPages > 1 && (
              <PaginationComponent
                page={page}
                setPage={setPage}
                total={data?.totalPages}
              />
            )}
          </div>
        )}
      </ContainerComponent>
    </div>
  );
};

export default OrderHistoryPage;
