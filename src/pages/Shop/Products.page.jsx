import React, { useState } from "react";
import ProductsBarComponent from "../../Components/SideBar/ProductsBar.component";
import { useGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import ProductsListComponent from "../../Components/Products/ProductsList.component";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import { ProductListComponent } from "../../Components";

const ProductsPage = () => {
  const [filterStock, setFilterStock] = useState([]);
  const [finalSearch, setFinal] = useState("");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("desc");
  const [page, setPage] = useState(1);

  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0,],
    brand: null,
    color: "All",
    onlyInStock: null,
    rating: null,
    discount: null,
  });

  const colors = ["All", "White", "Blue", "Black", "Silver"];
  const handleFilter = () => {

  }

  const handleCategoryChange = (category) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };


  const handleColorSelect = (color) => {
    setFilters((prev) => ({ ...prev, color }));
  };

  // useEffect(() => {
  //   if (!productData?.data) return;

  //   const filteredData = selectCategory
  //     ? productData.data.filter((pd) => pd?.categoryId?._id == selectCategory)
  //     : productData.data;

  //   setFilterStock(filteredData);
  // }, [productData, selectCategory]);

  const { data: productData, isLoading } = useGetStocksQuery({
    search: finalSearch,
    perpage: 15,
    page: page,
    categories : filters?.categories,
    priceRange : filters?.priceRange,
    brand : filters?.brand,
    discount : filters?.discount,
    rating : filters?.rating,
     
  });

  const { data: categoryData } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <ProductsBarComponent categoryData={categoryData} handleCategoryChange={handleCategoryChange} filters={filters} setFilters={setFilters}  handleColorSelect={handleColorSelect} colors={colors} />

        {/* Products Content Area */}
        <div className="flex-1 p-5">
          <div className="bg-white min-h-screen rounded-lg shadow-lg p-3">
            {/* Products Section */}
            <ProductListComponent
              search={search}
              setSearch={setSearch}
              sort={sort}
              setFinal={setFinal}
              setSort={setSort}
              productPage={true}
              headerText="Product List"
              filterStock={productData?.data}
              total={productData?.totalPage}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
