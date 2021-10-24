import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../utils/loading/loading";
import LoadMore from "./LoadMore";

function MenProducts() {
  const state = useContext(GlobalState);
  const [menProducts] = state.productsAPI.menProducts;

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
        {menProducts.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>

      <LoadMore />
      {menProducts.length === 0 && <Loading />}
    </>
  );
}

export default MenProducts;
