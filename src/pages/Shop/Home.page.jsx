import React, { useContext, useEffect, useState } from "react";
import { useGetProfileQuery } from "../../store/services/endpoints/auth.endpoint";
import { useGetCategoryQuery } from "../../store/services/endpoints/category.endpoint";
import { useGetStocksQuery } from "../../store/services/endpoints/stock.endpoint";
import { CollectionComponent, FooterComponent, MainComponent, ProductListComponent } from "../../Components";
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

  const allCategories = categoryData && [{ name: "All", _id: null }, ...categoryData?.data];


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
      <ProductListComponent filterStock={productData?.data?.slice(0, 4)} total={productData?.totalPage} page={page} setPage={setPage} isLoading={isLoading} headerText={"New Collection"} />


      {/* Collection Section */}
      <CollectionComponent />


      {/* Products Section */}
      <ProductListComponent filterStock={filterStock} total={productData?.totalPage} page={page} setPage={setPage} isLoading={isLoading} isCategory={true} categoryData={allCategories} changeCategory={changeCategory} selectCategory={selectCategory} headerText={"Our Store Perfumes "}  />


      {/* Footer Section */}
      <FooterComponent/>
    </div>
  );


}
export default HomePage;