import React, { useEffect, useState } from "react";
import ProductsBarComponent from "../../Components/SideBar/ProductsBar.component";
import { useLazyGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import {
  FilterSheetComponent,
  FooterComponent,
  ProductListComponent,
} from "../../Components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useParams } from "react-router-dom";

const CategoryDetailPage = () => {
  const [filterStock, setFilterStock] = useState([]);
  const [finalSearch, setFinal] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(true);
  const { id } = useParams();

  const [filters, setFilters] = useState({
    categories: [id],
    priceRange: [0],
    brand: null,
    color: "All",
    onlyInStock: null,
    rating: null,
    discount: null,
  });
  const colors = ["All", "White", "Blue", "Black", "Silver"];

  const handleColorSelect = (color) => {
    setFilters((prev) => ({ ...prev, color }));
  };

  const [triggerGetStocks, { data: productData, isLoading, refetch }] =
    useLazyGetStocksQuery();

  const { data: categoryData } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });

  const handleFilter = () => {
    triggerGetStocks({
      search: search,
      perpage: 15,
      page: page,
      categories: filters?.categories,
      priceRange: filters?.priceRange,
      brand: filters?.brand,
      onlyInStock: filters?.onlyInStock,
      discount: filters?.discount,
      rating: filters?.rating,
    });
  };

  const clearFilter = () => {
    setFilters({
      categories: [],
      priceRange: [0],
      brand: null,
      color: "All",
      onlyInStock: null,
      rating: null,
      discount: null,
    });
    handleFilter();
  };

  const filterCategory = categoryData?.data?.find((data) => data._id == id);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      categories: [id],
    }));
  }, [id]);

  useEffect(() => {
    if (filters.categories?.length) {
      handleFilter();
    }
  }, [filters.categories]);

  return (
    <div className="min-h-screen">
      <div className="flex items-start">
        {/* Desktop */}
        <ProductsBarComponent
          categoryId={id}
          categoryData={categoryData}
          filters={filters}
          setFilters={setFilters}
          handleFilter={handleFilter}
          clearFilter={clearFilter}
          handleColorSelect={handleColorSelect}
          colors={colors}
        />

        {/* Mobile Filter Icon */}
        <button
          className="fixed  sm:hidden cursor-pointer bottom-6 right-6 z-50  bg-blue-500 text-white p-3 rounded-full shadow-lg"
          onClick={() => setShowMobileFilter((prev) => !prev)}
        >
          <FilterAltIcon />
        </button>

        {/* Mobile */}
        <FilterSheetComponent
          showMobileFilter={showMobileFilter}
          setShowMobileFilter={setShowMobileFilter}
          categoryData={categoryData}
          filters={filters}
          setFilters={setFilters}
          handleFilter={handleFilter}
          clearFilter={clearFilter}
          handleColorSelect={handleColorSelect}
          colors={colors}
        />

        {/* Products Content Area */}
        <div className="flex-1 p-5">
          {filterCategory?.name && (
            <div
              className="relative w-full h-38 mb-4 rounded-xl shadow-lg overflow-hidden flex items-end"
              style={{
                backgroundImage: `url(${filterCategory?.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <span className="relative z-10 p-4 text-white text-xl font-bold">
                {filterCategory?.name}
              </span>
            </div>
          )}

          <div className="bg-white min-h-full rounded-lg shadow-lg p-3">
            <ProductListComponent
              search={search}
              setSearch={setSearch}
              sort={sort}
              setFinal={setFinal}
              setSort={setSort}
              productPage={true}
              headerText="Product List"
              filterStock={productData?.data}
              handleFilter={handleFilter}
              total={productData?.totalPage}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>

      <FooterComponent />
    </div>
  );
};
export default CategoryDetailPage;
