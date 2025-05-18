import React, { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useGetOrdersQuery } from "../../store/services/endpoints/order.endpoint";
import {
  InvoiceTableComponent,
  SearchComponent,
  InvoiceOverviewComponent,
} from "../../Components";

const InvoicesPage = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [search, setSearch] = useState("");
  const [finalSearch, setFinal] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useGetOrdersQuery({
    search: finalSearch,
    page,
    date: selectedDate,
    sort: sort,
  });

  return (
    <div>
      {/* nav route */}
      <div className="flex items-center justify-between ">
        <div className="text-xl font-semibold text-gray-800">
          <Link
            className="  text-left text-blue-400  border-b-blue-400 border-b"
            to="/admin/dashboard"
          >
            Dashboard
          </Link>
          <ArrowForwardIosIcon className=" text-gray-500   mx-4" />
          <Link to="/invoices">Invoices</Link>
        </div>

        <SearchComponent
          search={search}
          setSearch={setSearch}
          sort={sort}
          setFinal={setFinal}
          setSort={setSort}
        />
      </div>

      <InvoiceOverviewComponent invoices={data?.data}  ordersData={data} />

      {/* invoice table */}
      <InvoiceTableComponent
        invoices={data?.data}
        isError={isError}
        isLoading={isLoading}
        page={page}
        setPage={setPage}
        ordersData={data}
      />
    </div>
  );
};

export default InvoicesPage;
