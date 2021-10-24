import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/loading";
import LoadMore from "./LoadMore";

function WomenProducts() {
  const state = useContext(GlobalState);
  const [womenProducts] = state.productsAPI.womenProducts;

  //const [callback, setCallback] = state.productsAPI.callback;
  const [loading] = useState(false);

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <>
      <div className="products">
        {womenProducts.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>

      <LoadMore />
      {womenProducts.length === 0 && <Loading />}
    </>
  );
}

export default WomenProducts;
