import React from "react";
import { ProductListComponent } from "..";
import ContainerComponent from "../Container.component";

const RecommendProductComponent = ({
  featureData,
  categoryName,
  isLoading,
}) => {
 

  return (
    <div className="mt-15 ">
      <ContainerComponent>
        <h1 className="text-2xl font-semibold underline text-nowrap ">
          Featured List {categoryName}{" "}
        </h1>
      </ContainerComponent>


      <ProductListComponent checkPaginate={false} filterStock={featureData} isLoading={isLoading} maxW={"xl"} />
    </div>
  );
};

export default RecommendProductComponent;
