import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import ProductItem from "../utils/productItem/ProductItem";

export default function ProductDetail() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) {
          setProductDetail(product);
        }
      });
    }
  }, [params.id, products]);

  if (productDetail.length === 0) {
    return null;
  }

  return (
    <>
      <div className="detail">
        <img src={productDetail.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{productDetail.title}</h2>
          </div>
          <h6>#id: {productDetail.product_id}</h6>
          <h6>Brand: {productDetail.brand}</h6>
          <h3>$ {productDetail.price}</h3>
          <p className="detail-description">{productDetail.description}</p>
          <p className="detail-context">{productDetail.content}</p>
          <p>Sold: {productDetail.sold}</p>
          <Link
            to="/cart"
            className="btn-add-cart"
            onClick={() => addCart(productDetail)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === productDetail.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}
