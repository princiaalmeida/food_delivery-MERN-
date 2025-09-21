import React from "react";
import { useNavigate } from "react-router-dom";
import { getCartItems, clearCart } from "../../services/cartService";
import { createOrder } from "../../services/orderService";

function Cart() {
  const cartItems = getCartItems();
  const navigate = useNavigate();

  const handleCheckout = async () => {
    await createOrder(cartItems);
    clearCart();
    navigate("/orders");
  };

  return (
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.name} (x{item.qty}) - ₹{item.price * item.qty}
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}

export default Cart;
