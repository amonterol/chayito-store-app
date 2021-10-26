import React from "react";
import BtnRender from "./BtnRender";
import { Link } from "react-router-dom";

export default function ProductItem({
  product,
  isAdmin,
  deleteProduct,
  handleCheck,
}) {
  return (
    <div className="product_card">
      {isAdmin && (
        <input
          type="checkbox"
          checked={product.checked}
          onChange={() => handleCheck(product._id)}
        />
      )}

      <img src={product.images.url} alt="" />
      <div className="product-box">
        <Link to="#!">
          <p className="product-card-title" title={product.title}>
            {product.title}
          </p>
        </Link>

        <h4 className="product-card-brand" title={product.brand}>
          {product.brand}
        </h4>
        <h3 className="product-card-price">${product.price}</h3>
      </div>
      <BtnRender product={product} deleteProduct={deleteProduct} />
    </div>
  );
}
