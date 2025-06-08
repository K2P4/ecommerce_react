import React, { useEffect, useState } from "react";
import ProductsBarComponent from "../../Components/SideBar/ProductsBar.component";
import {
  useGetStocksQuery,
  useLazyGetStocksQuery,
} from "../../store/services/endpoints/stock.endpoint";
import ProductsListComponent from "../../Components/Products/ProductsList.component";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import { FilterSheetComponent, FooterComponent, ProductListComponent } from "../../Components";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const ProductsPage = () => {
  const [filterStock, setFilterStock] = useState([]);
  const [finalSearch, setFinal] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);
  const [showMobileFilter, setShowMobileFilter] = useState(true);

  const [filters, setFilters] = useState({
    categories: [],
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

  const [triggerGetStocks, { data: productData, isLoading }] =useLazyGetStocksQuery();

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

  useEffect(() => {
    handleFilter();
  }, [triggerGetStocks]);

  return (

    
    <div className="min-h-screen">
      <div className="flex items-start">
        {/* Desktop */}
        <ProductsBarComponent
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

      <FooterComponent/>
    </div>
  );
};
export default ProductsPage;
