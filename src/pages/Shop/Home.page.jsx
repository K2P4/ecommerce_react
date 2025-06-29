import React, { useEffect, useState } from "react";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import { useGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import { Button } from "@mui/material";
import {
  CollectionComponent,
  FooterComponent,
  MainComponent,
  ProductListComponent,
} from "../../Components";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [finalSearch, setFinal] = useState("");
  const [selectCategory, setSelectCat] = useState("");
  const [filterStock, setFilterStock] = useState([]);
  const nav = useNavigate();
  const { data: categoryData } = useGetCategoryQuery({
    search: "",
    perpage: 15,
  });

  const allCategories = categoryData && [
    { name: "All", _id: null },
    ...categoryData?.data,
  ];

  const { data: productData, isLoading } = useGetStocksQuery({
    search: finalSearch,
    perpage: 15,
    page: page,
  });

  const changeCategory = (data) => {
    setSelectCat(data);
  };

  useEffect(() => {
    if (!productData?.data) return;

    const filteredData = selectCategory
      ? productData.data.filter((pd) => pd?.categoryId?._id == selectCategory)
      : productData.data;

    setFilterStock(filteredData);
  }, [productData, selectCategory]);

  return (
    <div className="min-h-screen text-gray-800">
      {/* Hero Section */}
      <MainComponent />
      <div className=" w-full h-1/4 bg-gradient-to-t from-white to-transparent"></div>

      {/* New Collection Section */}
      <div id='new' >
        <ProductListComponent
          filterStock={productData?.data?.slice(0, 4)}
          total={productData?.totalPage}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          headerText={"New Collection"}
        />
      </div>

      {/* Collection Section */}
      <div id="collection">
      <CollectionComponent />
        
      </div>

      {/* Products Section */}
      <ProductListComponent
        filterStock={filterStock}
        total={productData?.totalPage}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        isCategory={true}
        categoryData={allCategories}
        changeCategory={changeCategory}
        selectCategory={selectCategory}
        headerText={"Our Store Perfumes "}
      />

      {/* ABout Us Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 md:flex md:items-center md:gap-12">
        <div className="md:flex-1 mb-10 md:mb-0">
          <img
            src="/about-us.jpg"
            alt="Perfume bottle with flowers"
            className="rounded-lg shadow-lg w-full object-cover h-80 md:h-[450px]"
          />
        </div>
        <div className="md:flex-1">
          <h2 className="text-4xl font-bold mb-6 text-dark-500">Our Story</h2>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Founded in 2025, Perfume Store was born from a passion for exquisite
            fragrances and timeless elegance. We believe that a scent is not
            just a fragrance, but a memory waiting to be created.
          </p>
          <p className="text-lg text-gray-600 leading-relaxed mb-6">
            Every bottle is carefully crafted with the finest ingredients ...
          </p>

          <Button
            onClick={() => nav("/about")}
            variant="outlined"
            color="black"
            sx={{ fontWeight: "bold", px: 5, py: 1.5, fontFamily: "Poppins" }}
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Footer Section */}
      <FooterComponent />
    </div>
  );
};
export default HomePage;
