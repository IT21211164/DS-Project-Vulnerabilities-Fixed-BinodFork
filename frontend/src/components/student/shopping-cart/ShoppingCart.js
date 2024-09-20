import React from "react";
import Loading from "../../loading/Loading";
import CartItem from "../../cart-item/CartItem";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../features/Cart.slice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BsCart3 } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { GrPowerReset } from "react-icons/gr";
import "./cart.styles.css";

function ShoppingCart() {
  const dispatch = useDispatch();
  const { items, totalCost } = useSelector((state) => state.cart);

  const checkoutCart = async () => {
    if (items.length < 1) {
      return toast.error("No items to checkout!");
    }

    const courseIdList = items.map((course) => {
      return course._id;
    });

    try {
      const checkoutResponse = await axios.post(
        "http://localhost:4002/learnup/api/payment-management/checkout",
        {
          cart_items: courseIdList,
        }
      );

      if (checkoutResponse.data) {
        window.location = checkoutResponse.data.link;
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }
  };

  return (
    <div className="cart-page-container">
      <div className="cart-display-container">
        <div className="insight-displayer">
          <Link className="insight-link">
            <div className="insight-container">
              <span className="insight-icon">
                <FiHeart />
              </span>
              <span className="item-counter"></span>
            </div>
          </Link>
          <span className="insight-container">
            <span className="insight-icon">
              <BsCart3 />
            </span>
            <span className="item-counter">{items.length}</span>
          </span>
          <span
            className="insight-container"
            onClick={() => dispatch(clearCart())}
            aria-hidden="true"
          >
            <span className="insight-icon">
              <GrPowerReset />
            </span>
          </span>
        </div>
        <span className="partition-heading">Shopping Cart</span>
        <div className="cart-main-container">
          {items.length < 1 ? (
            <Loading passer={{ message: "Your cart is empty" }} />
          ) : (
            <div className="cart-partition-canvas">
              {items.map((course) => {
                return <CartItem key={course._id} item={course} />;
              })}
            </div>
          )}
          <div className="cart-checkout-section">
            <span className="total-label">Total:</span>
            <span className="total-price">${totalCost.toFixed(2)}</span>
            <button
              className="checkout-btn"
              disabled={items.length < 1}
              onClick={() => checkoutCart()}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCart;
