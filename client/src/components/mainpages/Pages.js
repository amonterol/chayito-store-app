import React from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import ProductDetail from "./productDetail/ProductDetail.js";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Cart from "./cart/Cart";
import NotFound from "./utils/not_found/NotFound";

function Pages() {
  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={ProductDetail} />
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />
      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

/*



import DetailProduct from "./detailProduct/DetailProduct";

import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";


import Categories from "./categories/Categories";
import CreateProduct from "./createProduct/CreateProduct";

import { GlobalState } from "../../GlobalState";

function Pages() {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isAdmin] = state.userAPI.isAdmin


    return (
        <Switch>
            <Route path="/" exact component={Products} />
            <Route path="/detail/:id" exact component={DetailProduct} />

            <Route path="/login" exact component={isLogged ? NotFound : Login} />
            <Route path="/register" exact component={isLogged ? NotFound : Register} />

            <Route path="/category" exact component={isAdmin ? Categories : NotFound} />
            <Route path="/create_product" exact component={isAdmin ? CreateProduct : NotFound} />
            <Route path="/edit_product/:id" exact component={isAdmin ? CreateProduct : NotFound} />

            <Route path="/history" exact component={isLogged ? OrderHistory : NotFound} />
            <Route path="/history/:id" exact component={isLogged ? OrderDetails : NotFound} />

            <Route path="/cart" exact component={Cart} />


            
        </Switch>
    )
}
*/
export default Pages;