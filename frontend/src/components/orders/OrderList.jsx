import React, { useState, useEffect } from "react";
import { getUserOrders } from "../../services/orderService";

function OrderList() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await getUserOrders();
      setOrders(data);
    };
    fetchOrders();
  }, []);

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {orders.map((order) => (
          <li key={order._id}>
            Order #{order._id} - Status: {order.status}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
