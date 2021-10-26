import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tax, setTax] = useState(0);

  /*   useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]); */

  /* Nuevo*/
  function financial(x) {
    return Number.parseFloat(x).toFixed(2);
  }

  useEffect(() => {
    const getSubTotal = () => {
      const subTotal = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setSubTotal(financial(subTotal));
    };

    getSubTotal();
  }, [cart]);

  useEffect(() => {
    const getTax = () => {
      const tax = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity * 0.13;
      }, 0);

      setTax(financial(tax));
    };

    getTax();
  }, [cart]);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return (
          prev + item.price * item.quantity * 0.13 + item.price * item.quantity
        );
      }, 0);

      setTotal(financial(total));
    };

    getTotal();
  }, [cart]);

  const addToCart = async (cart) => {
    await axios.patch(
      `/user/addcart`,
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.stock > 0 && item.quantity < item.stock) {
          item.quantity += 1;
        } else {
          alert(
            "It is not possible to add for items because they exceed the available quantity"
          );
        }
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  const removeProduct = (id) => {
    if (window.confirm("Do you want to delete this product?")) {
      cart.forEach((item, index) => {
        if (item._id === id) {
          cart.splice(index, 1);
        }
      });

      setCart([...cart]);
      addToCart(cart);
    }
  };

  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      `/api/payment`,
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    alert("You have successfully placed an order.");
  };

  if (cart.length === 0)
    return (
      <h2 style={{ textAlign: "center", fontSize: "5rem" }}>Cart Empty</h2>
    );

  /*  return (
    <div>
      {cart.map((product) => (
        <div className="detail cart" key={product._id}>
          <img src={product.images.url} alt="" />

          <div className="box-detail">
            <h2>{product.title}</h2>
            <h3>$ {product.price * product.quantity}</h3>
            <p>{product.product_id}</p>
           

            <div className="amount">
              <button onClick={() => decrement(product._id)}> - </button>
              <span>{product.quantity}</span>
              <button onClick={() => increment(product._id)}> + </button>
            </div>

            <div className="delete" onClick={() => removeProduct(product._id)}>
              X
            </div>
          </div>
        </div>
      ))}

      <div className="total">
        <h3>Total: $ {total}</h3>
        <PaypalButton total={total} tranSuccess={tranSuccess} />
      </div>
    </div>
  ); */
  return (
    <div className="  cart">
      <div className="cart-list">
        <ul className="cart-list-container">
          <li>
            <h3>Items Cart</h3>
            <h3>Price</h3>
          </li>
          {cart.map((product) => (
            <li>
              <div className="cart-image" key={product._id}>
                <img src={product.images.url} alt="imagen del producto" />
              </div>
              <div class="cart-name">
                <div>
                  <a href="/">{product.title}</a>

                  <div className="cart-amount">
                    <button
                      className="cart-amount-button"
                      onClick={() => decrement(product._id)}
                    >
                      {" "}
                      -{" "}
                    </button>
                    <span className="cart-amount-span">{product.quantity}</span>
                    <button
                      className="cart-amount-button"
                      onClick={() => increment(product._id)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </div>
                  <button
                    type="button"
                    className="cart-delete"
                    onClick={() => removeProduct(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="cart-price">$ {product.price}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="cart-total-data">
        <div>
          <h3>SubTotal: $ {subTotal}</h3>
        </div>
        <div>
          <h3>Tax: $ {tax}</h3>
        </div>
        <div>
          <h3>Total: $ {total}</h3>
        </div>
        <div>
          <PaypalButton total={total} tranSuccess={tranSuccess} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
